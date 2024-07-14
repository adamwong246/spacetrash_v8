import { System } from "./System";

export default abstract class Component<IMove, IComponents> {
  entity: string;
  systems: System<any>[];
  
  constructor(
    systems: System<any>[],
    entity: string,
  ) {
    this.systems = systems;
    this.entity = entity;
  }

  abstract getMove(): IMove
  abstract setMove(move: IMove)

}
