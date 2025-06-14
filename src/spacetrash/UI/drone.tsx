import React from "react";

import { UICanvas } from "../../engine/UI/UICanvas";

export const DroneApp = (props: {
  // worker: Worker
}) => {

  document.addEventListener('keydown', function (event) {

    if (event.key === 'ArrowUp' ||
      event.key === 'ArrowDown' ||
      event.key === 'ArrowLeft' ||
      event.key === 'ArrowRight' ||
      event.key === '1' ||
      event.key === '2' ||
      event.key === '3' ||
      event.key === '4' ||
      event.key === '5' ||
      event.key === '6' ||
      event.key === '7' ||
      event.key === '8' ||
      event.key === '9' 
    ) {
      // props.worker.postMessage(["inputEvent", event.key, "drone"])
    }

    //   props.worker.postMessage(["inputEvent", "UP", "drone"]);
    // } else if (event.key === 'ArrowDown') {
    //   props.worker.postMessage(["inputEvent", "DOWN", "drone"]);
    // } else if (event.key === 'ArrowLeft') {
    //   props.worker.postMessage(["inputEvent", "LEFT", "drone"]);
    // } else if (event.key === 'ArrowRight') {
    //   props.worker.postMessage(["inputEvent", "RIGHT", "drone"]);
    // }
  });


  return (<div
    style={{
      height: "100%",
      width: "100%",
      position: "relative",
    }}
  >
    <UICanvas worker={props.worker} app={"drone"} rendering="webgl2" />


  </div>);
}