import { Component } from "../../../engine/VECS.ts/Component";

import { ISpaceTrashComponents } from ".";

export abstract class PoweredComponent extends Component<
  unknown,
  ISpaceTrashComponents
> {
  constructor() {
    super();
  }
}

export class PowerProducingComponent extends PoweredComponent {
  amps: () => number;
  damage: (volts, amps) => any;
}

export class PowerConsumingComponent extends PoweredComponent {
  amps: () => number;
  damage: (amps) => any;
}

export class PowerStoringComponent extends PoweredComponent {
  voltsCurrent: number;
  voltsMax: number;
  amps: () => number;
  damage: (volts, amps) => any;
}

export class PowerTransmitingComponent extends PoweredComponent {
  damage: (amps) => any;
}
