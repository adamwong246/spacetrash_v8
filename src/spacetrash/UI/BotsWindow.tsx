import React, { ReactNode, useEffect } from "react";

type IBot = {
  name: string;
};

export type IBotsWindowState = {
  1: IBot;
  2: IBot;
  3: IBot;
  4: IBot;
  5: IBot;
  6: IBot;
  7: IBot;
  8: IBot;
  9: IBot;
};

const TableCell = (props: { children: ReactNode; name: string }) => {
  return (
    <td
      style={{
        width: "150px",
        height: "150px",
        border: "1px solid white",
      }}
    >
      <div
        style={{
          aspectRatio: "1/1",
        }}
      >
        <p>{props.name}</p>

        {props.children}
      </div>
    </td>
  );
};

export const BotsWindow = (props: { game: SpaceTrash }) => {
  const [state, stateSetter] = React.useState([[]]);

  useEffect(() => {
    props.game.registerBotsHook(stateSetter);
  }, []);

  if (!state) return <pre>loading...</pre>;

  const botNamer = (n: number) => {
    const s: string = n.toString();

    if (state[s]) {
      return state[s][1];
    }
    return "?";
  };

  const asTable = [
    [botNamer(1), botNamer(2), botNamer(3)],
    [botNamer(4), botNamer(5), botNamer(6)],
    [botNamer(7), botNamer(8), botNamer(9)],
  ];

  return (
    <div
      style={{
        color: "white",
      }}
    >
      <table>
        {...[0, 1, 2].map((i, n) => {
          return (
            <tr>
              {...[0, 1, 2].map((ii, nn) => {
                return <TableCell name={`${asTable[nn][n]}`} />;
              })}
            </tr>
          );
        })}
      </table>
    </div>
  );
};
