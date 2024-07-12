import { System } from "./System";

export default abstract class Component<IMove, IComponents> {
  systems: System<any>[];
  
  constructor(
    systems: System<any>[],
  ) {
    this.systems = systems;
  }

  abstract getMove(): IMove
  abstract setMove(move: IMove)
  // abstract payload(): any

}
