import { SP_MapStore } from "../../../../demiurge/ecs/SP_MapStore";
import { FloatPositionComponent } from "../../../../demiurge/game/physical";

export type LightComponent = FloatPositionComponent;

export class LightComponentStore extends SP_MapStore<any> {}

export type LightingComponent = FloatPositionComponent;

export class LightingComponentStore extends SP_MapStore<any> {}
