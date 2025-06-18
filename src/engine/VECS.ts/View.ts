import { Game } from "../Game";

export type IView = (game: Game<any, any>, canvas: HTMLCanvasElement) => Promise<any>;
