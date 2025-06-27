// Gives an entity the name of it's EntityComponent

import { Component } from "../../../../engine/VECS.ts/Component";
import { EntityComponentStore, Store } from "../../../../engine/VECS.ts/types";
import { ISpaceTrashComponents } from "../v1";

export class ClassificationComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  entityConstructorName: string;

  constructor(entityConstructorName: string) {
    super();
    this.entityConstructorName = entityConstructorName;
  }
}

export class ClassificationStore extends Store<Record<number, string>> {
  
  store: Record<number, string> = {};

  constructor() {
    super();
  }

  get(n: number) {
    return this.store[n];
  }
  
  add(c: any, i: number) {
    this.store[i] = c.entityConstructorName
  }

  make(entityConstructorName: string) {
    throw "not implemented"
    // return new ClassificationComponent(entityConstructorName);
  }

  // pmcOfEid(eid: number): { position: any; moving: any; classification: any } {
  //   throw new Error("Method not implemented.");
  // }
}
