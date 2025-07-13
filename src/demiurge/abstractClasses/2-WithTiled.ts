// import {
//   ITiledMap,
//   ITiledMapLayer,
//   ITiledMapTileset,
// } from "@workadventure/tiled-map-type-guard";

import { GameWithScenes } from "./1-WithScenes";
import { MapSize } from "../../spacetrash/Constants";
import { ITiledMapTileset } from "@workadventure/tiled-map-type-guard/dist/ITiledMapTileset";

export abstract class GameWithTiledEditor extends GameWithScenes {
  static formats = ["tsj", "tmj", "tj"];

  static throwErrorMessageWrongExtension = (t: string) => {
    throw `You can only use the tiled editor's proprietary formats ${GameWithTiledEditor.formats}, but you tried to import the file ${t}. Take care to export your tiled files with the correct extension.`;
  };
  static throwErrorMessage = (t: string) => {
    throw `You cannot use the file "${t}".`;
  };
  static loadLevelErrorMessage = (levelFileBasename: string) =>
    `Could not load ${levelFileBasename} because it does not exist.`;

  static FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
  static FLIPPED_VERTICALLY_FLAG = 0x40000000;
  static FLIPPED_DIAGONALLY_FLAG = 0x20000000;
  static FLIPPED_HEX_ROTATE_120_FLAG = 0x10000000;

  tiledProject: {
    levels: Map<string, object>;
    tilesets: Map<string, ITiledMapTileset>;
    templates: Map<string, object>;
  } = {
    levels: new Map(),
    tilesets: new Map(),
    templates: new Map(),
  };

  abstract tiledProjectImport: { default: object[]; filenames: string[] };

  currentLevel: string;

  level = {
    tileLayer: (layerName: string) => {
      const level = this.tiledProject.levels.get(this.currentLevel);
      if (!level) throw `level "${this.currentLevel}" does not exist`;

      let foundLayer;
      for (let l of level.layers) {
        if (l.name === layerName) {
          foundLayer = l;
        }
      }

      if (!foundLayer) throw `layer "${layerName}" was not found`;

      return {
        get: (x: number, y: number) => {
          const ndx = y * level.width + x;
          const gid = foundLayer.data[ndx];

          if (gid != 0) return this.decodeGid(gid);
        },
      };
    },

    objectLayer: (layerName: string) => {
      throw "not yet implemented";
    },
  };

  // decode a Tiled editor Global ID
  decodeGid = (
    gid: number,
  ): {
    tid: number;
    hFlip: boolean;
    vFlip: boolean;
    dFlip: boolean;
    tileset: ITiledMapTileset;
    
  } => {
    let foundTileSet:
      | {
          source;
          firstgid;
        }
      | undefined;
    
    for (let t of this.tiledProject.levels.get(this.currentLevel).tilesets.sort(
      (a2, b2) => a2.firstgid < b2.firstgid
    )) {
      if (t.firstgid > gid) continue;
      else {
        foundTileSet = {
          source: t.source,
          firstgid: t.firstgid
        };
        break;
      }
    }

    if (!foundTileSet) throw `Tileset was not found`;

    //
    //
    //  Extract flip flags
    const flipFlags =
      gid &
      (GameWithTiledEditor.FLIPPED_HORIZONTALLY_FLAG |
        GameWithTiledEditor.FLIPPED_VERTICALLY_FLAG |
        GameWithTiledEditor.FLIPPED_DIAGONALLY_FLAG |
        GameWithTiledEditor.FLIPPED_HEX_ROTATE_120_FLAG); // Include this flag even for non-hex maps

    // Clear the flip flags from the GID to get the actual tile ID
    const tileId = gid & ~flipFlags;

    const internalTilesetConfig = this.tiledProject.levels
      .get(this.currentLevel)
      .tilesets.find((ts) => {
        return ts.source === foundTileSet.source;
      });

    
    return {
      tid: tileId - internalTilesetConfig.firstgid,
      hFlip: GameWithTiledEditor.isFlippedHorizontal(gid),
      vFlip: GameWithTiledEditor.isFlippedVertical(gid),
      dFlip: GameWithTiledEditor.isFlippedDiagonally(gid),
      tileset: internalTilesetConfig
    };
  };

  // abstract tilelayer(
  //   layer: Partial<ITiledMapLayer>,
  //   x: number,
  //   y: number,
  //   tid: number,
  //   hFlip: boolean,
  //   vFlip: boolean,
  //   dFlip: boolean
  // );

  // abstract objectlayer();

  // loadLevel(levelFileBasename: string) {
  //   // throw new Error("Method not implemented.");
  //   this.currentLevel = levelFileBasename;
  // }

  loadLevel(levelFileBasename: string, ..._) {
    const level = this.tiledProject.levels.get(levelFileBasename);

    if (!level) {
      console.error(
        `${GameWithTiledEditor.loadLevelErrorMessage(
          levelFileBasename
        )}. Possible alternatives are :${Object.entries(
          this.tiledProject.levels
        ).toString()}`
      );
      throw GameWithTiledEditor.loadLevelErrorMessage(levelFileBasename);
    }

    this.currentLevel = levelFileBasename;

    // for (let layer of level.tiledProject.layers) {
    //   if (layer.type === "tilelayer") {
    //     const { ["data"]: justTheLayerData, ...layerMinusData } = layer;

    //     let x = 0;
    //     let y = 0;

    //     for (let tileDatum of (
    //       layer as {
    //         data: number[];
    //       }
    //     ).data) {
    //       this.tilelayer(
    //         layerMinusData,
    //         x,
    //         y,
    //         ...GameWithTiledEditor.decodeGid(
    //           tileDatum,
    //           level.tilesets[0].firstgid
    //         )
    //       );
    //       x++;
    //       if (x >= layer.width) {
    //         x = 0;
    //         y++;
    //       }
    //     }
    //   } else if (layer.type === "objectgroup") {
    //     for (let objectData of (
    //       layer as {
    //         objects: object[];
    //       }
    //     ).objects) {
    //       this.objectlayer();
    //     }
    //   }
    // }

    // cb(
    //   this.two_d_images,
    //   this.three_d_textures
    // );
  }

  static takeFileAndExtension(filename: string): [string, string] {
    const split = filename.split(".");

    const extension = split.pop();
    if (!extension) throw this.throwErrorMessageWrongExtension(filename);
    if (!this.formats.includes(extension))
      throw this.throwErrorMessageWrongExtension(filename);

    const path = split.pop();
    if (!path) throw this.throwErrorMessage(filename);

    const basename = path.split("/").pop();
    if (!basename) throw this.throwErrorMessage(filename);

    return [basename, extension];
  }

  // Get basename with extension
  static getBasenameWithExtension(filePath) {
    const lastSlashIndex = filePath.lastIndexOf("/");
    return lastSlashIndex === -1
      ? filePath
      : filePath.substring(lastSlashIndex + 1);
  }

  async start(...a) {
    if (
      !this.tiledProjectImport.default ||
      !this.tiledProjectImport.filenames ||
      this.tiledProjectImport.default.length === 0 ||
      this.tiledProjectImport.filenames.length === 0
    )
      throw "Could not import tiled files. Check the import path to the folder with your tiled files.";

    for (let [ndx, filename] of this.tiledProjectImport.filenames.entries()) {
      const [basename, extension] =
        GameWithTiledEditor.takeFileAndExtension(filename);

      const jsonFileData = this.tiledProjectImport.default[ndx];

      if (extension === "tmj") {
        // this.levels.set(basename, ITiledMap.parse(jsonFileData));
        this.tiledProject.levels.set(basename, jsonFileData);
      } else if (extension === "tsj") {
        this.tiledProject.tilesets.set(
          basename,
          ITiledMapTileset.parse(jsonFileData)
        );
      } else if (extension === "tj") {
        this.tiledProject.templates.set(basename, jsonFileData);
      } else {
        throw GameWithTiledEditor.throwErrorMessageWrongExtension(filename);
      }
    }
  }

  static isFlippedDiagonally(gid: number) {
    return (gid & GameWithTiledEditor.FLIPPED_DIAGONALLY_FLAG) !== 0;
  }

  static isNotFlippedDiagonally(gid: number) {
    return !GameWithTiledEditor.isFlippedDiagonally(gid);
  }

  static isFlippedHorizontal(gid: number) {
    return (gid & GameWithTiledEditor.FLIPPED_HORIZONTALLY_FLAG) !== 0;
  }

  static isNotFlippedHoizontal(gid: number) {
    return !GameWithTiledEditor.isFlippedHorizontal(gid);
  }

  static isFlippedVertical(gid: number) {
    return (gid & GameWithTiledEditor.FLIPPED_VERTICALLY_FLAG) !== 0;
  }

  static isNotFlippedVertical(gid: number) {
    return !GameWithTiledEditor.isFlippedVertical(gid);
  }
}
