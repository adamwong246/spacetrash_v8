// Gives an entity a name

import { Component } from "../../../engine/VECS/Component"; 
import { MapStoreV2 } from "../../../engine/VECS/Store";

import { ISpaceTrashComponents } from "../v1";

export class NameableComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  name: string

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export class NameableStore extends MapStoreV2<NameableComponent> {
  // constructor() {
  //   super();
  // }

  // make(name: string) {
  //   return new NameableComponent(name);
  // }
}
