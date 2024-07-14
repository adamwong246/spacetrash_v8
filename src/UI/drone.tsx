import React from "react";

import { UICanvas } from "../engine/UI/UICanvas";

export const DroneApp = (props: {
  worker: Worker
}) => {


  return (<div
    style={{
      height: "100%",
      width: "100%",
      position: "relative",
    }}
  >

    hello drones
  <UICanvas worker={props.worker} app={"drone"} />


  </div>);
}