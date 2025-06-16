import { Component } from "./Component";
import { Entity } from "./Entity";

export abstract class EntityComponent {
  // eid: number;
  entity: Entity;
  components: Component<any, any>[];

  // public static counter = -1;

  constructor(entity: Entity, components: Component<any, any>[]) {
    this.entity = entity;
    this.components = components;
    // EntityComponent.counter++;
    // this.eid = EntityComponent.counter;
  }

  applyComponent(c: Component<any, any>) {
    this.components.push(c);
  }
}
