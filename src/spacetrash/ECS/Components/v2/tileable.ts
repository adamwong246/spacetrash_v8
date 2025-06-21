// Gives an entity the name of it's EntityComponent

import { ISpaceTrashComponents } from "..";
import { Component } from "../../../../engine/VECS.ts/Component";
import { EntityComponentStore, Store } from "../../../../engine/VECS.ts/types";
import { ITiles } from "../../EntityComponents";

export class TileComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  tileType: ITiles;

  constructor(tileType: ITiles) {
    super();
    this.tileType = tileType;
  }
}

export class TileComponentStore extends Store<Record<number, ITiles>> {
  
  store: Record<number, ITiles> = {};

  constructor() {
    super();
  }

  get(n: number) {
    return this.store[n];
  }
  
  add(c: ITiles, i: number) {
    this.store[i] = c
  }

  make(entityConstructorName: string) {
    throw "not implemented"
    // return new ClassificationComponent(entityConstructorName);
  }

  // pmcOfEid(eid: number): { position: any; moving: any; classification: any } {
  //   throw new Error("Method not implemented.");
  // }
}
