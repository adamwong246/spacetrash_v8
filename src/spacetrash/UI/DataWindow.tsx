import React, { useEffect } from "react";
import { SpaceTrash } from "..";

// const TableCell = (props: { name: string }) => {
//   return <td
//     style={{
//       width: '150px',
//       height: '150px',
//       border: "1px solid white"
//     }}

//   >
//     <div
//       style={{
//         aspectRatio: '1/1',
//       }}

//     >
//       {props.name}
//     </div>
//   </td>
// }

export const DataWindow = (props: { game: SpaceTrash }) => {

  const [state, stateSetter] = React.useState([[]]);

  useEffect(() => {
    // props.game.registerBotsHook(stateSetter);
  }, []);

  if (!state) return <pre>loading...</pre>

  // const botNamer = (n: number) => {
  //   const s: string = n.toString();

  //   if (state[s]) {
  //     return state[s][1]
  //   }
  //   return "?"

  // }

  // const asTable = [
  //   [botNamer(1), botNamer(2), botNamer(3)],
  //   [botNamer(4), botNamer(5), botNamer(6)],
  //   [botNamer(7), botNamer(8), botNamer(9)],
  // ];

  return (<div>
    <h5>DataBase</h5>

  </div>);
}
