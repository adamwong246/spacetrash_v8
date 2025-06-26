import React, { useEffect, useRef } from "react";

import { SpaceTrash } from "..";
import { MapSize, TileSize } from "../Constants";

export const ArcadePhysicsWindow = (props: { game: SpaceTrash }) => {
  const parentRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && parentRef.current) {
      props.game.registerCanvas("arcadePhysics", false, canvasRef.current, () => { }, "arcadePhysics", parentRef.current)
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
      ref={canvasRef}
      style={{
        height: "500",
        width: "500",
      }}
    >

    </canvas>

  </div>);

}