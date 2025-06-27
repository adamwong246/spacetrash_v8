
import {
  Component,
} from "../../../../engine/VECS.ts/Component";
import {
  Store,
} from "../../../../engine/VECS.ts/types";
import { ISpaceTrashComponents } from "../v1";
import { DrawableComponent } from "./drawable";

import {
  PositionComponent,
} from "./physical";

export class Eid2PMComponent extends Component<any, ISpaceTrashComponents> {
  position: PositionComponent;
  classification: string;

  constructor(
    position: PositionComponent,
    classification: string
  ) {
    super();
    this.position = position;
    this.classification = classification;
  }
}

export class Eid2PMStore extends Store<Record<number, Eid2PMComponent>> {
  
  store: Record<number, Eid2PMComponent> = {};

  add(e: Eid2PMComponent, n: number) {
    this.store[n] = e;
  }
  // store: DrawableComponent;

  get(n: number) {
    return this.store[n];
  }

  // add(a: DrawableComponent) {
  //   // super.add(a);
  // }

  make() {
    throw new Error("Method not implemented.");
    return new DrawableComponent();
  }

  // positionOf(eidOfLight: number): FloatPositionStore {
  //   throw new Error("Method not implemented.");
  // }

  // updatePostion(eid: number, p: FloatPositionComponent) {
  //   const d = this.get(eid);

  //   // console.log("mark2", d.sprite)

  //   if (d.sprite) {
  //     d.sprite.position.x = p.x;
  //     d.sprite.position.y = p.y;
  //   }
  //   if (d.mesh) {
  //     d.mesh.position.x = p.x;
  //     d.mesh.position.y = p.y;
  //   }
  //   //
  //   // d.x = p.x;
  //   // d.y = p.y;
  //   // this.sp
  // }
}
