import React, { useEffect } from "react";
import { useState } from "react";
// import { Terminal } from "../../../Terminal";
import { createConnection } from "net";
import ReactDOM from "react-dom";

export const TerminalApp = (props: {worker: Worker}) => {

  
  
  const [state, setState] = useState<{
    buffer: string,
    history: {in: string, out: string, timeStamp: number}[],
    timestamp: any,
  }>({
    buffer: "",
    history: [],
    timestamp: 0
  });


  useEffect(() => {
    props.worker.postMessage(["terminal-register"], []);
    
  }, []);
  
  props.worker.onmessage = (e) => {
    // debugger
    if (e.data[0] === 'terminal-update' ) {

      console.log("Message received from worker", e);

      ReactDOM.flushSync(() => {
        setState({
          ...state,
          history: [
            ...state.history,
            {
              in: e.data[1].in,
              out: e.data[1].out,
              timeStamp: e.timeStamp
            }
          ].sort((e) => e.timeStamp)
        })  
      });

      
    }
    
    // result.textContent = e.data;
    // 
  };

  return (<div
  
    style={{
      
      height: "100%",
      width: "100%",
      position: "relative",

    

      // display: "flex",
      // flexDirection: "column-reverse",
      // overflow: "auto",
    }}
  >

    <pre
      id="terminal"
      style={{
        // margin: "",
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
        state.history.map((props2: { in, out }) => {
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
      value={state.buffer}

      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "darkgreen",
        color: "lightgreen",
        width: "100%",
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {

          if (state.buffer !== "") {
            console.log("mark2")
          
          props.worker.postMessage(["terminal-in", state.buffer]);
          
          // console.log('do validate', com);
          setState({
            ...state,
            buffer: '',
            // history: [
            //   ...state.history,
            //   {
            //     in: state.buffer,
            //     // ...com
            //   }
            // ]
            // terminalhistory: [
            //   ...state.terminalhistory,
            //   {
            //     in: state.buffer,
            //     ...com
            //   }
            // ],
          })  
          }
          
        }
      }}
      onChange={(e) => {
        setState({ ...state, buffer: e.target.value })
      }}
    />


  </div>);
}