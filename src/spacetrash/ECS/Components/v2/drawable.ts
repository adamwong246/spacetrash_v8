import { Sprite, SpriteSource, Texture } from "pixi.js";
import { ISpaceTrashComponents } from "..";
import {
  Component,
  TwoDOneD_Component,
} from "../../../../engine/VECS.ts/Component";
import { ComponentStore, EntityComponentStore, OneDStore, Store } from "../../../../engine/VECS.ts/types";

import { ActorComponent } from "../phase1";
import { FloatPositionComponent, FloatPositionStore } from "./physical";
import { Assets } from "@pixi/assets";



// class SpriteMaster{

  

//   async start() {
//     this.brickTexture = await Assets.load(brick);
//     this.stoneTexture = await Assets.load(stone);
//     this.bunnyTexture = await Assets.load(
//       "https://pixijs.com/assets/bunny.png"
//     );
//   }

//   texture(s: string) {
//     if (s == brick) return this.brickTexture;
//     if (s == stone) return this.stoneTexture;
//     if (s == "https://pixijs.com/assets/bunny.png") return this.bunnyTexture;
//   }
// }

// export const TheSpriteMaster = new SpriteMaster();
// TheSpriteMaster.start();

export class DrawableComponent extends Component<any, ISpaceTrashComponents> {
  textureURL: string
  sprite?: Sprite
  // x: number;
  // y: number;

  constructor(textureURL: string) {
    super();
    this.textureURL = textureURL;
  }

  setSprite(s: Sprite) {
    this.sprite = s
    // console.log("mark1", this.sprite)
  }
  

  // start(): Sprite {
  //   debugger
  //   return this.sprite = Sprite.from(TheSpriteMaster.texture(this.texture));
  // }
}

export class DrawableStore extends EntityComponentStore<DrawableComponent> {
  
  
  // store: DrawableComponent;
  
  


  // get(...a: any[]) {
  //   throw new Error("Method not implemented.");
  // }

  // add(a: DrawableComponent) {
  //   // super.add(a);
  // }

  
  make() {
    throw new Error("Method not implemented.");
    return new DrawableComponent();
  }

  positionOf(eidOfLight: number): FloatPositionStore {
    throw new Error("Method not implemented.");
  }

  updatePostion(eid: number, p: FloatPositionComponent) {
    
    const d = this.get(eid);

    // console.log("mark2", d.sprite)
    
    if (d.sprite) {
      
      d.sprite.position.x = p.x;
      d.sprite.position.y = p.y;
    }
    // 
    // d.x = p.x;
    // d.y = p.y;
    // this.sp
  }
}
