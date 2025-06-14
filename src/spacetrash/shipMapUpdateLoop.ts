import { ECS } from "../engine/ECS";
import { PhysicsActorComponent } from "./Components/actor";
import { Phase0Store } from "./Components/phase0";
import { Phase1Store } from "./Components/phase1";
import { PhysicsSetPieceComponent } from "./Components/setPiece";
import { SpaceTrashDrone } from "./Entities";
import { Tile } from "./Entities/setpieces";

import { MapSize } from "./System";

export const shipMapUpdateLoop = (ecs: ECS): ((canvas) => any)[] => {


  const twoD = (ecs.stores["Phase0"] as Phase0Store).store;
  const oneD = (ecs.stores["Phase1"] as Phase1Store).store;

  let eraseOperations: ((canvas) => any)[] = [];
  let drawOperations: ((canvas) => any)[] = [];

  for (let y = 0; y < MapSize - 1; y++) {
    for (let x = 0; x < MapSize - 1; x++) {
      // thingsToDraw.push((canvas) => {
      //   const z = phaseZero[y][x];

      //   const canvas2d = canvas as OffscreenCanvasRenderingContext2D;
      //   canvas2d.beginPath();

      //   if (z.tileType === "FloorTile") {
      //     if (z.luminance > 0) {
      //       canvas2d.fillStyle = "yellow";
      //     } else {
      //       canvas2d.fillStyle = "white";
      //     }

      //     canvas2d.rect(
      //       Math.floor(x * TileSize - TileSize / 2 + 1),
      //       Math.floor(y * TileSize - TileSize / 2 + 1),
      //       TileSize - 1,
      //       TileSize - 1
      //     );
      //   }
      //   if (z.tileType === "WallTile") {
      //     canvas2d.fillStyle = "darkgrey";
      //     canvas2d.rect(
      //       Math.floor(x * TileSize - TileSize / 2 + 1),
      //       Math.floor(y * TileSize - TileSize / 2 + 1),
      //       TileSize - 1,
      //       TileSize - 1
      //     );
      //   }

      //   canvas2d.fill();
      //   canvas2d.stroke();
      // });

      const p = twoD[y][x];
      const z = ecs.entities[p.setId];
      const s: PhysicsSetPieceComponent =
        ecs.componentStores["PhysicsSetPieceComponent"].store[z];

      // drawOperations.push(Tile.draw2d(s, p.luminance));

      if (p.rendered2d === "fresh") {
        drawOperations.push(Tile.draw2d(s, p));
        p.rendered2d = "rendered";
      } else if (p.rendered2d === "changed") {
        drawOperations.push(Tile.draw2d(s, p));
        p.rendered2d = "rendered";
      } else if (p.rendered2d === "unchanged") {
        // no-op
      }  else if (p.rendered2d === "rendered") {
        // no-op
      } else {
        throw `should not be in renderState ${JSON.stringify(p)}`;
      }
      
      // drawOperations.push(Tile.draw2d(s, p.luminance));
      // if (tick === 0 || p.dirty) {
      //   drawOperations.push(Tile.draw2d(s, p.luminance));
      //   debugger
      //   p.dirty = false;
      // }
    }
  }

  oneD.forEach((actor, i) => {
    const p = oneD[i];
    const z = ecs.entities[p.actorId];
    const s: PhysicsActorComponent =
      ecs.componentStores["PhysicsActorComponent"].store[z];


    if (!p.culled2d) {
      if (p.rendered2d === "fresh") {
        drawOperations.push(SpaceTrashDrone.draw2d(s));
        p.rendered2d = "rendered";
      } else if (p.rendered2d === "changed") {
        drawOperations.push(SpaceTrashDrone.draw2d(s));
        p.rendered2d = "rendered";
      } else if (p.rendered2d === "unchanged") {
        // no-op
      } else if (p.rendered2d === "rendered") {
        // no-op
      } else {
        throw `should not be in renderState ${JSON.stringify(p)}`;
      }
  
      drawOperations.push(SpaceTrashDrone.draw2d(s));
    }
    

    // const e = ecs.getEntityComponent<SpaceTrashDrone>(
    //   oneD[i].actorId,
    //   SpaceTrashDrone.constructor
    // );
    // if (tick === 0) {
    //   drawOperations.push(e.draw2d);
    // } else {
    //   eraseOperations.push(e.erase2d);
    //   drawOperations.push(e.draw2d);
    // }
  });


  return [...eraseOperations, ...drawOperations];
};
