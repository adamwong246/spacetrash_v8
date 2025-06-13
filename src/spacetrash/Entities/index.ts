
import { AttackableComponent, ThermalComponent, CameraComponent } from "../Components/casting/in";
import { MeleeComponent, LitComponent } from "../Components/casting/out";
import { SpawningComponent, WheeledComponent } from "../Components/conveyance";

import { PowerStoringComponent } from "../Components/power";

import { Entity } from "../../engine/Entity";
import { SpaceTrashEntityComponent } from "../lib/EntityComponent";
import { VideoComponent } from "../Components/video";
import { PhysicsActorComponent } from "../Components/actor";


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

    const p = new PhysicsActorComponent(x, y, r, dx, dy);
    super(
      spe,
      [p,
      new ThermalComponent(),
      new MeleeComponent(1)],
    );



    
  }

  
}

export class SpaceTrashDrone extends SpaceTrashEntityComponent {

  physicsActorComponent: PhysicsActorComponent;

  constructor(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number = 0,
    dy: number = 0,
    albedo: number = 0,
  ) {
    const spe = new SpaceTrashEntity();

    const physicsActorComponent = new PhysicsActorComponent(x, y, r,  dx, dy);

    super(
      spe,
      [
        physicsActorComponent,
        new LitComponent(),
        // new CameraComponent(),
        // new AttackableComponent(),
        // new PowerStoringComponent(spe),
        // new LitableComponent(spe, albedo),
        // new VideoComponent()
      ],
    );

    this.physicsActorComponent = physicsActorComponent;
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
