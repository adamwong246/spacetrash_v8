import * as PIXI from "pixi.js";
import * as THREE from "three";

import { GameWithTiledEditor } from "./2-WithTiled";

export type IAssets = {
  twoD: {
    assets: Record<string, string>;
    callback: (assets: Record<string, string>) => void;
  };
  threeD: {
    assets: Record<string, string>,

    callback: (textures: Record<string, THREE.Texture>) => {
      materials: Record<string, THREE.Material>
    };
  };
};

export abstract class GameWithRendering extends GameWithTiledEditor {

  textures: Record<string, THREE.Texture> = {}

  async start(config: IAssets) {
    super.start();

    PIXI.Assets.load(config.twoD.assets).then(config.twoD.callback);

    Object.entries(config.threeD.assets).forEach(([k, asset]) => {
      this.textures[k] = new THREE.TextureLoader().load(asset);
    })
  }
}
