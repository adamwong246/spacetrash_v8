// Gives an entity the name of it's EntityComponent

import { Component } from "../../../../engine/VECS.ts/Component";
import { MapStoreV2 } from "../../../../engine/VECS.ts/Store";

import { ITiles } from "../../EntityComponents";
import { ISpaceTrashComponents } from "../v1";

export class TileComponent extends Component<unknown, ISpaceTrashComponents> {
  tileType: ITiles;

  constructor(tileType: ITiles) {
    super();
    this.tileType = tileType;
  }
}

export class TileComponentStore extends MapStoreV2<ITiles> {
  // store: Record<number, ITiles> = {};

  // constructor() {
  //   super();
  // }

  // get(n: number) {
  //   return this.store[n];
  // }

  // add(c: ITiles, i: number) {
  //   this.store[i] = c;
  // }

  // make(entityConstructorName: string) {
  //   throw "not implemented";
  //   // return new ClassificationComponent(entityConstructorName);
  // }

  // pmcOfEid(eid: number): { position: any; moving: any; classification: any } {
  //   throw new Error("Method not implemented.");
  // }
}
