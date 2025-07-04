import { Box, Circle, Polygon } from "detect-collisions";
import { MapStoreV2 } from "../../engine/VECS.ts/Store";

import { PhysicalComponent } from "./../../engine/physics/PhysicalComponent";

const FRICTION_COEFFECIENT = 0.99;

export class SP_PhysicalComponent extends PhysicalComponent {
  body: Box | Polygon | Circle;
  // arcadeObject: any;
  // dx: number = 0;
  // dy: number = 0;

  constructor(x: number, y: number, body) {
    super(x, y);
    this.body = body;
  }

  X() {
    return this.body.pos.x;
  }

  Y() {
    return this.body.pos.y;
  }

  plusX(x: number) {
    this.body.setPosition(this.body.pos.x + x, this.body.pos.y);
  }

  plusY(y: number) {
    this.body.setPosition(this.body.pos.x, this.body.pos.y + y);
  }

  setX(x: number) {
    this.body.setPosition(x, this.body.pos.y);
  }

  setY(y: number) {
    this.body.setPosition(this.body.pos.x, y);
  }

  // setAccelerationX(acceleration: number, delta: number) {
  //   this.dx += acceleration * delta
  //   this.body.pos.x += this.dx * delta
  // }

  // setAccelerationY(acceleration: number, delta: number) {
  //   this.dy += acceleration * delta
  //   this.body.pos.y += this.dy * delta
  // }

  // friction(delta) {
  //   // this.dx = this.dx * 0.99;
  //   // this.dy = this.dy * 0.99;
  // }
}

export class SP_PhysicalStore extends MapStoreV2<SP_PhysicalComponent> {}
