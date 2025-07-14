import { SP_MapStore } from "../ecs/SP_MapStore";
import { FloatPositionComponent } from "../game/physical";


export abstract class PhysicalComponent extends FloatPositionComponent {
  constructor(x, y) {
    super(x, y);
  }
}

export abstract class PhysicalStore extends SP_MapStore<PhysicalComponent> {}
