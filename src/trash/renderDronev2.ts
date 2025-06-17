import * as THREE from "three";

import { MapSize, TileSize } from "../spacetrash/System";
import { ECS } from "../engine/ECS";
import { Phase0Store } from "../spacetrash/Components/phase0";
import { Phase1Store } from "../spacetrash/Components/phase1";

import { Application, DRAW_MODES } from "pixi.js";
import {
  CameraOrbitControl,
  Mesh3D,
  Light,
  LightingEnvironment,
  Material,
  Transform3D,
  Point3D,
  StandardMaterial,
  Color,
} from "pixi3d";

let firstTick = true;
// let pixi3dApp: Application;

const cubes: [Mesh3D, boolean][][] = [[]];
const red = new StandardMaterial();
red.baseColor = new Color(1, 0, 0, 1);

const blue = new StandardMaterial();
blue.baseColor = new Color(0, 0, 1, 1);

let rotation = 0;



let renderer: THREE.WebGLRenderer;

// material.drawMode = DRAW_MODES.LINES
export const renderDroneV2 = async (ecs: ECS, canvas: HTMLCanvasElement) => {
  if (firstTick) {
        firstTick = false
  
        renderer = new THREE.WebGLRenderer({
          canvas,
          context: canvas.getContext("webgl2") as WebGL2RenderingContext,
          antialias: true,
        });
  
      } else {
  
      }
      const twoD = (ecs.stores["Phase0"] as Phase0Store).store;
  const oneD = (ecs.stores["Phase1"] as Phase1Store).store;
  
  // rotation++;
  // if (firstTick) {
  //   firstTick = false;

  //   pixi3dApp = new Application({
  //     backgroundColor: 0xdddddd,
  //     resizeTo: window,
  //     antialias: true,
  //     view: ctx.getContext().canvas,
  //   });

  //   // pixi3dApp.screen.c
  //   let control = new CameraOrbitControl(pixi3dApp.view);

  //   // Create a light source and add it to the main lighting environment. Without
  //   // doing this, the rendered mesh would be completely black.
  //   let light = new Light();
  //   light.position.set(-1, 0, 3);
  //   light.intensity = 10;
  //   LightingEnvironment.main.lights.push(light);

  //   // let rotation = 0;
  //   // pixi3dApp.ticker.add(() => {
  //   //   // console.log(rotation)
  //   //   // This function will be called before each render happens. When rotating an
  //   //   // object in 3D, the "rotationQuaternion" is used instead of the regular
  //   //   // "rotation" available in PixiJS. "setEulerAngles" is called to be able to
  //   //   // set the rotation on all axes. In this case, only the y-axis is changed.
  //   //   mesh.rotationQuaternion.setEulerAngles(0, rotation++, 0);
  //   // });

  //   for (let y = 0; y < MapSize; y++) {
  //     cubes[y] = [];
  //     for (let x = 0; x < MapSize; x++) {
  //       // cubes[y][x] = [] as Mesh3D;

  //       const cube = Mesh3D.createCube(Math.random() > 0.5 ? red : blue);
  //       // cube.scale = new Point3D(TileSize, TileSize, TileSize)
  //       // cube.rotationQuaternion.setEulerAngles(45, 45, 45);
  //       cube.position.x = x * 2.1;
  //       cube.position.y = y * 2.1;
  //       // cube.position.z =y;
  //       // cube.position.z = y * TileSize;
  //       // cube.position.set(x *2, y *2,  y *2)
  //       // const t = new Transform3D()
  //       // t.position.x = x * TileSize;
  //       // t.position.y = y * TileSize;
  //       // cube.transform = t;
  //       // cube.visible = true;
  //       // console.log(cube.position.x, cube.position.y)
  //       // pixi3dApp.stage.addChild(cube);
  //       const e = cube; 
  //       cubes[y][x] = [e, true];
  //       // pixi3dApp.render()
  //     }
  //   }

  //   // oneD.forEach((actor, i) => {
  //   //   // do things
  //   // });
  // } else {
  //   for (let y = 0; y < MapSize; y++) {
  //     for (let x = 0; x < MapSize; x++) {
  //       cubes[y][x][0].material = Math.random() > 0.5 ? red : blue;
  //       // cubes[y][x].position.x = x* 2.1;
  //       // cubes[y][x].position.y = y*2.1;
  //       // cubes[y][x].rotationQuaternion.setEulerAngles(rotation, rotation, rotation);

  //       if (!twoD[y][x].culledWebgl) {
  //         // console.log(setpiece.renderedWebgl);
  //         if (twoD[y][x].renderedWebgl === "fresh") {
  //           // if (!twoD[y][x].mesh) {
  //           //   console.error(twoD[y][x]);
  //           //   throw "no mesh";
  //           //   // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
  //           // }

  //           // cubes[y][x].position.x = x * 2.1;
  //           // cubes[y][x].position.y = y * TileSize;
  //           // counter++;
  //           // scene.add(twoD[y][x].mesh);
  //           // debugger
  //           pixi3dApp.stage.addChild(cubes[y][x][0]);
  //           cubes[y][x][1] = true
  //           // console.log(`${counter} / ${MapSize * MapSize}`, y, x, twoD[y][x].mesh)
  //           twoD[y][x].renderedWebgl = "rendered";
  //         } else if (twoD[y][x].renderedWebgl === "changed") {

  //           if (cubes[y][x][1] === false) {
  //             pixi3dApp.stage.addChild(cubes[y][x][0]);  
  //           }
            
  //           // if (!twoD[y][x].mesh) {
  //           //   console.error(twoD[y][x]);
  //           //   throw "no mesh, changed";
  //           // }
  //           // debugger
  //           // cubes[y][x].position.x = x * TileSize;
  //           // cubes[y][x].position.y = y * TileSize;
  //         } else if (twoD[y][x].renderedWebgl === "unchanged") {
  //           if (!twoD[y][x].mesh) {
  //             // console.error(twoD[y][x]);
  //             // throw "no mesh, unchanged";
  //             // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
  //           }
  //           // no-op
  //         } else if (twoD[y][x].renderedWebgl === "rendered") {
  //           if (!twoD[y][x].mesh) {
  //             // console.error(twoD[y][x]);
  //             // throw "no mesh, rendered";
  //             // setpiece.mesh = new THREE.Mesh(cubeGeometry, litFloorMaterial);
  //           }
  //           // no-op
  //         } else {
  //           throw `should not be in renderState ${JSON.stringify(twoD[y][x])}`;
  //         }

  //         // drawOperations.push(SpaceTrashDrone.draw2d(s));
  //       } else {
  //         debugger
  //         // scene.remove(twoD[y][x].mesh);
  //         if (cubes[y][x][1]) {
  //           pixi3dApp.stage.removeChild(cubes[y][x][0]);  
  //         }
          
  //         cubes[y][x][1] = false;
  //         // scene.remove(setpiece.mesh);
  //       }
  //     }
  //   }

  //   oneD.forEach((actor, i) => {
  //     // do things
  //   });
  // }

  // pixi3dApp.render()

  return;
};
