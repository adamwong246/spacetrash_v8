import { System } from "./ECS";
import { Tree, Leaf, Branch } from "./Tree";



export class Scene extends Tree  {
  systems: Map<System<unknown>, (ctx: CanvasRenderingContext2D) => void>;
  // draw: (ctx: CanvasRenderingContext2D, system: System<string>) => void;

  constructor(
    name: string,
    systems: Map<System<unknown>, (ctx: CanvasRenderingContext2D) => void>
  ) {
    super(name);
    this.systems = this.systems;
  }

  draw(
    canvasContext: CanvasRenderingContext2D
  ) {
    this.systems.forEach((drawSystem) => {

    })
    // this.contextDraw(canvasContext);
    // canvasContext.fillStyle = "blue";
    // canvasContext.fillRect(20, 20, 75, 50);
  }
}

export class View extends Scene  {
  draw: (ctx: CanvasRenderingContext2D) => void;

  constructor(name: string, draw: (ctx: CanvasRenderingContext2D) => void) {
    super(name, new Map());
    this.draw = draw;
  }
}

// export class Scene extends View_CanvasContext  {
//   constructor(name: string, draw: (ctx: CanvasRenderingContext2D) => void) {
//     super(name, draw);
//   }

//   draw(
//     canvasContext: CanvasRenderingContext2D,
//     system: System<unknown>
//   ) {
//     this.contextDraw(canvasContext);
//     // canvasContext.fillStyle = "blue";
//     // canvasContext.fillRect(20, 20, 75, 50);
//   }
// }


// // export class View_Container extends Branch  {
// //   constructor(name: string, root: View) {
// //     super(name, root);
// //   }
// //   add(view: View) {
    
// //   }
// //   draw(canvasContext: CanvasRenderingContext2D) {
// //     canvasContext.fillStyle = "blue";
// //     canvasContext.fillRect(20, 20, 75, 50);
// //   }
// // }

// // export class View  {
// //   constructor(name: string, draw: (ctx: CanvasRenderingContext2D) => void) {

// //   }
  
// // }
