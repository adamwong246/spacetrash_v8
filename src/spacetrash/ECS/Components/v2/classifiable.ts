// Gives an entity the name of it's EntityComponent

import { ISpaceTrashComponents } from "..";
import { Component } from "../../../../engine/VECS.ts/Component";
import { EntityComponentStore } from "../../../../engine/VECS.ts/types";

export class ClassificationComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  entityConstructorName: string

  constructor(entityConstructorName: string) {
    super();
    this.entityConstructorName = entityConstructorName;
  }
}

export class ClassificationStore extends EntityComponentStore<ClassificationComponent> {
  constructor() {
    super();
  }

  make(entityConstructorName: string) {
    
    return new ClassificationComponent(entityConstructorName);
  }
}
