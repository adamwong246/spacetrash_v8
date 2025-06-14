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
  culledWebgl: boolean;
  renderedWebgl: `new` | `fresh` | "unchanged" | "changed" | `rendered`;
  culled2d: boolean;
  rendered2d: `new` | `fresh` | "unchanged" | "changed" | `rendered`;
}
