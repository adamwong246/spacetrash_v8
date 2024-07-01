import * as React from 'react'
import { useEffect, useState } from 'react';

import UiRoot from './UiRoot';
import { IUiState, SetUiState, initialUiState } from './UiState';
import { Terminal } from './Terminal';

const ecs = new Worker("./ecs-worker.js");


// const useCanvas = (callback) => {
//   const canvasRef = React.useRef<HTMLCanvasElement>(null)

//   let offscreen;

//   React.useEffect(() => {
//     const canvas = canvasRef.current as HTMLCanvasElement;

//     offscreen = canvas.transferControlToOffscreen()
//     console.log("offscreen", offscreen)
//     // canvas.transfer
//     // ecs.postMessage(["canvas", offscreen], [offscreen]);
//     // callback([canvas, ctx]);
//   }, []);

//   return [canvasRef, offscreen];
// }


export default function ReactRoot(
  props: {
    // canvas: HTMLCanvasElement
  }) {
  const [uiState, setuiState]: [IUiState, SetUiState] = useState<IUiState>(initialUiState);
  // const [canvasRef, offscreen] = useCanvas(([canvas, ctx]) => {
  //   // ctx.fillRect(0, 0, canvas.width, canvas.height);
  //   // const x = canvas.width;
  //   // const y = canvas.height;
  //   // setPosition({ x, y });
  // });
  // const c0 = (props.canvas as HTMLCanvasElement).transferControlToOffscreen()
  // console.log("canvas", props.canvas);
  // ecs.postMessage(["canvas", props.canvas]);

  // ecs.onmessage = e => {
  //   console.log("hello ecs message", e);
  // };

  useEffect(() => {
    const handleEsc = async (event) => {
      console.log(event.key)
      if (event.key === 'Escape') {
        setuiState({ ...uiState, terminalBuffer: "" })
      } else if (event.key === '1' && uiState.terminalBuffer === "") {
        setuiState({ ...uiState, mode: `d1` })
      } else if (event.key === '0' && uiState.terminalBuffer === "") {
        setuiState({ ...uiState, mode: `self` })
      } else if (event.key === '?') {
        setuiState({ ...uiState, mode: `manual` })
      } else if (event.key === '!') {
        setuiState({ ...uiState, mode: `notifications` })
      } else if (event.key === '+') {
        setuiState({ ...uiState, mode: `debug` })
      } else if (event.key === '`') {
        if (uiState.mode === `terminal`) {
          setuiState({ ...uiState, mode: `map` })
        } else {
          setuiState({ ...uiState, mode: `terminal` })
        }
      } else if (event.key === '~') {
        // setuiState({ ...uiState, mode: `map` })
        if (uiState.mode === `map`) {
          setuiState({ ...uiState, mode: `terminal` })
        } else {
          setuiState({ ...uiState, mode: `map` })
        }
      } else if (event.key === 'Enter') {
        // props.worker.postMessage(["terminal-submit", uiState.terminalBuffer]);
        // debugger;
        const com = Terminal.processCommand(uiState.terminalBuffer);

        setuiState({
          ...uiState,
          mode: com.status === "niether" ? "terminal" : uiState.mode,
          lastCommandStatus: com.status === "fail" ? com.out : null,
          terminalBuffer: "",
          terminalhistory: [
            ...uiState.terminalhistory,
            {
              in: uiState.terminalBuffer,
              ...com
            }
          ]
        })
      } else {
        if (event.key === "Backspace") {
          // setuiState({
          //   ...uiState,
          //   terminalBuffer: uiState.terminalBuffer.slice(0, -1),
          // })  
        } else {
          // setuiState({
          //   ...uiState,
          //   terminalBuffer: uiState.terminalBuffer + event.key,
          // })  
        }

      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [uiState]);

  return (
    <>
      <div id="control">
        <pre>{JSON.stringify(uiState.mode, null, 2)}</pre>
      </div>
      <UiRoot
        uiState={uiState}
        setuiState={setuiState}
        // canvasRef={canvasRef}
        ecs={ecs}
        // offscreen={offscreen}
      />
    </>
  );
}