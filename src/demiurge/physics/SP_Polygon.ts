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
   * @param {SAT.Vector} point - The point to check
   * @returns {boolean} True if point is inside polygon
   */
  contains(point: SP_2d_Vector): boolean {
    // Ray casting algorithm
    let inside = false;
    for (let i = 0, j = this.points.length - 1; i < this.points.length; j = i++) {
      const xi = this.points[i].x + this.pos.x;
      const yi = this.points[i].y + this.pos.y;
      const xj = this.points[j].x + this.pos.x;
      const yj = this.points[j].y + this.pos.y;

      const intersect = ((yi > point.y) !== (yj > point.y))
        && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
      if (intersect) inside = !inside;
    }
    return inside;
  }

  /**
   * Calculates the centroid (geometric center) of the polygon
   * @returns {SAT.Vector} The centroid point
   */
  getCentroid(): SP_2d_Vector {
    let x = 0;
    let y = 0;
    for (const point of this.points) {
      x += point.x;
      y += point.y;
    }
    return new SP_2d_Vector(
      this.pos.x + (x / this.points.length),
      this.pos.y + (y / this.points.length)
    );
  }

  /**
   * Translates the polygon by an offset vector
   * @param {SAT.Vector} offset - The translation vector
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
