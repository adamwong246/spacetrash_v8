import { TankMovingStore } from "../ECS/Components/v4/TankMovingComponent";
import { IPerformanceConfig } from "../../engine/VECS.ts/ECS";

import { ActorStore } from "../ECS/Components/v3/actors";

import { NameableStore } from "../ECS/Components/v2/nameable";
import { Eid2PMStore } from "../ECS/Components/v2/eid2PMC";
import { TileComponentStore } from "../ECS/Components/v2/tileable";

import { V3AttackComponentStore } from "../ECS/Components/v3/attack";
import { AiAgentStore } from "../ECS/Components/v3/ai";
import {
  AttackableStore,
  LightIncastingStore,
} from "../ECS/Components/v1/casting/in";
import { LightOutcastingStore } from "../ECS/Components/v1/casting/out";
import { SetPieceStore } from "../ECS/Components/v3/setPieces";
import {
  RadiationDetectorStore,
  RadiationEmitterStore,
} from "../ECS/Components/v3/radiation";
import {
  HeatConductorStore,
  HeatDetectorStore,
  HeatEmitterStore,
} from "../ECS/Components/v3/heat";

import { ArcadePhysicsStore } from "../ECS/Components/v4/PhaserArcade";
import {
  DegreesDirectionStore,
  FloatMovingStore,
  FloatPositionStore,
  IntegerPositionStore,
  OrdinalDirectionStore,
  OridinalMovingStore,
} from "../../engine/game/physical";
import { ThreeJsRenderableStore } from "../../engine/rendering/threejs";
import { PixiJsRenderableStore } from "../../engine/rendering/pixijs";
import { ConsoleRenderableStore } from "../../engine/rendering/console";

import { DesktopGame } from "./1-DesktopGame";
import { MatterComponent, MatterStore } from "../../engine/physics/matterjs";
import { SamuraiComponent, SamuraiStore } from "../physics/SamuraiComponent";

export type ICanvases = "map" | "bot" | "arcadePhysics" | "thermal" | "matter" | "samurai";

export type IRenderings =
  | "2d"
  | "webgl2"
  | "pixi2d"
  | "threejs"
  | "arcadePhysics"
  | "matter"
  | "samurai"
  | null;

export abstract class GameWithStores extends DesktopGame<
  IRenderings,
  ICanvases
> {
  components = {
    MatterComponent: new MatterStore(),
    Actors: new ActorStore(),
    AiAgentComponent: new AiAgentStore(),
    ArcadePhysicsComponent: new ArcadePhysicsStore(),
    AttackableComponent: new AttackableStore(),
    ConsoleRenderableComponent: new ConsoleRenderableStore(),
    DegreesDirectionComponent: new DegreesDirectionStore(),
    Eid2PM: new Eid2PMStore(),
    FloatMovements: new FloatMovingStore(),
    FloatPositions: new FloatPositionStore(),
    HeatConductorComponent: new HeatConductorStore(),
    HeatDetectorComponent: new HeatDetectorStore(),
    HeatEmitterComponent: new HeatEmitterStore(),
    IntegerPositionComponent: new IntegerPositionStore(),
    LightIncastingComponent: new LightIncastingStore(),
    LightOutcastingComponent: new LightOutcastingStore(),
    NameableComponent: new NameableStore(),
    OrdinalDirectionComponent: new OrdinalDirectionStore(),
    OridinalMovingComponent: new OridinalMovingStore(),
    PixiJsRenderableComponent: new PixiJsRenderableStore(),
    RadiationDetectorComponent: new RadiationDetectorStore(),
    RadiationEmitterComponent: new RadiationEmitterStore(),
    SetPieces: new SetPieceStore(),
    SP_IntegerPositionComponent: new IntegerPositionStore(),
    TankMovingComponent: new TankMovingStore(),
    ThreeJsRenderableComponent: new ThreeJsRenderableStore(),
    TileComponent: new TileComponentStore(),
    V3AttackComponent: new V3AttackComponentStore(),
    SamuraiComponent: new SamuraiStore(),
  };

  constructor(
    domNode: HTMLElement,
    performanceConfig: IPerformanceConfig,
    renderings: Set<IRenderings>
  ) {
    super(performanceConfig, renderings, domNode);
  }
}
