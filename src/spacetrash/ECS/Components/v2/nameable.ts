// Gives an entity a name
import { SP_MapStore } from "../../../../demiurge/ecs/SP_MapStore";
import { Component } from "../../../../demiurge/ecs/Component";

export class NameableComponent extends Component {
  name: string

  constructor(name: string) {
    super();
    this.name = name;
  }
}

export class NameableStore extends SP_MapStore<NameableComponent> {
  
}
