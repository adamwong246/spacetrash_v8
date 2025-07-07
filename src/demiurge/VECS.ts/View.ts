import { Game } from "../Game";

export type IView<I extends Game<any, any>> = (game: I, canvas: HTMLCanvasElement) => Promise<any>;
