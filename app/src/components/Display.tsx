import AnimatedNumber from "animated-number-react";
import React from "react";
import CurrentVolume from "../contexts/CurrentVolume";
import "./Display.css"

export default function Display(): JSX.Element {
  return (
    <CurrentVolume.Consumer>
      {({ volume, updateVolume }) => (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <AnimatedNumber
            className="volume-display"
            value={volume}
            duration={200}
            formatValue={(value: number) => value.toFixed(0)}
          />
        </div>
      )}
    </CurrentVolume.Consumer>
  )
}
