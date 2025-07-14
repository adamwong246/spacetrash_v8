import { Component } from "../ecs/Component";
import { SP_MapStore } from "../ecs/SP_MapStore";

export abstract class RenderableComponent extends Component {
  dirty: boolean;

  constructor() {
    super();
    this.dirty = true;
  }

  makeDirty() {
    this.dirty = true;
  }
}

export abstract class RenderableStore extends SP_MapStore<RenderableComponent> {}
