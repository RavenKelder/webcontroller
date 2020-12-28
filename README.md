# Desktop Web Controller

Web-based controller to act as a remote for a Linux desktop. Currently implements volume controls

## Web Server
Go server within this `server` folder provides the API to interact with the desktop
## React App
React app within the `app` folder, provides interface that interacts with the server's API

## Compiling
Run `make compile` to compile the server and build the React app

## Running the server
Run `make run` to start the server (uses port 8080), which runs the generated binary at `bin/webcontroller`