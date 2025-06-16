import React, { useEffect, useRef, useState } from "react";

import { UIWindow } from "../../engine/UI/UIWindow";

import { DroneApp } from "./drone";
import { ShipMapApp } from "./shipmap";
import { ITerminalState, TerminalApp } from "./terminal";
import { ManualApp } from "./manual";
import { DronesApp } from "./drones";
// import { MainView } from "./MainView";
// import { MainView3d } from "./MainView2";
import SpacetrashGame from "../Game";
import { DroneAppV2 } from "./droneV2";
import { ShipMapAppV2 } from "./shipmapV2";

export type ISpaceTrashApps = 'terminal' | `shipmap` | `manual` | `drone` | 'drones' | 'shipmapV2' | 'droneV2'

export type IUiDekstop = {
  windows: Record<ISpaceTrashApps, IUiWindow>,
  stack: ISpaceTrashApps[];
};

export type IUiWindow = {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
};



export enum ESpaceTrashApps {
  terminal,
  manual,
  shipmap,
  drone,
  drones
};

export type IState = IUiDekstop & {
  terminal: ITerminalState,

};

const initialState: () => IState = () => {
  return {
    stack: [
      `terminal`,
      `droneV2`,
      `shipmap`,
      `manual`,
      `drone`,
      `drones`,

      `shipmapV2`,
    ],

    terminal: {
      mapOrVideo: 'map',
      loggedIn: false,
      buffer: "login",
      history: [
        {
          "in": "",
          out: `┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                        │
│ ███████╗██████╗  █████╗  ██████╗███████╗████████╗██████╗  █████╗ ███████╗██╗  ██╗    ██╗   ██╗ █████╗  │
│ ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║  ██║    ██║   ██║██╔══██╗ │
│ ███████╗██████╔╝███████║██║     █████╗     ██║   ██████╔╝███████║███████╗███████║    ██║   ██║╚█████╔╝ │
│ ╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝     ██║   ██╔══██╗██╔══██║╚════██║██╔══██║    ╚██╗ ██╔╝██╔══██╗ │
│ ███████║██║     ██║  ██║╚██████╗███████╗   ██║   ██║  ██║██║  ██║███████║██║  ██║     ╚████╔╝ ╚█████╔╝ │
│ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝      ╚═══╝   ╚════╝  │
│                                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
          `,
          status: "niether"
        }
      ],
    },
    windows: {
      terminal: {
        top: 0,
        left: 0,
        width: 900,
        height: 600,
        visible: true,
      },
      shipmap: {
        top: 200,
        left: 50,
        width: 900,
        height: 500,
        visible: false,
      },

      manual: {
        top: 90,
        left: 90,
        width: 129,
        height: 165,
        visible: false,
      },
      drone: {
        top: 360,
        left: 50,
        width: 280,
        height: 250,
        visible: false,
      },
      drones: {
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        visible: false,
      },

      droneV2: {
        top: 300,
        left: 0,
        width: 280,
        height: 250,
        visible: false,
      },

      shipmapV2: {
        top: 0,
        left: 1000,
        width: 500,
        height: 500,
        visible: false,
      },
    }

  }
};

SpacetrashGame.start()

export const SpaceTrashDesktop = () => {
  const [desktopState, setDesktopState] = useState<IState>(initialState());
  const stateRef = useRef<IState>();
  stateRef.current = desktopState;

  useEffect(() => {
    return SpacetrashGame.updateFromUI(desktopState)
  }, [desktopState])

  const pushToTop = (w: ISpaceTrashApps) => {
    setDesktopState({
      ...desktopState,
      stack: [
        ...desktopState.stack.filter((x) => x !== w),
        w
      ]
    })
  }
  document.addEventListener('keydown', function (event) {
    if(event.code === 'Escape'){
      pushToTop('shipmapV2')
    } else if (event.code === 'Backquote') {
      pushToTop('terminal')
    }else if(event.code === 'ArrowUp'){
      
    }else if(event.code === 'ArrowDown'){
      
    }else if(event.code === 'ArrowLeft'){
      
    }else if(event.code === 'ArrowRight'){
      
    }else if(event.code === '0'){
      
    }else if(event.code === 'Digit1'){
      pushToTop('drone')
    }else if(event.code === '2'){
      
    }else if(event.code === '3'){
      
    }else if(event.code === '4'){
      
    }else if(event.code === '5'){
      
    }else if(event.code === '6'){
      
    }else if(event.code === '7'){
      
    }else if(event.code === '8'){
      
    }else if(event.code === '9'){
      
    } else {
      console.error("no handler for", event)
    }
    // if (event.key === 'ArrowUp' ||
    //   event.key === 'ArrowDown' ||
    //   event.key === 'ArrowLeft' ||
    //   event.key === 'ArrowRight' ||
    //   event.key === '1' ||
    //   event.key === '2' ||
    //   event.key === '3' ||
    //   event.key === '4' ||
    //   event.key === '5' ||
    //   event.key === '6' ||
    //   event.key === '7' ||
    //   event.key === '8' ||
    //   event.key === '9'
    // ) {
    //   // props.worker.postMessage(["inputEvent", event.key, "drone"])
    // }

    //   props.worker.postMessage(["inputEvent", "UP", "drone"]);
    // } else if (event.key === 'ArrowDown') {
    //   props.worker.postMessage(["inputEvent", "DOWN", "drone"]);
    // } else if (event.key === 'ArrowLeft') {
    //   props.worker.postMessage(["inputEvent", "LEFT", "drone"]);
    // } else if (event.key === 'ArrowRight') {
    //   props.worker.postMessage(["inputEvent", "RIGHT", "drone"]);
    // }
  });

  return (

    <div>

      <div
      >

        {/* {
          desktopState.terminal.mapOrVideo === 'map' && <MainView />
        } */}

        {/* {
          desktopState.terminal.mapOrVideo === 'video' && <MainView3d />
        } */}

        {/* {
          !desktopState.terminal.loggedIn && <p>you need to login</p>
        }

        {
          desktopState.terminal.loggedIn && desktopState.terminal.mapOrVideo === 'map' && <MainView />
        }

        {
          desktopState.terminal.loggedIn && desktopState.terminal.mapOrVideo === 'video' && <MainView3d />
        } */}





        {
          desktopState.windows.terminal && <UIWindow
            key={'terminal'}
            app={'terminal'}
            uiwindow={desktopState.windows['terminal']}
            layer={desktopState.stack.findIndex((s) => s === 'terminal')}
            desktopState={desktopState}

            onResize={
              (a: { x: number, y: number, width: number, height: number }) => {
                if (!stateRef.current) {
                  return;
                }
                const left = a.x;
                const top = a.y;
                const width = a.width;
                const height = a.height;

                const newState: IState = {
                  ...stateRef.current,
                  windows:  {
                    ...stateRef.current.windows,
                    terminal: {
                      left,
                      top,
                      width,
                      height,
                      visible: true
                    }
                  }
                  
                };

                setDesktopState(newState)
              }
            }

            pushToTop={() => {

              if (!stateRef.current) {
                return;
              }

              const newState: IState = {
                ...stateRef.current,
                terminal: stateRef.current.terminal,
                windows: stateRef.current?.windows,
                stack: [
                  ...(stateRef.current || { stack: [] }).stack.filter((x) => x !== 'terminal'),
                  'terminal'
                ]
              };

              setDesktopState(newState)
            }} >

            <TerminalApp

              state={desktopState}
              stateSetter={setDesktopState}

            />

          </UIWindow>
        }

        {/* {
          stateRef.current.windows['shipmap'] && stateRef.current.windows['shipmap'].visible && <UIWindow
            key={'shipmap'}
            app={'shipmap'}
            uiwindow={stateRef.current.windows['shipmap']}
            layer={stateRef.current.stack.findIndex((s) => s === 'shipmap')}
            desktopState={stateRef.current}
            pushToTop={() => {
              setDesktopState({
                ...stateRef.current,
                stack: [
                  ...((stateRef.current || { stack: [] }).stack.filter((x) => x !== 'shipmap')),
                  'shipmap'
                ]
              } as IState)
            }} >

            <ShipMapApp
              spaceTrashGame={spaceTrashGame}
            />
          </UIWindow>

        } */}

        {/* {
          stateRef.current.windows['manual'] && stateRef.current.windows['manual'].visible && <UIWindow
            key={'manual'}
            app={'manual'}
            uiwindow={stateRef.current.windows['manual']}
            layer={stateRef.current.stack.findIndex((s) => s === 'manual')}
            desktopState={stateRef.current}
            pushToTop={() => {

              setDesktopState({
                ...desktopState,
                stack: [
                  ...desktopState.stack.filter((x) => x !== 'manual'),
                  'manual'
                ]
              })
            }} >

            <ManualApp

            />

          </UIWindow>

        } */}

        {
          stateRef.current.windows['drone'] && stateRef.current.windows['drone'].visible && <UIWindow
            key={'drone'}
            app={'drone'}
            uiwindow={stateRef.current.windows['drone']}
            layer={stateRef.current.stack.findIndex((s) => s === 'drone')}
            desktopState={stateRef.current}
            pushToTop={() => {

              setDesktopState({
                ...desktopState,
                stack: [
                  ...desktopState.stack.filter((x) => x !== 'drone'),
                  'drone'
                ]
              })
            }} >

            <DroneApp


            />

          </UIWindow>

        }

        {/* {
          stateRef.current.windows.droneV2 && stateRef.current.windows.droneV2.visible && <UIWindow
            key={'droneV2'}
            app={'droneV2'}
            uiwindow={stateRef.current.windows.droneV2}
            layer={stateRef.current.stack.findIndex((s) => s === 'droneV2')}
            desktopState={stateRef.current}
            pushToTop={() => {

              setDesktopState({
                ...desktopState,
                stack: [
                  ...desktopState.stack.filter((x) => x !== 'droneV2'),
                  'droneV2'
                ]
              })
            }} >

            <DroneAppV2
              spaceTrashGame={spaceTrashGame}

            />

          </UIWindow>

        } */}

        {
          stateRef.current.windows.shipmapV2 && stateRef.current.windows.shipmapV2.visible && <UIWindow
            key={'shipmapV2'}
            app={'shipmapV2'}
            uiwindow={stateRef.current.windows.droneV2}
            layer={stateRef.current.stack.findIndex((s) => s === 'shipmapV2')}
            desktopState={stateRef.current}
            pushToTop={() => {

              setDesktopState({
                ...desktopState,
                stack: [
                  ...desktopState.stack.filter((x) => x !== 'shipmapV2'),
                  'shipmapV2'
                ]
              })
            }}
          
            onResize={
              (a: { x: number, y: number, width: number, height: number }) => {
                if (!stateRef.current) {
                  return;
                }
                const left = a.x;
                const top = a.y;
                const width = a.width;
                const height = a.height;

                const newState: IState = {
                  ...stateRef.current,
                  windows:  {
                    ...stateRef.current.windows,
                    shipmapV2: {
                      left,
                      top,
                      width,
                      height,
                      visible: true
                    }
                  }
                  
                };

                setDesktopState(newState)
              }
            }

          >

            <ShipMapAppV2


            />

          </UIWindow>

        }

        {
          stateRef.current.windows['drones'] && stateRef.current.windows['drones'].visible && <UIWindow
            key={'drones'}
            app={'drones'}
            uiwindow={stateRef.current.windows['drones']}
            layer={stateRef.current.stack.findIndex((s) => s === 'drones')}
            desktopState={stateRef.current}
            pushToTop={() => {

              setDesktopState({
                ...desktopState,
                stack: [
                  ...desktopState.stack.filter((x) => x !== 'drones'),
                  'drones'
                ]
              })
            }} >

            <DronesApp

            />

          </UIWindow>

        }


      </div>
    </div>
  );
}
