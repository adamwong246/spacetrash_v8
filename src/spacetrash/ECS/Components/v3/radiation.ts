import { Component } from "../../../../demiurge/ecs/Component";
import { SP_MapStore } from "../../../../demiurge/ecs/SP_MapStore";

export class RadiationEmitterComponent extends Component {
  rads: number;

  constructor(r: number) {
    super();
    this.rads = r;
  }
}

export class RadiationEmitterStore extends SP_MapStore<RadiationEmitterComponent> {}

export class RadiationDetectorComponent extends Component {
  rads: number;

  constructor(r: number) {
    super();
    this.rads = r;
  }
}

export class RadiationDetectorStore extends SP_MapStore<RadiationDetectorComponent> {}
