// Gives an entity the name of it's EntityComponent

import { Component } from "react";
import { MapStoreV2 } from "../../../../demiurge/ecs/Store";
import { ITiles } from "../../EntityComponents/tiles";
import { ISpaceTrashComponents } from "../v1";

export class TileComponent extends Component<unknown, ISpaceTrashComponents> {
  tileType: ITiles;

  constructor(tileType: ITiles) {
    super();
    this.tileType = tileType;
  }
}

export class TileComponentStore extends MapStoreV2<ITiles> {
  
}
