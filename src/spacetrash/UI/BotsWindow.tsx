import React, { useEffect } from "react";
import { SpaceTrash } from "..";

const TableCell = (props: { name: string }) => {
  return <td>{props.name}</td>
}

export const BotsWindow = (props: { game: SpaceTrash }) => {

  const [state, stateSetter] = React.useState([[]]);

  useEffect(() => {
    props.game.registerBotsHook(stateSetter);
  }, []);

  const botNamer = (n: number) => {
    const s: string = n.toString();

    if (state[s]) {
      return state[s][1]
    }
    return "?"

  }

  const asTable = [
    [botNamer(1), botNamer(2), botNamer(3)],
    [botNamer(4), botNamer(5), botNamer(6)],
    [botNamer(7), botNamer(8), botNamer(9)],
  ];

  return (<div>
    <table>
      {
        ...(([0, 1, 2]).map((i, n) => {
          return (<tr>{
            ...(([0, 1, 2]).map((ii, nn) => {
              return (<td> <TableCell name={
                `${asTable[nn][n]}`
              } /> </td>);
            }))
          }</tr>)

        }))
      }

    </table>

  </div>);
}
