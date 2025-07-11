import { FOV } from "rot-js";

import { Component } from "../../../../demiurge/ecs/Component";
import { SP_MapStore } from "../../../../demiurge/ecs/Store";
import { MapSize, TileSize } from "../../../Constants";
import { ActorComponent } from "./actors";
import { SetPieceComponent, SetPieceStore } from "./setPieces";

import AttackPatterns from "./behaviorPatterns/attacks";
import ExplorePatterns from "./behaviorPatterns/explore";
import { FovSense } from "./senses/fov";
import { RadiationSense } from "./senses/radiation";
import { SpaceTrash } from "../../../Game/9-WithTiled";
import { distanceV2 } from "../../../lib";

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
export type IAttack = `melee` | `ranged`;
export type IDefend = `protectTheNest` | `rush` | `suicideBomb`;
export type IDie = `pop` | `acidCorpse` | `rallyCry`;
export type ISpawn = `divide` | `mate`;

export type IAttractRepel = `FOV` | `heat` | `sound` | `radiation`;
export type IMotions = `tank` | `fly` | `none`;
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

type IRelation = {
  alignment: "predator" | "prey" | "ignore";
};

// The AI is randomly assigned:
// 1) A preference for one of the 4 corners
// 2) For each of the 4 squares, a random appropriate behavior pattern

// The mode is modeled as 1 point

// Relations
// There is a matrix for every known actor.
// for each of the 4 points, there is a threshold that must be met to promote the relationship
//
//          Rival
// predator          prey
//          teammate
//
// Rival/teammate - changes by observed behavior
// predator/prey  - Wether the AI will pursue or flee from the tracking target

// Actor events
//
//         friendly
// tracked          lost-track
//       unfriendly
//

// Mode
// These behaviors define how the bot acts without regard to another actor
// It is modeled as a single point.
//
//         spawn
// attack         defend
//          die
//
// spawn/die     - increases and decrease by individual health
// attack/defend - increases and decrease by team health

// Motivation
// These behaviors define how the bot responds to a increasing "meter"
//
//        boredom
// hunger           fear
//        ambition
//
// boredom/ambition - increases and decrease by individual activity
// hunger/fear      - whether the bot moves towards resources or away from threat

// Preferences
//
// These behaviors describe how the bot acts when in a neutral state. It doesn't change over time.
// IE mode: neutral and all meters under threshold.
//        strength
// repel            attract
//        weakness
//
// strength/weakness - whether the ai prioritizes moving towards elemental preference or elemental preference
// repel/attract     - whether the ai prioritizes moving towards elemental strength or elemental weakness

type IModes = "attack" | "defend" | `spawn` | `die`[];

export class AiAgentComponent extends Component<any, any> {
  mode: IBehaviors = "seed";

  // a list ordered by mode preferences
  modePreference: IModes;
  // the mode behavior patterns
  attackPattern: IAttack;
  explorePattern: IExplore;
  defendPattern: IDefend;
  diePattern: IDie;

  seekPattern: IAttractRepel;
  repelPattern: IAttractRepel;
  weaknesses: IStrengthsAndWeaknesses;
  strength: IStrengthsAndWeaknesses;

  motion: IMotions;

  arcadeBody: unknown;

  oldGridX: number = 0;
  oldGridY: number = 0;

  attackTargetId: number;

  // FOV: { manhattenDistance: number; visiblility: 0 | 1 }[][] = [[]];
  fovSense: FovSense;
  radiationSense: RadiationSense;
  // heatSense: HeatSense;

  relations: Map<number, IRelation>;

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

    this.fovSense = new FovSense();
    this.radiationSense = new RadiationSense();

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
    // if (!this.arcadeBody) throw "no arcade body?";

    GAME = game;

    // const newX = Math.round(this.arcadeBody.position.x);
    // const newY = Math.round(this.arcadeBody.position.y);

    // if (newX !== this.oldGridX || newY !== this.oldGridY) {
    //   this.oldGridX = newX;
    //   this.oldGridY = newY;

    //   this.refreshFOV();
    // }
    // this.refreshFOV();
  }

  intoAttackMode(actorId: number) {
    this.attackTargetId = actorId;
    this.mode = "attack";
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
          const setPiece: SetPieceComponent = GAME.components.SetPieces.at(
            x,
            y
          );

          if (setPiece) {
            const actors: number[] = GAME.components.Actors.byXandY(
              x,
              y
            ).filter((i) => {
              return i !== EID;
            });

            (this.FOV[y][x] = actors), setPiece, d, v;
            // if (this.mode === "explore") {
            //   ExplorePatterns[this.explorePattern](
            //     this,
            //     GAME,
            //     actors,
            //     setPiece,
            //     x,
            //     y,
            //     manhattenDistance,
            //     visibility
            //   );
            // } else if (this.mode === "attack") {
            //   AttackPatterns[this.attackPattern](
            //     this,
            //     GAME,
            //     actors,
            //     setPiece,
            //     x,
            //     y,
            //     manhattenDistance,
            //     visibility
            //   );
            // } else if (this.mode === "defend") {
            //   // this.defend();
            // } else if (this.mode === "die") {
            //   // this.die();
            // } else {
            //   throw `AI is in unknown mode: ${this.mode}`;
            // }
          } else {
            debugger;
          }
        }
      }
    });
  }

  fovInput(
    actors: number[],
    setPiece: SetPieceComponent,
    x: number,
    y: number,
    manhattenDistance: number,
    visibility: 0 | 1
  ) {
    throw new Error("Method not implemented.");
  }

  // explore(game: SpaceTrash) {
  //   if (this.explorePattern === "langdonsAnt") {
  //     this.arcadeBody.setAccelerationX(randomSpeed());
  //     this.arcadeBody.setAccelerationY(randomSpeed());
  //   } else if (this.explorePattern === "wallBounce") {
  //     // no-op
  //   } else if (this.explorePattern === "walkInCircle") {
  //     // no-op
  //   } else {
  //     throw new Error("Method not implemented.");
  //   }

  //   // const target = this.checkFOV();
  //   // if (target) {
  //   //   this.mode = this.attack;
  //   // }
  // }

  // attack() {
  //   AttackPatterns[this.attackPattern](this, GAME)
  // }

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

  // melee() {

  //   const dist = this.distanceToTarget();
  //   if (dist > 500) {
  //     this.gotoPosition(
  //       GAME.components.Actors.take(this.attackTargetId).arcadeBody.position
  //     );
  //   } else {
  //     this.attackTarget();
  //   }
  // }

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
      this.arcadeBody.velocity.x = 30;
    }
    if (this.arcadeBody.velocity.x < -30) {
      this.arcadeBody.velocity.x = -30;
    }
    if (this.arcadeBody.velocity.y > 30) {
      this.arcadeBody.velocity.y = 30;
    }
    if (this.arcadeBody.velocity.y < -30) {
      this.arcadeBody.velocity.y = -30;
    }
  }
}

export class AiAgentStore extends SP_MapStore<AiAgentComponent> {}
