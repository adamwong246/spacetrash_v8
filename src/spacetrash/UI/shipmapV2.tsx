import React, { useEffect, useRef } from "react";
import { IDockviewPanelProps } from "dockview";

import { SpaceTrashGameSingleton } from "../Game";

import { IState } from "./State";

export const ShipMapAppV2 = (props: IDockviewPanelProps<IState>) => {
  console.log('ShipMapAppV2.tsx')
  const parentRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && parentRef.current) {
      SpaceTrashGameSingleton.register("shipmapV2", false, canvasRef.current, () => { }, "pixi2d", parentRef.current)
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