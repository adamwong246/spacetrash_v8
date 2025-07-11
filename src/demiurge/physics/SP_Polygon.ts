import { EPSILON } from ".";
import { SP_2d_Vector } from "./SP_2d_Vector";
import SAT from "sat";

export class SP_Polygon extends SAT.Polygon {
  constructor(position: SP_2d_Vector, edges: SP_2d_Vector[]) {
    // Ensure position and edges contain valid numbers before calling super
    if (!(position instanceof SP_2d_Vector)) {
      throw new Error("Invalid position provided to SP_Polygon constructor.");
    }
    if (
      !Array.isArray(edges) ||
      edges.some((e) => !(e instanceof SP_2d_Vector))
    ) {
      throw new Error("Invalid edges provided to SP_Polygon constructor.");
    }

    super(position, edges);

    this.points.forEach((p: { x: any; y: any }, index) => {
      // Use 'any' for type flexibility during check
      if (Number.isNaN(p.x) || Number.isNaN(p.y)) {
        console.error(`NaN detected in SP_Polygon.points[${index}]:`, p);
        throw new Error("Polygon initialized with NaN coordinates.");
      }
    });
  }

  /**
   * Determines if two polygons share at least one entire edge (face).
   * Assumes non-overlapping convex polygons with vertices in order (e.g., counter-clockwise).
   * Uses SAT.js classes for Vector and Polygon.
   * This version specifically checks if the endpoints of the segments truly overlap for robustness.
   *
   * @param {SP_Polygon} poly1 - The first polygon.
   * @param {SP_Polygon} poly2 - The second polygon.
   * @returns {boolean} - True if the polygons share at least one edge, false otherwise.
   */
  static doPolygonsShareAnEdge(poly1: SP_Polygon, poly2: SP_Polygon): boolean {
    const poly1AbsVertices: SP_2d_Vector[] = poly1.calcPoints.map(
      (point: SP_2d_Vector) => point.clone().add(poly1.pos)
    );
    const poly2AbsVertices: SP_2d_Vector[] = poly2.calcPoints.map(
      (point: SP_2d_Vector) => point.clone().add(poly2.pos)
    );

    for (let i = 0; i < poly1AbsVertices.length; i++) {
      const p1a: SP_2d_Vector = poly1AbsVertices[i];
      const p1b: SP_2d_Vector =
        poly1AbsVertices[(i + 1) % poly1AbsVertices.length]; // Edge from p1a to p1b

      for (let j = 0; j < poly2AbsVertices.length; j++) {
        const p2a: SP_2d_Vector = poly2AbsVertices[j];
        const p2b: SP_2d_Vector =
          poly2AbsVertices[(j + 1) % poly2AbsVertices.length]; // Edge from p2a to p2b

        // Now we need to be more precise:
        // An edge is shared if:
        // 1. The two segments are collinear.
        // 2. The segments overlap.
        // 3. The overlap has non-zero length (i.e., at least one endpoint of one segment lies on the other segment's interior,
        //    or both endpoints are part of a shared segment).

        // First, check collinearity
        const v1 = p1b.clone().sub(p1a);
        const v2 = p2a.clone().sub(p1a);
        const v3 = p2b.clone().sub(p1a);

        const crossProduct1 = v1.x * v2.y - v1.y * v2.x;
        const crossProduct2 = v1.x * v3.y - v1.y * v3.x;

        if (
          Math.abs(crossProduct1) > EPSILON ||
          Math.abs(crossProduct2) > EPSILON
        ) {
          continue; // Not collinear, move to next edge pair
        }

        // If collinear, check if one segment's endpoints lie on the other, or vice versa.
        // This implies an overlap with non-zero length.
        const p1aOnP2Edge = SP_2d_Vector.isPointOnSegment(p1a, p2a, p2b);
        const p1bOnP2Edge = SP_2d_Vector.isPointOnSegment(p1b, p2a, p2b);
        const p2aOnP1Edge = SP_2d_Vector.isPointOnSegment(p2a, p1a, p1b);
        const p2bOnP1Edge = SP_2d_Vector.isPointOnSegment(p2b, p1a, p1b);

        // We need at least two distinct points to overlap to consider it a shared edge
        // (either both endpoints of one segment lie on the other segment, or one endpoint of each lies on the other)
        let sharedPointsCount = 0;
        if (p1aOnP2Edge) sharedPointsCount++;
        if (p1bOnP2Edge && !SP_2d_Vector.areVectorsEqual(p1a, p1b))
          sharedPointsCount++; // Only count if distinct from p1a
        if (
          p2aOnP1Edge &&
          !SP_2d_Vector.areVectorsEqual(p2a, p1a) &&
          !SP_2d_Vector.areVectorsEqual(p2a, p1b)
        )
          sharedPointsCount++; // Only count if distinct from p1a and p1b
        if (
          p2bOnP1Edge &&
          !SP_2d_Vector.areVectorsEqual(p2b, p1a) &&
          !SP_2d_Vector.areVectorsEqual(p2b, p1b) &&
          !SP_2d_Vector.areVectorsEqual(p2b, p2a)
        )
          sharedPointsCount++; // Only count if distinct

        // If at least two distinct points are shared, it's a shared edge.
        // For non-overlapping polygons, a shared edge means either:
        //  - One edge is completely contained within the other (unlikely for non-overlapping convex polygons unless they are identical, which we ignore)
        //  - They share a common segment. This implies at least two endpoints (vertices) are common.
        if (sharedPointsCount >= 2) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Calculates the area of the polygon using the shoelace formula
   * @returns {number} The polygon's area
   */
  getArea(): number {
    if (this.points.length < 3) return 0;

    let area = 0;
    for (let i = 0; i < this.points.length; i++) {
      const j = (i + 1) % this.points.length;
      area += this.points[i].x * this.points[j].y;
      area -= this.points[j].x * this.points[i].y;
    }
    return Math.abs(area) / 2;
  }

  /**
   * Checks if a point is inside the polygon
   * @param {SP_2d_Vector} point - The point to check
   * @returns {boolean} True if point is inside polygon
   */
  contains(point: SP_2d_Vector): boolean {
    // Ray casting algorithm
    let inside = false;
    for (
      let i = 0, j = this.points.length - 1;
      i < this.points.length;
      j = i++
    ) {
      const xi = this.points[i].x + this.pos.x;
      const yi = this.points[i].y + this.pos.y;
      const xj = this.points[j].x + this.pos.x;
      const yj = this.points[j].y + this.pos.y;

      const intersect =
        yi > point.y !== yj > point.y &&
        point.x < ((xj - xi) * (point.y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }
    return inside;
  }

  /**
   * Calculates the centroid (geometric center) of the polygon
   * @returns {SP_2d_Vector} The centroid point
   */
  getCentroid(): SP_2d_Vector {
    let x = 0;
    let y = 0;
    for (const point of this.points) {
      x += point.x;
      y += point.y;
    }
    return new SP_2d_Vector(
      this.pos.x + x / this.points.length,
      this.pos.y + y / this.points.length
    );
  }

  /**
   * Translates the polygon by an offset vector
   * @param {SP_2d_Vector} offset - The translation vector
   * @returns {this} This polygon after translation
   */
  translate(offset: SP_2d_Vector): this {
    this.pos.add(offset);
    return this;
  }

  /**
   * Rotates the polygon around its position
   * @param {number} angle - The rotation angle in radians
   * @returns {this} This polygon after rotation
   */
  rotate(angle: number): this {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    for (const point of this.points) {
      const x = point.x * cos - point.y * sin;
      const y = point.x * sin + point.y * cos;
      point.x = x;
      point.y = y;
    }
    return this;
  }

  polygonPolygonClippingStyle(): [number, number][] {
    return this.points.map((p: { x: number; y: number }) => {
      const x = this.pos.x + p.x;
      const y = this.pos.y + p.y;
      return [x, y];
    });
  }

  /**
   * Gets the height of the polygon (max y - min y)
   */
  getHeight(): number {
    if (!this.points.length) return 0;

    let minY = Infinity;
    let maxY = -Infinity;

    for (const point of this.points) {
      minY = Math.min(minY, point.y);
      maxY = Math.max(maxY, point.y);
    }

    return maxY - minY;
  }

  /**
   * Gets the width of the polygon (max x - min x)
   */
  getWidth(): number {
    if (!this.points.length) return 0;

    let minX = Infinity;
    let maxX = -Infinity;

    for (const point of this.points) {
      minX = Math.min(minX, point.x);
      maxX = Math.max(maxX, point.x);
    }

    return maxX - minX;
  }

  /**
   * Calculates the circumference (perimeter) of the polygon
   */
  getCircumference(): number {
    if (this.points.length < 2) return 0;

    let circumference = 0;
    for (let i = 0; i < this.points.length; i++) {
      const j = (i + 1) % this.points.length;
      const dx = this.points[j].x - this.points[i].x;
      const dy = this.points[j].y - this.points[i].y;
      circumference += Math.sqrt(dx * dx + dy * dy);
    }
    return circumference;
  }
}
