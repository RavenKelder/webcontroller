import React, { useContext } from "react";
import { View } from "react-native";
import { Icon, Text } from "react-native-elements";
import Connection from "../contexts/Connection";
import CurrentVolume from "../contexts/CurrentVolume";

export default function MuteToggle(): JSX.Element {
  const { updateMuted, muted } = useContext(CurrentVolume);
  const { host } = useContext(Connection);
  function onClickMute() {
    console.log(host);
    fetch(host + "/mute")
      .then(() => {
        updateMuted(true);
      });
  }

  function onClickUnmute() {
    fetch(host + "/unmute")
      .then(() => {
        updateMuted(false);
      });
  }
  return (
    <View style={{ display: "flex", justifyContent: "center" }}>
       {
        muted ? (
          <Icon name="volume-off" reverse onPress={onClickUnmute}/>
        ) : (
          <Icon name="volume-up" reverse onPress={onClickMute}/>
        )
      }
    </View>
  );
}