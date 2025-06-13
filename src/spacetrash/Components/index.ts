

import {Component} from "../../engine/Component";
import { PhysicsActorComponent } from "./actor";
import { AttackableComponent } from "./casting/in";
import { MeleeComponent } from "./casting/out";
import { PhysicsSetPieceComponent } from "./setPiece";


export type ISpaceTrashComponents = "physicsActor" | "physicsSet" | "attackable" | 'Melee'; 

export const SpaceTrashComponents: Record<ISpaceTrashComponents, any> = {
  'physicsActor': PhysicsActorComponent,
  'physicsSet': PhysicsSetPieceComponent,
  'attackable': AttackableComponent,
  'Melee': MeleeComponent,
}

export abstract class SpaceTrashComponent extends Component<unknown, ISpaceTrashComponents> {
  
}