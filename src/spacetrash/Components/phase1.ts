import { Component } from "react";
import { ISpaceTrashComponents } from ".";
import { SpaceTrashEntity } from "../Entities";
import { TwoD_Component } from "../../engine/Component";
import { ComponentStore } from "../../engine/types";

export class Phase1 extends TwoD_Component<unknown, ISpaceTrashComponents> {

  constructor() {
    super();
  }

}

export class Phase1Store extends ComponentStore {
  store: Phase1[];
  
  constructor() {
    super();
    this.store = [];
  }

  add(a: any) {
    throw new Error("Method not implemented.");
  }

  make() {
    return new Phase1();
  }

}
