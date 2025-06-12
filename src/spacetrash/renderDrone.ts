import * as THREE from "three";
import { PhysicsActorComponent, PhysicsSetComponent } from "./Components/physics";
import { MapSize, TileSize } from "./System";
import { IStores } from "../engine/types";
import { FloorTile, WallTile } from "./Entities/setpieces";
import { LitableComponent } from "./Components/casting/in";
import SpaceTrashPlayer from "./Player"

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000);
// camera.position.y = (MapSize/2)* TileSize;
// camera.position.x = (MapSize/2)* TileSize;
// camera.position.z = 400;

camera.position.y = (MapSize/2)* TileSize;
camera.position.x = (MapSize / 2) * TileSize;
camera.rotation.x = 1.5708;

// camera.rotation.y = 90;
// camera.rotation.z = 90;
// camera.rotateX(90);
// camera.rotateY(45);
// camera.rotateY(180);


var cubeGeometry = new THREE.BoxGeometry(TileSize, TileSize, TileSize);
const cylinderGeometry = new THREE.CylinderGeometry(TileSize/3, TileSize/6, TileSize)
var material = new THREE.MeshBasicMaterial({ color: "#433F81" });
// var helloCube = new THREE.Mesh(cubeGeometry, material);

// Add cube to Scene
// scene.add(helloCube);


const floorGeometry = new THREE.PlaneGeometry( TileSize, TileSize );
const unlitFloorMaterial = new THREE.MeshBasicMaterial({ color: "lightgrey" });
const litFloorMaterial = new THREE.MeshBasicMaterial({ color: "yellow"});

const setPieces: Record<string, THREE.Mesh> = {};
const actors: Record<string, THREE.Mesh> = {};

export const renderDrone = (componentStores: IStores, ctx: any) => {
  const gl = ctx as THREE.WebGLRenderer;

  const physicsSetPieces = componentStores[PhysicsSetComponent.name] as [
    string,
    PhysicsSetComponent
  ][];

  const physicsActors = componentStores[PhysicsActorComponent.name] as [
    string,
    PhysicsActorComponent
  ][];

  const littables = componentStores[LitableComponent.name] as [
    string,
    LitableComponent
  ][];

  // helloCube.rotation.x += 0.01;
  // helloCube.rotation.y += 0.01;

  for (const setPiece of physicsSetPieces) {
    const s = setPiece[1] as unknown as PhysicsSetComponent;
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
        scene.add(c);

        scene.add(new THREE.LineSegments(new THREE.EdgesGeometry(cubeGeometry), new THREE.LineBasicMaterial({ color: 0xffffff })));
      
      } else {

        const f = new THREE.Mesh(floorGeometry, unlitFloorMaterial);
        f.position.x = s.x * TileSize;
        f.position.y = s.y * TileSize;
        f.position.z = -TileSize/2;
        setPieces[eid] = f;
        scene.add(f);

        scene.add(new THREE.LineSegments(new THREE.EdgesGeometry(floorGeometry), new THREE.LineBasicMaterial({ color: 0xffffff })));
        
      }
    }

    for (const [leid, l] of littables) {
      if (leid === eid) {
        if (l.luminance > 0) {
          // f.material = litFloorMaterial;
          setPieces[eid].material = litFloorMaterial  
        } else {
          setPieces[eid].material = unlitFloorMaterial  
        }
      }
    }

    for (const actor of physicsActors) {
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
        c.rotation.x = -3.14/2;

        actors[eid] = c;
        scene.add(c);
      } else {
        actors[eid].position.x = a.x * TileSize;
        actors[eid].position.y = a.y * TileSize;
      }
    }
  }


  const firstbot = SpaceTrashPlayer.bots[SpaceTrashPlayer.videoFeed] as unknown as PhysicsActorComponent;

  camera.position.x = firstbot.x * TileSize;
  camera.position.y = firstbot.y * TileSize;
  
  

  gl.render(scene, camera);
};
