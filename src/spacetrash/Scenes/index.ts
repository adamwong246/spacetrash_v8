
import { SpaceTrash } from "..";
import { Scene } from "../../engine/game/Scene";
import { ECS } from "../../engine/VECS.ts/ECS";

type IReply = (ecs: any) => void;

type IBoot = (ecs: ECS, reply: IReply) => void;

type IUpdate = (ecs: ECS, update: any) => ((ctx: any, opts?) => Promise<any>)[];

type IEvents = (ecs: ECS, event: Event) => void;

type ILogic = [IBoot, IUpdate, IEvents, "2d" | "webgl2" | "html"];

type IAppLogic<IApps extends string> = Record<IApps, ILogic>;

export abstract class SpaceTrashScene extends Scene {
  abstract drone(s: SpaceTrash, g: HTMLCanvasElement);
  abstract shipMap(s: SpaceTrash, g: HTMLCanvasElement);
  abstract drones(s: SpaceTrash, g: HTMLCanvasElement);
}
