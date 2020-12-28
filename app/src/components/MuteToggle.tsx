import { IconButton } from "@material-ui/core";
import { VolumeMute, VolumeUp } from "@material-ui/icons";
import React, { useContext } from "react";
import CurrentVolume from "../contexts/CurrentVolume";

export default function MuteToggle(): JSX.Element {
  const { updateMuted, muted } = useContext(CurrentVolume);
  function onClickMute() {
    fetch("/mute")
      .then(() => {
        updateMuted(true);
      });
  }

  function onClickUnmute() {
    fetch("/unmute")
      .then(() => {
        updateMuted(false);
      });
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
       {
        muted ? (
          <IconButton onClick={onClickUnmute}>
            <VolumeMute/>
          </IconButton>
        ) : (
          <IconButton onClick={onClickMute}>
            <VolumeUp/>
          </IconButton>
        )
      }
    </div>
  );
}