import { Scene } from "../../engine/Scene";
import { SpaceTrash } from "..";
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
  // appLogic: IAppLogic<IApps>;
  // sceneBoot: (ecs: ECS) => Promise<void>;

  // constructor(
  //   name: string,
  //   appLogic: IAppLogic<IApps>,
  //   sceneBoot: (ecs: ECS) => Promise<void>
  // ) {
  //   super(name);
  //   this.appLogic = appLogic;
  //   this.sceneBoot = sceneBoot || (async (ecs) => {});
  // }

  // async boot(
  //   ecs: ECS,
  // ) {
  //   await this.sceneBoot(ecs);
  //   Object.keys(this.appLogic).forEach((k) => {
  //     this.appLogic[k][0](ecs);
  //   });
  // }

  // draw(
  //   app: IApps,
  //   bootReplier: IReply,
  //   ecs: ECS
  // ): ((
  //   ctx: OffscreenCanvasRenderingContext2D | THREE.WebGLRenderer
  //   ) => Promise<any>)[] {
  //   return this.appLogic[app][1](ecs, bootReplier);
  // }

  // inputEvent(inputEvent: Event | string, app: string, ecs: ECS) {
  //   if (app === "document") {
  //     return;
  //   }

  //   this.appLogic[app][2] && this.appLogic[app][2](ecs, inputEvent);
  // }
}
