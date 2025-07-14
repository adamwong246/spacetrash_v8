// Gives an entity the name of it's EntityComponent

import { Component } from "../../../../demiurge/ecs/Component";
import { SP_MapStore } from "../../../../demiurge/ecs/SP_MapStore";
import { ITiles } from "../../EntityComponents/tiles";

export class TileComponent extends Component {
  tileType: ITiles;

  constructor(tileType: ITiles) {
    super();
    this.tileType = tileType;
  }
}

export class TileComponentStore extends SP_MapStore<ITiles> {}
