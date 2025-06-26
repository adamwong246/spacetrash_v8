import React, { useEffect, useRef } from "react";

import { SpaceTrash } from "..";

export const MapWindow = (props: {game: SpaceTrash}) => {
  const parentRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && parentRef.current) {
      props.game.registerCanvas("map", false, canvasRef.current, () => { }, "pixi2d", parentRef.current);
      parentRef.current.addEventListener("keydown", function(e) {
        // Check if the pressed key is an arrow key (e.code values)
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
          e.preventDefault(); // Prevent the default scrolling behavior
        }
      });
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
    <div
      style={{
        height: '100%',
        color: 'white',
        overflow: 'auto',
      }}
    >
      <canvas
        tabIndex={1}
        ref={canvasRef}
        height={'100%'}
        color={'white'}


      ></canvas>
    </div>




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