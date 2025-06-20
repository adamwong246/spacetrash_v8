// Gives an entity a name

import { ISpaceTrashComponents } from "..";
import { Component } from "../../../../engine/VECS.ts/Component";
import { EntityComponentStore } from "../../../../engine/VECS.ts/types";

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

export class NameableStore extends EntityComponentStore<NameableComponent> {
  constructor() {
    super();
  }

  make(name: string) {
    return new NameableComponent(name);
  }
}
