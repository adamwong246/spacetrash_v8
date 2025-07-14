import { Component } from "../../../../demiurge/ecs/Component";
import { SP_MapStore } from "../../../../demiurge/ecs/SP_MapStore";
import { PositionComponent } from "../../../../demiurge/game/physical";

export class Eid2PMComponent extends Component {
  position: PositionComponent;
  classification: string;

  constructor(position: PositionComponent, classification: string) {
    super();
    this.position = position;
    this.classification = classification;
  }

  getAbsoluteXandY(eid: number) {
    return this.position.getAbsoluteXandY();
  }

  getTileXAndY(eid: number) {
    return this.position.getTileXAndY();
  }
}

export class Eid2PMStore extends SP_MapStore<Eid2PMComponent> {
  getAbsoluteXandY(eid: number) {
    const { classification, position } = this.take(eid);
    return position.getAbsoluteXandY();
  }

  getTileXAndY(eid: number) {
    const { classification, position } = this.take(eid);
    return position.getTileXAndY();
  }
}
