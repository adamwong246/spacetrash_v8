// Gives an entity a name

import { Component } from "react";
import { MapStoreV2 } from "../../../../demiurge/ecs/Store";
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
  
}
