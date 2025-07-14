import * as PIXI from "pixi.js";

import { Sprite } from "pixi.js";

import { RenderableComponent } from "./RenderableComponent";
import { SP_MapStore } from "../ecs/SP_MapStore";

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
}

export class PixiJsRenderableStore extends SP_MapStore<PixiJsRenderableComponent> {}
