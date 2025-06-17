import React, { useEffect, useRef } from "react";
import { SpaceTrashTerminal } from "../lib/Terminal";

import { IComStatus } from "./UiState";
import {SpacetrashGameClass, SpaceTrashGameSingleton} from "../Game";
import { IState } from "./State";
import { IDockviewPanelProps } from "dockview";

export type ITerminalHooks = {
  changeBuffer: (value: string) => any,
  submitBuffer: () => any,
}

export type ITerminalLine = {
  in?: string,
  out: string,
  status: IComStatus
}

export type ITerminalState = {
  buffer: string;
  history: ITerminalLine[],
  loggedIn: boolean,
  mapOrVideo: 'map' | 'video'
};

export const TerminalApp = (

  props: IDockviewPanelProps<IState>

) => {

  console.log("TerminalApp", props.params.state.terminal.history)

  useEffect(() => {
    SpaceTrashGameSingleton.terminal.boot(props)
  }, []);

  // Scroll when children change
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;

    }
  }, [props.params.state.terminal.history]);

  return (<div

    style={{
      height: "100%",
      width: "100%",
      position: "relative",
    }}
  >

    <div >

      <pre
        ref={containerRef}
        id="terminal"
        style={{
          overflowX: "scroll",
          overflowY: "scroll",
          backgroundColor: "darkgreen",
          color: "lightgreen",
          position: "absolute",
          bottom: '1.5rem',
          top: 0,
          // height: "100%",
          width: "100%",
          margin: "0",
          // height: 'inherit',
        }}
      >

        {
          props.params.state.terminal.history.map((tl: ITerminalLine) => {

            if (tl.in) {
              return (`
> ${tl.in}
${tl.out}`)
            } else {
              return (`
${tl.out}`)
            }

          })
        }

      </pre>

    </div>

    <input
      type="text"
      name="terminal-input"
      // value={props.state.buffer}
      value={props.params.state.terminal.buffer}

      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "darkgreen",
        color: "lightgreen",
        width: "100%",
        // minHeight: "34rem",
        // minWidth: "34rem"
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          SpaceTrashGameSingleton.terminal.submitBuffer(props);

        }
      }}
      onChange={(e) => {
        SpaceTrashGameSingleton.terminal.setBuffer(props, e.target.value);
      }
      }
    />

  </div>);
}