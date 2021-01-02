import { Text } from "react-native-elements";
import React from "react";
import CurrentVolume from "../contexts/CurrentVolume";
import { View } from "react-native";

export default function Display(): JSX.Element {
  return (
    <CurrentVolume.Consumer>
      {({ volume }) => (
        <View style={{ 
          display: "flex", 
          justifyContent: "center", 
        }}>
          <Text h2>
            {volume}
          </Text>
        </View>
      )}
    </CurrentVolume.Consumer>
  )
}
