import React, { useEffect, useRef } from "react";

import { SpaceTrash } from "../Game";

export type IBotWindowState = {
  rads: number,
  heat: number,
  sound: number, 
};

export const BotWindow = (props: {
  game: SpaceTrash
}) => {

  const [state, stateSetter] = React.useState<IBotWindowState>({
    rads: 0,
    heat: 0,
    sound: 0
  });

  const canvasRef = useRef(null);
  const parentRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && parentRef.current) {
      props.game.registerCanvas("bot", false, canvasRef.current, () => { }, "threejs", parentRef.current)
      props.game.registerBotHook(stateSetter);
    }
  }, [canvasRef, parentRef]);

  return (<div
    ref={parentRef}
    style={{

      height: "100%",
      width: "100%",
      position: "relative",
      color: "white",
    }}
  >
    <ol>
      <li>rads: {state.rads}</li>
      <li>heat: {state.heat}</li>
      <li>sound: { state.sound }</li>

    </ol>
    <canvas
      tabIndex={1}
      ref={canvasRef}
    ></canvas>


  </div>);
}


