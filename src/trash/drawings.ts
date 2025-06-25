// import { ISpaceTrashComponents } from "..";
// import { Component } from "../../../../engine/VECS.ts/Component";
// import { Store } from "../../../../engine/VECS.ts/types";
// import { DrawableComponent } from "./drawable";
// import { FloatPositionComponent } from "./physical";

// export class DrawingComponent extends Component<
//   unknown,
//   ISpaceTrashComponents
// > {
//   drawable: DrawableComponent;

//   constructor() {
//     super();
//   }
// }

// export class DrawingStore extends Store<any> {
//   disposeOf(eid) {
//     delete this.store[eid];
//   }
//   // store: DrawingComponent[] = [];
//   store: Record<number, DrawingComponent>;

//   get(n: number) {
//     return this.store[n];
//   }

//   add(a: DrawingComponent, eid: number) {
//     // this.store.push(a);
//     // this.store[eid] = new DrawableComponent()
//     throw "method not implemented";
//   }

//   make() {
//     return new DrawingComponent();
//   }

//   updatePostion(n: number, p: FloatPositionComponent) {
//     if (!this.store[n]) {
//       throw 'wtf'
//     }

//     this.store[n].drawable.sprite.position.x = p.x;
//     this.store[n].drawable.sprite.position.y = p.y;
//   }
// }
