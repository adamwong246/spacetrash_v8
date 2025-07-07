export abstract class Component<IMove, IComponents> {}

export abstract class OneD_Component<IMove, IComponents> extends Component<
  IMove,
  IComponents
> {}

export abstract class TwoD_Component<IMove, IComponents> extends Component<
  IMove,
  IComponents
> {}

export abstract class TwoDOneD_Component<IMove, IComponents> extends Component<
  IMove,
  IComponents
> {
  // // culledWebgl: boolean;
  // renderedWebgl:
  //   | `new`
  //   | `rendered`
  //   | `culled`
  //   | `invisible`
  //   | `visible`
  //   | `no-op`;
  // // culled2d: boolean;
  // rendered2d: `new` | `rendered` | `culled` | `invisible` | `visible` | `no-op`;
}
