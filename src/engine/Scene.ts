
import { ECS, EntityComponent } from "./ECS";
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

// type PartialRecord<K extends keyof any, T> = {
//   [P in K]?: T;
// };



export class Scene<IApps extends string> extends Tree {
  
  // entityComponents: IECSComponents;
  appLogic: IAppLogic<IApps>;
  events: any[] = [];

  constructor(
    name: string,
    // entityComponents: IECSComponents,
    appLogic: IAppLogic<IApps>,
  ) {
    super(name);
    // this.entityComponents = entityComponents;
    this.appLogic = appLogic;
  }

  boot(
    stateKey: string,
    ecs: ECS<any>,
    bootReplier: IReply
    // b: IBoot,
    
  ) {

    // this.appLogic[stateKey][0](ecs, bootReplier);
    Object.keys(this.appLogic).forEach((k) => {
      // debugger
      this.appLogic[k][0](ecs, bootReplier);
    })
    this.events = [];
  }

  draw(
    ctx: CanvasRenderingContext2D | undefined,
    app: IApps,
    bootReplier: (x: any) => void,
    entityComponents: IECSComponents,
  ) {
    
    this.appLogic[app][1](
      // this.entityComponents,
      entityComponents,
      ctx,
      this.events,
      bootReplier
    );
    this.events = [];
  }

  inputEvent(inputEvent: Event) {
    this.events.push(inputEvent);
  }

}
