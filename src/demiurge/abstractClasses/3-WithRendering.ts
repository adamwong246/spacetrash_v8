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
    const level = this.levels.get(levelFileBasename);
    if (!level) {
      console.error(
        `${this.loadLevelErrorMessage(
          levelFileBasename
        )}. Possible alternatives are :${Object.entries(
          this.levels
        ).toString()}`
      );
      throw this.loadLevelErrorMessage(levelFileBasename);
    }

    for (let layer of level.layers) {
      if (layer.type === "tilelayer") {
        const { ["data"]: justTheLayerData, ...layerMinusData } = layer;

        let x = 0;
        let y = 0;

        for (let tileDatum of (
          layer as {
            data: number[];
          }
        ).data) {
          this.tilelayer(
            layerMinusData,
            x,
            y,
            ...GameWithTiledEditor.decodeGid(
              tileDatum,
              level.tilesets[0].firstgid
            )
          );
          x++;
          if (x >= layer.width) {
            x = 0;
            y++;
          }
        }
      } else if (layer.type === "objectgroup") {
        for (let objectData of (
          layer as {
            objects: object[];
          }
        ).objects) {
          this.objectlayer();
        }
      }
    }

    cb(
      this.two_d_images,
      this.three_d_textures
    );
  }
}
