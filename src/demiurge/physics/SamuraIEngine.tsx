import { System } from "detect-collisions";

import { SP_PhysicalComponent } from "./SP_Physical";
import { NavMesh } from "../nav";

export class SamuraiEngine {
  system: System;

  constructor() {
    this.system = new System();
  }

  addBody(v: SP_PhysicalComponent) {
    this.system.insert(v.body);
  }

  update(context, callback, navmesh: NavMesh) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    // navmesh.negativeSpaceCollapsedToCanvas(context);
    // // navmesh.positiveSpaceToCanvas(context)
    // // navmesh.negativeSpaceToCanvas(context)
    // // navmesh.positiveSpaceCollapsedToCanvas(context)
    // navmesh.convexPolygonsToCanvas(context)
    navmesh.centroidsToCanvas(context);

    context.strokeStyle = "#FFFFFF";
    context.beginPath();
    // draw specific body bounding box
    // body.drawBVH(context)
    // draw bounding volume hierarchy of the system
    this.system.drawBVH(context);
    context.stroke();
    if (this.system.checkAll(callback)) {
      // Do something yourself
    }
  }
}
