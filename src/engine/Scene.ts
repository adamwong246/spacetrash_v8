
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
  
  events: Record<IApps, any[]>;

  constructor(
    name: string,
    // entityComponents: IECSComponents,
    appLogic: IAppLogic<IApps>,
  ) {
    super(name);
    // this.entityComponents = entityComponents;
    this.appLogic = appLogic;
    this.events = {} as any;
  }

  boot(
    stateKey: string,
    ecs: ECS<any>,
    bootReplier: IReply
    // b: IBoot,
    
  ) {

    // this.appLogic[stateKey][0](ecs, bootReplier);
    Object.keys(this.appLogic).forEach((k) => {
      console.log("k", k)
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
    // console.log(this.events)
    this.appLogic[app][1](
      // this.entityComponents,
      entityComponents,
      ctx,
      this.events? this.events[app] : [],
      bootReplier
    );
    if (this.events && this.events[app]) {this.events[app] = []};
  }

  inputEvent(
    inputEvent: Event
  ) {
    Object.keys(this.events).forEach((k) => {
      this.events[k].push(inputEvent);
    })
    
  }

}
