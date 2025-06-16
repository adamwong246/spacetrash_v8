import React from "react";
import SpaceTrashPlayer from "../Player";

const TableCell = (props: { name: string }) => {
  return <td>{props.name}</td>
}
export const DronesApp = (props: {

}) => {

  const s = SpaceTrashPlayer.bots;

  return (<div>
    <table
    >
      <tr>
        <td> <TableCell name={SpaceTrashPlayer.bots[1][1]} /> </td>
        <td> <TableCell name={SpaceTrashPlayer.bots[2][1]} /> </td>
        <td> <TableCell name={SpaceTrashPlayer.bots[3][1]} /> </td>
      </tr>
      <tr>
        <td> <TableCell name={SpaceTrashPlayer.bots[4][1]} /> </td>
        <td> <TableCell name={SpaceTrashPlayer.bots[5][1]} /> </td>
        <td> <TableCell name={SpaceTrashPlayer.bots[6][1]} /> </td>
      </tr>
      <tr>
        <td> <TableCell name={SpaceTrashPlayer.bots[7][1]} /> </td>
        <td> <TableCell name={SpaceTrashPlayer.bots[9][1]} /> </td>
        <td> <TableCell name={SpaceTrashPlayer.bots[2][1]} /> </td>
      </tr>
    </table>

  </div>);
}