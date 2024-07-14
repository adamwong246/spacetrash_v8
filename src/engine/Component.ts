import { Entity } from "./Entity";
import { System } from "./System";
import { uuidv4 } from "./lib";

export default abstract class Component<IMove, IComponents> {
  uuid: string;
  entity: Entity;
  systems: System<any>[];
  
  constructor(
    entity: Entity,
    systems: System<any>[],
    
  ) {
    this.systems = systems;
    this.entity = entity;
    this.uuid = uuidv4();
  }

}
