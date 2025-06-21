import * as PIXI from "pixi.js";

import { IView } from "../../../engine/VECS.ts/View";

import { SpaceTrash } from "../..";

import brick from "./../../Assets/brick.png";
import stone from "./../../Assets/stone.png";

import { MapSize, TileSize } from "../System";
import { DrawableStore } from "../Components/v2/drawable";

import { Ticker } from 'pixi.js';

const ticker = Ticker.shared;
ticker.maxFPS = 5;
// // Set this to prevent starting this ticker when listeners are added.
// // By default this is true only for the PIXI.Ticker.shared instance.
// ticker.autoStart = false;


let pixi2dApp: PIXI.Application;
let tick = -1;
let drawables: DrawableStore;

const render: IView<any> = async (game, canvas) => {
  if (!game) debugger;
  if (tick === -1) {
    drawables = game.componentStores["DrawableComponent"] as DrawableStore;

    await firstRender(game, canvas);
    tick++;
  } else {
    // pixi2dApp.render();
  }

  return;
};

const firstRender = async (game: SpaceTrash, canvas) => {
  const pixi2dApp = new PIXI.Application();
  await pixi2dApp.init({
    sharedTicker: true,
    view: canvas.getContext("webgl2")?.canvas,
    backgroundColor: 0x1099bb,
    width: (MapSize + 7) * TileSize,
    height: (MapSize + 7) * TileSize,
  });

  PIXI.Assets.load([
    "https://pixijs.com/assets/bunny.png",
    stone,
    brick,
  ])
    .then(() => {
      // This code will execute once all assets are loaded
      console.log("All assets loaded!");

      // You can now access your loaded assets, for example:
      const texture1 = PIXI.Texture.from("https://pixijs.com/assets/bunny.png");
      const sprite1 = new PIXI.Sprite(texture1);
      pixi2dApp.stage.addChild(sprite1);
      sprite1.position.x = 100;
      sprite1.position.y = 100;

      // ... more code to use the loaded assets
    })
    .then(() => {
      Object.keys(drawables.store).forEach(async (k, n) => {
        const d = drawables.store[n][1];


        const bunnyTexture = PIXI.Texture.from(
          "https://pixijs.com/assets/bunny.png"
        );
        const stoneTexture = PIXI.Texture.from(stone);
        const brickTexture = PIXI.Texture.from(brick);

        // const sprite = new PIXI.Sprite(texture);

        let sprite: PIXI.Sprite;

        if (d.textureURL === "brick") {
          sprite = new PIXI.Sprite(brickTexture);
        } else if (d.textureURL === "stone") {
          sprite = new PIXI.Sprite(stoneTexture);
        } else if (d.textureURL === "bunny") {
          sprite = new PIXI.Sprite(bunnyTexture);
        } else {
          console.error(`I don't recognize this texture ${d.textureURL}`);
          return;
        }
        sprite.width = TileSize;  
        sprite.height = TileSize;
        sprite.position.x = 0;
        sprite.position.y = 0;
        sprite.visible = true;

        pixi2dApp.stage.addChild(sprite);
        drawables.store[n][1].setSprite(sprite);
        // debugger
        // console.log("n", n, drawables.store.length)
      });
    })
    .then(() => {
      game.pixiLoaded = true;
    });

};


export default render;
