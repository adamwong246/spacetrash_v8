import { Component } from "../../../../demiurge/ecs/Component";

import { ISpaceTrashComponents } from "../v1";
import { MapStoreV2 } from "../../../../demiurge/ecs/Store";

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

export class RadiationEmitterStore extends MapStoreV2<RadiationEmitterComponent> {}

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

export class RadiationDetectorStore extends MapStoreV2<RadiationDetectorComponent> {}
