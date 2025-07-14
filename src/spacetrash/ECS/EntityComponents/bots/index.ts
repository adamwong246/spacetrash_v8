import * as PIXI from "pixi.js";
import * as THREE from "three";

import { SpaceTrashEntityComponent } from "..";
import { TileSize, ActorSize } from "../../../Constants";

export class Actor extends SpaceTrashEntityComponent {}

export const cylinderGeometry = new THREE.CylinderGeometry(
  TileSize / 4,
  TileSize / 2,
  TileSize
);

export const bunnySprite = () => {
  const s = new PIXI.Sprite(
    PIXI.Texture.from("https://pixijs.com/assets/bunny.png")
  );
  s.width = ActorSize;
  s.height = ActorSize;
  s.anchor = 0.5;
  return s;
};
