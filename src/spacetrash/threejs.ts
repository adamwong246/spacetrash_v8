import * as THREE from "three";

import brick from "./Assets/brick.png";
import stone from "./Assets/stone.png";
import voidPng from "./Assets/void.png";

export const blankMaterial = new THREE.MeshBasicMaterial({
  color: "yellow",
  // wireframe: true,
});

export const voidMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  // wireframe: true,
});

export const redMaterial = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});

// export const blueMaterial = new THREE.MeshBasicMaterial({
//   color: "blue",
//   // wireframe: true,
// });

// export const blueMaterial = new THREE.MeshStandardMaterial({
//   roughness: 1,
//   metalness: 1,
//   color: "blue"
//   // wireframe: true,
// });


const brickTexture = new THREE.TextureLoader().load( brick );
brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set(4, 4);

const stoneTexture = new THREE.TextureLoader().load( stone );
brickTexture.wrapS = THREE.RepeatWrapping;
brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set(4, 4);

// export const wallTexture = new THREE.MeshBasicMaterial({ map: brickTexture })
export const wallTexture = new THREE.MeshBasicMaterial({ map: brickTexture })

export const floorTexture = new THREE.MeshBasicMaterial({ map: stoneTexture })

export const blueMaterial = new THREE.MeshBasicMaterial({
  color: "blue",
});



export const greenMaterial = new THREE.MeshBasicMaterial({
  color: "green",
  // wireframe: true,
});


export const orangeMaterial = new THREE.MeshBasicMaterial({
  color: "orange",
  // wireframe: true,
});
