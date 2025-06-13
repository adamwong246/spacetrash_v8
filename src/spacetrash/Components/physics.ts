import { Component } from "../../engine/Component";

import { ISpaceTrashComponents } from ".";

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
