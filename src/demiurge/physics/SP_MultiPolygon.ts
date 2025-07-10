import SAT from "sat";
import { SP_Polygon } from "./SP_Polygon";
import * as polyclip from "polyclip-ts";
import { MapSize, TileSize } from "../../spacetrash/Constants";

export class SP_MultiPolygon {
  polygons: SP_Polygon[];

  constructor(polygons: SP_Polygon[]) {
    this.polygons = polygons;
  }

  addPolygons(polygons: SP_Polygon[]) {
    this.polygons.push(...polygons);
  }

  addMultiPolygon(multPolygon: SP_MultiPolygon) {
    this.polygons.push(...multPolygon.polygons);
  }

  union(): SP_MultiPolygon {
    const ps: [number, number][][][] = this.polygonsPolygonClippingStyle(); // <--- Changed return type
    console.log(
      "Input polygons for union (before filtering):",
      JSON.stringify(ps)
    );

    // Filter out degenerate polygons (less than 3 vertices in any ring)
    const filteredPs = ps.filter((polygon) =>
      polygon.some((ring) => ring.length >= 3)
    );

    console.log("Filtered Polygons for operation:", JSON.stringify(filteredPs));
    for (let i = 0; i < filteredPs.length; i++) {
      const polygon = filteredPs[i];
      if (!Array.isArray(polygon) || polygon.length === 0) {
        console.error(
          `ERROR: FilteredPs[${i}] is empty or not an array:`,
          polygon
        );
        throw new Error("Invalid polygon found after filtering.");
      }
      for (let j = 0; j < polygon.length; j++) {
        // Loop through rings
        const ring = polygon[j];
        if (!Array.isArray(ring) || ring.length < 3) {
          console.error(
            `ERROR: Ring at filteredPs[${i}][${j}] is degenerate:`,
            ring
          );
          // Depending on strictness, you might throw or filter this specific ring out.
          // For now, it indicates a problem in the polygon source.
        }
        // Add checks for self-intersections or duplicate consecutive points if possible
      }
    }

    if (filteredPs.length === 0) {
      console.warn(
        "No valid polygons left after filtering. Returning empty MultiPolygon."
      );
      return new SP_MultiPolygon([]);
    }

    // `filteredPs` is now `[Polygon1, Polygon2, ...]`, where each `Polygon` is `[Ring1, Ring2, ...]`.
    // The arguments will be `Polygon1, Polygon2, ...`, each being `[[x,y],[x,y],...]`.
    let unionResult: [number, number][][];
    try {
      unionResult = polyclip.union(...filteredPs); // <--- Still passing Polygons as arguments
    } catch (e) {
      console.error("Error during polyclip.union operation:", e.message || e);
      throw e;
    }

    console.log("Output from polyclip.union:", JSON.stringify(unionResult));

    return new SP_MultiPolygon(this.clippingStyleBackToSpPolygons(unionResult));
  }

  difference(): SP_MultiPolygon {
    // This ps will be the list of obstacle polygons derived from the map.
    const ps: [number, number][][][] = this.polygonsPolygonClippingStyle();
    // console.log(
    //   "Input obstacle polygons for difference (before filtering):",
    //   JSON.stringify(ps)
    // );

    const filteredPs = ps.filter((polygon) =>
      polygon.some((ring) => ring.length >= 3)
    );

    if (filteredPs.length === 0) {
      console.warn(
        "No valid obstacle polygons found. The entire map is free space. Returning full map."
      );
      // If there are no obstacles, the negative space is the full map.
      return this;
      // const mapWidthPixels = MapSize * TileSize; // Assuming mapWidth and tileSize are accessible
      // const mapHeightPixels = MapSize * TileSize; // Assuming mapHeight and tileSize are accessible
      // const fullMapPolygon: [number, number][][] = [
      //   [
      //     [0, 0],
      //     [mapWidthPixels, 0],
      //     [mapWidthPixels, mapHeightPixels],
      //     [0, mapHeightPixels],
      //   ],
      // ];

      // return new SP_MultiPolygon(
      //   this.clippingStyleBackToSpPolygons(fullMapPolygon)
      // ); // Needs to be MultiPolygon format
    }

    // First, union all obstacles to get the combined positive space (same as your union() method)
    // const positiveSpaceMultiPolygon = polyclip.union(...filteredPs);

    // Now, define the entire map area as the subject
    // const mapWidthPixels = MapSize * TileSize; // Assuming mapWidth and tileSize are accessible
    // const mapHeightPixels = MapSize * TileSize; // Assuming mapHeight and tileSize are accessible
    // const fullMapPolygon: [number, number][][] = [
    //   [
    //     [0, 0],
    //     [mapWidthPixels, 0],
    //     [mapWidthPixels, mapHeightPixels],
    //     [0, mapHeightPixels],
    //   ],
    // ]; // This is a single Polygon

    // Calculate the negative space by subtracting the positive space from the full map
    // The arguments are: Subject (full map Polygon), and Clip (positive space MultiPolygon)
    // debugger
    const negativeSpaceResult = polyclip.difference(
      ...filteredPs
      // fullMapPolygon,
      // ...positiveSpaceMultiPolygon
    );

    // console.log(
    //   "Output from polyclip.difference (Negative Space):",
    //   JSON.stringify(negativeSpaceResult)
    // );
    return new SP_MultiPolygon(
      this.clippingStyleBackToSpPolygons(negativeSpaceResult)
    );
  }

  private polygonsPolygonClippingStyle(): [number, number][][][] {
    // <--- Key Change!
    // Each element in the outer array is now a Polygon, which is an array of rings.
    // Assuming each SP_Polygon represents a single ring. If you have holes, this structure needs adjustment.
    return this.polygons
      .map((p) => {
        const coords = p.polygonPolygonClippingStyle();
        // A Polygon is an array of rings. If no holes, it's an array containing one ring.
        return [coords];
      })
      .filter((polygon) => polygon[0].length >= 3); // Filter out degenerate polygons (where the first ring has < 3 points)
  }

  private clippingStyleBackToSpPolygons(
    clippingStyle: [number, number][][][] // This is the MultiPolygon output format
  ): SP_Polygon[] {
    const spPolygons: SP_Polygon[] = [];

    // Loop through each MultiPolygon in the output (e.g., [[Polygon1],[Polygon2]])
    for (const multiPolygonElement of clippingStyle) {
      if (!Array.isArray(multiPolygonElement)) {
        console.error(
          "Non-array element found in polyclip output (expected MultiPolygon part):",
          multiPolygonElement
        );
        continue;
      }

      // Now, `multiPolygonElement` is a Polygon (e.g., [Ring1, Ring2, ...])
      // It's the actual array of rings for a single Polygon.
      const polygon = multiPolygonElement;

      // Loop through each Ring within this Polygon
      for (const ringCoords of polygon) {
        if (!Array.isArray(ringCoords)) {
          console.error(
            "Non-array element found in polyclip output (expected Ring):",
            ringCoords
          );
          continue;
        }

        if (ringCoords.length < 3) {
          // This check should now correctly apply to the ring
          console.warn(
            "Degenerate ring (less than 3 vertices) in polyclip output, skipping:",
            JSON.stringify(ringCoords)
          );
          continue;
        }

        const satVectors: SAT.Vector[] = [];
        for (const c of ringCoords) {
          // `c` is now a coordinate pair `[x,y]`
          if (
            !Array.isArray(c) ||
            c.length !== 2 ||
            Number.isNaN(c) ||
            Number.isNaN(c)
          ) {
            console.error(
              "Invalid coordinate pair found in polyclip output:",
              JSON.stringify(c),
              "within ring:",
              JSON.stringify(ringCoords)
            );
            continue;
          }
          satVectors.push(new SAT.Vector(c[0], c[1])); // <--- Important: Pass x and y separately!
        }

        if (satVectors.length >= 3) {
          spPolygons.push(new SP_Polygon(new SAT.Vector(0, 0), satVectors));
        } else {
          console.warn(
            "Skipped creating SP_Polygon due to insufficient valid vertices:",
            JSON.stringify(ringCoords)
          );
        }
      }
    }
    return spPolygons;
  }
}
