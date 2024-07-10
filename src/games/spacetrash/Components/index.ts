import { AttackableComponent } from "./casting/in";
import { MeleeComponent } from "./casting/out";

import { PhysicsActorComponent, PhysicsSetComponent } from "./physics";

export type ISpaceTrashComponents = "physicsActor" | "physicsSet" | "attackable" | 'Melee'; 

export const SpaceTrashComponents: Record<ISpaceTrashComponents, any> = {
  'physicsActor': PhysicsActorComponent,
  'physicsSet': PhysicsSetComponent,
  'attackable': AttackableComponent,
  'Melee': MeleeComponent,
}