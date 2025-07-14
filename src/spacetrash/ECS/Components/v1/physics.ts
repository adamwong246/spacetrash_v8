import { Component } from "../../../../demiurge/ecs/Component";

export class PhysicsComponent extends Component {
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
