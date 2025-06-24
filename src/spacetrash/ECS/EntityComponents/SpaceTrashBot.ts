import { Text, TextStyle, Ticker } from 'pixi.js';
import * as PIXI from "pixi.js";
import * as THREE from "three";

import { LightOutcastingComponent } from "../Components/casting/out";
import { SpaceTrashEntity } from "../Entity";

import { SpaceTrashEntityComponent } from ".";
import {
  FloatPositionComponent,
  DegreesDirectionComponent,
  FloatMovingComponent,
  TankMovingComponent,
} from "../Components/v2/physical";
import { NameableComponent } from "../Components/v2/nameable";

import RandomMaleNames from "./../../NameGenerator";
import { ClassificationComponent } from "../Components/v2/classifiable";
import { DrawableComponent } from "../Components/v2/drawable";
import { greenMaterial } from "../../threejs";

import { degToRad } from "three/src/math/MathUtils.js";
import { ActorSize, TileSize } from "../../Constants";
import { LightIncastingComponent } from "../Components/casting/in";
import { SpaceTrash } from "../..";

const cylinderGeometry = new THREE.CylinderGeometry(
  TileSize / 4,
  TileSize / 2,
  TileSize
);

const cylinder = () => {
  const m = new THREE.Mesh(cylinderGeometry, greenMaterial);
  m.rotateZ(degToRad(90));
  m.rotateX(degToRad(90));
  return m;
};

const bunnySprite = () => {
  const s = new PIXI.Sprite(
    PIXI.Texture.from("https://pixijs.com/assets/bunny.png")
  );
  s.width = ActorSize;
  s.height = ActorSize;
  s.anchor = 0.5;
  return s;
};

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
      new TankMovingComponent(dx, dy),
      new LightOutcastingComponent(1),
      new LightIncastingComponent(1),
      new NameableComponent(name || RandomMaleNames.generate("male", spe)),
      new ClassificationComponent("SpaceTrashBot"),

      new DrawableComponent(
        bunnySprite(),
        cylinder(),
        new Text('?')

      ),
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
