import { Box, Circle, Polygon } from "detect-collisions";

import { SP_2d_Vector } from "../../demiurge/physics/SP_2d_Vector";

import { Component } from "../ecs/Component";
import { SP_MapStore } from "../ecs/SP_MapStore";

export class SP_PhysicalComponent extends Component {
  static swapMotion(a: SP_PhysicalComponent, b: SP_PhysicalComponent) {
    const aAngle = a.body.angle;
    const bAngle = b.body.angle;

    a.body.setAngle(bAngle);
    b.body.setAngle(aAngle);

    a.body.updateBody();
    b.body.updateBody();
  }

  private _physicsActive = false;
  body: Box | Polygon | Circle;
  speed: number = 2000; // Default constant speed
  friction: number = 0.1; // Default friction

  constructor(body: Box | Polygon | Circle, friction: number = 0.1) {
    super();
    this.body = body;
    this.friction = friction;

    // Ensure body is properly initialized
    if (!body.isStatic) {
      body.setAngle(body.angle || 0);
      body.updateBody();
    }
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

  markPhysicsActive() {
    this._physicsActive = true;
  }

  setX(x: number) {
    if (this._physicsActive) {
      throw new Error(
        "Cannot use setX after physics simulation has started - use teleport() if intentional"
      );
    }
    this.body.setPosition(x, this.body.pos.y);
  }

  setY(y: number) {
    if (this._physicsActive) {
      throw new Error(
        "Cannot use setY after physics simulation has started - use teleport() if intentional"
      );
    }
    this.body.setPosition(this.body.pos.x, y);
  }

  teleportX(x: number) {
    this.body.setPosition(x, this.body.pos.y);
    this.body.updateBody();
  }

  teleportY(y: number) {
    this.body.setPosition(this.body.pos.x, y);
    this.body.updateBody();
  }

  setPosition(x: number, y: number) {
    if (this._physicsActive) {
      throw new Error(
        "Cannot use setPosition after physics simulation has started - use teleport() if intentional"
      );
    }
    this.body.setPosition(x, y);
  }

  teleport(x: number, y: number) {
    this.body.setPosition(x, y);
    this.body.updateBody();
  }

  move(delta: number) {
    if (!this.body.isStatic) {
      // Mark physics as active on first move
      if (!this._physicsActive) {
        this._physicsActive = true;
      }

      // Move forward in current direction
      this.body.move(this.speed * delta);

      // Apply friction by reducing speed
      this.speed *= 1 - this.friction;

      // Ensure we don't go below minimum speed
      if (this.speed < 0.01) {
        this.speed = 0;
      }

      this.body.updateBody();
    }
  }

  // setVelocity(v: {x: number, y: number}) {

  // }

  // Recalculates velocity components (deltaX and deltaY) based on angle and speed
  Velocity(): SP_2d_Vector {
    return new SP_2d_Vector(
      this.speed * Math.cos(this.body.angle),
      this.speed * Math.sin(this.body.angle)
    );
  }

  // rebound the object off a surface with normal vector <x, y>
  bounce(v: SP_2d_Vector) {
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

export class SP_PhysicalStore extends SP_MapStore<SP_PhysicalComponent> {}
