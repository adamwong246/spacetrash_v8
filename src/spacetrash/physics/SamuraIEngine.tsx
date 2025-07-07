import { System } from "detect-collisions";
import { SP_PhysicalComponent } from "../../engine/physics/SP_Physical";

// const callback = (result) => {
//   console.info(result);
//   if (!result.a.isStatic && result.b.isStatic) {
//     const body = result.a;
//     debugger
//   }
// };

export class SamuraiEngine {
  system: System;

  constructor() {
    this.system = new System();
  }

  addBody(v: SP_PhysicalComponent) {
    this.system.insert(v.body);
  }

  update(context, callback) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    context.strokeStyle = "#FFFFFF";
    context.beginPath();
    this.system.draw(context);
    context.stroke();

    // if (this.system.checkAll(callback)) {
    //   // Do something yourself
    // }

    
    

    if (this.system.checkAll(callback)) {
      // Do something yourself
    }
  }
}
