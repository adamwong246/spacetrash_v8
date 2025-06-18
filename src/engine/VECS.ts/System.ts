
import { Game } from "../Game";
import { Entity } from "./Entity";

export type IMoves = { entity: Entity; move: any }[];

export abstract class System {
  abstract tick(delta: number, game: Game<any, any>);
}
