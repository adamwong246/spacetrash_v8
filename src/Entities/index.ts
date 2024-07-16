
import { InCastingComponent, AttackableComponent, ThermalComponent, CameraComponent, LitableComponent } from "../Components/casting/in";
import { OutCastingComponent, MeleeComponent, GunComponent, LitComponent } from "../Components/casting/out";
import { UnmovingComponent, SpawningComponent, PanningComponent, WheeledComponent } from "../Components/conveyance";
import { PhysicsComponent, PhysicsSetComponent, PhysicsActorComponent } from "../Components/physics";
import { PoweredComponent, PowerConsumingComponent, PowerProducingComponent, PowerStoringComponent } from "../Components/power";
import { SpaceTrashEntityComponent } from "../EntityComponent";
import { Entity } from "../engine/Entity";

export class SpaceTrashEntity extends Entity {

  constructor() {
    super();
  }
}

export class Slime extends SpaceTrashEntityComponent {
  constructor(
    spe: SpaceTrashEntity,
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number = 0,
    dy: number = 0,
  ) {

    super(
      spe,
      [new PhysicsActorComponent(spe, x, y, r, new SpawningComponent(spe), dx, dy),
      new ThermalComponent(spe),
      new MeleeComponent(spe, 1)],
    );
  }
}

export class SpaceTrashDrone extends SpaceTrashEntityComponent {

  constructor(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number = 0,
    dy: number = 0,
    albedo: number = 0,
  ) {
    const spe = new SpaceTrashEntity();
    super(
      spe,
      [new PhysicsActorComponent(spe, x, y, r, new WheeledComponent(spe), dx, dy),
      new LitComponent(spe),
      new CameraComponent(spe),
      new AttackableComponent(spe),
      new PowerStoringComponent(spe),
      new LitableComponent(spe, albedo)],
    );
  }
}



// export class BridgeConsole extends SpaceTrashEntityComponent {
//   constructor(
//     spe: SpaceTrashEntity,
//     x: number = 0,
//     y: number = 0,
//     r: number = 0
//   ) {
//     super(
//       new SpaceTrashEntity(),
//       new PhysicsSetComponent(x, y, 'south'),
//       new AttackableComponent(),
//       new GunComponent(),
//       new PowerConsumingComponent(),
//     );
//   }
// }

// export class ReactorConsole extends SpaceTrashEntityComponent {
//   constructor(
//     spe: SpaceTrashEntity,
//     x: number = 0,
//     y: number = 0,
//     r: number = 0
//   ) {
//     super(
//       new SpaceTrashEntity(),
//       new PhysicsSetComponent(x, y, 'south'),
//       new AttackableComponent(),
//       new PowerProducingComponent(),
//     );
//   }
// }

// export class SecurityTurret extends SpaceTrashEntityComponent {
//   constructor(
//     spe: SpaceTrashEntity,
//     x: number = 0,
//     y: number = 0,
//     r: number = 0,
//     dx: number = 0,
//     dy: number = 0,
//   ) {
//     super(
//       new SpaceTrashEntity(),
//       new PhysicsActorComponent(x, y, r, new PanningComponent(), dx, dy),
//       new AttackableComponent(),
//       new GunComponent(),
//       new PowerConsumingComponent(),

//     );
//   }
// }
