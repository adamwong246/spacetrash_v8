import SAT from "sat";

export class SP_Polygon extends SAT.Polygon{
  constructor(solid: "open" | "closed", ...a) {
    super(...a)
  }
}

