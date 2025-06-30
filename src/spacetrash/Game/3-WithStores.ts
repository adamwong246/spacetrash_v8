import { Ticker } from "pixi.js";

import { StateSpace } from "../../engine/StateSpace";
import { IPerformanceConfig } from "../../engine/VECS.ts/ECS";

import { ITerminalLine, TerminalGame } from "./2-Terminal";

import { ActorStore } from "../ECS/Components/v3/actors";
import {
  IntegerPositionStore,
  FloatPositionStore,
  DegreesDirectionStore,
  FloatMovingStore,
  OrdinalDirectionStore,
  OridinalMovingStore,
  TankMovingStore,
} from "../ECS/Components/v2/physical";
import { NameableStore } from "../ECS/Components/v2/nameable";
import { Eid2PMStore } from "../ECS/Components/v2/eid2PMC";
import { TileComponentStore } from "../ECS/Components/v2/tileable";
import { FPS } from "../Constants";
import { DrawableStoreV2 } from "../ECS/Components/v2/drawable";
import { ArcadePhysicsStore } from "../ECS/Components/v2/arcadePhysics";
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
import { System } from "../../engine/VECS.ts/System";
import { IRenderings, ICanvases } from ".";

export abstract class GameWithStores extends TerminalGame<
  IRenderings,
  ICanvases,
  {
    Actors: ActorStore;
    AiAgentComponent: AiAgentStore;
    ArcadePhysicsComponent: ArcadePhysicsStore;
    AttackableComponent: AttackableStore;
    DegreesDirectionComponent: DegreesDirectionStore;
    DrawableComponent: DrawableStoreV2;
    Eid2PM: Eid2PMStore;
    FloatMovements: FloatMovingStore;
    FloatPositions: FloatPositionStore;
    HeatDetectorComponent: HeatDetectorStore;
    HeatEmitterComponent: HeatEmitterStore;
    HeatConductorComponent: HeatConductorStore;
    IntegerPositionComponent: IntegerPositionStore;
    LightIncastingComponent: LightIncastingStore;
    LightOutcastingComponent: LightOutcastingStore;
    NameableComponent: NameableStore;
    OrdinalDirectionComponent: OrdinalDirectionStore;
    OridinalMovingComponent: OridinalMovingStore;
    RadiationDetectorComponent: RadiationDetectorStore;
    RadiationEmitterComponent: RadiationEmitterStore;
    SetPieces: SetPieceStore;
    TankMovingComponent: TankMovingStore;
    TileComponent: TileComponentStore;
    V3AttackComponent: V3AttackComponentStore;
  }
> {
  constructor(
    stateSpace: StateSpace,
    system: System,
    domNode: HTMLElement,
    performanceConfig: IPerformanceConfig,
    renderings: Set<IRenderings>
  ) {
    super(
      stateSpace,
      system,
      {
        Actors: new ActorStore(),
        AiAgentComponent: new AiAgentStore(),
        ArcadePhysicsComponent: new ArcadePhysicsStore(),
        AttackableComponent: new AttackableStore(),
        DegreesDirectionComponent: new DegreesDirectionStore(),
        DrawableComponent: new DrawableStoreV2(),
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
        RadiationDetectorComponent: new RadiationDetectorStore(),
        RadiationEmitterComponent: new RadiationEmitterStore(),
        SetPieces: new SetPieceStore(),
        TankMovingComponent: new TankMovingStore(),
        TileComponent: new TileComponentStore(),
        V3AttackComponent: new V3AttackComponentStore(),
      },

      performanceConfig,
      renderings,
      domNode
    );
  }
}
