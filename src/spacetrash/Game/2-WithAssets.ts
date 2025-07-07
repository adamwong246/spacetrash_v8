import * as PIXI from "pixi.js";
import * as THREE from "three";

import { DesktopGame } from "./1-DesktopGame";

import brick from "./../Assets/brick.png";
import stone from "./../Assets/stone.png";
import voidPng from "./../Assets/void.png";
import slopes32Png from "../tiled/slopes-32.png";
import slopes32Json from "../tiled/slopes-32.json";
import floor from "../Assets/M.E.GAmesTexturePack1.0/texture (20).png";
import wall from "../ /Assets/M.E.GAmesTexturePack1.0/texture (21).png";
import { TileSize } from "../Constants";

export abstract class GameWithAssets<IRenderings> extends DesktopGame<
  IRenderings,
  any
> {
  async start() {
    super.start({
      
      threeD: {
        assets: {
          floor,
          wall,
        },

        callback: function (textures): void {
          textures.brick.wrapS = THREE.RepeatWrapping;
          textures.brick.wrapT = THREE.RepeatWrapping;
          textures.brick.repeat.set(4, 4);

          textures.stone.wrapS = THREE.RepeatWrapping;
          textures.stone.wrapT = THREE.RepeatWrapping;
          textures.stone.repeat.set(4, 4);

          return {
            materials: {
              blank: new THREE.MeshBasicMaterial({
                color: "yellow",
              }),

              void: new THREE.MeshBasicMaterial({
                color: "red",
              }),

              red: new THREE.MeshBasicMaterial({
                color: "red",
              }),

              orange: new THREE.MeshBasicMaterial({
                color: "orange",
              }),

              green: new THREE.MeshBasicMaterial({
                color: "green",
              }),

              wall: new THREE.MeshPhongMaterial({
                map: textures.brick,
                side: THREE.DoubleSide,
              }),

              floor: new THREE.MeshPhongMaterial({ map: textures.stone }),

              blue: new THREE.MeshBasicMaterial({
                color: "blue",
                wireframe: true,
              }),
            },
          };
        },
      },

      twoD: {
        assets: {
          bunny: "https://pixijs.com/assets/bunny.png",
          stone,
          brick,
          voidPng,
          font: "https://pixijs.com/assets/bitmap-font/desyrel.xml",
          slopes32Png,
        },
        
        callback: (assets) => {
          PIXI.Texture.from(assets.bunny);
          PIXI.Texture.from(assets.stone);
          PIXI.Texture.from(assets.brick);
          PIXI.Texture.from(assets.voidPng);
          PIXI.Texture.from(assets.slopes32Png);

          let x = 0;
          let y = 0;

          for (let i = 0; i < slopes32Json.tilecount; i++) {
            const z = new PIXI.Texture({
              label: `slopes32Png-${x} - ${y}`,
              source: PIXI.Texture.from(slopes32Png).baseTexture,

              frame: new PIXI.Rectangle(
                x * slopes32Json.tilewidth,
                y * slopes32Json.tilewidth,
                TileSize,
                TileSize
              ),

              // trim: new PIXI.Rectangle(
              //   x * slopes32Json.tilewidth,
              //   y * slopes32Json.tilewidth,
              //   TileSize,
              //   TileSize

              // ),
            });

            if (x === 4 && y === 1) {
              PIXI.Cache.set(`slopes32Png-EMPTY`, z);
            }

            if (x === 0 && y === 0) {
              PIXI.Cache.set(`slopes32Png-FULL`, z);
            }

            if (x === 5 && y === 0) {
              PIXI.Cache.set(`slopes32Png-NORTHEAST`, z);
            }

            if (x === 6 && y === 0) {
              PIXI.Cache.set(`slopes32Png-NORTHWEST`, z);
            }

            if (x === 7 && y === 0) {
              PIXI.Cache.set(`slopes32Png-SOUTHEAST`, z);
            }

            if (x === 8 && y === 0) {
              PIXI.Cache.set(`slopes32Png-SOUTHWEST`, z);
            }

            // console.log(
            //   x * slopes32Json.tilewidth,
            //   y * slopes32Json.tilewidth,
            //   TileSize
            // );
            // debugger
            // PIXI.Cache.set(`slopes32Png-${x} - ${y}`, z);

            x++;
            if (x > slopes32Json.columns) {
              x = 0;
              y++;
            }

            // console.log(z);
          }
        },
      },
    });
  }
}
