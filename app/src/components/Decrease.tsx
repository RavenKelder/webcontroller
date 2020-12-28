import { IconButton } from "@material-ui/core";
import { ArrowDownward } from "@material-ui/icons";
import React, { useContext } from "react";
import CurrentVolume from "../contexts/CurrentVolume";

export default function Decrease(): JSX.Element {
  const { updateVolume } = useContext(CurrentVolume);
  function onClick() {
    fetch("/decrease")
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
        <ArrowDownward/>
      </IconButton>
    </div>
  )
}