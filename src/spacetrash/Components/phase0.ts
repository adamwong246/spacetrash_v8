import { Component } from "react";
import { ISpaceTrashComponents } from ".";
import { SpaceTrashEntity } from "../Entities";
import { TwoD_Component } from "../../engine/Component";

export class Phase0 extends TwoD_Component<unknown, ISpaceTrashComponents> {
  setId = -1;
  actorIds = [];
  litIds = [];
  littableId = -1;

  constructor() {
    super();
  }

}
