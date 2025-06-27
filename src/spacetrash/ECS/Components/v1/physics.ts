import { ISpaceTrashComponents } from ".";
import { Component } from "../../../../engine/VECS.ts/Component";

export class PhysicsComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    super();
    this.x = x;
    this.y = y;
  }
}

export type IDirs = `north` | `south` | `east` | `west`;

export class PhysicsTangibleComponent extends PhysicsComponent {}
