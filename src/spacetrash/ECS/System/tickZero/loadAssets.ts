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
  
  // objLoader.setMaterials(greenMaterial);
  mtlLoader.load(
    mechMtl,
    function (materials) {
      materials.preload();
      objLoader.setMaterials(materials);
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
    function (object) {

      // (GAME as SpaceTrash).scene.environment.

      (GAME as SpaceTrash).scene.add(object);
      object.position.x = (MapSize / 2) * TileSize;
      object.position.y = (MapSize / 2) * TileSize;
      object.position.z = +TileSize;

      object.scale.set(10, 10, 10);
      object.rotateX(degToRad(-90));

    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
    },
    function (error) {
      console.log("An error happened loading the OBJ file", error);
    }
  );
}
