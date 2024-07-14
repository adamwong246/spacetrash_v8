import React from "react";
import { useState } from "react";

import { UICanvas } from "../../../engine/UI/UICanvas";

export const ShipMapApp = (props: {
  worker: Worker
}) => {

  // const [state, setState] = useState < { buffer: string, history: any }>({
  //   buffer: "",
  //   history: []
  // });

  return (<div
  
    style={{
      height: "100%",
      width: "100%",
      position: "relative",

    

      // display: "flex",
      // flexDirection: "column-reverse",
      // overflow: "auto",
    }}
  >
    hello ship map
  <UICanvas worker={props.worker} app={"shipmap"} />


  </div>);
}