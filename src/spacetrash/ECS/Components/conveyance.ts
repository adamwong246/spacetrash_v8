import { Component } from "../../../engine/VECS.ts/Component";

import { ISpaceTrashComponents } from ".";

export abstract class ConveyanceComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  constructor() {
    super();
  }
}

export class WheeledComponent extends ConveyanceComponent {
  forwardback: 0 | 1 | -1;
  leftright: 0 | 1 | -1;
}

export class PanningComponent extends ConveyanceComponent {
  leftright: 0 | 1 | -1;
}

export class SpawningComponent extends ConveyanceComponent {
  direction: number;
}

export class UnmovingComponent extends ConveyanceComponent {}
