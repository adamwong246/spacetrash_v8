import { Box, Circle, Polygon } from "detect-collisions";
import { MapStoreV2 } from "../../demiurge/ecs/Store";

import { Component } from "../ecs/Component";

export class SP_PhysicalComponent extends Component<any, any> {
  static swapMotion(a: SP_PhysicalComponent, b: SP_PhysicalComponent) {
    let av = a.body.angle;
    let bv = b.body.angle;
    let temp = av;

    a.body.setAngle(b.body.angle);
    b.body.setAngle(temp);

    a.body.updateBody();
    b.body.updateBody();
  }

  body: Box | Polygon | Circle;
  speed: number = 0;

  constructor(body: Box | Polygon | Circle, speed: number = 0) {
    super();
    this.body = body;
    this.speed = speed;
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

  move(delta: number) {
    this.body.move(this.speed * delta);
  }

  // setVelocity(v: {x: number, y: number}) {

  // }

  // Recalculates velocity components (deltaX and deltaY) based on angle and speed
  Velocity(): { x: number; y: number } {
    return {
      x: this.speed * Math.cos(this.body.angle),
      y: this.speed * Math.sin(this.body.angle),
    };
  }

  // rebound the object off a surface with normal vector <x, y>
  bounce(v: { x: number; y: number }) {
    const collisionNormal = {
      x: v.x,
      y: v.y,
    };

    const velocity = this.Velocity();

    this.body.setPosition(
      this.body.pos.x - 16 * velocity.x,
      this.body.pos.y - 16 * velocity.y
    );

    // Calculate the dot product of the current velocity and the collision normal
    const dotProduct =
      velocity.x * collisionNormal.x + velocity.y * collisionNormal.y;

    // Calculate the reflected velocity using the reflection formula
    const reflectedVelocityX = velocity.x - 2 * dotProduct * collisionNormal.x;
    const reflectedVelocityY = velocity.y - 2 * dotProduct * collisionNormal.y;

    // Recalculate angle and speed from the new velocity
    this.body.setAngle(Math.atan2(reflectedVelocityY, reflectedVelocityX));
    // You might also want to update the speed here if necessary
    // this.speed = Math.sqrt(reflectedVelocityX * reflectedVelocityX + reflectedVelocityY * reflectedVelocityY);
    this.body.updateBody();
  }
}

export class SP_PhysicalStore extends MapStoreV2<SP_PhysicalComponent> {}

// // the direction, given the vector <dx, dy>
// direction() {
//   // Math.atan2(y, x) is the standard way to calculate the angle in all quadrants
//   const radians = Math.atan2(this.dy, this.dx);
//   // If you need the angle in degrees (0 to 360)
//   let degrees = (radians * 180) / Math.PI;
//   if (degrees < 0) {
//     degrees += 360;
//   }
//   return degrees;
// }

// // the magnitude of the vector
// magnitude() {
//   // You can use multiplication for squaring for a minor optimization
//   return Math.sqrt(this.dx * this.dx + this.dy * this.dy);
// }

// // the unit vector
// unit() {
//   const m = this.magnitude();

//   // Handle the case where the magnitude is zero (zero vector)
//   if (m === 0) {
//     // You can return a zero vector or a specific value indicating a zero vector
//     return { x: 0, y: 0 };
//   }

//   return {
//     x: this.dx / m,
//     y: this.dy / m,
//   };
// }
