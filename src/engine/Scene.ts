import * as THREE from "three";

import { ECS } from "./ECS";
import { Tree } from "./Tree";
import {  IStores } from "./types";

type IReply = (ecs: any) => void;

type IBoot = (
  ecs: ECS,
  reply: IReply
) => void;

type IUpdate = (
  cs: IStores,
  update: any
) => ((ctx: OffscreenCanvasRenderingContext2D | THREE.WebGLRenderer, opts?) => void)[]

type IEvents = (
  ecs: ECS,
  event: Event,
) => void;

type ILogic = [IBoot, IUpdate, IEvents, ("2d" | "webgl2") ];
// type ILogic = ((e, r) => any)[];

type IAppLogic<IApps extends string> = Record<IApps, ILogic>

export class Scene<IApps extends string> extends Tree {
  appLogic: IAppLogic<IApps>;
  sceneBoot: (ecs: ECS) => Promise<void>;

  constructor(
    name: string,
    appLogic: IAppLogic<IApps>,
    sceneBoot: (ecs: ECS) => Promise<void>,
  ) {
    super(name);
    this.appLogic = appLogic;
    this.sceneBoot = sceneBoot || (async (ecs) => { });
  }

  async boot(
    stateKey: string,
    ecs: ECS,
    bootReplier: IReply
    
  ) {

    await this.sceneBoot(ecs);
    Object.keys(this.appLogic).forEach((k) => {
      // console.log("k", k, this.appLogic[k][0].toString())
      // this.appLogic.forEach((ak) => {
        
      // })
      this.appLogic[k][0](ecs, bootReplier); 
      
      // bootReplier(ecs)
    })
  }

  draw(
    app: IApps,
    bootReplier: IReply,
    componentsStores: IStores,
  ): ((ctx: OffscreenCanvasRenderingContext2D |THREE.WebGLRenderer) => void)[] {
    return this.appLogic[app][1](
      componentsStores,
      bootReplier
    );
  }

  inputEvent(
    inputEvent: Event|string,
    app: string,
    ecs: ECS,
  ) {
    if (app === "document") {
      return;
    }

    this.appLogic[app][2] && this.appLogic[app][2](
      ecs,
      inputEvent
    );
  }
}
