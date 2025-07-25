import { TankMovingStore } from "../ECS/Components/v4/TankMovingComponent";

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

import {
  DegreesDirectionStore,
  FloatMovingStore,
  FloatPositionStore,
  IntegerPositionStore,
  OrdinalDirectionStore,
  OridinalMovingStore,
} from "../../demiurge/game/physical";
import { ThreeJsRenderableStore } from "../../demiurge/rendering/threejs";
import { PixiJsRenderableStore } from "../../demiurge/rendering/pixijs";
import { ConsoleRenderableStore } from "../../demiurge/rendering/console";

import { SamuraiTileStore } from "../physics/SamuraiTile";

import { IPerformanceConfig } from "../../demiurge/ecs/ECS";

import { SP_PhysicalStore } from "../../demiurge/physics/SP_Physical";
import { GamWithAssets as GameWithAssets } from "./2-WithAssets";

import { UpgradeStore } from "../ECS/Stores/UpgradeStore";


export type ICanvases =
  | "map"
  | "bot"
  | "arcadePhysics"
  | "thermal"
  | "matter"
  | "samurai";

export type IRenderings =
  | "2d"
  | "webgl2"
  | "pixi2d"
  | "threejs"
  | "arcadePhysics"
  | "matter"
  | "samurai"
  | null;

export abstract class GameWithStores extends GameWithAssets<IRenderings> {
  components = {
    Actors: new ActorStore(), 
    AiAgentComponent: new AiAgentStore(),
    AttackableComponent: new AttackableStore(),
    ConsoleRenderableComponent: new ConsoleRenderableStore(),
    DegreesDirectionComponent: new DegreesDirectionStore(),
    Eid2PM: new Eid2PMStore(),
    FloatMovingComponent: new FloatMovingStore(),
    FloatPositions: new FloatPositionStore(),
    HeatConductorComponent: new HeatConductorStore(),
    HeatDetectorComponent: new HeatDetectorStore(),
    HeatEmitterComponent: new HeatEmitterStore(),
    IntegerPositionComponent: new IntegerPositionStore(),
    LightIncastingComponent: new LightIncastingStore(),
    LightOutcastingComponent: new LightOutcastingStore(),
    NameableComponent: new NameableStore(),
    // NavSenseComponent: new NavSenseStore(),
    // NearSenseComponent: new NearSenseStore(),
    OrdinalDirectionComponent: new OrdinalDirectionStore(),
    OridinalMovingComponent: new OridinalMovingStore(),
    PixiJsRenderableComponent: new PixiJsRenderableStore(),
    RadiationDetectorComponent: new RadiationDetectorStore(),
    RadiationEmitterComponent: new RadiationEmitterStore(),
    SamuraiTileComponent: new SamuraiTileStore(),
    SetPieces: new SetPieceStore(),
    SP_IntegerPositionComponent: new IntegerPositionStore(),
    SP_PhysicalComponent: new SP_PhysicalStore(),
    TankMovingComponent: new TankMovingStore(),
    ThreeJsRenderableComponent: new ThreeJsRenderableStore(),
    TileComponent: new TileComponentStore(),
    Upgrades: new UpgradeStore(), 
    V3AttackComponent: new V3AttackComponentStore(),
  };

  constructor(
    domNode: HTMLElement,
    performanceConfig: IPerformanceConfig,
    renderings: Set<IRenderings>
  ) {
    super(domNode, performanceConfig, renderings);
  }
}
