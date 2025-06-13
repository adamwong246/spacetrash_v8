import * as THREE from "three";

import { MapSize, TileSize } from "./System";
import { IStores } from "../engine/types";
import { FloorTile, WallTile } from "./Entities/setpieces";
import { LitableComponent, LittableStore } from "./Components/casting/in";
import SpaceTrashPlayer from "./Player";
import {
  PhysicsSetPieceComponent,
  PhysicsSetPieceStore,
} from "./Components/setPiece";
import { PhysicsActorComponent, PhysicsActorStore } from "./Components/actor";

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 10000);

camera.position.y = (MapSize / 2) * TileSize;
camera.position.x = (MapSize / 2) * TileSize;
camera.rotation.x = 1.5708;

var cubeGeometry = new THREE.BoxGeometry(TileSize, TileSize, TileSize);
const cylinderGeometry = new THREE.CylinderGeometry(
  TileSize / 3,
  TileSize / 6,
  TileSize
);
var material = new THREE.MeshBasicMaterial({ color: "#433F81" });

const floorGeometry = new THREE.PlaneGeometry(TileSize, TileSize);
const unlitFloorMaterial = new THREE.MeshBasicMaterial({ color: "lightgrey" });
const litFloorMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
const cubeMaterial = new THREE.MeshBasicMaterial({ color: "red" });

const instancedFloorMesh = new THREE.InstancedMesh(
  floorGeometry,
  litFloorMaterial,
  Math.pow(MapSize, 2)
);

const setPieces: Record<string, THREE.Mesh> = {};
const actors: Record<string, THREE.Mesh> = {};

export const renderDrone = (componentStores: IStores, ctx: any) => {
  const gl = ctx as THREE.WebGLRenderer;

  const physicsSetPieces = componentStores[
    PhysicsSetPieceComponent.name
  ] as PhysicsSetPieceStore;

  const physicsActors = componentStores[
    PhysicsActorComponent.name
  ] as PhysicsActorStore;

  const littables = componentStores[LitableComponent.name] as LittableStore;

  let pieces = 0;

  for (const setPiece of physicsSetPieces.store) {
    const s = setPiece[1] as unknown as PhysicsSetPieceComponent;
    const eid = setPiece[0];

    if (!setPieces[eid]) {
      // console.log(s.tileType)
      if (s.tileType !== FloorTile.name) {
        // console.log("adding cube");
        const c = new THREE.Mesh(cubeGeometry, unlitFloorMaterial);
        c.material = new THREE.MeshBasicMaterial({
          color:
            "#" +
            Math.floor(Math.random() * 16777215)
              .toString(16)
              .padStart(6, "0"),
        });

        c.position.x = s.x * TileSize;
        c.position.y = s.y * TileSize;
        setPieces[eid] = c;
        pieces++;
        scene.add(c);
      } else {
        const f = new THREE.Mesh(floorGeometry, unlitFloorMaterial);
        f.position.x = s.x * TileSize;
        f.position.y = s.y * TileSize;
        f.position.z = -TileSize / 2;

        for (const [leid, l] of littables.store) {
          if (leid === eid) {
            if (l.luminance > 0) {
              f.material = litFloorMaterial;
            } else {
              f.material = unlitFloorMaterial;
            }
          }
        }

        setPieces[eid] = f;

        pieces++;
        scene.add(f);
        
      }
    }
  }

  for (const actor of physicsActors.store) {
    const a = actor[1] as unknown as PhysicsActorComponent;
    const eid = actor[0];

    if (!actors[eid]) {
      const c = new THREE.Mesh(cylinderGeometry, material);
      c.material = new THREE.MeshBasicMaterial({
        color:
          "#" +
          Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0"),
      });

      c.position.x = a.x * TileSize;
      c.position.y = a.y * TileSize;
      c.rotation.x = -3.14 / 2;

      actors[eid] = c;
      pieces++;
      scene.add(c);
    } else {
      actors[eid].position.x = a.x * TileSize;
      actors[eid].position.y = a.y * TileSize;
    }
  }

  const firstbot = SpaceTrashPlayer.bots[
    SpaceTrashPlayer.videoFeed
  ] as unknown as PhysicsActorComponent;

  camera.position.x = firstbot.x * TileSize;
  camera.position.y = firstbot.y * TileSize;

  gl.render(scene, camera);
};
