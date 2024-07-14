import React from "react";

import { UICanvas } from "../../../engine/UI/UICanvas";

export const ShipMapApp = (props: {
  worker: Worker
}) => {
  return (<div
  
    style={{
      height: "100%",
      width: "100%",
      position: "relative",
    }}
  >
  <UICanvas worker={props.worker} app={"shipmap"} />


  </div>);
}