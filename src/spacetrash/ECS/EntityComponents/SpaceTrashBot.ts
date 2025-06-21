import * as THREE from "three";

import { LitComponent } from "../Components/casting/out";
import { SpaceTrashEntity } from "../Entity";

import { SpaceTrashEntityComponent } from ".";
import {
  FloatPositionComponent,
  DegreesDirectionComponent,
  FloatMovingComponent,
} from "../Components/v2/physical";
import { LitableComponent } from "../Components/casting/in";
import { NameableComponent } from "../Components/v2/nameable";

import RandomMaleNames from "./../../NameGenerator";
import { ClassificationComponent } from "../Components/v2/classifiable";
import { DrawableComponent } from "../Components/v2/drawable";
import { blueMaterial } from "../../threejs";

const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1);

export class SpaceTrashBot extends SpaceTrashEntityComponent {
  constructor(
    x: number = 0,
    y: number = 0,
    r: number = 0,
    dx: number = 0,
    dy: number = 0,
    name?: string
  ) {
    const spe = new SpaceTrashEntity();

    super(spe, [
      new FloatPositionComponent(x, y),
      new DegreesDirectionComponent(r),
      new FloatMovingComponent(dx, dy),
      new LitComponent(),
      new LitableComponent(),
      new NameableComponent(RandomMaleNames.generate("male", spe)),
      new ClassificationComponent("SpaceTrashBot"),

      new DrawableComponent("bunny", new THREE.Mesh(cylinderGeometry, blueMaterial)), 
    ]);
  }

  static name(
    bots: {
      1: number;
      2: number;
      3: number;
      4: number;
      5: number;
      6: number;
      7: number;
      8: number;
      9: number;
    },
    eidOfBot: string
  ) {
    return eidOfBot;
  }

}
