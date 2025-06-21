// import * as THREE from "three";

// import { IView } from "../../../engine/VECS.ts/View";

// import { TileSize } from "../System";
// import { SpaceTrash } from "../..";
// import { DrawableStore } from "../Components/v2/drawable";

// let drawables: DrawableStore;
// let tick = -1;

// let videoRenderer: THREE.WebGLRenderer;
// var scene = new THREE.Scene();

// const defToRad = (d: number) => (d * Math.PI) / 180;

// const render: IView<any> = async (game, canvas) => {
//   if (tick === -1) {
//     drawables = game.componentStores["DrawableComponent"] as DrawableStore;

//     await firstRender(game, canvas);
//     tick++;
//   } else {
//     const position = game.videoFeedPosition();
//     camera.position.x = position.x * TileSize;
//     camera.position.y = position.y * TileSize;
//     // console.log("camera", camera.position)
    
//     // camera.rotation.x = camera.rotation.x + 0.001;
//     camera.rotation.y = camera.rotation.y + 0.001;
//     // camera.rotation.y = camera.rotation.y + 0.001;

//     const p = canvas.parentElement.getBoundingClientRect();
//     videoRenderer.setSize(p.width, p.height);
//     videoRenderer.render(scene, camera);
//   }
// };

// const firstRender = async (game: SpaceTrash, canvas) => {
//   videoRenderer = new THREE.WebGLRenderer({
//     canvas,
//     context: canvas.getContext("webgl2") as WebGL2RenderingContext,
//     antialias: true,
//   });


//   Object.entries(drawables.store).forEach(async (n) => {
//     if (n[1][1].mesh) {
//       scene.add(n[1][1].mesh);
//     }
//   });

//   // pixi2dApp = new Application({
//   //   width: (MapSize + 7) * TileSize,
//   //   height: (MapSize + 7) * TileSize,
//   //   antialias: true, // 抗锯齿，圆滑边界
//   //   resolution: 1,
//   //   view: canvas.getContext("webgl2")?.canvas,
//   //   backgroundColor: 0x00ff00,
//   //   sharedTicker: false,
//   // });

//   // pixi2dApp.ticker.stop();
//   // pixi2dApp.ticker.destroy();
//   // pixi2dApp.renderer.plugins.interaction.useSystemTicker = false;

//   // const g = game;

//   // const loader = new Loader();
//   // loader.add("stone", stone); // Replace with your image path
//   // loader.load((loader, resources) => {

//   //   Object.keys(drawables.store).forEach(async ([k, i]) => {

//   //     const bunny = new Sprite(resources.stone.texture);
//   //   // bunny.x = 100 * Math.random();
//   //   // bunny.y = 100 * Math.random();
//   //     // bunny.anchor.set(0.5);

//   //     pixi2dApp.stage.addChild(bunny)
//   //     await drawables.store[k][1].setSprite(bunny);

//   //     // console.log(i);
//   //     // drawables.store[k][1];

//   //     // if (
//   //     //   drawables.store[k][1].textureURL === "https://pixijs.com/assets/bunny.png"
//   //     // ) {
//   //     //   // const s = Sprite.from(brickTexture);
//   //     //   // s.position.x = 100 * Math.random();
//   //     //   // s.position.y = 100 * Math.random();
//   //     //   await drawables.store[k][1].setSprite(pixi2dApp.stage.addChild(bunny));
//   //     //   // console.log("pixi", drawables.store[k][1].sprite);
//   //     // }

//   //     // pixi2dApp.stage.addChild(d.drawable.sprite);
//   //   });

//   //   // debugger

//   //   // pixi2dApp.stage.addChild(bunny);
//   // });

//   // brickTexture = await Assets.load(brick);
//   // stoneTexture = await Assets.load(stone);
//   // bunnyTexture = await Assets.load("https://pixijs.com/assets/bunny.png");

//   return;
// };

// export default render;
