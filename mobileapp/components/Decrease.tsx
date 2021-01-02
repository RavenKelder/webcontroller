import React, { useContext } from "react";
import { Icon, Text } from "react-native-elements";
import { View } from "react-native";
import Connection from "../contexts/Connection";
import CurrentVolume from "../contexts/CurrentVolume";

export default function Decrease(): JSX.Element {
  const { updateVolume } = useContext(CurrentVolume);
  const { host } = useContext(Connection);
  function onClick() {
    fetch(host + "/decrease")
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
      name="keyboard-arrow-down"
    />
  )
}
