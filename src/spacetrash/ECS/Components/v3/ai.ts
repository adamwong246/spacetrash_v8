import { FOV } from "rot-js";
import { SpaceTrash } from "../../..";
import { Component } from "../../../../engine/VECS.ts/Component";
import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";
import { MapSize, TileSize } from "../../../Constants";
import { ActorComponent } from "./actors";
import { SetPieceComponent, SetPieceStore } from "./setPieces";
import { distanceV2 } from "../../System/MainSystem";

export type IBehaviors =
  | `seed`
  | `explore`
  | `attack`
  | `defend`
  | `die`
  | `spawn`;

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

const randomSpeed = () => {
  return (Math.random() - 0.5) * TileSize * 1;
};

let self;
let GAME: SpaceTrash;

let EID;

export class AiAgentComponent extends Component<any, any> {
  mode: IBehaviors = "seed";

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

  oldGridX: number = 0;
  oldGridY: number = 0;

  attackTargetId: number;

  FOV: { manhattenDistance: number; visiblility: 0 | 1 }[][] = [[]];

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

    this.intoAttackMode.bind(this);
    // this.intoAttackMode.bind(this)
    this.collideCallback.bind(this);
  }

  collideCallback() {
    if (this.mode === "seed") return;

    if (self.explorePattern === "langdonsAnt") {
      // np-op
    } else if (self.explorePattern === "wallBounce") {
      // self.arcadeBody.setAccelerationX(-self.arcadeBody.acceleration.x);
      // self.arcadeBody.setAccelerationY(-self.arcadeBody.acceleration.y);
    } else {
      throw new Error("Method not implemented.");
    }
  }

  boot(arcadeBody, eid: number) {
    EID = eid;
    this.arcadeBody = arcadeBody;
    this.mode = "explore";
    

    // if (!this.arcadeBody) throw "no arcade body?";

    // if (this.explorePattern === "langdonsAnt") {
    //   this.arcadeBody.setAccelerationX(randomSpeed());
    //   this.arcadeBody.setAccelerationY(randomSpeed());
    // } else if (this.explorePattern === "wallBounce") {
    //   this.arcadeBody.setAccelerationX(randomSpeed());
    //   this.arcadeBody.setAccelerationY(randomSpeed());
    // } else if (this.explorePattern === "wallInCircle") {
    //   // np-op
    // } else {
    //   throw new Error("Method not implemented.");
    // }
  }

  tick(game: SpaceTrash, delta: number) {
    if (!this.arcadeBody) throw "no arcade body?";

    GAME = game;
    if (this.mode === "explore") {
      this.explore(game);
    } else if (this.mode === "attack") {
      this.attack();
    } else if (this.mode === "defend") {
      // this.defend();
    } else if (this.mode === "die") {
      // this.die();
    } else {
      throw `AI is in unknown mode: ${this.mode}`;
    }

    const newX = Math.round(this.arcadeBody.position.x);
    const newY = Math.round(this.arcadeBody.position.y);

    // if (newX !== this.oldGridX || newY !== this.oldGridY) {
    //   this.oldGridX = newX;
    //   this.oldGridY = newY;

    //   this.refreshFOV();
    // }
    this.refreshFOV();
  }

  intoAttackMode(actorId: number) {
    this.attackTargetId = actorId;

    // if (this.mode === `attack`) return;

    this.mode = "attack";
    // this.attack();
  }

  refreshFOV() {
    // const playerX = Math.round(GAME.camera.position.x / TileSize);
    // const playerY = Math.round(GAME.camera.position.y / TileSize);
    const playerX = Math.round(this.arcadeBody.position.x / TileSize);
    const playerY = Math.round(this.arcadeBody.position.y / TileSize);

    const lightPasses = (x, y) => {
      if (x > 0 && x <= MapSize - 1 && y > 0 && y <= MapSize - 1) {
        const z = GAME.components.SetPieces.at(x, y);

        if (z && z.tileType === "WallTile") {
          return false;
        } else {
          return true;
        }
      }
      return false;

      // var key = x + "," + y;
      // if (key in data) {
      //   return data[key] == 0;
      // }
      // return false;
    };

    var fov = new FOV.RecursiveShadowcasting(lightPasses);

    fov.compute(playerX, playerY, 5, (x, y, manhattenDistance, visibility) => {
      if (x > 0 && x <= MapSize - 1 && y > 0 && y <= MapSize - 1) {
        if (visibility === 1) {
          const sp: SetPieceComponent = GAME.components.SetPieces.at(x, y);
          if (sp) {
            const actorsOnSpace: number[] = GAME.components.Actors.byXandY(
              x,
              y
            );

            if (actorsOnSpace.length) {
              for (let a of actorsOnSpace) {
                // don't target self
                if (a !== EID) {
                  this.intoAttackMode(a);
                }
              }
            }
          } else {
            debugger;
          }
        }
        // self.FOV[y][x] = {manhattenDistance, visibility}
        // attack.givenItemsInFov(x, y, r, actors.onXandY(x, y));
      }
    });
  }

  explore(game: SpaceTrash) {
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

    // const target = this.checkFOV();
    // if (target) {
    //   this.mode = this.attack;
    // }
  }

  attack() {
    const actorToAttack = GAME.components.Actors.take(this.attackTargetId);

    if (this.attackPattern === "melee") {
      
      this.melee();
    } else {
      throw new Error(
        `Attack pattern not implemented for ${this.attackPattern}`
      );
    }
  }

  defend() {
    throw new Error("Method not implemented.");
  }

  die() {
    throw new Error("Method not implemented.");
  }

  ////////////////////////////////////////////////////////////////////////////////
  wallBounce(): boolean {
    // debugger;
    // pick a random place in the FOV and then move there.
    return false;
  }

  melee() {
    
    const dist = this.distanceToTarget();
    if (dist > 500) {
      this.gotoPosition(
        GAME.components.Actors.take(this.attackTargetId).arcadeBody.position
      );
    } else {
      this.attackTarget();
    }
  }

  distanceToTarget() {
    const { x, y } = GAME.components.Actors.take(this.attackTargetId).arcadeBody
      .position;

    if (!this.arcadeBody) throw "no arcade body?";

    const x1 = this.arcadeBody.position.x;
    const y1 = this.arcadeBody.position.y;
    const dv2 = distanceV2(x, y, x1, y1);
    return dv2;
  }

  gotoPosition(position: any) {
    if (this.motion === "fly") {
      // debugger
      this.flyMotion(position);
    } else {
      throw new Error(`Motion pattern "${this.motion}" not implemented`);
    }
  }

  attackTarget() {
    GAME.impartDamage(self, GAME.components.Actors.take(this.attackTargetId));
  }

  flyMotion(position) {
    // debugger
    const actor = GAME.components.Actors.take(this.attackTargetId);
    const { x, y } = actor.arcadeBody.position;

    const x1 = this.arcadeBody.position.x;
    const y1 = this.arcadeBody.position.y;
    
    if (x1 > x) {
      this.arcadeBody.velocity.x = this.arcadeBody.velocity.x - 1;
    } else {
      this.arcadeBody.velocity.x = this.arcadeBody.velocity.x + 1;
    }

    if (y1 > y) {
      this.arcadeBody.velocity.y = this.arcadeBody.velocity.y - 1;
    } else {
      this.arcadeBody.velocity.y = this.arcadeBody.velocity.y + 1;
    }

    if (this.arcadeBody.velocity.x > 30) {
      this.arcadeBody.velocity.x = 30
    }
    if (this.arcadeBody.velocity.x < -30) {
      this.arcadeBody.velocity.x = -30
    }
        if (this.arcadeBody.velocity.y > 30) {
      this.arcadeBody.velocity.y = 30
    }
    if (this.arcadeBody.velocity.y < -30) {
      this.arcadeBody.velocity.y = -30
    }
  }
}

export class AiAgentStore extends MapStoreV2<AiAgentComponent> {}
