import React, { useState } from "react";
import { IUiDekstop, WM } from "../../../engine/UI/WM";
import { UIWindow } from "../../../engine/UI/UIWindow";
import { ITerminalHooks, TerminalApp } from "./terminal";
import ReactDOM from "react-dom";

export type ISpaceTrashApps = 'terminal' | 'manual' | 'shipmap' | 'drone';

export enum ESpaceTrashApps {
  terminal,
  manual,
  shipmap,
  drone
};

export type ITerminalState = {
  buffer: string;
  history: { in: string, out: string, timeStamp: number }[],

};


export const SpaceTrashDesktop = (props: { worker: Worker }) => {

    const [desktopState, setDesktopState] = useState<IUiDekstop & {
      terminal: ITerminalState
    }>({
      terminal: {
        buffer: "",
        history: [],
      },
      windows: {
        terminal: {
          top: 90,
          left: 90,
          width: 1200,
          height: 600,
          visible: true,
          app: () => <UIWindow app={""} pushToTop={function (k: string): void {
            throw new Error("Function not implemented.");
          }} desktopState={{
            windows: undefined,
            stack: []
          }} uiwindow={{
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            visible: false,
            app: undefined
          }} layer={0} />
        },
        shipmap: {
          top: 600,
          left: 500,
          width: 800,
          height: 500,
          visible: true,
          app: () => <UIWindow app={""} pushToTop={function (k: string): void {
            throw new Error("Function not implemented.");
          }} desktopState={{
            windows: undefined,
            stack: []
          }} uiwindow={{
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            visible: false,
            app: undefined
          }} layer={0} />
        },
        manual: {
          top: 60,
          left: 50,
          width: 380,
          height: 350,
          visible: true,
          app: () => <UIWindow app={""} pushToTop={function (k: string): void {
            throw new Error("Function not implemented.");
          }} desktopState={{
            windows: undefined,
            stack: []
          }} uiwindow={{
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            visible: false,
            app: undefined
          }} layer={0} />
        },
        drone: {
          top: 460,
          left: 530,
          width: 380,
          height: 350,
          visible: true,
          app: () => <UIWindow app={""} pushToTop={function (k: string): void {
            throw new Error("Function not implemented.");
          }} desktopState={{
            windows: undefined,
            stack: []
          }} uiwindow={{
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            visible: false,
            app: undefined
          }} layer={0} />
        }
      },
      stack: [
        `terminal`,
        `shipmap`,
        `manual`,
        `drone`,
      ]

    });

    props.worker.onmessage = (e) => {
      console.log("Message received from worker", e);

      if (e.data[0] === 'terminal-update') {
        ReactDOM.flushSync(() => {
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

          })
        });


      }

      if (e.data[0] === 'login') {
        console.log("LOGIKN!@!@#", e);
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
  

    return (<WM
      worker={props.worker}
      desktopState={desktopState}
    >

      {
        desktopState.windows.terminal && <UIWindow
          key={'terminal'}
          app={'terminal'}
          uiwindow={desktopState.windows['terminal']}
          layer={desktopState.stack.findIndex((s) => s === 'terminal')}
          desktopState={desktopState}
          pushToTop={() => {
            // debugger
            setDesktopState({
              ...desktopState,
              stack: [
                ...desktopState.stack.filter((x) => x !== 'terminal'),
                'terminal'
              ]
            })
          }} >

          <TerminalApp
            worker={props.worker}
            state={desktopState.terminal}
            hooks={terminalHooks}
          />

        </UIWindow>
      }

      {/* {
        desktopState.windows['shipmap'] && <UIWindow
          key={'shipmap'}
          app={'shipmap'}
          uiwindow={desktopState.windows['shipmap']}
          layer={desktopState.stack.findIndex((s) => s === 'shipmap')}
          desktopState={desktopState}
          pushToTop={() => {
            // debugger
            setDesktopState({
              ...desktopState,
              stack: [
                ...desktopState.stack.filter((x) => x !== 'shipmap'),
                'shipmap'
              ]
            })
          }} >


        </UIWindow>

      } */}

      {/* {
        desktopState.windows['manual'] && <UIWindow
          key={'manual'}
          app={'manual'}
          uiwindow={desktopState.windows['manual']}
          layer={desktopState.stack.findIndex((s) => s === 'manual')}
          desktopState={desktopState}
          pushToTop={() => {
            // debugger
            setDesktopState({
              ...desktopState,
              stack: [
                ...desktopState.stack.filter((x) => x !== 'manual'),
                'manual'
              ]
            })
          }} >

          <pre>Manual goes here</pre>

        </UIWindow>

      } */}

      {/* {
        desktopState.windows['drone'] && <UIWindow
          key={'drone'}
          app={'drone'}
          uiwindow={desktopState.windows['drone']}
          layer={desktopState.stack.findIndex((s) => s === 'drone')}
          desktopState={desktopState}
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

      } */}


    </WM>);
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

