import { GameWithControls } from "./4-WithControls";
import { SP_Polygon } from "../../demiurge/physics/SP_Polygon";
import { MapSize } from "../Constants";
import { Tile } from "../ECS/EntityComponents/tiles";
import { SP_NavMesh } from "../../demiurge/physics/SP_NavMesh";

export abstract class GameWithLevel extends GameWithControls {
  navmesh = new SP_NavMesh(MapSize, MapSize);

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

          // if (polygon.points.length) this.NegativeSpace.addPolygons([polygon]);
          this.navmesh.subtractSpace([polygon]);

          if (t) this.setEntitiesComponent([t]);
        }
      }
    }

    this.navmesh.makeGraph();
  }
}
