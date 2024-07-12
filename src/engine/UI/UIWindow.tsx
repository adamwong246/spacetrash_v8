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

  console.log("layer", props.layer);
  return <>

    {/* <ResizableDraggableModal
      title='hello'
      visible={true}
      onClose={() => { } }
      onOk={() => { } }
      left={1} top={1} resetRectOnOpen={undefined} maskClosable={undefined} className={undefined} onDrag={undefined} onResize={undefined} footer={undefined}  
    >
      <div className='body'>
        <p>Hello world</p>
      </div>
    </ResizableDraggableModal> */}

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