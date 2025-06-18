import React, { useEffect } from "react";
import { IDockviewPanelProps } from "dockview";

import { IState } from "./InitState";

const TableCell = (props: { name: string }) => {
  return <td>{props.name}</td>
}
export const DronesApp = (props: IDockviewPanelProps<IState>) => {

  return (<div>
    <pre>{ JSON.stringify(props.params, null, 2)}</pre>
    <table
    >
      <tr>

        {
          ...new Array(3).map((i, n) => {

            return (<tr>{
              ...new Array(3).map((ii, nn) => {

                if (!props.params.bots[i]) {
                  return (<td> <TableCell name={'---'} /> </td>);  
                }
                return (<td> <TableCell name={props.params.bots[n][nn]} /> </td>);
              })
            }</tr>);
            
          })
        }

        {/* <td> <TableCell name={props.params.bots[1][1]} /> </td>
        <td> <TableCell name={props.params.bots[2][1]} /> </td>
        <td> <TableCell name={props.params.bots[3][1]} /> </td> */}
      </tr>
      {/* <tr>
        <td> <TableCell name={props.params.bots[4][1]} /> </td>
        <td> <TableCell name={props.params.bots[5][1]} /> </td>
        <td> <TableCell name={props.params.bots[6][1]} /> </td>
      </tr>
      <tr>
        <td> <TableCell name={props.params.bots[7][1]} /> </td>
        <td> <TableCell name={props.params.bots[9][1]} /> </td>
        <td> <TableCell name={props.params.bots[2][1]} /> </td>
      </tr> */}
    </table>

  </div>);
}

            // new Array(3).map((i, n) => {
            // // if (props.params.bots[n]) {
            // //   return (
            // //     <td> <TableCell name={props.params.bots[1][1]} /> </td>
            // //   );  
            // // } else {
            // //   return (
            // //     <td> <TableCell name={"---"} /> </td>
            // //   );
            // // }
            // })