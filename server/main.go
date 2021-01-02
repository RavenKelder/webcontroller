package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"path"
	"path/filepath"
	"ravenkelder/webcontroller/internal/control"
	"strconv"

	"github.com/itchyny/volume-go"
	"github.com/rs/cors"
)

func returnJSON(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(data)
}

func main() {

	var addr string = ":8080"

	mux := http.NewServeMux()

	mux.HandleFunc("/computer", func(w http.ResponseWriter, r *http.Request) {
		hostname, err := os.Hostname()
		if err != nil {
			fmt.Fprintf(w, "OS_ERROR")
		} else {
			hostInfo := HostInfo{
				Name: hostname,
			}
			returnJSON(w, hostInfo)
		}
	})

	mux.HandleFunc("/status", func(w http.ResponseWriter, r *http.Request) {
		status, err := control.Status()
		if err != nil {
			fmt.Fprintf(w, "VOLUME_ERROR")
		} else {
			returnJSON(w, status)
		}
	})

	mux.HandleFunc("/increase", func(w http.ResponseWriter, r *http.Request) {
		status, err := control.Increase(5)
		if err != nil {
			fmt.Fprintf(w, "VOLUME_ERROR")
		} else {
			returnJSON(w, status)
		}
	})

	mux.HandleFunc("/decrease", func(w http.ResponseWriter, r *http.Request) {
		status, err := control.Decrease(5)
		if err != nil {
			fmt.Fprintf(w, "VOLUME_ERROR")
		} else {
			returnJSON(w, status)
		}
	})

	mux.HandleFunc("/mute", func(w http.ResponseWriter, r *http.Request) {
		err := volume.Mute()
		status, errStatus := control.Status()
		if err != nil || errStatus != nil {
			fmt.Fprintf(w, "VOLUME_ERROR")
		} else {
			returnJSON(w, status)
		}
	})

	mux.HandleFunc("/unmute", func(w http.ResponseWriter, r *http.Request) {
		err := volume.Unmute()
		status, errStatus := control.Status()
		if err != nil || errStatus != nil {
			fmt.Fprintf(w, "VOLUME_ERROR")
		} else {
			returnJSON(w, status)
		}
	})

	mux.HandleFunc("/set", func(w http.ResponseWriter, r *http.Request) {
		values, ok := r.URL.Query()["value"]

		if !ok || len(values[0]) < 1 {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		value := values[0]

		intValue, errParse := strconv.Atoi(value)

		if errParse != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		status, err := control.Set(intValue)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			return
		}

		returnJSON(w, status)
	})

	ex, errEx := os.Executable()
	if errEx != nil {
		log.Fatal(errEx)
	}
	exPath := filepath.Dir(ex)

	fs := http.FileServer(http.Dir(path.Join(exPath, "build")))
	mux.Handle("/", fs)

	log.Println("Listening on port address " + addr)

	c := cors.New(cors.Options{
		AllowedOrigins: []string{
			"http://localhost:19006",
			"http://192.168.1.*:19006",
		},
	})

	handler := c.Handler(mux)

	err := http.ListenAndServe(addr, handler)
	if err != nil {
		log.Fatal(err)
	}
}

type HostInfo struct {
	Name string
}
