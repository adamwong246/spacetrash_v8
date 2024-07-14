import { System } from "../../../engine/System";

import { LitComponent, OutCastingComponent } from "../Components/casting/out";
import { PhysicsActorComponent, PhysicsComponent, PhysicsSetComponent } from "../Components/physics";
import { LitableComponent } from "../Components/casting/in";
import { SpaceTrashEntityComponent } from "../EntityComponent";

import { ISpaceTrashSystems } from ".";

export class FOV extends System<ISpaceTrashSystems> {
  constructor() {
    super()
  }
  
  doPreLogic(entitiesComponents: SpaceTrashEntityComponent[]): void {
    const outcasters: { physicsComponent: PhysicsComponent, caster: LitComponent }[] = [];
    const incasters: { physicsComponent: PhysicsComponent, caster: LitableComponent }[] = [];

    entitiesComponents.forEach((ec) => {
      const physicsComponent = ec.components.find((c) => c.constructor.name === "PhysicsSetComponent") as PhysicsSetComponent;
      const outcaster = ec.components.find((c) => c.constructor.name === "LitComponent") as LitComponent;
      const incaster = ec.components.find((c) => c.constructor.name === "LitableComponent") as LitableComponent;
      if (physicsComponent && outcaster) {
        outcasters.push({ physicsComponent, caster: outcaster });
      }
      if (physicsComponent && incaster) {
        incasters.push({ physicsComponent, caster: incaster });
      }
    })

    // debugger;

    outcasters.forEach((oc) => {
      incasters.forEach((ic) => {
        if (
          (
            Math.abs(oc.physicsComponent.x - ic.physicsComponent.x) +
            Math.abs(oc.physicsComponent.y - ic.physicsComponent.y)) > 10) {
          ic.caster.albedo = 10;
        } else {
          ic.caster.albedo = 10;
        }
      })
    })

  }
  doPostLogic(entitiesComponents: SpaceTrashEntityComponent[]) {
    // console.log("Casting loop")
  }
}