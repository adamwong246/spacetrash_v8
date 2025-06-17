import React, { useEffect, useRef } from "react";
import SpacetrashGame from "../spacetrash/Game";

export const ShipMapApp = (props: {
  spaceTrashGame: SpacetrashGame;
}) => {

  const canvasRef = useRef(null)
  useEffect(() => {
    if (canvasRef.current) {
      const offscreen = (canvasRef.current as HTMLCanvasElement).transferControlToOffscreen()
      props.spaceTrashGame.register("shipmap", false, offscreen, () => { }, "2d")
    }
  }, [canvasRef]);

  return (<div

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