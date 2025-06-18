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
      containerRef.current.scrollTop = containerRef.current.scrollHeight;

    }
  }, [props.uiState]);



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

    </div>

    <input
      type="text"
      name="terminal-input"
      value={props.uiState.buffer}

      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "darkgreen",
        color: "lightgreen",
        width: "100%",
      }}
      onKeyDown={(e) => {
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