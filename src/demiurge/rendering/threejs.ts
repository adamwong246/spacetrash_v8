import * as THREE from "three";

import { RenderableComponent } from "./RenderableComponent";
import { MapStoreV2 } from "../ecs/Store";


export class ThreeJsRenderableComponent extends RenderableComponent {
  
  meshes: THREE.Mesh[];
  dirty: boolean;

  constructor(meshes: THREE.Mesh[]) {
    super();
    this.meshes = meshes;
    this.dirty = true;
  }

  setMeshes(meshes: THREE.Mesh[]) {
    this.meshes = meshes;
    this.dirty = true;
  }

  makeDirty() {
    this.dirty = true;
  }

  // updateFromArcadePhysics(f: ArcadePhysicsComponent) {

  //   for (let mesh of this.meshes) {
  //     mesh.position.x = f.arcadeObject.position.x;
  //     mesh.position.y = f.arcadeObject.position.y;
  //   }
    
  // }

}

export class ThreeJsRenderableStore extends MapStoreV2<ThreeJsRenderableComponent> {}
