import * as PIXI from "pixi.js";
import * as THREE from "three";

import { GameWithTiledEditor } from "./2-WithTiled";
import { IPerformanceConfig } from "../ecs/ECS";
import { EntityComponent } from "../ecs/EntityComponent";

export type IAssets = {
  twoD: {
    assets: string[];
    // Record<string, string>;
    callback: (assets: Record<string, string>) => void;
  };
  threeD: {
    assets: string[];
    // Record<string, string>;

    callback: (textures: Record<string, THREE.Texture>) => {
      materials: Record<string, THREE.Material>;
    };
  };
};

export abstract class GameWithRendering extends GameWithTiledEditor {
  constructor(performanceConfig: IPerformanceConfig) {
    super(performanceConfig);
  }

  public three_d_textures: Record<string, THREE.Texture> = {};
  public two_d_images;

  async start(config: IAssets) {
    super.start(config);

    PIXI.Assets.load(Object.values(config.twoD.assets))
      .then((x) => {
        this.two_d_images = x;
        return x;
      })
      .then(config.twoD.callback);

    config.threeD.assets.forEach((fpath) => {
      this.three_d_textures[fpath] = new THREE.TextureLoader().load(fpath);
    });
  }

  loadLevel(
    levelFileBasename: string,
    cb: (images, textures) => EntityComponent[]
  ) {
    super.loadLevel(levelFileBasename);

    cb(
      this.two_d_images,
      this.three_d_textures
    );
  }
}
