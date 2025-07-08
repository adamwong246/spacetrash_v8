import { dir } from "console";

import { SpaceTrashEntityComponent } from "..";
import { LightIncastingComponent } from "../../Components/v1/casting/in";
import { ArcadePhysicsComponent } from "../../Components/v2/arcadePhysics";
import { IntegerPositionComponent } from "../../Components/v2/physical";
import { TileComponent } from "../../Components/v2/tileable";
import { HeatConductorComponent } from "../../Components/v3/heat";
import { SpaceTrashEntity } from "../../Entity";
import { Component } from "../../../../demiurge/ecs/Component";

export class Upgrade extends SpaceTrashEntityComponent {
  constructor() {
    const spe = new SpaceTrashEntity();

    const comps: Component<any, any>[] = [
      
      new HeatConductorComponent(1),
    ];

    super(spe, comps);
  }

  
}
