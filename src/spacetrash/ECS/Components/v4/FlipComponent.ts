import { Component } from "../../../../demiurge/ecs/Component";
import { MapStoreV2, StoreV2 } from "../../../../demiurge/ecs/Store";

export class FlipComponent extends Component<any, any> {

  flippedHorizontally: boolean;
  flippedVertically: boolean;
  flippedDiagonally: boolean;

  constructor(
    flippedHorizontally: boolean,
    flippedVertically: boolean,
    flippedDiagonally: boolean,
  ) {
    super();
    this.flippedHorizontally = flippedHorizontally;
    this.flippedVertically = flippedVertically;
    this.flippedDiagonally = flippedDiagonally;
  }
}

export class FlipStore extends MapStoreV2<FlipComponent>{

}