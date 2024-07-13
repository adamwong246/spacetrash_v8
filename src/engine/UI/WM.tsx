import React, { useRef, useEffect, useState } from "react";
// import stringifyEvent from "./Event";
import { createContext, useContext } from 'react';
import FlexibleModal from "../FlexModal/index";
import { UIWindow } from "./UIWindow"
import { UICanvas } from "./UICanvas";
import { TerminalApp } from "../../games/spacetrash/UI/terminal";
import { ESpaceTrashApps, ISpaceTrashApps } from "../../games/spacetrash/UI";
import { ShipMapApp } from "../../games/spacetrash/UI/shipmap";
import { DroneApp } from "../../games/spacetrash/UI/drone";
import { Rnd } from "react-rnd";

import withProPanel, { ProPanelContainer } from "../proPortal";

// const ExampleComponent = (defaults: any) => {
//   return (
//       <div className="panel">
//       <h1>Hello World!</h1>
//       </div>
        
//     )
// }
// const WPP =  withProPanel(ExampleComponent);


export type IUiDekstop = {
  windows: Record<ISpaceTrashApps, IUiWindow | null>,
  stack: string[];
};

export type IUiWindow = {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
  app: typeof UIWindow
};

export const ThemeContext = createContext<IUiDekstop>({
  windows: {
    terminal: null,
    manual: null,
    shipmap: null,
    drone: null,
  },
  stack: []

});

export const WM = (props: {
  worker: Worker;
  // desktopState: IUiDekstop
  // children: any;
  // windowkey: string;
  // setDesktop: (x: IUiDekstop) => void;
}) => {

  const [desktopState, setDesktopState] = useState<IUiDekstop>({
    windows: {
      terminal: {
        top: 90,
        left: 90,
        width: 1200,
        height: 600,
        visible: true,
        app: () => <UIWindow app={""} pushToTop={function (k: string): void {
          throw new Error("Function not implemented.");
        } } desktopState={{
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
        } } desktopState={{
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
        } } desktopState={{
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
        } } desktopState={{
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
  return <>

    <ThemeContext.Provider value={desktopState}>

    {/* <ProPanelContainer>
                <WPP defaults={{ name: "red-box", x: 100, y: 100, height: "100px", width: "100px" }} bringPanelToTop={undefined} storePanelPosition={undefined} zPanels={undefined} panelPositions={undefined}/>
                <WPP defaults={{ name: "blue-box", x: 0, y: 0, height: "5rem", width: "2rem" }} bringPanelToTop={undefined} storePanelPosition={undefined} zPanels={undefined} panelPositions={undefined}/>
                <WPP defaults={{ name: "green-box", x: 50, y: 50, height: "50vh", width: "50vw" }} bringPanelToTop={undefined} storePanelPosition={undefined} zPanels={undefined} panelPositions={undefined}/>
            </ProPanelContainer> */}
      
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

          <TerminalApp worker={props.worker} />

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

    </ThemeContext.Provider>


  </>

};