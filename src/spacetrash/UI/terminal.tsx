import React, { useEffect, useRef, useState } from "react";

import { ITerminalLine } from "../Game/2-Terminal";
import { SpaceTrash } from "../Game";

export type ITermWindowState = {
  history: ITerminalLine[];
  buffer: string;
  submitBuffer: () => void;
  setBuffer: (s: string) => void;
}
export const TerminalWindow = (
props: {game: SpaceTrash},
) => {

  const [state, updateState] = useState<ITermWindowState>(props.game.initalTerminalState());

  useEffect(() => {
    props.game.registerTerminal(updateState)
  }, []);

  // Scroll when history is added
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;

    }
  }, [state]);

  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) {
      props.game.registerTerminalBuffer(inputRef)
    }
  }, [inputRef]);

  if (!state) return <pre>loading...</pre>

  return (<div
    id={"terminal-window"}
    style={{
      backgroundColor: "darkgreen",
      height: "100%",
      width: "100%",
      position: "relative",
      overflowY: "scroll",
    }}
  >



    <pre
      ref={containerRef}
      id="terminal"
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
      style={{
        overflowY: "scroll",
        backgroundColor: "darkgreen",
        color: "lightgreen",
        position: "absolute",
        bottom: '1.5rem',
        textWrap: 'auto',
        top: 0,
        // height: "100%",
        width: "100%",
        margin: "0",
        // height: 'inherit',

      }}
    >

      {
        state.history.map((tl: ITerminalLine) => {

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



    <input
      id="terminal-input"
      spellCheck="false"
      type="text"
      name="terminal-input"
      value={state.buffer}
      autoFocus={true}
      ref={inputRef}

      style={{
        fontFamily: "monospace",
        position: "absolute",
        bottom: 0,
        backgroundColor: "black",
        color: "lightgreen",
        width: "100%",
        border: "none",
      }}
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          props.game.submitBuffer();

        }
      }}
      onChange={(e) => {
        props.game.setBuffer(e.target.value);
      }
      }
    />

  </div>);
}