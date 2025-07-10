import { GameWithControls } from "./4-WithControls";
import { SP_MultiPolygon } from "../../demiurge/physics/SP_MultiPolygon";
import { SP_Polygon } from "../../demiurge/physics/SP_Polygon";
import { SP_2d_Vector } from "../../demiurge/physics/SP_2d_Vector";
import { MapSize, TileSize } from "../Constants";
import Graph from "graphology";
import * as SAT from "sat";
import { SATVector } from "detect-collisions";
const polyPart = require("poly-partition");
const centroid = require("polygon-centroid");
import { doPolygonsShareAnEdge } from "./navmesh";
import { Tile } from "../ECS/EntityComponents/tiles";

export abstract class GameWithLevel extends GameWithControls {
  Space = new SP_MultiPolygon([
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

  inflateLevel() {
    for (let y = 0; y < MapSize; y++) {
      for (let x = 0; x < MapSize; x++) {
        const tile = this.level.tileLayer("Tile Layer 1").get(x, y);

        if (tile) {
          const t = Tile.fromTid(
            tile,
            x,
            y,
            this.three_d_textures,
            this.two_d_images
          );
          const polygon: SP_Polygon = t.polygon();
          if (polygon.points.length) this.NegativeSpace.addPolygons([polygon]);

          if (t) this.setEntitiesComponent([t]);
        }
      }
    }

    this.NegativeSpaceCollapsed = this.NegativeSpace.union();

    this.Space.addMultiPolygon(this.NegativeSpaceCollapsed);
    this.PositiveSpaceCollapsed = this.Space.difference();

    const pxs = this.PositiveSpaceCollapsed.polygons.reduce((mm, plgn) => {
      mm.push(plgn.points);
      return mm;
    }, []);

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

    let satCnvxp1: SAT.Polygon;
    let satCnvxp2: SAT.Polygon;

    this.convexPositive.forEach((cnvcp1, ndx1) => {
      satCnvxp1 = new SAT.Polygon(
        new SATVector(0, 0),
        cnvcp1.map((cnvcp) => {
          return new SATVector(cnvcp.x, cnvcp.y);
        })
      );

      this.convexPositive.forEach((cnvcp2, ndx2) => {
        satCnvxp2 = new SAT.Polygon(
          new SATVector(0, 0),
          cnvcp2.map((cnvcp) => {
            return new SATVector(cnvcp.x, cnvcp.y);
          })
        );

        if (ndx1 !== ndx2) {
          var response = new SAT.Response();

          if (doPolygonsShareAnEdge(satCnvxp1, satCnvxp2)) {
            this.graphOfCentroid.addEdge(
              `centroid-${ndx1}`,
              `centroid-${ndx2}`
            );
          }
        }
      });
    });
  }
}
