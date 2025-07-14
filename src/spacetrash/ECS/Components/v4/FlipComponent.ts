import { Component } from "../../../../demiurge/ecs/Component";
import { SP_MapStore } from "../../../../demiurge/ecs/SP_MapStore";

export class FlipComponent extends Component {
  flippedHorizontally: boolean;
  flippedVertically: boolean;
  flippedDiagonally: boolean;

  constructor(
    flippedHorizontally: boolean,
    flippedVertically: boolean,
    flippedDiagonally: boolean
  ) {
    super();
    this.flippedHorizontally = flippedHorizontally;
    this.flippedVertically = flippedVertically;
    this.flippedDiagonally = flippedDiagonally;
  }
}

export class FlipStore extends SP_MapStore<FlipComponent> {}
