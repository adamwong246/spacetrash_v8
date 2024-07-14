
import { ECS } from "./ECS";
import { EntityComponent } from "./EntityComponent";
import { Tree } from "./Tree";

type IECSComponents = EntityComponent[];
type IReply = (x: any) => void;

type IBoot = (
  ecs: ECS<any>,
  reply: IReply
) => void;

type IUpdate = (
  ecs: IECSComponents,
  ctx: CanvasRenderingContext2D | undefined,
  events: any[],
  reply: IReply
) => void

type ILogic = [IBoot, IUpdate];

type IAppLogic<IApps extends string> = Record<IApps, ILogic>

export class Scene<IApps extends string> extends Tree {
  appLogic: IAppLogic<IApps>;
  events: Record<IApps, any[]>;
  sceneBoot: (ecs: ECS<any>) => Promise<void>;

  constructor(
    name: string,
    appLogic: IAppLogic<IApps>,
    sceneBoot: (ecs: ECS<any>) => Promise<void>,
  ) {
    super(name);
    this.appLogic = appLogic;
    this.events = {} as any;
    this.sceneBoot = sceneBoot || (async (ecs) => { });
  }

  async boot(
    stateKey: string,
    ecs: ECS<any>,
    bootReplier: IReply
    
  ) {
    await this.sceneBoot(ecs);
    Object.keys(this.appLogic).forEach((k) => {
      // console.log("k", k)
      this.events[k] = [];
      this.appLogic[k][0](ecs, bootReplier); 
    })
  }

  draw(
    ctx: CanvasRenderingContext2D | undefined,
    app: IApps,
    bootReplier: (x: any) => void,
    entityComponents: IECSComponents,
  ) {
    this.appLogic[app][1](
      entityComponents,
      ctx,
      this.events? this.events[app] : [],
      bootReplier
    );
    if (this.events && this.events[app]) {this.events[app] = []};
  }

  inputEvent(
    inputEvent: Event,
    appKey: string,
  ) {
    this.events[appKey].push(inputEvent);
  }
}
