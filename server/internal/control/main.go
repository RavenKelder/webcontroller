package control

import (
	"errors"

	"github.com/itchyny/volume-go"
)

func Status() (VolumeStatus, error) {
	var status VolumeStatus
	vol, err := volume.GetVolume()

	if err != nil {
		return status, err
	}

	status.Volume = vol

	muted, errMuted := volume.GetMuted()

	if errMuted != nil {
		return status, err
	}

	status.Muted = muted

	return status, nil
}

func Decrease(amount int) (VolumeStatus, error) {
	vol, err := volume.GetVolume()
	if err != nil {
		return VolumeStatus{}, err
	}

	newVol := vol - amount
	if newVol < 0 {
		newVol = 0
	}

	setErr := volume.SetVolume(newVol)

	if setErr != nil {
		return VolumeStatus{}, setErr
	}

	return Status()
}

func Increase(amount int) (VolumeStatus, error) {
	vol, err := volume.GetVolume()
	if err != nil {
		return VolumeStatus{}, err
	}

	newVol := vol + amount
	if newVol > 100 {
		newVol = 100
	}

	setErr := volume.SetVolume(newVol)

	if setErr != nil {
		return VolumeStatus{}, setErr
	}

	return Status()
}

func Set(value int) (VolumeStatus, error) {
	if value < 0 || value > 100 {
		return VolumeStatus{}, errors.New("Invalid value provided")
	}

	err := volume.SetVolume(value)

	if err != nil {
		return VolumeStatus{}, err
	}

	return Status()
}

type VolumeStatus struct {
	Volume int
	Muted  bool
}
