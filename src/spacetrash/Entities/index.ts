import {
  ThermalComponent,
} from "../Components/casting/in";
import { MeleeComponent, LitComponent } from "../Components/casting/out";


import { Entity } from "../../engine/Entity";
import { SpaceTrashEntityComponent } from "../lib/EntityComponent";
import { PhysicsActorComponent } from "../Components/actor";
import { TileSize } from "../System";

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
    dy: number = 0
  ) {
    const p = new PhysicsActorComponent(x, y, r, dx, dy);
    super(spe, [p, new ThermalComponent(), new MeleeComponent(1)]);
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
    albedo: number = 0
  ) {
    const spe = new SpaceTrashEntity();

    const physicsActorComponent = new PhysicsActorComponent(x, y, r, dx, dy);

    super(spe, [
      physicsActorComponent,
      new LitComponent(),
      // new CameraComponent(),
      // new AttackableComponent(),
      // new PowerStoringComponent(spe),
      // new LitableComponent(spe, albedo),
      // new VideoComponent()
    ]);

    this.physicsActorComponent = physicsActorComponent;
  }

  static draw2d(
    s: PhysicsActorComponent
  ): (draw2d: CanvasRenderingContext2D) => void {
    return (ctx) => {
      // ctx.beginPath();
      // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
      // ctx.strokeStyle = "red";
      // ctx.stroke();
      
      ctx.beginPath();
      ctx.arc(s[1].x * TileSize, s[1].y * TileSize, TileSize / 2, 0, 2 * Math.PI);
      // ctx.fillStyle = "orange";
      // ctx.fill();
      ctx.stroke();
    };
  }

  // draw2d(draw2d: CanvasRenderingContext2D) {
  //   draw2d.beginPath();
  //   draw2d.arc(
  //     this.physicsActorComponent.x * TileSize,
  //     this.physicsActorComponent.y * TileSize,
  //     TileSize / 2,
  //     0,
  //     2 * Math.PI
  //   );
  //   draw2d.fillStyle = "orange";
  //   draw2d.fill();
  //   draw2d.stroke();
  // }

  // erase2d(draw2d: CanvasRenderingContext2D) {
  //   // draw2d.clearRect(1, 2, 3, 4);
  // }
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
