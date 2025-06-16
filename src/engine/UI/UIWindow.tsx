import React from "react";

import FlexibleModal from "../FlexModal";

// import { IUiDekstop, IUiWindow } from "./WM";
import { ISpaceTrashApps, IUiDekstop, IUiWindow } from "../../spacetrash/UI";

export const UIWindow = (props: {
  app: ISpaceTrashApps;
  pushToTop: (k: string) => void;
  desktopState: IUiDekstop;
  uiwindow: IUiWindow;
  layer: number;
  children?: React.ReactNode;
  onResize: (...a) => void;
}) => {
  return <>

    <FlexibleModal
      left={props.uiwindow.left}
      top={props.uiwindow.top}
      initWidth={props.uiwindow.width}
      initHeight={props.uiwindow.height}
      layer={props.layer}

      title={`${props.app}`}
      visible={true}
      onClose={() => { }}
      onOk={() => { }}
      
      resetRectOnOpen={undefined}
      maskClosable={undefined}
      className={undefined}
      onDrag={undefined}

      footer={undefined}
      pushToTop={props.pushToTop}
      onResize={props.onResize}

    >
      {props.children}
    </FlexibleModal>


  </>

};