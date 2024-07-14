
import Component from "../../engine/Component";
import { Entity } from "../../engine/Entity";
import { EntityComponent } from "../../engine/EntityComponent";
import { SpaceTrashComponent } from "./Components";
import { InCastingComponent } from "./Components/casting/in";
import { OutCastingComponent } from "./Components/casting/out";
import { PhysicsComponent } from "./Components/physics";
import { PoweredComponent } from "./Components/power";

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

