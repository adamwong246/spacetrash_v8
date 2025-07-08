
import { MapStoreV2 } from "../ecs/Store";
import { RenderableComponent } from "./RenderableComponent";

export class ConsoleRenderableComponent extends RenderableComponent {
  char: string;
  dirty: boolean;

  constructor(char: string) {
    super();
    this.char = char;
    this.dirty = true;
  }

  setChar(s: string) {
    this.char = s;
    this.dirty = true;
  }

  makeDirty() {
    this.dirty = true;
  }
}

export class ConsoleRenderableStore extends MapStoreV2<ConsoleRenderableComponent> {}
