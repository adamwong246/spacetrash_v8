import React, { useEffect } from "react";

export type ITerminalHooks = {
  changeBuffer: (value: string) => any,
  submitBuffer: () => any,
}

export type ITerminalState = {
  buffer: string;
  history: { in: string, out: string, timeStamp: number }[],
};

export const TerminalApp = (props: {
  worker: Worker,
  state: ITerminalState,
  hooks: ITerminalHooks
}) => {

  useEffect(() => {
    props.worker.postMessage(["terminal-register"], []);
  }, []);

  return (<div

    style={{
      height: "100%",
      width: "100%",
      position: "relative",
    }}
  >

    <pre
      id="terminal"
      style={{
        overflowX: "scroll",
        overflowY: "scroll",
        backgroundColor: "darkgreen",
        color: "lightgreen",
        position: "absolute",
        height: "100%",
        width: "100%",
        margin: "0",
      }}
    >
      {
        props.state.history.map((props2: { in, out }) => {
          return (`
> ${props2.in}
${props2.out}
          `)
        })
      }

    </pre>

    <input
      type="text"
      name="terminal-input"
      value={props.state.buffer}

      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "darkgreen",
        color: "lightgreen",
        width: "100%",
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          props.hooks.submitBuffer();
        }
      }}
      onChange={(e) => {
        props.hooks.changeBuffer(e.target.value);
      }}
    />
  </div>);
}