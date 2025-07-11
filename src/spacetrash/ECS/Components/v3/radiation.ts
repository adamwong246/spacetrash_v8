import { Component } from "../../../../demiurge/ecs/Component";

import { ISpaceTrashComponents } from "../v1";
import { SP_MapStore } from "../../../../demiurge/ecs/Store";

export class RadiationEmitterComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  rads: number;

  constructor(r: number) {
    super();
    this.rads = r;
  }
}

export class RadiationEmitterStore extends SP_MapStore<RadiationEmitterComponent> {}

export class RadiationDetectorComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  rads: number;

  constructor(r: number) {
    super();
    this.rads = r;
  }
}

export class RadiationDetectorStore extends SP_MapStore<RadiationDetectorComponent> {}
