// import React, { useRef, useEffect } from "react";
// import stringifyEvent from "./Event";
// import { createContext, useContext } from 'react';

// // import ReactModal from 'react-modal-resizable-draggable';
// // import ReactModal from 'react-drag-resize-dock-modal'
// // import ResizableDraggableModal from 'react-resizable-draggable-modal'
// import FlexibleModal from "./UI/FlexModal/index";
// // import 'react-resizable-draggable-modal/dist/style.css'



// // export type IUiDekstop = {
// //   windows: Record<string, IUiWindow>,
// //   stack: string[];
// // };



// // export type IUiWindow = {
// //   top: number;
// //   left: number;
// //   width: number;
// //   height: number;
// //   visible: boolean;
// // };

// // export const ThemeContext = createContext(null);



// export const UIWindow = (props: {
//   worker: Worker;
//   children: any;
//   windowkey: string;
//   setDesktop: (x: IUiDekstop) => void;
// }) => {

//   return <>

//     {/* <ResizableDraggableModal
//       title='hello'
//       visible={true}
//       onClose={() => { } }
//       onOk={() => { } }
//       left={1} top={1} resetRectOnOpen={undefined} maskClosable={undefined} className={undefined} onDrag={undefined} onResize={undefined} footer={undefined}  
//     >
//       <div className='body'>
//         <p>Hello world</p>
//       </div>
//     </ResizableDraggableModal> */}

//       <FlexibleModal
//       title='hello'
//       visible={true}
//       onClose={() => { } }
//       onOk={() => { } }
//       left={1} top={1} resetRectOnOpen={undefined} maskClosable={undefined} className={undefined}
//       onDrag={undefined} onResize={undefined} footer={undefined}  
//     >
//       <div className='body'>
//         <p>Hello world</p>
//       </div>
//     </FlexibleModal>

   
//   </>

// };