import { PhysicsActorComponent } from "../Components/actor";
import { LitComponent } from "../Components/casting/out";
import { SpaceTrashEntityComponent } from "../lib/EntityComponent";
import { TileSize } from "../System";

import { SpaceTrashEntity } from ".";

export class SpaceTrashBot extends SpaceTrashEntityComponent {
  
  physicsActorComponent: PhysicsActorComponent;

  constructor(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number = 0,
    dy: number = 0,
    name?: string
  ) {
    const spe = new SpaceTrashEntity();

    const physicsActorComponent = new PhysicsActorComponent(x, y, r, dx, dy);

    super(spe, [
      physicsActorComponent,
      new LitComponent(),
    ]);

    this.physicsActorComponent = physicsActorComponent;
  }

  static name(
    bots: {
      1: number,
      2: number,
      3: number,
      4: number,
      5: number,
      6: number,
      7: number,
      8: number,
      9: number
    },
    eidOfBot: string) {
    return eidOfBot
  }

  // static draw2d(
  //   s: PhysicsActorComponent
  // ): (draw2d: CanvasRenderingContext2D) => void {
  //   return (ctx) => {
  //     // ctx.beginPath();
  //     // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
  //     // ctx.strokeStyle = "red";
  //     // ctx.stroke();
      
  //     ctx.beginPath();
  //     ctx.arc(s[1].x * TileSize, s[1].y * TileSize, TileSize / 2, 0, 2 * Math.PI);
  //     // ctx.fillStyle = "orange";
  //     // ctx.fill();
  //     ctx.stroke();
  //   };
  // }

  // // draw2d(draw2d: CanvasRenderingContext2D) {
  // //   draw2d.beginPath();
  // //   draw2d.arc(
  // //     this.physicsActorComponent.x * TileSize,
  // //     this.physicsActorComponent.y * TileSize,
  // //     TileSize / 2,
  // //     0,
  // //     2 * Math.PI
  // //   );
  // //   draw2d.fillStyle = "orange";
  // //   draw2d.fill();
  // //   draw2d.stroke();
  // // }

  // // erase2d(draw2d: CanvasRenderingContext2D) {
  // //   // draw2d.clearRect(1, 2, 3, 4);
  // // }
}