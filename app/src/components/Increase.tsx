import IconButton from "@material-ui/core/IconButton";
import { ArrowUpward } from "@material-ui/icons";
import React, { useContext } from "react";
import CurrentVolume from "../contexts/CurrentVolume";

export default function Increase(): JSX.Element {
  const { updateVolume } = useContext(CurrentVolume);
  function onClick() {
    fetch("/increase")
      .then((res) => {
        return res.json();
      })
      .then((vol: VolumeStatus) => {
        updateVolume(vol.Volume);
      })
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <IconButton onClick={onClick}>
        <ArrowUpward/>
      </IconButton>
    </div>
  )
}