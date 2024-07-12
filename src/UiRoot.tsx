// import React, { useState } from "react";

// import { IUiState, SetUiState } from './UiState';
// import { Footer, Header, Main } from "./views";
// import { IUiDekstop, ThemeContext } from "./engine/UI";
// import { SpaceTrashDesktop } from "./games/spacetrash/UI";

// export default function UiRoot(props: {
//   uiState: IUiState,
//   setuiState: SetUiState,
//   worker: Worker,
// }) {

//   const [desktop, setDesktop] = useState<IUiDekstop>(SpaceTrashDesktop);

//   return (
//     <div
//       id="app"
//       className="crt"
//     >

//       <ThemeContext.Provider value={desktop}>
//         <Header uiState={props.uiState} setuiState={props.setuiState} />
//         <Main
//           uiState={props.uiState}
//           setuiState={props.setuiState}
//           worker={props.worker}
//           setDesktop={(x) => {
//             console.log("X", x)
//             setDesktop(x)
//           }}
//         />
//         <Footer uiState={props.uiState} setuiState={props.setuiState} />
//       </ThemeContext.Provider>


//     </div>
//   );
// }
