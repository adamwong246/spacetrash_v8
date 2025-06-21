import * as THREE from "three";

import { IView } from "../../../engine/VECS.ts/View";

import { ActorStore } from "../Components/phase1";
import { MapSize, TileSize } from "../System";
import { SpaceTrash } from "../..";
import { SetPieceComponent, SetPieceStore } from "../Components/phase0";
import { DrawableStore } from "../Components/v2/drawable";

let drawables: DrawableStore;
let tick = -1;
let videoRenderer: THREE.WebGLRenderer;

var scene = new THREE.Scene();

const floorGeometry = new THREE.PlaneGeometry(TileSize, TileSize);
const unlitFloorMaterial = new THREE.MeshBasicMaterial({ color: "lightgrey" });
const litFloorMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  wireframe: true,
});
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });
var cubeGeometry = new THREE.BoxGeometry(TileSize, TileSize, TileSize);
let cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({ color: "#433F81" });
var camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 10000);

const defToRad = (d: number) => (d * Math.PI) / 180;

camera.rotateX(defToRad(-90));
camera.rotateZ(defToRad(180));

// Create a basic perspective camera
// var camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
camera.position.z = 5;

let cylinder: THREE.Mesh;

const render: IView<any> = async (game, canvas) => {
  if (tick === -1) {
    drawables = game.componentStores["DrawableComponent"] as DrawableStore;

    await firstRender(game, canvas);
    tick++;
  } else {
    const position = game.videoFeedPosition();
    camera.position.x = position.x * TileSize;
    camera.position.y = position.y * TileSize;
    // console.log("camera", camera.position)
    
    // camera.rotation.x = camera.rotation.x + 0.001;
    camera.rotation.y = camera.rotation.y + 0.001;
    // camera.rotation.y = camera.rotation.y + 0.001;

    const p = canvas.parentElement.getBoundingClientRect();
    videoRenderer.setSize(p.width, p.height);
    videoRenderer.render(scene, camera);
  }
};

const firstRender = async (game: SpaceTrash, canvas) => {
  videoRenderer = new THREE.WebGLRenderer({
    canvas,
    context: canvas.getContext("webgl2") as WebGL2RenderingContext,
    antialias: true,
  });

  // var material = new THREE.MeshBasicMaterial({ color: "#433F81" });

  // const mesh = new THREE.Mesh(cylinderGeometry, material)
  // mesh.position.x = 0;
  // mesh.position.y = 0;
  // mesh.position.z = 0;
  // mesh.visible = true;

  // scene.add(mesh);
  // videoRenderer.render(scene, camera);

  // var cubeGeo = new THREE.BoxGeometry(TileSize, TileSize, TileSize);
  // // var material = new THREE.MeshBasicMaterial({ color: "#433F81" });
  // cylinder = new THREE.Mesh(cylinderGeometry, litFloorMaterial)
  // var cube = new THREE.Mesh(cubeGeo, litFloorMaterial);

  Object.entries(drawables.store).forEach(async (n, i) => {
    if (n[1][1].mesh) {
      scene.add(n[1][1].mesh);
    }
  });

  // pixi2dApp = new Application({
  //   width: (MapSize + 7) * TileSize,
  //   height: (MapSize + 7) * TileSize,
  //   antialias: true, // 抗锯齿，圆滑边界
  //   resolution: 1,
  //   view: canvas.getContext("webgl2")?.canvas,
  //   backgroundColor: 0x00ff00,
  //   sharedTicker: false,
  // });

  // pixi2dApp.ticker.stop();
  // pixi2dApp.ticker.destroy();
  // pixi2dApp.renderer.plugins.interaction.useSystemTicker = false;

  // const g = game;

  // const loader = new Loader();
  // loader.add("stone", stone); // Replace with your image path
  // loader.load((loader, resources) => {

  //   Object.keys(drawables.store).forEach(async ([k, i]) => {

  //     const bunny = new Sprite(resources.stone.texture);
  //   // bunny.x = 100 * Math.random();
  //   // bunny.y = 100 * Math.random();
  //     // bunny.anchor.set(0.5);

  //     pixi2dApp.stage.addChild(bunny)
  //     await drawables.store[k][1].setSprite(bunny);

  //     // console.log(i);
  //     // drawables.store[k][1];

  //     // if (
  //     //   drawables.store[k][1].textureURL === "https://pixijs.com/assets/bunny.png"
  //     // ) {
  //     //   // const s = Sprite.from(brickTexture);
  //     //   // s.position.x = 100 * Math.random();
  //     //   // s.position.y = 100 * Math.random();
  //     //   await drawables.store[k][1].setSprite(pixi2dApp.stage.addChild(bunny));
  //     //   // console.log("pixi", drawables.store[k][1].sprite);
  //     // }

  //     // pixi2dApp.stage.addChild(d.drawable.sprite);
  //   });

  //   // debugger

  //   // pixi2dApp.stage.addChild(bunny);
  // });

  // brickTexture = await Assets.load(brick);
  // stoneTexture = await Assets.load(stone);
  // bunnyTexture = await Assets.load("https://pixijs.com/assets/bunny.png");

  return;
};

export default render;

// const tiles3d: [THREE.Mesh, boolean][][] = [[]];
// const actors3d: [THREE.Mesh, boolean][] = [];

// const render: IView<SpaceTrash> = (game, canvas) => {
//   tick++;
//   const twoD = game.stores.SetPieceComponent.store as SetPieceComponent[][];
//   const oneD = (game.stores["ActorComponent"] as ActorStore).store;

//   if (tick === 0) {

//     for (let y = 0; y < twoD.length; y++) {
//       if (!tiles3d[y]) {
//         tiles3d[y] = [];
//       }

//       for (let x = 0; x < twoD[y].length; x++) {
//         const t = (game.stores["SetPieceComponent"] as SetPieceStore).get(x, y);
//         const tt = t.tileType;
//         if (tt === "WallTile") {
//           tiles3d[y][x] = [
//             new THREE.Mesh(cubeGeometry, litFloorMaterial),
//             true,
//           ];
//         } else if (tt === "FloorTile") {
//           tiles3d[y][x] = [
//             new THREE.Mesh(floorGeometry, litFloorMaterial),
//             true,
//           ];
//         }

//         if (tt === "WallTile" || tt === "FloorTile") {
//           tiles3d[y][x][0].position.x = x * TileSize;
//           tiles3d[y][x][0].position.y = y * TileSize;
//           scene.add(tiles3d[y][x][0]);
//         }
//       }
//     }

//     for (let i = 0; i < oneD.length; i++) {
//       actors3d[i] = [new THREE.Mesh(cylinderGeometry, material), true];
//     }
//   } else {
//     for (let i = 0; i < oneD.length; i++) {
//       actors3d[i][0].position.x = oneD[i].actorX * TileSize;
//       actors3d[i][0].position.y = oneD[i].actorY * TileSize;
//     }
//   }

// };

//

// // for (let y = 0; y < MapSize; y++) {
// //   for (let x = 0; x < MapSize; x++) {
// //     // console.log(y, x, twoD[y][x])
// //     // const setpiece = twoD[y][x];

// //     // if (setpiece.luminance > 0) {

// //     //   if (!setpiece.mesh) {
// //     //     const m = new THREE.Mesh(floorGeometry, litFloorMaterial);
// //     //     m.position.x = x * TileSize;
// //     //     m.position.y = y * TileSize;

// //     //     setpiece.mesh = m;

// //     //     m.material = litFloorMaterial;
// //     //     i++;
// //     //     debugger
// //     //     scene.add(setpiece.mesh);
// //     //   }

// //     // } else {

// //     //   if (setpiece.mesh && setpiece.luminance === 0) {
// //     //     i--
// //     //     if (i < 0) i = 0;
// //     //     scene.remove(setpiece.mesh as unknown as THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>);
// //     //   }

// //     // }

// //     if (!twoD[y][x].mesh) {
// //       if (twoD[y][x].tileType === "FloorTile") {
// //         twoD[y][x].mesh = new THREE.Mesh(floorGeometry, litFloorMaterial);
// //         twoD[y][x].mesh.position.z = TileSize / 2;
// //       } else if (twoD[y][x].tileType === "WallTile") {
// //         twoD[y][x].mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
// //       } else {
// //         twoD[y][x].mesh = new THREE.Mesh(floorGeometry, litFloorMaterial);
// //       }
// //     }
// //     // twoD[y][x].mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);

// //     if (!twoD[y][x].mesh) {
// //       console.error(twoD[y][x]);
// //       throw "no mesh";
// //       // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
// //     }

// //     if (!twoD[y][x].culledWebgl) {
// //       // console.log(setpiece.renderedWebgl);
// //       if (twoD[y][x].renderedWebgl === "fresh") {
// //         if (!twoD[y][x].mesh) {
// //           console.error(twoD[y][x]);
// //           throw "no mesh";
// //           // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
// //         }

// //         twoD[y][x].mesh.position.x = x * TileSize;
// //         twoD[y][x].mesh.position.y = y * TileSize;
// //         // counter++;

// //         scene.add(twoD[y][x].mesh);
// //         // console.log(`${counter} / ${MapSize * MapSize}`, y, x, twoD[y][x].mesh)
// //         twoD[y][x].renderedWebgl = "rendered";
// //       } else if (twoD[y][x].renderedWebgl === "changed") {
// //         if (!twoD[y][x].mesh) {
// //           console.error(twoD[y][x]);
// //           throw "no mesh, changed";
// //         }
// //       } else if (twoD[y][x].renderedWebgl === "unchanged") {
// //         if (!twoD[y][x].mesh) {
// //           console.error(twoD[y][x]);
// //           throw "no mesh, unchanged";
// //           // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
// //         }
// //         // no-op
// //       } else if (twoD[y][x].renderedWebgl === "rendered") {
// //         if (!twoD[y][x].mesh) {
// //           console.error(twoD[y][x]);
// //           throw "no mesh, rendered";
// //           // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
// //         }
// //         // no-op
// //       } else {
// //         throw `should not be in renderState ${JSON.stringify(twoD[y][x])}`;
// //       }

// //       // drawOperations.push(SpaceTrashDrone.draw2d(s));
// //     } else {
// //       // scene.remove(twoD[y][x].mesh);
// //       // scene.remove(setpiece.mesh);
// //     }

// //     // thingsToDraw.push((canvas) => {
// //     //   const z = phaseZero[y][x];

// //     //   const canvas2d = canvas as OffscreenCanvasRenderingContext2D;
// //     //   canvas2d.beginPath();

// //     //   if (z.tileType === "FloorTile") {
// //     //     if (z.luminance > 0) {
// //     //       canvas2d.fillStyle = "yellow";
// //     //     } else {
// //     //       canvas2d.fillStyle = "white";
// //     //     }

// //     //     canvas2d.rect(
// //     //       Math.floor(x * TileSize - TileSize / 2 + 1),
// //     //       Math.floor(y * TileSize - TileSize / 2 + 1),
// //     //       TileSize - 1,
// //     //       TileSize - 1
// //     //     );
// //     //   }
// //     //   if (z.tileType === "WallTile") {
// //     //     canvas2d.fillStyle = "darkgrey";
// //     //     canvas2d.rect(
// //     //       Math.floor(x * TileSize - TileSize / 2 + 1),
// //     //       Math.floor(y * TileSize - TileSize / 2 + 1),
// //     //       TileSize - 1,
// //     //       TileSize - 1
// //     //     );
// //     //   }

// //     //   canvas2d.fill();
// //     //   canvas2d.stroke();
// //     // });

// //     // const p = twoD[y][x];
// //     // const z = ecs.entities[p.setId];
// //     // const s: PhysicsSetPieceComponent =
// //     //   ecs.componentStores["PhysicsSetPieceComponent"].store[z];

// //     // // drawOperations.push(Tile.draw2d(s, p.luminance));

// //     // if (p.renderState === "fresh") {
// //     //   drawOperations.push(Tile.draw2d(s, p));
// //     //   p.renderState = "rendered";
// //     // } else if (p.renderState === "changed") {
// //     //   drawOperations.push(Tile.draw2d(s, p));
// //     //   p.renderState = "rendered";
// //     // } else if (p.renderState === "unchanged") {
// //     //   // no-op
// //     // } else if (p.renderState === "culled") {
// //     //   // no-op
// //     // } else if (p.renderState === "rendered") {
// //     //   // no-op
// //     // } else {
// //     //   throw `should not be in renderState ${JSON.stringify(p)}`;
// //     // }

// //     // drawOperations.push(Tile.draw2d(s, p.luminance));
// //     // if (tick === 0 || p.dirty) {
// //     //   drawOperations.push(Tile.draw2d(s, p.luminance));
// //     //   debugger
// //     //   p.dirty = false;
// //     // }
// //   }
// // }

// // oneD.forEach((actor, i) => {
// //   const p = oneD[i];
// //   // const z = ecs.entities[p.actorId];
// //   // const s: PhysicsActorComponent =
// //   //   ecs.componentStores["PhysicsActorComponent"].store[z];

// //   if (!p.culledWebgl) {
// //     if (p.renderedWebgl === "fresh") {
// //       const m = new THREE.Mesh(cylinderGeometry, material);
// //       m.position.x = p.actorX * TileSize;
// //       m.position.y = p.actorY * TileSize;
// //       p.mesh = m;
// //       scene.add(p.mesh);
// //       p.renderedWebgl = "rendered";
// //     } else if (p.renderedWebgl === "changed" && p.mesh) {
// //       // reRender = true;
// //       p.mesh.position.x = p.actorX * TileSize;
// //       p.mesh.position.y = p.actorY * TileSize;
// //       p.renderedWebgl = "rendered";
// //     } else if (p.renderedWebgl === "unchanged") {
// //       // no-op
// //     } else if (p.renderedWebgl === "rendered") {
// //       // no-op
// //     } else {
// //       console.error(`should not be in renderState ${JSON.stringify(p)}`);
// //     }
// //   }

// //   // const e = ecs.getEntityComponent<SpaceTrashDrone>(
// //   //   oneD[i].actorId,
// //   //   SpaceTrashDrone.constructor
// //   // );
// //   // if (tick === 0) {
// //   //   drawOperations.push(e.draw2d);
// //   // } else {
// //   //   eraseOperations.push(e.erase2d);
// //   //   drawOperations.push(e.draw2d);
// //   // }
// // });
