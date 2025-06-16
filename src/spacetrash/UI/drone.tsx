import React, { useEffect, useRef } from "react";

import SpacetrashGame from "../Game";

export const DroneApp = () => {

  const canvasRef = useRef(null);
  const parentRef = useRef(null);

    useEffect(() => {
      if (canvasRef.current && parentRef.current) {
        SpacetrashGame.register("drone", false, canvasRef.current, () => {}, "threejs", parentRef.current)
      }
    }, [canvasRef, parentRef]);
    
  

    return (<div
      ref={parentRef}
      style={{
        
        height: "100%",
        width: "100%",
        position: "relative",
      }}
    >
      <canvas
        tabIndex={1}
        ref={canvasRef}
      ></canvas>
  
  
    </div>);
}


  // document.addEventListener('keydown', function (event) {

  //   if (event.key === 'ArrowUp' ||
  //     event.key === 'ArrowDown' ||
  //     event.key === 'ArrowLeft' ||
  //     event.key === 'ArrowRight' ||
  //     event.key === '1' ||
  //     event.key === '2' ||
  //     event.key === '3' ||
  //     event.key === '4' ||
  //     event.key === '5' ||
  //     event.key === '6' ||
  //     event.key === '7' ||
  //     event.key === '8' ||
  //     event.key === '9'
  //   ) {
  //     // props.worker.postMessage(["inputEvent", event.key, "drone"])
  //   }

  //   //   props.worker.postMessage(["inputEvent", "UP", "drone"]);
  //   // } else if (event.key === 'ArrowDown') {
  //   //   props.worker.postMessage(["inputEvent", "DOWN", "drone"]);
  //   // } else if (event.key === 'ArrowLeft') {
  //   //   props.worker.postMessage(["inputEvent", "LEFT", "drone"]);
  //   // } else if (event.key === 'ArrowRight') {
  //   //   props.worker.postMessage(["inputEvent", "RIGHT", "drone"]);
  //   // }
  // });
