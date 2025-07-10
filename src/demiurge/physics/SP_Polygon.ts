import SAT from "sat";

export class SP_Polygon extends SAT.Polygon {
  constructor(position: SAT.Vector, edges: SAT.Vector[]) {
    // Ensure position and edges contain valid numbers before calling super
    if (!(position instanceof SAT.Vector)) {
      throw new Error("Invalid position provided to SP_Polygon constructor.");
    }
    if (
      !Array.isArray(edges) ||
      edges.some((e) => !(e instanceof SAT.Vector))
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

  polygonPolygonClippingStyle(): [number, number][] {
    // If your edges are already absolute world coordinates and position is (0,0),
    // then just return the points directly.
    return this.points.map((p: { x: number; y: number }) => {
      // If this.pos is always (0,0) for SP_Polygon constructed this way,
      // then the following line could be simplified to just [p.x, p.y]
      // But if this.pos *is* used to offset the polygon, keep it.
      const x = this.pos.x + p.x;
      const y = this.pos.y + p.y;
      return [x, y];
    });
  }
}
