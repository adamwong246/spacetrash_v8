import React, { useEffect, useRef } from "react";

import { SpaceTrash } from "..";

export const BotWindow = (props: {
  game: SpaceTrash
}) => {

  const canvasRef = useRef(null);
  const parentRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && parentRef.current) {
      props.game.registerCanvas("drone", false, canvasRef.current, () => { }, "threejs", parentRef.current)
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


