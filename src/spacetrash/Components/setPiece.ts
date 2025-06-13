import { ComponentStore, Store } from "../../engine/types";
import { ITiles } from "../lib/EntityComponent";
import { PhysicsComponent } from "./physics";

export class PhysicsSetPieceComponent extends PhysicsComponent {
  solid: boolean;
  tileType: ITiles;
  
  constructor(
    x: number = 0,
    y: number = 0,
    solid: boolean,
    tileType: ITiles
  ) {
    super(x, y);
    this.tileType = tileType;
    this.solid = solid;
  }

}

export class PhysicsSetPieceStore extends Store<PhysicsSetPieceComponent> {
  make(
    x: number = 0,
    y: number = 0,
    solid: boolean,
    tileType: ITiles
  ) {
    return new PhysicsSetPieceComponent(x, y, solid, tileType);
  }

}