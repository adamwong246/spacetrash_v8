import React, { useEffect, useRef } from "react";

import { ITerminalLine } from "../Terminal";

export const TerminalWindow = (

  props: {
    uiState: {
      history: ITerminalLine[];
      buffer: string;
      submitBuffer: any;
      setBuffer: any;
    }
  },

) => {

  // Scroll when children change
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      console.log("autoscroll")
      containerRef.current.scrollTop = containerRef.current.scrollHeight;

    }
  }, [props.uiState]);

  const inputRef = useRef(null);

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
        props.uiState.history.map((tl: ITerminalLine) => {

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
      value={props.uiState.buffer}
      autoFocus={true}
      ref={inputRef}

      style={{
        fontFamily: "monospace",
        position: "absolute",
        bottom: 0,
        backgroundColor: "black",
        color: "lightgreen",
        width: "100%",
      }}
      onKeyDown={async (e) => {
        if (e.key === 'Enter') {
          props.uiState.submitBuffer(props);

        }
      }}
      onChange={(e) => {
        props.uiState.setBuffer(props, e.target.value);
      }
      }
    />

  </div>);
}