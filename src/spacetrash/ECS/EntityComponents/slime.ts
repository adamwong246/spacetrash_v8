
import { SpaceTrashEntityComponent } from ".";
import { PhysicsActorComponent } from "../Components/actor";
import { ThermalComponent } from "../Components/casting/in";
import { MeleeComponent } from "../Components/casting/out";
import { SpaceTrashEntity } from "../Entity";


export class Slime extends SpaceTrashEntityComponent {
  constructor(
    spe: SpaceTrashEntity,
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number = 0,
    dy: number = 0
  ) {
    const p = new PhysicsActorComponent(x, y, r, dx, dy);
    super(spe, [p, new ThermalComponent(), new MeleeComponent(1)]);
  }
}