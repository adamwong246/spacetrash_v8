import { TwoDOneD_Component } from "../../../../engine/VECS.ts/Component";
import { OneDStore } from "../../../../engine/VECS.ts/types";

import { FloatMovingComponent, FloatPositionComponent } from "../v2/physical";
import { TileSize } from "../../../Constants";
import { AiAgentComponent, IBehaviors } from "./ai";
import { SpaceTrash } from "../../..";
import { ISpaceTrashComponents } from "../v1";

export class ActorComponent extends TwoDOneD_Component<
  unknown,
  ISpaceTrashComponents
> {
  mode: IBehaviors;
  actorId: number;
  friendly: boolean;
  position: FloatPositionComponent;
  motion: FloatMovingComponent;
  arcadeBody: any;
  agent: AiAgentComponent;

  constructor() {
    super();
  }

  boot() {
    throw new Error("Method not implemented.");
  }

  tick(game: SpaceTrash, delta: number) {
    debugger;
    if (this.mode === "explore") {
      return this.explore();
    }
    if (this.mode === "attack") {
      return this.attack();
    }
    if (this.mode === "defend") {
      return this.defend();
    }
    if (this.mode === "die") {
      return this.die();
    }
  }

  explore() {
    let attackSignal: boolean;

    if (this.agent.explorePattern === "randomWalk") {
      attackSignal = this.randomWalk();
    } else {
      throw new Error("Method not implemented.");
    }
    if (attackSignal) {
      this.mode = "attack";
    }
  }

  attack() {
    throw new Error("Method not implemented.");
  }

  defend() {
    throw new Error("Method not implemented.");
  }

  die() {
    throw new Error("Method not implemented.");
  }

  ////////////////////////////////////////////////////////////////////////////////
  randomWalk(): boolean {
    debugger;
    // pick a random place in the FOV and then move there.
    return true;
  }
}

export class ActorStore extends OneDStore<any> {
  byXandY(x: number, y: number): number[] {
    let toReturn: number[] = [];

    Object.keys(this.store).forEach((k) => {
      const ac = this.store[k];
      if (
        Math.round(ac.arcadeBody.position.x / TileSize) === x &&
        Math.round(ac.arcadeBody.position.y / TileSize) === y
      ) {
        toReturn.push(Number(k));
      }
    });

    return toReturn;
  }

  each(cb: (l: string, a: ActorComponent) => any) {
    Object.keys(this.store).forEach((k) => {
      const ac = this.store[k];
      cb(k, ac);
    });
  }

  setPieceIdAt(x: number, y: number): number {
    return this.store[y][x].setId;
  }

  get(n: number): ActorComponent {
    return this.store.find((v) => v.actorId === n);
  }

  add(a: ActorComponent) {
    super.add(a);
  }

  make() {
    return new ActorComponent();
  }

  positionOf(eidOfLight: number): FloatPositionComponent {
    this.store.length();
  }

  update(n: number, p: FloatPositionComponent) {
    this.get(n).floatPosition = p;
  }
}
