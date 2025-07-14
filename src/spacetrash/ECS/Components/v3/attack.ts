import { Component } from "../../../../demiurge/ecs/Component";
import { SP_MapStore } from "../../../../demiurge/ecs/SP_MapStore";

import { PhysicsActorComponent } from "../v1/PhysicsActorComponent";
import { PhysicsSetPieceComponent } from "../v1/PhysicsSetPieceComponent";

export type ICommandToArcadeBody = (b) => unknown;

export abstract class V3AttackComponent extends Component {
  abstract givenItemsInFov(
    x: number,
    y: number,
    range: number,
    actors
  ): ICommandToArcadeBody;
}

export class Kamkikaze extends V3AttackComponent {
  givenItemsInFov(a: PhysicsSetPieceComponent[], b: PhysicsActorComponent[]) {
    return (b) => {
      return true;
    };
  }
}

export class V3AttackComponentStore extends SP_MapStore<V3AttackComponent> {}
