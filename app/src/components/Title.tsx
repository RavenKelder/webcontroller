import { Typography } from "@material-ui/core";
import React from "react";
import "./Title.css";

export default function Title(props: TitleProps): JSX.Element {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Typography className="desktop-name-title" variant="h3">{props.text}</Typography>
    </div>
  );
}

interface TitleProps {
  text: string;
}
