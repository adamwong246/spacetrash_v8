var area = require("area-polygon");

import { System } from "detect-collisions";
import { SP_PhysicalComponent } from "../../engine/physics/SP_Physical";
import { SP_MultiPolygon } from "./SP_Polygon";

// const callback = (result) => {
//   console.info(result);
//   if (!result.a.isStatic && result.b.isStatic) {
//     const body = result.a;
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

  update(
    context,
    callback,
    positiveSpace: SP_MultiPolygon,
    PositiveSpaceCollapsed: SP_MultiPolygon,
    negativeSpace: SP_MultiPolygon,
    NegativeSpaceCollapsed: SP_MultiPolygon,
    convexPositive: any,
    triangleNegative
  ) {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // context.strokeStyle = "#0000FF";
    // positiveSpace.polygons.forEach((polygon) => {
    //   const ps = polygon.calcPoints.map((v) => [v.x, v.y]);

    //   // const signedArea = area(ps, true);
    //   // if (signedArea < 0) {
    //   //   context.globalCompositeOperation = "destination-out";
    //   // } else {
    //   //   context.globalCompositeOperatoion = "source-over";
    //   // }
    //   // console.log("signedArea", signedArea);

    //   polygon.points.forEach((point, ndx) => {
    //     if (ndx === 0) {
    //       context.moveTo(
    //         polygon.pos.x + polygon.points[0].x,
    //         polygon.pos.y + polygon.points[0].y
    //       );
    //       context.beginPath();
    //     } else {
    //       context.lineTo(point.x + polygon.pos.x, point.y + polygon.pos.y);
    //     }

    //     if (ndx === polygon.points.length - 1) {
    //       context.lineTo(
    //         polygon.pos.x + polygon.points[0].x,
    //         polygon.pos.y + polygon.points[0].y
    //       );
    //       context.fillStyle = "#0000FFFF";
    //       context.fill();
    //     }
    //   });

    //   context.closePath();
    //   context.stroke();
    // });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // context.strokeStyle = "#FF0000";
    // console.log("negative space", negativeSpace);

    // negativeSpace.polygons.forEach((polygon) => {
    //   const ps = polygon.calcPoints.map((v) => [v.x, v.y]);

    //   // const signedArea = area(ps, true);
    //   // if (signedArea < 0) {
    //   //   context.globalCompositeOperation = "destination-out";
    //   // } else {
    //   //   context.globalCompositeOperatoion = "source-over";
    //   // }
    //   // console.log("signedArea", signedArea);

    //   polygon.points.forEach((point, ndx) => {
    //     if (ndx === 0) {
    //       context.moveTo(
    //         polygon.pos.x + polygon.points[0].x,
    //         polygon.pos.y + polygon.points[0].y
    //       );
    //       context.beginPath();
    //     } else {
    //       context.lineTo(point.x + polygon.pos.x, point.y + polygon.pos.y);
    //     }

    //     if (ndx === polygon.points.length - 1) {
    //       context.lineTo(
    //         polygon.pos.x + polygon.points[0].x,
    //         polygon.pos.y + polygon.points[0].y
    //       );
    //       context.fillStyle = "#FF0000AA";
    //       context.fill();
    //     }
    //   });

    //   context.closePath();
    //   context.stroke();
    // });

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // // console.log("negative space", NegativeSpaceCollapsed);
    context.strokeStyle = "#ff0000";
    NegativeSpaceCollapsed.polygons.forEach((polygon) => {
      const ps = polygon.calcPoints.map((v) => [v.x, v.y]);

      // const signedArea = area(ps, true);
      // if (signedArea < 0) {
      //   context.globalCompositeOperation = "destination-out";
      // } else {
      //   context.globalCompositeOperatoion = "source-over";
      // }
      // console.log("signedArea", signedArea);

      polygon.points.forEach((point, ndx) => {
        if (ndx === 0) {
          context.moveTo(
            polygon.pos.x + polygon.points[0].x,
            polygon.pos.y + polygon.points[0].y
          );
          context.beginPath();
        } else {
          context.lineTo(point.x + polygon.pos.x, point.y + polygon.pos.y);
        }

        if (ndx === polygon.points.length - 1) {
          context.lineTo(
            polygon.pos.x + polygon.points[0].x,
            polygon.pos.y + polygon.points[0].y
          );
          context.fillStyle = "#ff0000aa";
          context.fill();
        }
      });

      context.closePath();
      context.stroke();
    });

    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // console.log("positive space ", PositiveSpaceCollapsed);
    // context.strokeStyle = "#ffff00";
    // PositiveSpaceCollapsed.polygons.forEach((polygon) => {
    //   // const signedArea = area(polygon.points, true);
    //   // if (signedArea < 0) {
    //   //   // context.globalCompositeOperation = "destination-out";
    //   // } else {
    //   //   context.globalCompositeOperatoion = "source-over";
    //   // }
    //   // console.log("signedArea", signedArea);

    //   polygon.points.forEach((point, ndx) => {
    //     if (ndx === 0) {
    //       context.moveTo(
    //         polygon.pos.x + polygon.points[0].x,
    //         polygon.pos.y + polygon.points[0].y
    //       );
    //       context.beginPath();
    //     } else {
    //       context.lineTo(point.x + polygon.pos.x, point.y + polygon.pos.y);
    //     }
    //     if (ndx === polygon.points.length - 1) {
    //       context.lineTo(
    //         polygon.pos.x + polygon.points[0].x,
    //         polygon.pos.y + polygon.points[0].y
    //       );
    //       context.fillStyle = "#FFff0066";
    //       context.fill();
    //     }
    //   });
    //   context.closePath();
    //   context.stroke();
    // });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // // console.log("convex", convexPositive);
    context.strokeStyle = "#00ff0066";
    convexPositive.forEach((polygon) => {
      polygon.forEach((point, ndx) => {
        if (ndx === 0) {
          context.moveTo(point.x, point.y);
          context.beginPath();
        } else {
          context.lineTo(point.x, point.y);
        }

        if (ndx === polygon.length - 1) {
          context.lineTo(polygon[0].x, polygon[0].y);

          // context.fillStyle = "#00ff0066";
          // context.fill();
        }
      });

      context.closePath();
      context.stroke();
    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // context.strokeStyle = "#ff00ff";
    // console.log("triangle", triangle);
    // triangle.forEach((polygon) => {
    //   polygon.forEach((point, ndx) => {
    //     if (ndx === 0) {
    //       context.moveTo(point.x, point.y);
    //       context.beginPath();
    //     } else {
    //       context.lineTo(point.x , point.y);
    //     }

    //     if (ndx === polygon.length - 1) {
    //       context.lineTo(polygon[0].x, polygon[0].y);

    //       context.fillStyle = "#ff00ff66";
    //       context.fill();
    //     }
    //   });

    //   context.closePath();
    //   context.stroke();
    // });

    // context.strokeStyle = "#FFFFAA";
    // context.beginPath();
    // this.system.draw(context);
    // context.stroke();

    // context.strokeStyle = "#FFAC1C";
    // context.beginPath();
    // // draw specific body bounding box
    // // body.drawBVH(context);
    // // draw bounding volume hierarchy of the system
    // this.system.drawBVH(context);
    // context.stroke();

    // debugger

    // body.drawBVH(context);

    if (this.system.checkAll(callback)) {
      // Do something yourself
    }
  }
}
