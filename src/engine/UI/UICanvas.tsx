import React, { useContext, useRef, useEffect } from "react";
import stringifyEvent from "../Event";
import { ThemeContext } from "./WM";

export const UICanvas = (props: {
  worker: Worker;
  message: string;
}) => {
  // const theme = useContext(ThemeContext);
  // console.log("theme", theme)
  // const className = 'panel-' + theme;

  const canvasRef = useRef(null)

  useEffect(() => {
    if (canvasRef.current) {
      const offscreen = (canvasRef.current as HTMLCanvasElement).transferControlToOffscreen()
      props.worker.postMessage([props.message, offscreen], [offscreen]);
    }
  }, [canvasRef]);

  return     <canvas
  onMouseDown={(e) => { props.worker.postMessage(["inputEvent", stringifyEvent(e)]); }}
  ref={canvasRef}
  width="800"
  height="600"></canvas>
};