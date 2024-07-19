
import Component from "./Component";
import { ECS } from "./ECS";
import { EntityComponent } from "./EntityComponent";
import { Tree } from "./Tree";

type IECSComponents = Record<string, Component<any, any>>;
type IReply = (x: any) => void;

type IBoot = (
  ecs: ECS<any>,
  reply: IReply
) => void;

type IUpdate = (
  ecs: IECSComponents,
  reply: IReply
) => ((ctx: OffscreenCanvasRenderingContext2D |WebGLRenderingContext) => void)[]

type IEvents = (
  ecs: ECS<any>,
  event: Event,
) => void;

type ILogic = [IBoot, IUpdate, IEvents?];

type IAppLogic<IApps extends string> = Record<IApps, ILogic>

export class Scene<IApps extends string> extends Tree {
  appLogic: IAppLogic<IApps>;
  sceneBoot: (ecs: ECS<any>) => Promise<void>;

  constructor(
    name: string,
    appLogic: IAppLogic<IApps>,
    sceneBoot: (ecs: ECS<any>) => Promise<void>,
  ) {
    super(name);
    this.appLogic = appLogic;
    this.sceneBoot = sceneBoot || (async (ecs) => { });
  }

  async boot(
    stateKey: string,
    ecs: ECS<any>,
    bootReplier: IReply
    
  ) {
    await this.sceneBoot(ecs);
    Object.keys(this.appLogic).forEach((k) => {
      this.appLogic[k][0](ecs, bootReplier); 
    })
  }

  draw(
    app: IApps,
    bootReplier: (x: any) => void,
    components: Record<string, Component<any, any>>,
  ): ((ctx: OffscreenCanvasRenderingContext2D |WebGLRenderingContext) => void)[] {
    return this.appLogic[app][1](
      components,
      bootReplier
    );
  }

  inputEvent(
    inputEvent: Event,
    app: string,
    ecs: ECS<any>,
  ) {
    this.appLogic[app][2] && this.appLogic[app][2](
      ecs,
      inputEvent
    );
  }
}
