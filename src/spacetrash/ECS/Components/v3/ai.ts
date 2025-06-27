import { SpaceTrash } from "../../..";
import { Component } from "../../../../engine/VECS.ts/Component";
import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";
import { TileSize } from "../../../Constants";
import { ActorComponent } from "./actors";

export type IBehaviors = `explore` | `attack` | `defend` | `die`;
`spawn`;

export type IExplore =
  | `walkInCircle`
  | `langdonsAnt`
  | `spawnSeason`
  | `wallBounce`;
export type IAttack = `melee` | `ranged` | `mine`;
export type IDefend = `protectTheNest` | `rush` | `suicideBomb`;
export type IDie = `explode` | `acidCorpse` | `rallyCry` | `nothing`;
export type IAttractRepel =
  | `FOV`
  | `motionFOV`
  | `heat`
  | `sound`
  | `radiation`
  | `light`
  | `damage`;
export type IMotions = `tank` | `fly` | `lunge` | `none`;
export type IStrengthsAndWeaknesses =
  | `vacuum`
  | `heat`
  | `radiation`
  | `explosive`
  | `bluntForce`
  | `electrical`;

let GAME;

const randomSpeed = () => {
  return (Math.random() - 0.5) * TileSize * 10;
};

let self;

export class AiAgentComponent extends Component<any, any> {
  mode: IBehaviors = "explore";

  attackPattern: IAttack;
  explorePattern: IExplore;
  defendPattern: IDefend;
  diePattern: IDie;
  seekPattern: IAttractRepel;
  repelPattern: IAttractRepel;
  motion: IMotions;
  weaknesses: IStrengthsAndWeaknesses;
  strength: IStrengthsAndWeaknesses;

  arcadeBody: unknown;

  constructor(
    attackPattern: IAttack,
    explorePattern: IExplore,
    defendPattern: IDefend,
    diePattern: IDie,
    seekPattern: IAttractRepel,
    repelPattern: IAttractRepel,
    motion: IMotions,
    weaknesses: IStrengthsAndWeaknesses,
    strength: IStrengthsAndWeaknesses
  ) {
    super();
    this.attackPattern = attackPattern;
    this.explorePattern = explorePattern;
    this.defendPattern = defendPattern;
    this.diePattern = diePattern;
    this.seekPattern = seekPattern;
    this.repelPattern = repelPattern;
    this.motion = motion;
    this.weaknesses = weaknesses;
    this.strength = strength;

    self = this;
  }

  collideCallback() {
    if (self.explorePattern === "langdonsAnt") {
      // np-op
    } else if (self.explorePattern === "wallBounce") {
      self.arcadeBody.setAccelerationX(-self.arcadeBody.acceleration.x);
      self.arcadeBody.setAccelerationY(-self.arcadeBody.acceleration.y);
    } else {
      throw new Error("Method not implemented.");
    }
  }

  boot(arcadeBody) {
    this.arcadeBody = arcadeBody;

    if (this.explorePattern === "langdonsAnt") {
      this.arcadeBody.setAccelerationX(randomSpeed());
      this.arcadeBody.setAccelerationY(randomSpeed());
    } else if (this.explorePattern === "wallBounce") {
      this.arcadeBody.setAccelerationX(randomSpeed());
      this.arcadeBody.setAccelerationY(randomSpeed());
    } else if (this.explorePattern === "wallInCircle") {
      // np-op
    } else {
      throw new Error("Method not implemented.");
    }
  }

  tick(game: SpaceTrash, delta: number) {
    if (this.mode === "explore") {
      return this.explore();
    } else if (this.mode === "attack") {
      return this.attack();
    } else if (this.mode === "defend") {
      return this.defend();
    } else if (this.mode === "die") {
      return this.die();
    } else {
      throw `AI is in unknown mode: ${this.mode}`;
    }
  }

  explore() {
    // debugger
    let attackSignal: boolean;

    if (this.explorePattern === "langdonsAnt") {
      this.arcadeBody.setAccelerationX(randomSpeed());
      this.arcadeBody.setAccelerationY(randomSpeed());
    } else if (this.explorePattern === "wallBounce") {
      // no-op
    } else if (this.explorePattern === "walkInCircle") {
      // no-op
    } else {
      throw new Error("Method not implemented.");
    }
    // if (attackSignal) {
    //   this.mode = "attack";
    // }
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
  wallBounce(): boolean {
    debugger;
    // pick a random place in the FOV and then move there.
    return false;
  }
}

export class AiAgentStore extends MapStoreV2<AiAgentComponent> {
  // each(cb: (eid, apo) => void) {
  //   this.store.forEach((value, key) => {
  //     cb(Number(key), value);
  //   });
  // }
  // constructor() {
  //   super();
  //   this.store = new Map();
  // }
  // get(n: number) {
  //   return this.store.get(n);
  // }
  // add(lc: AiAgentComponent, n: number) {
  //   this.store.set(n, lc);
  // }
  // add(lc: IntegerPositionComponent, n: number) {
  //   this.store.set(n, lc);
  //   return;
  // }
  // withIf(i: number, cb: (i: [number, IntegerPositionComponent]) => void) {
  //   const x = this.store.get(i);
  //   if (x) cb([Number(i), x, i]);
  // }
  // make(x: number, y: number) {
  //   return new IntegerPositionComponent(x, y);
  // }
}
