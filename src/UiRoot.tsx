import React, { useState } from "react";

import { IUiState, SetUiState } from './UiState';
import { Footer, Header, Main } from "./views";

export default function ReactRoot(props: {
  uiState: IUiState,
  setuiState: SetUiState,
  // canvasRef: any,
  ecs: any,
  // offscreen: any;
}) {

  return (
    <div
      id="app"
      className="crt"
    >
      <Header uiState={props.uiState} setuiState={props.setuiState} />
      <Main
        uiState={props.uiState}
        setuiState={props.setuiState}
        // canvasRef={props.canvasRef}
        ecs={props.ecs}
        // offscreen={props.offscreen}
      />
      <Footer uiState={props.uiState} setuiState={props.setuiState} />
    </div>
  );
}
