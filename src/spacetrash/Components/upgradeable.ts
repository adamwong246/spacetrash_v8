// import Component from "../../engine/Component";

// import { SpaceTrashSystems } from "../Systems";

// import { ISpaceTrashComponents, SpaceTrashComponent } from ".";

// export class UpgradeableComponent extends Component<unknown, ISpaceTrashComponents> {
//   x: number;
//   y: number;
//   r: number;
  
//   constructor(
//     spe: SpaceTrashComponent,
//     x: number = 0, y: number = 0, r: number = 0) {
//     super(spe, [SpaceTrashSystems.physical]);
//   }

//   getMove(): unknown {
//     throw new Error("Method not implemented.");
//   }

//   setMove(move: unknown) {
//     // this.x = move.x;
//     // this.y = move.y;
//     // this.r = move.r;
//   }
// }