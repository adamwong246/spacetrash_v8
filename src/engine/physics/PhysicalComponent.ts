import { PositionComponent } from "../game/physical";
import { Component } from "../VECS.ts/Component";
import { MapStoreV2 } from "../VECS.ts/Store";

export abstract class PhysicalComponent extends PositionComponent {
  constructor() {
    super();
  }
}

export abstract class PhysicalStore extends MapStoreV2<PhysicalComponent> {}
