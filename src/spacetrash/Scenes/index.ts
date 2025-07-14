// import { ECS } from "../../demiurge/ecs/ECS";
import { Scene } from "../../demiurge/game/Scene";
import { SpaceTrash } from "../Game/9-WithTiled";

// type IReply = (ecs: any) => void;

// type IBoot = (ecs: ECS, reply: IReply) => void;

// type IUpdate = (ecs: ECS, update: any) => ((ctx: any, opts?) => Promise<any>)[];

// type IEvents = (ecs: ECS, event: Event) => void;

// type ILogic = [IBoot, IUpdate, IEvents, "2d" | "webgl2" | "html"];

// type IAppLogic<IApps extends string> = Record<IApps, ILogic>;

export abstract class SpaceTrashScene extends Scene {
  abstract drone(s: SpaceTrash, g: HTMLCanvasElement);
  abstract shipMap(s: SpaceTrash, g: HTMLCanvasElement);
  abstract drones(s: SpaceTrash, g: HTMLCanvasElement);
}
