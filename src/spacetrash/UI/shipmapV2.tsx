import React, { useEffect, useRef } from "react";



import SpacetrashGame from "../Game";

export const ShipMapAppV2 = (props: {
}) => {
  console.log('ShipMapAppV2.tsx')
  const parentRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && parentRef.current) {
      SpacetrashGame.register("shipmapV2", false, canvasRef.current, () => { }, "pixi2d", parentRef.current)
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

  // return (<div

  //   >
  //     <pre>MainView</pre>

  //     <div className="parent" ref={parentRef}>
  //         {/* <canvas className="child" id="child" ref={childRef}></canvas> */}
  //     </div>

  //     {/* <canvas
  //       tabIndex={1}
  //       // onKeyUp={(e) => {
  //       //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
  //       // }}
  //       // onKeyDown={(e) => {
  //       //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
  //       // }}
  //       // onMouseDown={(e) => {
  //       //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
  //       // }}
  //       // onMouseUp={(e) => {
  //       //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
  //       // }}
  //       // onMouseOver={(e) => {
  //       //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
  //       // }}
  //       // onMouseMove={(e) => {
  //       //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
  //       // }}
  //       ref={canvasRef}
  //       width="800"
  //       height="600"></canvas> */}

  //   </div>);
}