import { Component } from "react";
import { ComponentStore, Store } from "../../engine/types";
import { PhysicsComponent } from "./physics";

export class PhysicsActorComponent extends PhysicsComponent {
  dx: number;
  dy: number;
  r: number;
  
  constructor(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number,
    dy: number,
  ) {
    super(x, y);
    this.dx = dx;
    this.dy = dy;
    this.r = r;
  }

}


export class PhysicsActorStore extends Store<PhysicsActorComponent> {

  constructor() {
    super();
  }

  make(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number,
    dy: number
  ) {
    return new PhysicsActorComponent(x, y, r, dx, dy);
  }

}