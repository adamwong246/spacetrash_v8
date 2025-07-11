import { Component } from "../../../../demiurge/ecs/Component";
import { SP_MapStore } from "../../../../demiurge/ecs/Store";

import { PhysicsActorComponent } from "../v1/PhysicsActorComponent";
import { PhysicsSetPieceComponent } from "../v1/PhysicsSetPieceComponent";


export type ICommandToArcadeBody = (b) => unknown;

export abstract class V3AttackComponent extends Component<any, any> {

  
  abstract givenItemsInFov (
    x: number, y: number, range: number, actors
  ): ICommandToArcadeBody;
  
}

export class Kamkikaze extends V3AttackComponent {

  givenItemsInFov(a: PhysicsSetPieceComponent[], b: PhysicsActorComponent[]) {
    return (b) => {
      debugger
      return true
    };
  };
}

export class V3AttackComponentStore extends SP_MapStore<V3AttackComponent> {
  // store: Map<number, V3AttackComponent>;

  // constructor() {
  //   super();
  //   this.store = new Map();
  // }

  // add(...a: any) {
  //   throw new Error("Method not implemented.");
  // }

  // each(
  //     cb: (
  //       eid,
  //       apo: V3AttackComponent
  //     ) => void
  //   ) {
  //     this.store.forEach((value, key) => {
  //       cb(Number(key), value);
  //     });
  //   }

  
  // withIf(i: number, cb: (i: [number, DrawableComponent, string]) => void) {
  //   const x = this.store.get(i)
  //   if (x) cb([Number(i), x, i]);
  // }

  // each(
  //   arg0: (eid, le: [number, DrawableComponent, string], eidAsString) => void
  // ) {
  //   this.store.forEach((value, key) => {
  //     arg0([Number(key), value, key]);
  //   });
  // }

  // add(lc: IntegerPositionComponent, n: number) {
  //   this.store.set(n, lc);
  //   return;
  // }

  // get(n: number): DrawableComponent {
  //   return this.store.get(n);
  // }

  // make() {
  //   throw new Error("Method not implemented.");
  //   // return new DrawableComponent();
  // }

  // positionOf(eidOfLight: number): IntegerPositionComponent {
  //   return this.store.get(eidOfLight)
  // }

  // updatePostion(eid: number, p: IntegerPositionComponent) {
  //   const d = this.get(eid);

  //   // console.log("mark2", d.sprite)

  //   if (d.sprite) {
  //     d.sprite.position.x = p.x * TileSize;
  //     d.sprite.position.y = p.y * TileSize;
  //   }
  //   if (d.mesh) {
  //     d.mesh.position.x = p.x * TileSize;
  //     d.mesh.position.y = p.y * TileSize;
  //   }
  // }

  // updateLuminance(eid: number, illuminated) {
  //   const d = this.get(eid);

  //   if (d.sprite) {
  //     d.sprite.visible = illuminated;
  //   }
  //   if (d.mesh) {
  //     d.mesh.visible = illuminated;
  //   }
  // }

  // updateLuminanceByLittable(rid: number, reciver: LightIncastingComponent) {
  //   const d = this.get(rid);

  //   if (d.sprite) {
  //     d.sprite.visible = reciver.luminance > 0;
  //   }
  //   if (d.mesh) {
  //     d.mesh.visible = reciver.luminance > 0;
  //   }
  // }
}
