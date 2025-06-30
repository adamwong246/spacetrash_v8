import { Tree } from "./Tree";
import { ECS } from "../VECS.ts/ECS";
import { Game } from "./Game";

type IReply = (ecs: any) => void;

type IBoot = (ecs: ECS, reply: IReply) => void;

type IUpdate = (ecs: ECS, update: any) => ((ctx: any, opts?) => Promise<any>)[];

type IEvents = (ecs: ECS, event: Event) => void;

type ILogic = [IBoot, IUpdate, IEvents, "2d" | "webgl2" | "html"];

type IAppLogic<IApps extends string> = Record<IApps, ILogic>;

export abstract class Scene extends Tree {
  appLogic: IAppLogic<any>;
  // sceneBoot: (ecs: ECS) => Promise<void>;

  constructor(
    appLogic: IAppLogic<any>
    // sceneBoot: (ecs: ECS) => Promise<void>
  ) {
    super();
    this.appLogic = appLogic;
    // this.sceneBoot = sceneBoot || (async (ecs) => {});
  }

  abstract boot(e: Game<any, any>);
  abstract update(e: Game<any, any>);
  abstract event(e: Game<any, any>);

  draw(
    app: any,
    bootReplier: IReply,
    ecs: ECS
  ): ((g: Game<any, any>, ctx: HTMLCanvasElement) => Promise<any>)[] {
    return this.appLogic[app][1](ecs, bootReplier);
  }

  // async boot(
  //   ecs: ECS,
  // ) {
  //   // await this.sceneBoot(ecs);
  //   // Object.keys(this.appLogic).forEach((k) => {
  //   //   this.appLogic[k][0](ecs);
  //   // });
  // }

  // inputEvent(inputEvent: Event | string, app: string, ecs: ECS) {
  //   if (app === "document") {
  //     return;
  //   }

  //   this.appLogic[app][2] && this.appLogic[app][2](ecs, inputEvent);
  // }
}
