import React, { useRef, useEffect } from "react";

import { IUiState, SetUiState } from './UiState';
import { UICanvas } from "./engine/UI/UICanvas";
import { UIWindow } from "./engine/UI/UIWindow";
// import { UICanvas, UIWindow } from "./engine/UI";

const Term = (props: { uiState: IUiState, setuiState: SetUiState }) => {
  // const termHistory = props.uiState.terminalhistory.slice(0,-1)
  return <pre id="terminal">{`

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
      props.uiState.terminalhistory.map((props2: { in, out }) => {
        return (`
> ${props2.in}
${props2.out}
          `)
      })
    }
  </pre>
};

const ShipMap = (props: {
  uiState: IUiState,
  setuiState: SetUiState,
  worker: Worker;
}) => {

  return (<UICanvas worker={props.worker} message={"2nd-canvas"}></UICanvas>);
//   const canvasRef = useRef(null)
  
//   useEffect(() => {
//     if (canvasRef.current) {
//       const offscreen = (canvasRef.current as HTMLCanvasElement).transferControlToOffscreen()
//       props.worker.postMessage(["2nd-canvas", offscreen], [offscreen]);  
//     }
//   }, [canvasRef]);

//   return <div style={{
//     position: "absolute",
//     top: 10,
//     left: 10,
//     right: 20, 
//     bottom: 30
//   }}>
//     <canvas
//       ref={canvasRef}
//       id="shipmap" width="800" height="600"></canvas>
//     </div>
};

const Manual = (props: {
  uiState: IUiState,
  setuiState: SetUiState,
  worker: Worker;
  setDesktop: (x) => void;
}) => {
  return (<UIWindow
    windowkey="manual"
    worker={props.worker}
    children={<p>the Manual goes here</p>}
    setDesktop={props.setDesktop}
  ></UIWindow>);
};

const Drone = (props: { drone: number, uiState: IUiState, setuiState: SetUiState }) => {
  const droneName = props.uiState.drones[props.drone].name
  return <div>
    <p>{`Drone #${props.drone} aka "${droneName}"`}</p>

    <ul>
      <li>Battery</li>
      <li>Chasis</li>
      <li>
        Upgrades
        <ol>
          <li>Camera</li>
          <li>Light</li>
          <li>Interface</li>
        </ol>
      </li>

    </ul>
  </div>
};

const Self = (props: { uiState: IUiState, setuiState: SetUiState }) => {
  return <pre id="self">{`
SELF GOES HERE

    `}
  </pre>
};

const Notifications = (props: { uiState: IUiState, setuiState: SetUiState }) => {
  return <ol>
    <li>hello world</li>
    <li>hello world</li>
    <li>hello world</li>
  </ol>;
};

const Debug = (props: {
  uiState: IUiState,
  setuiState: SetUiState,
  // canvasRef: any
  worker: Worker;
  // offscreen: any;
}) => {
  return <p>debug</p>
  // props.ecs.postMessage(["canvas", props.offscreen], [props.offscreen]);

  // return <canvas ref={props.canvasRef} /> 
  // if (props.canvasRef.current !== null) {
  //   console.log("mark3")
  //   const offscreen = (props.canvasRef.current as HTMLCanvasElement).transferControlToOffscreen()
  //   ecs.postMessage(["canvas", offscreen], [offscreen]);
  //   return <canvas ref={props.canvasRef} /> 
    
  // } else {
  //   console.log("mark2")
  //   return <canvas ref={props.canvasRef} /> 
  // }
   
  
};

export const Header = (props: { uiState: IUiState, setuiState: SetUiState }) => {
  return (
    <header>
      <p>term - map - 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8 - 9 - 0 - man - dev</p>
    </header>
  );
};

export const Footer = (props: { uiState: IUiState, setuiState: SetUiState }) => {
  const lastLog = (props.uiState.terminalhistory[props.uiState.terminalhistory.length - 1] || {out: ""}).out
  return <footer>
    {/* <pre>{ props.uiState.lastCommandStatus }</pre> */}
    <input
      type="text"
      name="terminal-input"
      placeholder={lastLog}
      value={props.uiState.terminalBuffer}
      // autoFocus={true}
      onBlur={({ target }) => target.focus()}
      onChange={(e) => {
        const lastChar = e.target.value[e.target.value.length - 1];
        console.log(e.target.value[-1])
        if (
          lastChar !== '~' &&
          lastChar !== '!' &&
          lastChar !== '`' &&
          lastChar !== '?' &&
          lastChar !== '+' &&
          e.target.value !== '0' &&
          e.target.value !== '1' &&
          e.target.value !== '2'
        ) {
          props.setuiState({ ...props.uiState, terminalBuffer: e.target.value })
        }
      }} />
  </footer>;
};

const AppBody = (props: {
  uiState: IUiState,
  setuiState: SetUiState,
  worker: Worker
  setDesktop: (x) => void;
}) => {
  if (props.uiState.mode === "debug") {
    return <Debug
      uiState={props.uiState}
      setuiState={props.setuiState}
      worker={props.worker}
    />
  }
  if (props.uiState.mode === "terminal") {
    return <Term uiState={props.uiState} setuiState={props.setuiState} />
  }
  if (props.uiState.mode === "map") {
    return <ShipMap
      worker={props.worker}
      uiState={props.uiState}
      setuiState={props.setuiState}
    />
  }
  if (props.uiState.mode === "notifications") {
    return <Notifications uiState={props.uiState} setuiState={props.setuiState} />
  }
  if (props.uiState.mode === "manual") {
    return <Manual
      worker={props.worker}
      uiState={props.uiState}
      setuiState={props.setuiState}
      setDesktop={props.setDesktop}
    />
  }
  if (props.uiState.mode === "self") {
    return <Self uiState={props.uiState} setuiState={props.setuiState} />
  }
  if (props.uiState.mode === "d1") {
    return <Drone drone={0} uiState={props.uiState} setuiState={props.setuiState} />
  }
  return <p>idk</p>

};

export const Main = (props: {
  uiState: IUiState,
  setuiState: SetUiState,
  setDesktop: (x) => void;
  worker: Worker
}) => {
  return (<div id="app-body">
    <AppBody
      uiState={props.uiState}
      setuiState={props.setuiState}
      worker={props.worker}
      setDesktop={props.setDesktop}
    />
  </div>)
};
