import React, { useRef, useEffect, useState } from "react";
import { createContext, useContext } from 'react';

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
};

export const ThemeContext = createContext<IUiDekstop>({
  windows: {},
  stack: []
});

export const WM = (props: {
  worker: Worker;
  desktopState: IUiDekstop;
  children: any;  // desktopState: IUiDekstop

}) => {



  // const [desktopState, setDesktopState] = useState<IUiDekstop>({
  //   windows: {
  //     terminal: {
  //       top: 90,
  //       left: 90,
  //       width: 1200,
  //       height: 600,
  //       visible: true,
  //       app: () => <UIWindow app={""} pushToTop={function (k: string): void {
  //         throw new Error("Function not implemented.");
  //       } } desktopState={{
  //         windows: undefined,
  //         stack: []
  //       }} uiwindow={{
  //         top: 0,
  //         left: 0,
  //         width: 0,
  //         height: 0,
  //         visible: false,
  //         app: undefined
  //       }} layer={0} />
  //     },
  //     shipmap: {
  //       top: 600,
  //       left: 500,
  //       width: 800,
  //       height: 500,
  //       visible: true,
  //       app: () => <UIWindow app={""} pushToTop={function (k: string): void {
  //         throw new Error("Function not implemented.");
  //       } } desktopState={{
  //         windows: undefined,
  //         stack: []
  //       }} uiwindow={{
  //         top: 0,
  //         left: 0,
  //         width: 0,
  //         height: 0,
  //         visible: false,
  //         app: undefined
  //       }} layer={0} />
  //     },
  //     manual: {
  //       top: 60,
  //       left: 50,
  //       width: 380,
  //       height: 350,
  //       visible: true,
  //       app: () => <UIWindow app={""} pushToTop={function (k: string): void {
  //         throw new Error("Function not implemented.");
  //       } } desktopState={{
  //         windows: undefined,
  //         stack: []
  //       }} uiwindow={{
  //         top: 0,
  //         left: 0,
  //         width: 0,
  //         height: 0,
  //         visible: false,
  //         app: undefined
  //       }} layer={0} />
  //     },
  //     drone: {
  //       top: 460,
  //       left: 530,
  //       width: 380,
  //       height: 350,
  //       visible: true,
  //       app: () => <UIWindow app={""} pushToTop={function (k: string): void {
  //         throw new Error("Function not implemented.");
  //       } } desktopState={{
  //         windows: undefined,
  //         stack: []
  //       }} uiwindow={{
  //         top: 0,
  //         left: 0,
  //         width: 0,
  //         height: 0,
  //         visible: false,
  //         app: undefined
  //       }} layer={0} />
  //     }
  //   },
  //   stack: [
  //     `terminal`,
  //     `shipmap`,
  //     `manual`,
  //     `drone`,
  //   ]

  // });
  return <>

    <ThemeContext.Provider value={props.desktopState}>
      {
        props.children
        }
    {/* <ProPanelContainer>
                <WPP defaults={{ name: "red-box", x: 100, y: 100, height: "100px", width: "100px" }} bringPanelToTop={undefined} storePanelPosition={undefined} zPanels={undefined} panelPositions={undefined}/>
                <WPP defaults={{ name: "blue-box", x: 0, y: 0, height: "5rem", width: "2rem" }} bringPanelToTop={undefined} storePanelPosition={undefined} zPanels={undefined} panelPositions={undefined}/>
                <WPP defaults={{ name: "green-box", x: 50, y: 50, height: "50vh", width: "50vw" }} bringPanelToTop={undefined} storePanelPosition={undefined} zPanels={undefined} panelPositions={undefined}/>
            </ProPanelContainer> */}
      
      
    </ThemeContext.Provider>


  </>

};