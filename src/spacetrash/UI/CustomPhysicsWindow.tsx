import level4 from "../ECS/EntityComponents/ships/Ship4"

import React, { useEffect, useRef } from "react";

import { MapSize, TileSize } from "../Constants";
import { SpaceTrash } from "../Game";


export const CustomPhysicsWindow = (props: { game: SpaceTrash }) => {
  const parentRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && parentRef.current) {
      props.game.registerCanvas("samurai", false, canvasRef.current, () => { }, "samurai", parentRef.current)

    }
  }, [canvasRef, parentRef]);

  return (
    <div
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
          overflowY: "scroll",
          overflowX: "scroll",
          height: "1500",
          width: "1500",
        }}
      ></canvas>
    </div>
  );
};
