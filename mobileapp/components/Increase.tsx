import React, { useContext } from "react";
import { Icon } from "react-native-elements";
import Connection from "../contexts/Connection";
import CurrentVolume from "../contexts/CurrentVolume";

export default function Increase(): JSX.Element {
  const { updateVolume } = useContext(CurrentVolume);
  const { host } = useContext(Connection);
  function onClick() {
    fetch(host + "/increase")
      .then((res) => {
        return res.json();
      })
      .then((vol: VolumeStatus) => {
        updateVolume(vol.Volume);
      })
  }
  return (
    <Icon 
      onPress={onClick}
      name="keyboard-arrow-up"
    />
  )
}