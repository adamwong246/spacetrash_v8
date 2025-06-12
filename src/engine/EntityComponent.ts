import { Component } from './Component';
import { Entity } from './Entity';

export abstract class EntityComponent {
  
  entity: Entity
  components: Component<any, any>[];

  constructor(entity: Entity, components: Component<any, any>[]) {
    this.entity = entity;
    this.components = components;
  }

  applyComponent (c: Component<any, any>) {
    this.components.push(c)
  }

  // abstract validate: () => any
  // abstract validate(): void 
  // validate() {
  //   throw new Error("Method not implemented.");
  // }
}