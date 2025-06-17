import { SpacetrashGameClass } from "../Game";
import { ITerminalState } from "./terminal";

export type ISpaceTrashApps =
  | "terminal"
  | `shipmap`
  | `manual`
  | `drone`
  | "drones"
  | "shipmapV2"
  | "droneV2";

export type IUiDekstop = {
  windows: Record<ISpaceTrashApps, IUiWindow>;
  stack: ISpaceTrashApps[];
};

export type IUiWindow = {
  top: number;
  left: number;
  width: number;
  height: number;
  visible: boolean;
};

export type IState = IUiDekstop & {
  terminal: ITerminalState;
  game: SpacetrashGameClass;
};
