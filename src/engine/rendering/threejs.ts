import * as THREE from "three";

import { RenderableComponent } from "./RenderableComponent";
import { MapStoreV2 } from "../VECS.ts/Store";
import { ArcadePhysicsComponent } from "../../spacetrash/ECS/Components/v4/PhaserArcade";

export class ThreeJsRenderableComponent extends RenderableComponent {
  
  mesh: THREE.Mesh;
  dirty: boolean;

  constructor(mesh: THREE.Mesh) {
    super();
    this.mesh = mesh;
    this.dirty = true;
  }

  setMesh(m: THREE.Mesh) {
    this.mesh = m;
    this.dirty = true;
  }

  makeDirty() {
    this.dirty = true;
  }

  updateFromArcadePhysics(f: ArcadePhysicsComponent) {
    this.mesh.position.x = f.arcadeObject.position.x;
    this.mesh.position.y = f.arcadeObject.position.y;
  }

}

export class ThreeJsRenderableStore extends MapStoreV2<ThreeJsRenderableComponent> {}
