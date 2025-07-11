import { System } from "detect-collisions";

import { SP_MultiPolygon } from "./SP_MultiPolygon";
import { SP_PhysicalComponent } from "./SP_Physical";
import { renderGraphToCanvas } from "./renderGraphToCanvas";

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
    triangleNegative,
    centroids,
    graphOfCentroid
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

    // // ////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

    // ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // console.log("convex", convexPositive);
    context.strokeStyle = "#0000ff";
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

          context.fillStyle = "#0000ff33";
          context.fill();
        }
      });

      context.closePath();
      context.stroke();
    });

    // ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // context.strokeStyle = "#00ff00";
    // context.fillStyle = "#00ff0066";

    // centroids.forEach((cntrd) => {
    //   context.beginPath();
    //   context.arc(cntrd.x, cntrd.y, TileSize/8, 0, 2 * Math.PI);
    //   context.stroke();
    //   context.fill();
    //   // context.endPath();
    // });

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

    //     const p1 = new Polygon({ x: 0, y: 0 }, [
    //       { x: 100, y: 100 },
    //       { x: 300, y: 100 },
    //       { x: 300, y: 300 },
    //       { x: 100, y: 300 },
    //       { x: 100, y: 100 },
    //     ]);
    //     const p2 = new Polygon({ x: 0, y: 0 }, [
    //       { x: 100, y: 300 },
    //       { x: 300, y: 310 },
    //       { x: 400, y: 400 },
    //       { x: 200, y: 400 },
    //       { x: 100, y: 300 },
    //     ]);

    // context.strokeStyle = "#FFAC1C";
    // context.beginPath();
    // drawPolygon(context, p1)
    // context.stroke();

    // context.beginPath();
    // drawPolygon(context, p2)
    // context.stroke();

    // const intersectionOfPolys = polygonInPolygon(p1, p2); // returns false
    // const intersectionOfPolys2 = SAT.testPolygonPolygon(p1, p2) // returns true

    // console.log(graphOfCentroid);

    // context.beginPath();
    renderGraphToCanvas(graphOfCentroid, context, {
      backgroundColor: "transparent",
      nodes: {
        defaultColor: "#00ff00",
        radius:2
      },
      edges: {
        defaultColor: "#00ff00",
        width:1
      },
    });
    // context.stroke();

    if (this.system.checkAll(callback)) {
      // Do something yourself
    }
  }
}
