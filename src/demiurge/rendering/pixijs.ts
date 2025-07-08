import * as PIXI from "pixi.js";

import { Sprite } from "pixi.js";

import { RenderableComponent } from "./RenderableComponent";
import { MapStoreV2 } from "../ecs/Store";
import { ArcadePhysicsComponent } from "../../spacetrash/ECS/Components/v4/PhaserArcade";

export class PixiJsRenderableComponent extends RenderableComponent {
  
  sprite: PIXI.Sprite;

  constructor(sprite: PIXI.Sprite) {
    super();
    this.sprite = sprite;
    this.dirty = true;
  }

  setSprite(s: Sprite) {
    this.sprite = s;
    this.dirty = true;
  }

  updateFromArcadePhysics(f: ArcadePhysicsComponent) {
    this.sprite.position.x = f.arcadeObject.position.x;
    this.sprite.position.y = f.arcadeObject.position.y;
  }

}

export class PixiJsRenderableStore extends MapStoreV2<PixiJsRenderableComponent> {}
