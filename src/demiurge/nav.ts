import Graph from "graphology";
const polyPart = require("poly-partition");
const centroid = require("polygon-centroid");

import { MapSize, TileSize } from "../spacetrash/Constants";
import { SP_2d_Vector } from "./physics/SP_2d_Vector";
import { SP_MultiPolygon } from "./physics/SP_MultiPolygon";
import { SP_Polygon } from "./physics/SP_Polygon";
import { renderGraphToCanvas } from "./physics/renderGraphToCanvas";

// converts polygons into a graph aka nav-mesh
// 1) It creates a PositiveSpace the size of a level
// 2) Negative-space polygons are added to the nav-mesh
// 3) When all the negative-polygons have been added, "makeGraph" finalizes the nav-mesh
export class NavMesh {
  PositiveSpace = new SP_MultiPolygon([
    new SP_Polygon(new SP_2d_Vector(0, 0), [
      new SP_2d_Vector(0, 0),
      new SP_2d_Vector(MapSize * TileSize, 0),
      new SP_2d_Vector(MapSize * TileSize, MapSize * TileSize),
      new SP_2d_Vector(0, MapSize * TileSize),
    ]),
  ]);

  NegativeSpace = new SP_MultiPolygon([
    new SP_Polygon(new SP_2d_Vector(0, 0), []),
  ]);

  NegativeSpaceCollapsed: SP_MultiPolygon;
  PositiveSpaceCollapsed: SP_MultiPolygon;

  convexPositive: any;
  triangleNegative: any;

  centroids: SP_2d_Vector[];

  graphOfCentroid = new Graph();

  constructor() {}

  // 1) Add all the negative polygons together
  // 2) Subtract that from the positive space
  // 3) take that difference and break it into convex polygons
  // 4) connect the centroid of those polygons to produce the nodes in the nav-mesh
  // 5) edges between centroid are add for polygons who share an face, not just intersecting at 1 point
  // TODO 
  // When the nav-mesh overlaps the negative space, break the 2 polygons into more triangles and rebuild the nav-mesh. repeat as needed
  makeGraph() {
    this.NegativeSpaceCollapsed = this.NegativeSpace.union();
    this.PositiveSpace.addMultiPolygon(this.NegativeSpaceCollapsed);
    this.PositiveSpaceCollapsed = this.PositiveSpace.difference();

    const merged = polyPart.removeHoles(
      this.PositiveSpaceCollapsed.polygons[0].points,
      [this.PositiveSpaceCollapsed.polygons[1].points],
      true
    );

    this.convexPositive = polyPart.convexPartition(merged);

    this.centroids = this.convexPositive.map(
      (cnvxPlgn: SP_2d_Vector[], ndx) => {
        const c = centroid(cnvxPlgn);
        const key = `centroid-${ndx}`;

        this.graphOfCentroid.addNode(key);

        this.graphOfCentroid.setNodeAttribute(key, "x", c.x);
        this.graphOfCentroid.setNodeAttribute(key, "y", c.y);

        return c;
      }
    );

    let satCnvxp1: SP_Polygon;
    let satCnvxp2: SP_Polygon;

    this.convexPositive.forEach((cnvcp1, ndx1) => {
      satCnvxp1 = new SP_Polygon(
        new SP_2d_Vector(0, 0),
        cnvcp1.map((cnvcp) => {
          return new SP_2d_Vector(cnvcp.x, cnvcp.y);
        })
      );

      this.convexPositive.forEach((cnvcp2, ndx2) => {
        satCnvxp2 = new SP_Polygon(
          new SP_2d_Vector(0, 0),
          cnvcp2.map((cnvcp) => {
            return new SP_2d_Vector(cnvcp.x, cnvcp.y);
          })
        );

        if (ndx1 !== ndx2) {
          if (SP_Polygon.doPolygonsShareAnEdge(satCnvxp1, satCnvxp2)) {
            this.graphOfCentroid.addEdge(
              `centroid-${ndx1}`,
              `centroid-${ndx2}`
            );
          }
        }
      });
    });
  }

  // removes a polygon of "open" space
  subtractSpace(polygon: SP_Polygon[]) {
    this.NegativeSpace.addPolygons(polygon);
  }

  /////////////////////////////////////////////////////////////////////////////
  centroidsToCanvas(context) {
    renderGraphToCanvas(this.graphOfCentroid, context, {
      backgroundColor: "transparent",
      nodes: {
        defaultColor: "#00ff00",
        radius: 2,
      },
      edges: {
        defaultColor: "#00ff00",
        width: 1,
      },
    });
  }

  convexPolygonsToCanvas(context) {
    context.strokeStyle = "#0000ff";
    this.convexPositive.forEach((polygon) => {
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
  }

  positiveSpaceCollapsedToCanvas(context) {
    context.strokeStyle = "#ffff00";
    this.PositiveSpaceCollapsed.polygons.forEach((polygon) => {
      // const signedArea = area(polygon.points, true);
      // if (signedArea < 0) {
      //   // context.globalCompositeOperation = "destination-out";
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
          context.fillStyle = "#FFff0066";
          context.fill();
        }
      });
      context.closePath();
      context.stroke();
    });
  }

  negativeSpaceToCanvas(context) {
    context.strokeStyle = "#FF0000";

    this.NegativeSpace.polygons.forEach((polygon) => {
      // const ps = polygon.calcPoints.map((v) => [v.x, v.y]);

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
          context.fillStyle = "#FF0000AA";
          context.fill();
        }
      });

      context.closePath();
      context.stroke();
    });
  }

  positiveSpaceToCanvas(context) {
    context.strokeStyle = "#0000FF";
    this.PositiveSpace.polygons.forEach((polygon) => {
      // const ps = polygon.calcPoints.map((v) => [v.x, v.y]);

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
          context.fillStyle = "#0000FFFF";
          context.fill();
        }
      });

      context.closePath();
      context.stroke();
    });
  }

  negativeSpaceCollapsedToCanvas(context) {
    context.strokeStyle = "#ff0000";
    this.NegativeSpaceCollapsed.polygons.forEach((polygon) => {
      // const ps = polygon.calcPoints.map((v) => [v.x, v.y]);

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
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// /**
//  * Checks if two line segments (defined by SP_2d_Vector endpoints) are collinear and overlap.
//  * @param {SP_2d_Vector} p1 - First point of the first segment.
//  * @param {SP_2d_Vector} q1 - Second point of the first segment.
//  * @param {SP_2d_Vector} p2 - First point of the second segment.
//  * @param {SP_2d_Vector} q2 - Second point of the second segment.
//  * @returns {boolean} - True if segments overlap and are collinear, false otherwise.
//  */
// function doSegmentsOverlap(
//   p1: SP_2d_Vector,
//   q1: SP_2d_Vector,
//   p2: SP_2d_Vector,
//   q2: SP_2d_Vector
// ): boolean {
//   // Check collinearity using cross product of vectors
//   const v1 = q1.clone().sub(p1); // Vector representing segment 1
//   const v2 = p2.clone().sub(p1); // Vector from p1 to p2
//   const v3 = q2.clone().sub(p1); // Vector from p1 to q2

//   const crossProduct1 = v1.x * v2.y - v1.y * v2.x; // Cross product of p1-q1 and p1-p2
//   const crossProduct2 = v1.x * v3.y - v1.y * v3.x; // Cross product of p1-q1 and p1-q2

//   const EPSILON = 1e-9;
//   if (Math.abs(crossProduct1) > EPSILON || Math.abs(crossProduct2) > EPSILON) {
//     return false; // Not collinear
//   }

//   // Check if the bounding boxes of the segments overlap
//   const overlapX =
//     Math.max(p1.x, q1.x) >= Math.min(p2.x, q2.x) &&
//     Math.min(p1.x, q1.x) <= Math.max(p2.x, q2.x);
//   const overlapY =
//     Math.max(p1.y, q1.y) >= Math.min(p2.y, q2.y) &&
//     Math.min(p1.y, q1.y) <= Math.max(p2.y, q2.y);

//   return overlapX && overlapY;
// }

// if (this.system.checkAll(callback)) {
//   // Do something yourself
// }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// // console.log("negative space", NegativeSpaceCollapsed);

// // ////////////////////////////////////////////////////////////////////////////////////////////////////////////
// console.log("positive space ", PositiveSpaceCollapsed);

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// console.log("convex", convexPositive);
// context.strokeStyle = "#0000ff";
// convexPositive.forEach((polygon) => {
//   polygon.forEach((point, ndx) => {
//     if (ndx === 0) {
//       context.moveTo(point.x, point.y);
//       context.beginPath();
//     } else {
//       context.lineTo(point.x, point.y);
//     }

//     if (ndx === polygon.length - 1) {
//       context.lineTo(polygon[0].x, polygon[0].y);

//       context.fillStyle = "#0000ff33";
//       context.fill();
//     }
//   });

//   context.closePath();
//   context.stroke();
// });

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
// renderGraphToCanvas(navmesh.graphOfCentroid, context, {
//   backgroundColor: "transparent",
//   nodes: {
//     defaultColor: "#00ff00",
//     radius:2
//   },
//   edges: {
//     defaultColor: "#00ff00",
//     width:1
//   },
// });
