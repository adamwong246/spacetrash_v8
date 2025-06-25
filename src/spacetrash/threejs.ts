import * as THREE from "three";

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

export const blueMaterial = new THREE.MeshPhongMaterial({
  // color: "blue",
});



export const greenMaterial = new THREE.MeshBasicMaterial({
  color: "green",
  // wireframe: true,
});


export const orangeMaterial = new THREE.MeshBasicMaterial({
  color: "orange",
  // wireframe: true,
});
