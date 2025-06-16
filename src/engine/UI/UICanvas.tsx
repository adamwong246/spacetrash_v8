import React, { useContext, useRef, useEffect } from "react";
import stringifyEvent from "../Event";

export const UICanvas = (props: {

  app: string;
  rendering: "2d" | "webgl2"
}) => {
  const canvasRef = useRef(null)

  // useEffect(() => {
  //   if (canvasRef.current) {
  //   const offscreen = (canvasRef.current as HTMLCanvasElement).transferControlToOffscreen()
  //     props.worker.postMessage([props.app + "-register", offscreen, props.rendering], [offscreen]);
  //   }
  // }, [canvasRef]);

  return <canvas
    tabIndex={1}
    // onKeyUp={(e) => {
    //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
    // }}
    // onKeyDown={(e) => {
    //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
    // }}
    // onMouseDown={(e) => {
    //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
    // }}
    // onMouseUp={(e) => {
    //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
    // }}
    // onMouseOver={(e) => {
    //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
    // }}
    // onMouseMove={(e) => {
    //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
    // }}
    ref={canvasRef}
    width="900"
    height="300"></canvas>
};