
import { AttackableComponent, LitableComponent } from "../../Components/casting/in";
import { UnmovingComponent } from "../../Components/conveyance";
import { OpacityComponent } from "../../Components/opacity";
import { PhysicsSetComponent } from "../../Components/physics";
import { PowerConsumingComponent } from "../../Components/power";
import { SpaceTrashEntityComponent } from "../../EntityComponent";

import { SpaceTrashEntity } from "..";

export class FloorTile extends SpaceTrashEntityComponent {
  constructor(x: number = 0, y: number = 0, r: number = 0) {
    const spe = new SpaceTrashEntity();
    super(
      spe,
      [new PhysicsSetComponent(spe, x, y, `south`, false),
      new UnmovingComponent(spe),
      new OpacityComponent(spe, 1),
      new LitableComponent(spe)],
    );
  }
}

export class WallTile extends SpaceTrashEntityComponent {
  
  constructor(x: number = 0, y: number = 0, r: number = 0) {
    const spe = new SpaceTrashEntity();
    super(
      spe,
      [new PhysicsSetComponent(spe, x, y, `south`, true),
      new UnmovingComponent(spe),
      new OpacityComponent(spe, 0),
      new LitableComponent(spe)],
    );
  }
}

export class DoorTile extends SpaceTrashEntityComponent {
  constructor(x: number = 0, y: number = 0, r: number = 0) {
    const spe = new SpaceTrashEntity();
    super(
      spe,
      [new PhysicsSetComponent(spe, x, y, `south`, true),
      new AttackableComponent(spe),
      new UnmovingComponent(spe),
      new PowerConsumingComponent(spe),
      new OpacityComponent(spe, 0),
      new LitableComponent(spe)],
    );
  }
}