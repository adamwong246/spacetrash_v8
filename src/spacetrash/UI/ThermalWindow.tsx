import React, { useEffect, useRef } from "react";

import { SpaceTrash } from "../Game/6-WithStateSpace";

export const ThermalWindow = (props: { game: SpaceTrash }) => {
  const parentRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && parentRef.current) {

      
      props.game.registerCanvas("thermal", false, canvasRef.current, () => { }, "pixi2d", parentRef.current);
      
      // stop back scrolling
      parentRef.current.addEventListener("keydown", function (e) {
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
          e.preventDefault();
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

}