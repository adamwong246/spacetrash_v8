import * as SAT from "sat";

const EPSILON: number = 1e-9; // Small epsilon for floating point comparisons

/**
 * Checks if a point lies on a line segment.
 * Includes check for collinearity and bounds.
 * @param {SAT.Vector} p - The point to check.
 * @param {SAT.Vector} a - One endpoint of the segment.
 * @param {SAT.Vector} b - The other endpoint of the segment.
 * @returns {boolean} - True if the point lies on the segment, false otherwise.
 */
function isPointOnSegment(
  p: SAT.Vector,
  a: SAT.Vector,
  b: SAT.Vector
): boolean {
  // Check if p is collinear with a and b
  const crossProduct = (p.y - a.y) * (b.x - a.x) - (p.x - a.x) * (b.y - a.y);
  if (Math.abs(crossProduct) > EPSILON) return false;

  // Check if point is within the bounding box of the segment
  return (
    p.x >= Math.min(a.x, b.x) - EPSILON &&
    p.x <= Math.max(a.x, b.x) + EPSILON &&
    p.y >= Math.min(a.y, b.y) - EPSILON &&
    p.y <= Math.max(a.y, b.y) + EPSILON
  );
}

/**
 * Determines if two polygons share at least one entire edge (face).
 * Assumes non-overlapping convex polygons with vertices in order (e.g., counter-clockwise).
 * Uses SAT.js classes for Vector and Polygon.
 * This version specifically checks if the endpoints of the segments truly overlap for robustness.
 *
 * @param {SAT.Polygon} poly1 - The first polygon.
 * @param {SAT.Polygon} poly2 - The second polygon.
 * @returns {boolean} - True if the polygons share at least one edge, false otherwise.
 */
export function doPolygonsShareAnEdge(
  poly1: SAT.Polygon,
  poly2: SAT.Polygon
): boolean {
  const poly1AbsVertices: SAT.Vector[] = poly1.calcPoints.map(
    (point: SAT.Vector) => point.clone().add(poly1.pos)
  );
  const poly2AbsVertices: SAT.Vector[] = poly2.calcPoints.map(
    (point: SAT.Vector) => point.clone().add(poly2.pos)
  );

  for (let i = 0; i < poly1AbsVertices.length; i++) {
    const p1a: SAT.Vector = poly1AbsVertices[i];
    const p1b: SAT.Vector = poly1AbsVertices[(i + 1) % poly1AbsVertices.length]; // Edge from p1a to p1b

    for (let j = 0; j < poly2AbsVertices.length; j++) {
      const p2a: SAT.Vector = poly2AbsVertices[j];
      const p2b: SAT.Vector =
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
      const p1aOnP2Edge = isPointOnSegment(p1a, p2a, p2b);
      const p1bOnP2Edge = isPointOnSegment(p1b, p2a, p2b);
      const p2aOnP1Edge = isPointOnSegment(p2a, p1a, p1b);
      const p2bOnP1Edge = isPointOnSegment(p2b, p1a, p1b);

      // We need at least two distinct points to overlap to consider it a shared edge
      // (either both endpoints of one segment lie on the other segment, or one endpoint of each lies on the other)
      let sharedPointsCount = 0;
      if (p1aOnP2Edge) sharedPointsCount++;
      if (p1bOnP2Edge && !areVectorsEqual(p1a, p1b)) sharedPointsCount++; // Only count if distinct from p1a
      if (
        p2aOnP1Edge &&
        !areVectorsEqual(p2a, p1a) &&
        !areVectorsEqual(p2a, p1b)
      )
        sharedPointsCount++; // Only count if distinct from p1a and p1b
      if (
        p2bOnP1Edge &&
        !areVectorsEqual(p2b, p1a) &&
        !areVectorsEqual(p2b, p1b) &&
        !areVectorsEqual(p2b, p2a)
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * Checks if two SAT.Vector objects are approximately equal, considering floating point precision.
 * @param {SAT.Vector} v1 - The first vector.
 * @param {SAT.Vector} v2 - The second vector.
 * @returns {boolean} - True if the vectors are approximately equal, false otherwise.
 */
function areVectorsEqual(v1: SAT.Vector, v2: SAT.Vector): boolean {
  const EPSILON = 1e-9;
  return Math.abs(v1.x - v2.x) < EPSILON && Math.abs(v1.y - v2.y) < EPSILON;
}

/**
 * Checks if two line segments (defined by SAT.Vector endpoints) are collinear and overlap.
 * @param {SAT.Vector} p1 - First point of the first segment.
 * @param {SAT.Vector} q1 - Second point of the first segment.
 * @param {SAT.Vector} p2 - First point of the second segment.
 * @param {SAT.Vector} q2 - Second point of the second segment.
 * @returns {boolean} - True if segments overlap and are collinear, false otherwise.
 */
function doSegmentsOverlap(
  p1: SAT.Vector,
  q1: SAT.Vector,
  p2: SAT.Vector,
  q2: SAT.Vector
): boolean {
  // Check collinearity using cross product of vectors
  const v1 = q1.clone().sub(p1); // Vector representing segment 1
  const v2 = p2.clone().sub(p1); // Vector from p1 to p2
  const v3 = q2.clone().sub(p1); // Vector from p1 to q2

  const crossProduct1 = v1.x * v2.y - v1.y * v2.x; // Cross product of p1-q1 and p1-p2
  const crossProduct2 = v1.x * v3.y - v1.y * v3.x; // Cross product of p1-q1 and p1-q2

  const EPSILON = 1e-9;
  if (Math.abs(crossProduct1) > EPSILON || Math.abs(crossProduct2) > EPSILON) {
    return false; // Not collinear
  }

  // Check if the bounding boxes of the segments overlap
  const overlapX =
    Math.max(p1.x, q1.x) >= Math.min(p2.x, q2.x) &&
    Math.min(p1.x, q1.x) <= Math.max(p2.x, q2.x);
  const overlapY =
    Math.max(p1.y, q1.y) >= Math.min(p2.y, q2.y) &&
    Math.min(p1.y, q1.y) <= Math.max(p2.y, q2.y);

  return overlapX && overlapY;
}
