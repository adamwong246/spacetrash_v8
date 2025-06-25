import * as PIXI from "pixi.js";
import * as THREE from "three";

import { degToRad } from "three/src/math/MathUtils.js";
import { SpaceTrashEntityComponent } from "..";
import { TileSize, ActorSize } from "../../../Constants";
import { greenMaterial, redMaterial } from "../../../threejs";

export class Actor extends SpaceTrashEntityComponent { 
  
}

export const cylinderGeometry = new THREE.CylinderGeometry(
  TileSize / 4,
  TileSize / 2,
  TileSize
);

export const cylinder = () => {
  const m = new THREE.Mesh(cylinderGeometry, greenMaterial);
  m.rotateZ(degToRad(90));
  m.rotateX(degToRad(90));
  return m;
};

export const spike = () => {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(
    TileSize /2,
    0,
    TileSize
  ), redMaterial);
  m.rotateZ(degToRad(90));
  m.rotateX(degToRad(90));
  return m;
};

export const bunnySprite = () => {
  const s = new PIXI.Sprite(
    PIXI.Texture.from("https://pixijs.com/assets/bunny.png")
  );
  s.width = ActorSize;
  s.height = ActorSize;
  s.anchor = 0.5;
  return s;
};