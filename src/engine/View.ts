
import { EntityComponent } from "./ECS";
import { Tree } from "./Tree";

export type IPaint = (
  ecs: EntityComponent[],
  ctx: CanvasRenderingContext2D,
  events: any[],
) => void;

export class View extends Tree {
  
  entityComponents: EntityComponent[];
  paint: IPaint;
  events: any[] = [];

  constructor(
    name: string,
    entityComponents: EntityComponent[],
    paint: IPaint,
  ) {
    super(name);
    this.entityComponents = entityComponents;
    this.paint = paint;
  }

  draw(
    ctx: CanvasRenderingContext2D,
  ) {
    this.paint(this.entityComponents, ctx, this.events);
    this.events = [];
  }

  inputEvent(inputEvent: Event) {
    this.events.push(inputEvent);
  }

}
