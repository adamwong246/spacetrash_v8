import { Component } from "../VECS.ts/Component";
import { ISpaceTrashComponents } from "../../spacetrash/ECS/Components/v1";
import { MapStoreV2 } from "../VECS.ts/Store";

export abstract class RenderableComponent extends Component<
  any,
  ISpaceTrashComponents
> {
  dirty: boolean;

  constructor() {
    super();
    this.dirty = true;
  }

  makeDirty() {
    this.dirty = true;
  }
}

export abstract class RenderableStore extends MapStoreV2<RenderableComponent> {}
