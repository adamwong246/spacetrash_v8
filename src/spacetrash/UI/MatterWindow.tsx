import React, { useEffect, useRef } from "react";

import { SpaceTrash } from "..";
import { MapSize, TileSize } from "../Constants";

export const MatterWindow = (props: { game: SpaceTrash }) => {
  const parentRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && parentRef.current) {
      props.game.registerCanvas("matter", false, canvasRef.current, () => { }, "matter", parentRef.current)
    }
  }, [canvasRef, parentRef]);


  return (<div
    ref={parentRef}
    style={{
      // height: "100%",
      // width: "100%",
      // position: "relative",
    }}
  >
    <canvas
      ref={canvasRef}
      // style={{
      //   width: (MapSize+5) * TileSize,
      //   height: (MapSize+5) * TileSize,
      //   // color: 'white',
      //   // overflow: 'auto',
      // }}
    >

    </canvas>

  </div>);

}