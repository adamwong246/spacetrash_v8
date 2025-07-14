import { Component } from "react";
import { SpaceTrashEntityComponent } from "..";
// import { HeatConductorComponent } from "../../Components/v3/heat";
import { SpaceTrashEntity } from "../../Entity";


export class Upgrade extends SpaceTrashEntityComponent {
  constructor() {
    const spe = new SpaceTrashEntity();

    const comps: Component[] = [
      
      // new HeatConductorComponent(1),
    ];

    super(spe, comps);
  }

  
}
