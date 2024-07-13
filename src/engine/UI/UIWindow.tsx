import React from "react";

import FlexibleModal from "../FlexModal";

import { IUiDekstop, IUiWindow } from "./WM";

export const UIWindow = (props: {
  app: string;
  pushToTop: (k: string) => void;
  desktopState: IUiDekstop;
  uiwindow: IUiWindow;
  layer: number;
  children?: React.ReactNode;
}) => {
  return <>

    <FlexibleModal
      left={props.uiwindow.left}
      top={props.uiwindow.top}
      initWidth={props.uiwindow.width}
      initHeight={props.uiwindow.height}
      layer={props.layer}

      title={`${props.app}, ${props.layer}`}
      visible={true}
      onClose={() => { }}
      onOk={() => { }}
      
      resetRectOnOpen={undefined}
      maskClosable={undefined}
      className={undefined}
      onDrag={undefined}
      onResize={undefined}
      footer={undefined}
      pushToTop={props.pushToTop}
    >
      {props.children}
    </FlexibleModal>


  </>

};