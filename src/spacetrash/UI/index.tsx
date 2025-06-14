import React, { useRef, useState } from "react";
import { flushSync } from 'react-dom';

import { UIWindow } from "../../engine/UI/UIWindow";
import { IUiDekstop } from "../../engine/UI/WM";

import { DroneApp } from "./drone";
import { ShipMapApp } from "./shipmap";
import { ITerminalHooks, ITerminalState, TerminalApp } from "./terminal";
import { ManualApp } from "./manual";
import { DronesApp } from "./drones";

export type ISpaceTrashApps = 'terminal' | `shipmap` | `manual` | `drone` | 'drones';

export enum ESpaceTrashApps {
  terminal,
  manual,
  shipmap,
  drone,
  drones
};

type IState = IUiDekstop & {
  terminal: ITerminalState
};

const initialState: () => IState = () => {
  return {
    stack: [
      `terminal`,
      `shipmap`,
      `manual`,
      `drone`,
      `drones`,
    ],

    terminal: {
      buffer: "login",
      history: [{ "in": "idk", out: "asdasd", timeStamp: 0 }],
    },
    windows: {
      terminal: {
        top: 90,
        left: 290,
        width: 900,
        height: 600,
        visible: true,
      },
      shipmap: {
        top: 60,
        left: 500,
        width: 800,
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
        width: 0,
        height: 0,
        visible: false,
      },
    }

  }
};


export const SpaceTrashDesktop = (props: { worker: Worker }) => {

  const [desktopState, setDesktopState] = useState<IState>(initialState());

  const stateRef = useRef<IState>();
  stateRef.current = desktopState;

  props.worker.onmessage = (e) => {
    if (!stateRef.current) {
      return;
    }

    // console.log("Message received from worker", e);

    if (e.data[0] === 'terminal-update') {

      flushSync(() => {
        setDesktopState({
          ...desktopState,

          terminal: {
            ...desktopState.terminal,

            history: [
              ...desktopState.terminal.history,
              {
                in: e.data[1].in,
                out: e.data[1].out,
                timeStamp: e.timeStamp
              }
            ].sort((e) => e.timeStamp)
          }
        });
      });





    }

    if (e.data[0] === 'login') {
      flushSync(() => {
        setDesktopState({
          ...desktopState,

          windows: {
            ...desktopState.windows,
            shipmap: {
              ...desktopState.windows.shipmap,
              "visible": true
            },
            manual: {
              ...desktopState.windows.manual,
              "visible": true
            },
            drone: {
              ...desktopState.windows.drone,
              "visible": true
            },
            drones: {
              ...desktopState.windows.drone,
              "visible": true
            }
          }
        });
      });
    }
  };

  const terminalHooks: ITerminalHooks = {
    changeBuffer: (v: string) => {
      setDesktopState({
        ...desktopState,
        terminal: {
          ...desktopState.terminal,
          buffer: v
        }
      })
    },
    submitBuffer: () => {
      props.worker.postMessage(["terminal-in", desktopState.terminal.buffer])
      setDesktopState({
        ...desktopState,
        terminal: {
          ...desktopState.terminal,
          buffer: ""
        }
      })
    }
  }


  return (

    <div>
      {/* <pre>{JSON.stringify(stateRef.current, null, 2)}</pre>
      <pre>{JSON.stringify(desktopState, null, 2)}</pre> */}
      <div
      >

        {
          desktopState.windows.terminal && <UIWindow
            key={'terminal'}
            app={'terminal'}
            uiwindow={desktopState.windows['terminal']}
            layer={desktopState.stack.findIndex((s) => s === 'terminal')}
            desktopState={desktopState}
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
              worker={props.worker}
              state={desktopState.terminal}
              hooks={terminalHooks}
            />

          </UIWindow>
        }

        {
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

            <ShipMapApp worker={props.worker} />
          </UIWindow>

        }

        {
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

            <ManualApp worker={props.worker} />

          </UIWindow>

        }

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

            <DroneApp worker={props.worker} />

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

          <DronesApp worker={props.worker}/>

        </UIWindow>

        }
        

      </div>
    </div>
  );
}

//   Desktop({
//   'terminal': {
//     top: 100,
//     left: 200,
//     width: 800,
//     height: 200,
//     visible: true,
//     app: {},
//   },
//   'manual': {
//     top: 100,
//     left: 200,
//     width: 700,
//     height: 200,
//     visible: true,
//     app: {},
//   }
// })

