import SAT from "sat";

export class SP_2d_Vector extends SAT.Vector {
  constructor(x?: number, y?: number) {
    super(x, y);
  }

  /**
   * Returns a new SP_2d_Vector with the same coordinates as this one.
   * Overridden to ensure chaining or copying results in an SP_2d_Vector instance.
   * SAT.js clone() returns SAT.Vector.
   * @returns {SP_2d_Vector} A new cloned vector of type SP_2d_Vector.
   */
  clone(): SP_2d_Vector {
    return new SP_2d_Vector(this.x, this.y);
  }

  // --- Methods inherited from SAT.Vector that modify `this` and return `this` (already SP_2d_Vector) ---
  // copy(other: SAT.Vector): this { super.copy(other); return this; }
  // add(other: SAT.Vector): this { super.add(other); return this; }
  // sub(other: SAT.Vector): this { super.sub(other); return this; }
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
    if (typeof scalar !== 'number' || !Number.isFinite(scalar)) {
      throw new TypeError('Scalar must be a finite number');
    }
    return this.scale(scalar);
  }

  /**
   * Calculates the distance between this vector and another
   * @param {SAT.Vector} other - The other vector to measure distance to
   * @returns {number} The distance between the vectors
   * @throws {TypeError} If other is not a valid vector
   */
  distance(other: SAT.Vector): number {
    if (!other || typeof other.x !== 'number' || typeof other.y !== 'number') {
      throw new TypeError('Other must be a vector with x and y properties');
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

  // --- Methods inherited from SAT.Vector that return numbers or booleans ---
  // dot(other: SAT.Vector): number { return super.dot(other); }
  // len2(): number { return super.len2(); }
  // len(): number { return super.len(); }
  // ... These also don't need overriding.
}
