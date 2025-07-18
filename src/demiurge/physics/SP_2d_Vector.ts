import SAT from "sat";
import { EPSILON } from ".";

export class SP_2d_Vector extends SAT.Vector {
  constructor(x?: number, y?: number) {
    super(x, y);
  }

  /**
   * Checks if two SP_2d_Vector objects are approximately equal, considering floating point precision.
   * @param {SP_2d_Vector} v1 - The first vector.
   * @param {SP_2d_Vector} v2 - The second vector.
   * @returns {boolean} - True if the vectors are approximately equal, false otherwise.
   */
  static areVectorsEqual(v1: SP_2d_Vector, v2: SP_2d_Vector): boolean {
    return Math.abs(v1.x - v2.x) < EPSILON && Math.abs(v1.y - v2.y) < EPSILON;
  }

  /**
   * Checks if a point lies on a line segment.
   * Includes check for collinearity and bounds.
   * @param {SP_2d_Vector} p - The point to check.
   * @param {SP_2d_Vector} a - One endpoint of the segment.
   * @param {SP_2d_Vector} b - The other endpoint of the segment.
   * @returns {boolean} - True if the point lies on the segment, false otherwise.
   */
  static isPointOnSegment(
    p: SP_2d_Vector,
    a: SP_2d_Vector,
    b: SP_2d_Vector
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
   * Returns a new SP_2d_Vector with the same coordinates as this one.
   * Overridden to ensure chaining or copying results in an SP_2d_Vector instance.
   * SAT.js clone() returns SP_2d_Vector.
   * @returns {SP_2d_Vector} A new cloned vector of type SP_2d_Vector.
   */
  clone(): SP_2d_Vector {
    return new SP_2d_Vector(this.x, this.y);
  }

  // --- Methods inherited from SP_2d_Vector that modify `this` and return `this` (already SP_2d_Vector) ---
  // copy(other: SP_2d_Vector): this { super.copy(other); return this; }
  // add(other: SP_2d_Vector): this { super.add(other); return this; }
  // sub(other: SP_2d_Vector): this { super.sub(other); return this; }
  // scale(x: number, y?: number): this { super.scale(x, y); return this; }
  // ... and other mutation methods like perp, rotate, reverse, normalize, project, reflect
  // These don't need overriding if their default behavior is desired.

  /**
   * Returns the magnitude (length) of the vector
   * @returns {number} The vector's magnitude
   */
  magnitude(): number {
    return this.len();
  }

  /**
   * Multiplies the vector by a scalar value and returns this vector for chaining
   * @param {number} scalar - The scalar value to multiply by
   * @returns {this} This vector after scaling
   * @throws {TypeError} If scalar is not a finite number
   */
  multiply(scalar: number): this {
    if (typeof scalar !== "number" || !Number.isFinite(scalar)) {
      throw new TypeError("Scalar must be a finite number");
    }
    return this.scale(scalar);
  }

  /**
   * Calculates the distance between this vector and another
   * @param {SP_2d_Vector} other - The other vector to measure distance to
   * @returns {number} The distance between the vectors
   * @throws {TypeError} If other is not a valid vector
   */
  distance(other: SP_2d_Vector): number {
    if (!other || typeof other.x !== "number" || typeof other.y !== "number") {
      throw new TypeError("Other must be a vector with x and y properties");
    }
    return this.clone().sub(other).len();
  }

  /**
   * Returns a string representation of the vector
   * @returns {string} The vector as a string in format "SP_2d_Vector(x, y)"
   */
  toString(): string {
    return `SP_2d_Vector(${this.x}, ${this.y})`;
  }

  // --- Methods inherited from SP_2d_Vector that return numbers or booleans ---
  // dot(other: SP_2d_Vector): number { return super.dot(other); }
  // len2(): number { return super.len2(); }
  // len(): number { return super.len(); }
  // ... These also don't need overriding.
}
