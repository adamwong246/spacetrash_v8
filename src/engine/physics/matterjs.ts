import { Component } from "../VECS.ts/Component";
import { MapStoreV2, StoreV2 } from "../VECS.ts/Store";

export class MatterComponent extends Component<any, any> {
  matterBody: Matter.Body;

  constructor(matterBody: Matter.Body) {
    super();
    this.matterBody = matterBody;
  }
}

export class MatterStore extends MapStoreV2<MatterComponent> {}
