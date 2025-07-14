import React, { useEffect, useRef } from "react";

import { rad2deg } from "detect-collisions";
import { SpaceTrash } from "../Game/9-WithTiled";

export type IBotWindowState = {
  rads: number;
  heat: number;
  sound: number;
  x: number;
  y: number;
  r: number;
};

export const initialState = {
  rads: 0,
  heat: 0,
  sound: 0,
  x: 0,
  y: 0,
  r: 0,
};

export const BotWindow = (props: { game: SpaceTrash }) => {
  const [state, stateSetter] = React.useState<IBotWindowState>(initialState);

  const canvasRef = useRef(null);
  const parentRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && parentRef.current) {
      props.game.registerCanvas(
        "bot",
        false,
        canvasRef.current,
        () => {},
        "threejs",
        parentRef.current
      );
      props.game.registerBotHook(stateSetter, state);
    }
  }, [canvasRef, parentRef]);

  return (
    <div
      ref={parentRef}
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        color: "white",
      }}
    >
      <table>
        <tbody>
          <tr>
            <td>rads: {state.rads}</td>
            <td>heat: {state.heat}</td>
            <td>sound: {state.sound}</td>
          </tr>
          <tr>
            <td>x: {state.x.toFixed(1)}</td>
            <td>y: {state.y.toFixed(1)}</td>
            <td>r: {rad2deg(state.r).toFixed(1)}</td>
          </tr>
        </tbody>
      </table>

      <canvas tabIndex={1} ref={canvasRef}></canvas>

      {/* <svg>
  <filter id="pixelate" x="0" y="0">
    <feFlood x="2" y="2" height="1" width="1"/>
    <feComposite width="10" height="10"/>
    <feTile result="a"/>
    <feComposite in="SourceGraphic" in2="a" operator="in"/>
    <feMorphology operator="dilate" radius="1"/>
  </filter>
      </svg> */}
      
    </div>
  );
};
