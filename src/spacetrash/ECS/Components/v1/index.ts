
import { Component } from "../../../../demiurge/ecs/Component";
import { AttackableComponent } from "./casting/in";
import { MeleeComponent } from "./casting/out";

import { PhysicsActorComponent } from "./PhysicsActorComponent";

import { PhysicsSetPieceComponent } from "./PhysicsSetPieceComponent";

export type ISpaceTrashComponents = "physicsActor" | "physicsSet" | "attackable" | 'Melee'; 

export const SpaceTrashComponents: Record<ISpaceTrashComponents, any> = {
  'physicsActor': PhysicsActorComponent,
  'physicsSet': PhysicsSetPieceComponent,
  'attackable': AttackableComponent,
  'Melee': MeleeComponent,
}

export abstract class SpaceTrashComponent extends Component {
  
}
