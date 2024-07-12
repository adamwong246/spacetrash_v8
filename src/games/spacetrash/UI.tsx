import React, { useState } from "react";
import { Desktop } from "../../engine/UI/index";
import { Terminal } from "../../Terminal";
// import { Desktop } from "../../engine/UI";

export const SpaceTrashDesktop = Desktop({

  'terminal': {
    top: 100,
    left: 200,
    width: 800,
    height: 200,
    visible: true,
    app: {},
  },
  'manual': {
    top: 100,
    left: 200,
    width: 700,
    height: 200,
    visible: true,
    app: {},
  }
})

export const TerminalApp = (props) => {

  const [state, setState] = useState < { buffer: string, history: any }>({
    buffer: "",
    history: []
  });

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
    >{`

    ┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │                                                                                                        │
    │ ███████╗██████╗  █████╗  ██████╗███████╗████████╗██████╗  █████╗ ███████╗██╗  ██╗    ██╗   ██╗ █████╗  │
    │ ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║  ██║    ██║   ██║██╔══██╗ │
    │ ███████╗██████╔╝███████║██║     █████╗     ██║   ██████╔╝███████║███████╗███████║    ██║   ██║╚█████╔╝ │
    │ ╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝     ██║   ██╔══██╗██╔══██║╚════██║██╔══██║    ╚██╗ ██╔╝██╔══██╗ │
    │ ███████║██║     ██║  ██║╚██████╗███████╗   ██║   ██║  ██║██║  ██║███████║██║  ██║     ╚████╔╝ ╚█████╔╝ │
    │ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝      ╚═══╝   ╚════╝  │
    │                                                                                                        │
    └────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    
    You are now logged in as "wintermute". 
    
    `}
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

          const com = Terminal.processCommand(state.buffer)
          
          console.log('do validate', com);
          setState({
            ...state,
            buffer: '',
            history: [
              ...state.history,
              {
                in: state.buffer,
                ...com
              }
            ]
            // terminalhistory: [
            //   ...state.terminalhistory,
            //   {
            //     in: state.buffer,
            //     ...com
            //   }
            // ],
          })
        }
      }}
      onChange={(e) => {
        setState({ ...state, buffer: e.target.value })
      }}
    />


  </div>);
}
{/* <pre
    id="terminal"
    style={{
      overflowX: "scroll",
      backgroundColor: "black",
      color: "green"
    }}
  >{`

    ┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
    │                                                                                                        │
    │ ███████╗██████╗  █████╗  ██████╗███████╗████████╗██████╗  █████╗ ███████╗██╗  ██╗    ██╗   ██╗ █████╗  │
    │ ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║  ██║    ██║   ██║██╔══██╗ │
    │ ███████╗██████╔╝███████║██║     █████╗     ██║   ██████╔╝███████║███████╗███████║    ██║   ██║╚█████╔╝ │
    │ ╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝     ██║   ██╔══██╗██╔══██║╚════██║██╔══██║    ╚██╗ ██╔╝██╔══██╗ │
    │ ███████║██║     ██║  ██║╚██████╗███████╗   ██║   ██║  ██║██║  ██║███████║██║  ██║     ╚████╔╝ ╚█████╔╝ │
    │ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝      ╚═══╝   ╚════╝  │
    │                                                                                                        │
    └────────────────────────────────────────────────────────────────────────────────────────────────────────┘
    
    You are now logged in as "wintermute". 
    
    `}
      </pre>)
} */}