import * as React from 'react'
import { useEffect, useState } from 'react';

import UiRoot from './UiRoot';
import { IUiState, SetUiState, initialUiState } from './UiState';
import { Terminal } from './Terminal';

export default function ReactRoot(props: {}) {
  const [uiState, setuiState]: [IUiState, SetUiState] = useState<IUiState>(initialUiState);

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
          lastCommandStatus: com.status=== "fail" ? com.out : null,
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

    // let frameId;
    // const frame = async (time) => {
    //   const delta = time - uiState.time;
    //   let turn = uiState.turn;
    //   frameId = requestAnimationFrame(frame);
    //   const tpf = Math.round(uiState.delta / uiState.frame);
    //   // const framesPerTurn = Math.round(frameId / uiState.turn);


    //   if (tpf > 1) {
    //     console.log("tpf", tpf)
    //     engine.lock();
    //     Promise.all(Array.from(Array(tpf).keys()).map(function (t) {
    //       let actor = scheduler.next();
    //       if (actor) {
    //         scheduler.setDuration(1)
    //         return actor.act();
    //       }

    //     })).then((v) => {
    //       engine.unlock();
    //       setuiState({
    //         ...uiState,
    //         delta,
    //         time,
    //         frame: frameId,
    //         turn: uiState.turn + tpf
    //       });
    //     })

    //   } else {
    //     setuiState({
    //       ...uiState,
    //       delta,
    //       time,
    //       frame: frameId,
    //       turn,
    //     });
    //   }



    // };
    // requestAnimationFrame(frame);

    return () => {
      window.removeEventListener('keydown', handleEsc);
      // cancelAnimationFrame(frameId);
    };
  }, [uiState]);

  return (
    <>
      {/* <div id="control">
        <pre>{JSON.stringify(uiState, null, 2)}</pre>
      </div> */}

      <UiRoot uiState={uiState} setuiState={setuiState} />
    </>
  );
}