import { ArcadePhysics } from "arcade-physics";
import { Component } from "../../../../engine/VECS.ts/Component";
import { Store } from "../../../../engine/VECS.ts/types";
import { SpaceTrash } from "../../..";

export type IBehaviors = `explore` | `attack` | `defend` | `die`;
`spawn`;

export type IExplore = `walkInCircle` | `randomWalk` | `spawnSeason`;
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

export class AiAgentComponent extends Component<any, any> {

  attackPattern: IAttack;
  explorePattern: IExplore;
  defendPattern: IDefend;
  diePattern: IDie;
  seekPattern: IAttractRepel;
  repelPattern: IAttractRepel;
  motion: IMotions;
  weaknesses: IStrengthsAndWeaknesses;
  strength: IStrengthsAndWeaknesses;

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
  }

}

export class AiAgentStore extends Store<AiAgentComponent> {
  store: Map<number, AiAgentComponent>;

  constructor() {
    super();
    this.store = new Map();
  }

  get(n: number) {
    return this.store.get(n);
  }

  add(lc: AiAgentComponent, n: number) {
    this.store.set(n, lc);
  }

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

  each(cb: (eid, apo: ArcadePhysicsComponent) => void) {
    this.store.forEach((value, key) => {
      cb(Number(key), value);
    });
  }
}
