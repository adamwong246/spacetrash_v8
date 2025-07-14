import * as THREE from "three";

import { RenderableComponent } from "./RenderableComponent";
import { SP_MapStore } from "../ecs/SP_MapStore";

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


}

export class ThreeJsRenderableStore extends SP_MapStore<ThreeJsRenderableComponent> {}
