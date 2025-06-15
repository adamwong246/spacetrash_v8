import React, { useEffect, useRef } from "react";
import { SpaceTrashTerminal } from "../lib/Terminal";
import { IState } from ".";
import { IComStatus } from "./UiState";

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

export const TerminalApp = (props: {
  terminal: SpaceTrashTerminal,
  state: IState,
  stateSetter: React.Dispatch<React.SetStateAction<IState>>,
}) => {

  useEffect(() => {
    // props.worker.postMessage(["terminal-register"], []);
    props.terminal.boot(props.state, props.stateSetter)
  }, []);

  // Scroll when children change
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [props.terminal.history(props.state)]); 
  
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
          props.terminal.history(props.state).map((tl: ITerminalLine) => {

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
      value={props.terminal.getBuffer(props.state)}

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
          props.terminal.submitBuffer(props.state, props.stateSetter);
          
        }
      }}
      onChange={(e) => {
        props.terminal.setBuffer(props.state, props.stateSetter, e.target.value,);
      }}
    />
    
  </div>);
}