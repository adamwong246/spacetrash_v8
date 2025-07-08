import {
  ITiledMap,
  ITiledMapLayer,
  ITiledMapTileset,
} from "@workadventure/tiled-map-type-guard";

import { GameWithScenes } from "./1-WithScenes";

const formats = ["tsj", "tmj", "tj"];

const throwErrorMessageWrongExtension = (t: string) => {
  throw `You can only use the tiled editor's proprietary formats ${formats}, but you tried to import the file ${t}. Take care to export your tiled files with the correct extension.`;
};

const throwErrorMessage = (t: string) => {
  throw `You cannot use the file "${t}".`;
};

export abstract class GameWithTiledEditor extends GameWithScenes {
  static takeFileAndExtension(filename: string): [string, string] {
    const split = filename.split(".");

    const extension = split.pop();
    if (!extension) throw throwErrorMessageWrongExtension(filename);
    if (!formats.includes(extension))
      throw throwErrorMessageWrongExtension(filename);

    const path = split.pop();
    if (!path) throw throwErrorMessage(filename);

    const basename = path.split("/").pop();
    if (!basename) throw throwErrorMessage(filename);

    return [basename, extension];
  }

  // Get basename with extension
  static getBasenameWithExtension(filePath) {
    const lastSlashIndex = filePath.lastIndexOf("/");
    return lastSlashIndex === -1
      ? filePath
      : filePath.substring(lastSlashIndex + 1);
  }

  abstract tiledProject: { default: object[]; filenames: string[] };

  "levels": Map<string, object> = new Map();
  "tilesets": Map<string, ITiledMapTileset> = new Map();
  "templates": Map<string, object> = new Map();

  async start(...a) {
    if (
      !this.tiledProject.default ||
      !this.tiledProject.filenames ||
      this.tiledProject.default.length === 0 ||
      this.tiledProject.filenames.length === 0
    )
      throw "Could not import tiled files. Check the import path to the folder with your tiled files.";

    for (let [ndx, filename] of this.tiledProject.filenames.entries()) {
      const [basename, extension] =
        GameWithTiledEditor.takeFileAndExtension(filename);

      const jsonFileData = this.tiledProject.default[ndx];

      if (extension === "tmj") {
        // this.levels.set(basename, ITiledMap.parse(jsonFileData));
        this.levels.set(basename, jsonFileData);
      } else if (extension === "tsj") {
        this.tilesets.set(basename, ITiledMapTileset.parse(jsonFileData));
      } else if (extension === "tj") {
        this.templates.set(basename, jsonFileData);
      } else {
        throw throwErrorMessageWrongExtension(filename);
      }
    }
  }

  loadLevelErrorMessage = (levelFileBasename: string) =>
    `Could not load ${levelFileBasename} because it does not exist.`;

  static FLIPPED_HORIZONTALLY_FLAG = 0x80000000;
  static FLIPPED_VERTICALLY_FLAG = 0x40000000;
  static FLIPPED_DIAGONALLY_FLAG = 0x20000000;
  static FLIPPED_HEX_ROTATE_120_FLAG = 0x10000000;

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

  // decode a Tiled editor Global ID
  static decodeGid = (
    gid: number,
    firstgid: number
  ): [number, boolean, boolean, boolean] => {

    // Extract flip flags
    const flipFlags =
      gid &
      (GameWithTiledEditor.FLIPPED_HORIZONTALLY_FLAG |
        GameWithTiledEditor.FLIPPED_VERTICALLY_FLAG |
        GameWithTiledEditor.FLIPPED_DIAGONALLY_FLAG |
        GameWithTiledEditor.FLIPPED_HEX_ROTATE_120_FLAG); // Include this flag even for non-hex maps

    // Clear the flip flags from the GID to get the actual tile ID
    const tileId = gid & ~flipFlags;

    return [
      tileId - firstgid,
      GameWithTiledEditor.isFlippedHorizontal(gid),
      GameWithTiledEditor.isFlippedVertical(gid),
      GameWithTiledEditor.isFlippedDiagonally(gid),
    ];
  };

  abstract tilelayer(
    layer: Partial<ITiledMapLayer>,
    x: number,
    y: number,
    tid: number,
    hFlip: boolean,
    vFlip: boolean,
    dFlip: boolean
  );

  abstract objectlayer();
}
