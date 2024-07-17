import { EntityComponent } from "../engine/EntityComponent";

export class SpaceTrashEntityComponent extends EntityComponent {
  x: number;
  dx: number;
  y: number;
  dy: number;
  // constructor(
  //   entity: Entity,
  //   // physics: PhysicsComponent,
  //   // casts?: (InCastingComponent | OutCastingComponent)[],
  //   ...components: (SpaceTrashComponent)[]
  // ) {
  //   const c: Component<any, any>[] = [];
  //   c.push(physics);

  //   super(entity, [physics, ...components]);
  // }
}

