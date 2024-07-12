import React, { useRef, useEffect, useState } from "react";
// import stringifyEvent from "./Event";
import { createContext, useContext } from 'react';
import FlexibleModal from "../FlexModal/index";
import { UIWindow } from "./UIWindow"
import { UICanvas } from "./UICanvas";
import { TerminalApp } from "../../games/spacetrash/UI";

export type IUiDekstop = {
  windows: Record<string, IUiWindow>,
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
  windows: {},
  stack: []
});

export const WM = (props: {
  worker: Worker;
  desktopState: IUiDekstop
  // children: any;
  // windowkey: string;
  // setDesktop: (x: IUiDekstop) => void;
}) => {

  const [desktopState, setDesktopState] = useState<IUiDekstop>(props.desktopState);
  return <>

    <ThemeContext.Provider value={desktopState}>

      <UIWindow
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
        
        <TerminalApp/>
        
        </UIWindow>
      
      <UIWindow
        key={'ship'}
        app={'ship'}
        uiwindow={desktopState.windows['ship']}
        layer={desktopState.stack.findIndex((s) => s === 'ship')}
        desktopState={desktopState}
        pushToTop={() => {
          // debugger
          setDesktopState({
            ...desktopState,
            stack: [
              ...desktopState.stack.filter((x) => x !== 'ship'),
              'ship'
            ]
          })
        }} >
        
        <UICanvas worker={props.worker} message={"2nd-canvas"} />
        
        </UIWindow>

      {/* {
        Object.entries(desktopState.windows).map(([k, w]) => {
          // const a = desktopState.windows[k];
          // const i = desktopState.stack.findIndex((s) => s === k);
          return <UIWindow
            key={k}
            app={k}
            uiwindow={desktopState.windows[k]}
            layer={desktopState.stack.findIndex((s) => s === k)}
            desktopState={desktopState}
            pushToTop={() => {
              // debugger
            setDesktopState({
              ...desktopState,
              stack: [
                ...desktopState.stack.filter((x) => x !== k),
                k
              ]
            })
          }} ></UIWindow>
        })
  } */}
    </ThemeContext.Provider>


  </>

};