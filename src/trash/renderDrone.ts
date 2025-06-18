

// import { MapSize, TileSize } from "../System";

// import { PhysicsActorComponent } from "../Components/actor";
// import { ECS } from "../../engine/ECS";
// import { Phase0Store } from "../Components/phase0";
// import { Phase1Store } from "../Components/phase1";

// var scene = new THREE.Scene();

// var camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 10000);

// // camera.position.z = -TileSize*3;
// // camera.position.y = (MapSize / 2) * TileSize;
// // camera.position.x = (MapSize / 2) * TileSize;
// // camera.rotation.x = 3.14159;

// camera.position.z = 0;
// camera.position.y = (MapSize / 2) * TileSize;
// camera.position.x = (MapSize / 2) * TileSize;
// camera.rotation.x = THREE.MathUtils.degToRad(260);

// // camera.rotation.z = THREE.MathUtils.degToRad(90)





// var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
// var material = new THREE.MeshBasicMaterial({ color: "#433F81" });
// var cube = new THREE.Mesh(geometry, material);

// // Add cube to Scene
// // scene.add(cube);

// let reRender = true;
// let counter = 0;
// let i = 0;
// let r = false;

// let firstTick = true;

// let renderer: THREE.WebGLRenderer;

// export const renderDrone = async (
//   game: Space,
//   canvas: HTMLCanvasElement,
// ): Promise<any> => {

//   return new Promise((res, rej) => {
//     if (firstTick) {
//       console.log("renderDrone")
//       firstTick = false

//       renderer = new THREE.WebGLRenderer({
//         canvas,
//         context: canvas.getContext("webgl2") as WebGL2RenderingContext,
//         antialias: true,
//       });

//     } else {

//     }
//     const twoD = (ecs.stores["Phase0"] as Phase0Store).store;
//     const oneD = (ecs.stores["Phase1"] as Phase1Store).store;

//     for (let y = 0; y < MapSize; y++) {
//       for (let x = 0; x < MapSize; x++) {
//         // console.log(y, x, twoD[y][x])
//         // const setpiece = twoD[y][x];

//         // if (setpiece.luminance > 0) {

//         //   if (!setpiece.mesh) {
//         //     const m = new THREE.Mesh(floorGeometry, litFloorMaterial);
//         //     m.position.x = x * TileSize;
//         //     m.position.y = y * TileSize;

//         //     setpiece.mesh = m;

//         //     m.material = litFloorMaterial;
//         //     i++;
//         //     debugger
//         //     scene.add(setpiece.mesh);
//         //   }

//         // } else {

//         //   if (setpiece.mesh && setpiece.luminance === 0) {
//         //     i--
//         //     if (i < 0) i = 0;
//         //     scene.remove(setpiece.mesh as unknown as THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.Material | THREE.Material[], THREE.Object3DEventMap>);
//         //   }

//         // }

//         if (!twoD[y][x].mesh) {
//           if (twoD[y][x].tileType === "FloorTile") {
//             twoD[y][x].mesh = new THREE.Mesh(floorGeometry, litFloorMaterial);
//             twoD[y][x].mesh.position.z = TileSize / 2;
//           } else if (twoD[y][x].tileType === "WallTile") {
//             twoD[y][x].mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//           } else {
//             twoD[y][x].mesh = new THREE.Mesh(floorGeometry, litFloorMaterial);
//           }
//         }
//         // twoD[y][x].mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);

//         if (!twoD[y][x].mesh) {
//           console.error(twoD[y][x]);
//           throw "no mesh";
//           // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//         }

//         if (!twoD[y][x].culledWebgl) {
//           // console.log(setpiece.renderedWebgl);
//           if (twoD[y][x].renderedWebgl === "fresh") {
//             if (!twoD[y][x].mesh) {
//               console.error(twoD[y][x]);
//               throw "no mesh";
//               // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//             }

//             twoD[y][x].mesh.position.x = x * TileSize;
//             twoD[y][x].mesh.position.y = y * TileSize;
//             counter++;

//             scene.add(twoD[y][x].mesh);
//             // console.log(`${counter} / ${MapSize * MapSize}`, y, x, twoD[y][x].mesh)
//             twoD[y][x].renderedWebgl = "rendered";
//           } else if (twoD[y][x].renderedWebgl === "changed") {
//             if (!twoD[y][x].mesh) {
//               console.error(twoD[y][x]);
//               throw "no mesh, changed";
//             }
//           } else if (twoD[y][x].renderedWebgl === "unchanged") {
//             if (!twoD[y][x].mesh) {
//               console.error(twoD[y][x]);
//               throw "no mesh, unchanged";
//               // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//             }
//             // no-op
//           } else if (twoD[y][x].renderedWebgl === "rendered") {
//             if (!twoD[y][x].mesh) {
//               console.error(twoD[y][x]);
//               throw "no mesh, rendered";
//               // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
//             }
//             // no-op
//           } else {
//             throw `should not be in renderState ${JSON.stringify(twoD[y][x])}`;
//           }

//           // drawOperations.push(SpaceTrashDrone.draw2d(s));
//         } else {
//           // scene.remove(twoD[y][x].mesh);
//           // scene.remove(setpiece.mesh);
//         }

//         // thingsToDraw.push((canvas) => {
//         //   const z = phaseZero[y][x];

//         //   const canvas2d = canvas as OffscreenCanvasRenderingContext2D;
//         //   canvas2d.beginPath();

//         //   if (z.tileType === "FloorTile") {
//         //     if (z.luminance > 0) {
//         //       canvas2d.fillStyle = "yellow";
//         //     } else {
//         //       canvas2d.fillStyle = "white";
//         //     }

//         //     canvas2d.rect(
//         //       Math.floor(x * TileSize - TileSize / 2 + 1),
//         //       Math.floor(y * TileSize - TileSize / 2 + 1),
//         //       TileSize - 1,
//         //       TileSize - 1
//         //     );
//         //   }
//         //   if (z.tileType === "WallTile") {
//         //     canvas2d.fillStyle = "darkgrey";
//         //     canvas2d.rect(
//         //       Math.floor(x * TileSize - TileSize / 2 + 1),
//         //       Math.floor(y * TileSize - TileSize / 2 + 1),
//         //       TileSize - 1,
//         //       TileSize - 1
//         //     );
//         //   }

//         //   canvas2d.fill();
//         //   canvas2d.stroke();
//         // });

//         // const p = twoD[y][x];
//         // const z = ecs.entities[p.setId];
//         // const s: PhysicsSetPieceComponent =
//         //   ecs.componentStores["PhysicsSetPieceComponent"].store[z];

//         // // drawOperations.push(Tile.draw2d(s, p.luminance));

//         // if (p.renderState === "fresh") {
//         //   drawOperations.push(Tile.draw2d(s, p));
//         //   p.renderState = "rendered";
//         // } else if (p.renderState === "changed") {
//         //   drawOperations.push(Tile.draw2d(s, p));
//         //   p.renderState = "rendered";
//         // } else if (p.renderState === "unchanged") {
//         //   // no-op
//         // } else if (p.renderState === "culled") {
//         //   // no-op
//         // } else if (p.renderState === "rendered") {
//         //   // no-op
//         // } else {
//         //   throw `should not be in renderState ${JSON.stringify(p)}`;
//         // }

//         // drawOperations.push(Tile.draw2d(s, p.luminance));
//         // if (tick === 0 || p.dirty) {
//         //   drawOperations.push(Tile.draw2d(s, p.luminance));
//         //   debugger
//         //   p.dirty = false;
//         // }
//       }
//     }

//     oneD.forEach((actor, i) => {
//       const p = oneD[i];
//       // const z = ecs.entities[p.actorId];
//       // const s: PhysicsActorComponent =
//       //   ecs.componentStores["PhysicsActorComponent"].store[z];

//       if (!p.culledWebgl) {
//         if (p.renderedWebgl === "fresh") {
//           const m = new THREE.Mesh(cylinderGeometry, material);
//           m.position.x = p.actorX * TileSize;
//           m.position.y = p.actorY * TileSize;
//           p.mesh = m;
//           scene.add(p.mesh);
//           p.renderedWebgl = "rendered";
//         } else if (p.renderedWebgl === "changed" && p.mesh) {
//           reRender = true;
//           p.mesh.position.x = p.actorX * TileSize;
//           p.mesh.position.y = p.actorY * TileSize;
//           p.renderedWebgl = "rendered";
//         } else if (p.renderedWebgl === "unchanged") {
//           // no-op
//         } else if (p.renderedWebgl === "rendered") {
//           // no-op
//         } else {
//           console.error(`should not be in renderState ${JSON.stringify(p)}`);
//         }
//       }

//       // const e = ecs.getEntityComponent<SpaceTrashDrone>(
//       //   oneD[i].actorId,
//       //   SpaceTrashDrone.constructor
//       // );
//       // if (tick === 0) {
//       //   drawOperations.push(e.draw2d);
//       // } else {
//       //   eraseOperations.push(e.erase2d);
//       //   drawOperations.push(e.draw2d);
//       // }
//     });

//     const position = SpaceTrashPlayer.videoFeedPosition();
//     camera.position.x = position.x;
//     camera.position.y = position.y;
//     const p = canvas.parentElement.getBoundingClientRect();
//     renderer.setSize(p.width, p.height);
    
//     renderer.render(scene, camera);

//     res(true);
//   });
// };
