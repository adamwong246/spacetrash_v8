import React, { useState } from "react";

import { IUiState, SetUiState } from './UiState';
import { Footer, Header, Main } from "./views";

export default function UiRoot(props: {
  uiState: IUiState,
  setuiState: SetUiState,
  // canvasRef: any,
  worker: Worker,
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
        worker={props.worker}
        // offscreen={props.offscreen}
      />
      <Footer uiState={props.uiState} setuiState={props.setuiState} />
    </div>
  );
}
