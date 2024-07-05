import { Component } from "../engine/ECS";

export class PhysicsComponent extends Component<unknown> {
  x: number;
  y: number;
  r: number;
  
  constructor(x: number = 0, y: number = 0, r: number = 0) {
    super(["upgradeable"]);
  }

  getMove(): unknown {
    throw new Error("Method not implemented.");
  }

  setMove(move: unknown) {
    // this.x = move.x;
    // this.y = move.y;
    // this.r = move.r;
  }
}