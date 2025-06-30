import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";

import mechObj from "./../../../Assets/mechModels/Package/Arachnoid.obj";
import mechMtl from "./../../../Assets/mechModels/Package/Arachnoid.mtl";
import mechPng from "./../../../Assets/mechModels/Package/Arachnoid.png";
import { SpaceTrash } from "../../../Game";
import { MapSize, TileSize } from "../../../Constants";
import { degToRad } from "three/src/math/MathUtils.js";

const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader();

export default async function loadAssets() {
  mtlLoader.load(
    mechMtl,
    // "Assets/mechModels/Arachnoid.mtl", // Path to your .mtl file
    function (materials) {
      materials.preload();
      objLoader.setMaterials(materials); // Apply materials to the OBJLoader
      // ... (OBJ loading continues below)
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.log("An error happened loading the material file", error);
    }
  );

  objLoader.load(
    mechObj,
    // "Assets/mechModels/Arachnoid.obj", // Path to your .obj file
    function (object) {
      console.log(mechPng);
      // debugger
      // Add the loaded object to your scene
      (GAME as SpaceTrash).scene.add(object);
      object.position.x = (MapSize / 2) * TileSize;
      object.position.y = (MapSize / 2) * TileSize;
      object.position.z = +TileSize;

      object.scale.set(10, 10, 10);
      object.rotateX(degToRad(-90));
      // debugger
      // this.threejsRenderer.
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.log("An error happened loading the OBJ file", error);
    }
  );
}
