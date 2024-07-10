
import { EntityComponent } from "./ECS";
import { System } from "./System";
import { Tree } from "./Tree";

export class Scene extends Tree  {
  entityComponents: EntityComponent[];
  systems: Map<System<string>, (
    ctx: CanvasRenderingContext2D,
    ecs: EntityComponent[],
  ) => void>;

  constructor(
    name: string,
    entityComponents: EntityComponent[],
    systems: Map<System<string>, (
      ctx: CanvasRenderingContext2D,
      ecs: EntityComponent[],
    ) => void>
  ) {
    super(name);
    this.entityComponents = entityComponents;
    this.systems = systems;
  }

  draw(
    key: string,
    ctx: CanvasRenderingContext2D
  ) {
    this.systems.forEach(
      (
        drawer: (
          c: CanvasRenderingContext2D,
          ecs: EntityComponent[],
        ) => void,
        system: System<string>,
      ) => {
        drawer(ctx, this.entityComponents)
  });
  }
}

export class View extends Scene  {
  draw: (key: string, ctx: CanvasRenderingContext2D) => void;

  constructor(
    name: string,
    entityComponents: EntityComponent[],
    draw: (key: string, ctx: CanvasRenderingContext2D) => void) {
    super(name, entityComponents, new Map());
    this.draw = draw;
  }
}
