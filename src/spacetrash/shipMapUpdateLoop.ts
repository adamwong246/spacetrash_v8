import { IStores } from "../engine/types";
import { PhysicsActorComponent, PhysicsActorStore } from "./Components/actor";
import { LitableComponent, LittableStore } from "./Components/casting/in";
import { Phase0, Phase0Store } from "./Components/phase0";
import { Phase1Store } from "./Components/phase1";
import {
  PhysicsSetPieceComponent,
  PhysicsSetPieceStore,
} from "./Components/setPiece";

import { MapSize, TileSize } from "./System";

export const shipMapUpdateLoop = (componentStores: IStores, reply): any[] => {
  // console.log("tick", entities[0], entities[1], entities[2])

  const thingsToDraw: any[] = [];


  // map entity id to actor and light
  // const setLights: Record<string, [number, number]> = {};

  /////////////////////////////////////////////////
  const phaseZero = (componentStores["Phase0"] as Phase0Store).store;
  const phaseOne = (componentStores["Phase1"] as Phase1Store).store;

  const litEntities = (componentStores["LitableComponent"] as LittableStore).store;
  // const physicsActorPieces = (componentStores['PhysicsActorComponent'] as PhysicsActorStore).store;
  const physicsSetPieces = (componentStores[
    'PhysicsSetPieceComponent'
  ] as PhysicsSetPieceStore).store

  // litEntities.forEach(([eid, littable], n) => {
  //   if (!setLights[eid]) {
  //     setLights[eid] = [-1, -1];
  //   }
  //   setLights[eid][1] = n;
  // });

  // for (let y = 0; y < MapSize; y++) {
  //   // phaseZero[y] = [];
  //   for (let x = 0; x < MapSize; x++) {
  //     // phaseZero[y][x] = new Phase0();
  //     const tileid = `${x}-${y}`;

  //     if (!thingsToDraw[tileid]) {
  //       thingsToDraw[tileid] = {
  //         draw: () => {
  //           // no-opt
  //         },
  //         opts: {
  //           fill: "",
  //         },
  //       };
  //     }

  //     thingsToDraw[tileid].draw = (
  //       canvas2d: OffscreenCanvasRenderingContext2D,
  //       opts: {
  //         fill: string;
  //         stroke: string;
  //       }
  //     ) => {
  //       canvas2d.rect(
  //         ((x * TileSize) - TileSize / 2) + 1,
  //         ((y * TileSize) - TileSize / 2) + 1,
  //         TileSize - 1,
  //         TileSize - 1
  //       );
  //     }

  //   }
  // }

  // /////////////////////////////////////////////////

  // physicsSetPieces.forEach(([id, setpiece], sNdx) => {
  //   // console.log(physicsComponent);

  //   // const thingToDraw = {
  //   //   draw: () => {
  //   //     // no-opt
  //   //   },
  //   //   opts: {
  //   //     fill: "",
  //   //   },
  //   // }
  //   //
  //   // if (!thingsToDraw[id]) {
  //   //   thingsToDraw[id] = {
  //   //     draw: () => {
  //   //       // no-opt
  //   //     },
  //   //     opts: {
  //   //       fill: "",
  //   //     },
  //   //   };
  //   // }

  //   // const setpiece = ec as PhysicsSetComponent;
  //   thingsToDraw.push((
  //     canvas,
  //   ) => {
  //     if (
  //       canvas.constructor.name ===
  //       "OffscreenCanvasRenderingContext2D"
  //     ) {
  //       const canvas2d =
  //         canvas as OffscreenCanvasRenderingContext2D;

  //       // debugger
  //       canvas2d.beginPath();

  //       if (setpiece.tileType === "NorthEast") {
  //         // canvas2d.arc(
  //         //   (setpiece.x * TileSize) - TileSize / 2,
  //         //   (setpiece.y * TileSize) + TileSize/2,
  //         //   TileSize / 6,
  //         //   0,
  //         //   2 * Math.PI,
  //         // )

  //         // canvas2d.arc(
  //         //   (setpiece.x * TileSize) + TileSize / 2,
  //         //   (setpiece.y * TileSize) + TileSize/2,
  //         //   TileSize / 6,
  //         //   0,
  //         //   2 * Math.PI,
  //         // )

  //         var path = new Path2D();

  //         path.moveTo(
  //           setpiece.x * TileSize - TileSize / 2,
  //           setpiece.y * TileSize - TileSize / 2
  //         );
  //         path.lineTo(
  //           setpiece.x * TileSize - TileSize / 2,
  //           setpiece.y * TileSize + TileSize / 2
  //         );
  //         path.lineTo(
  //           setpiece.x * TileSize + TileSize / 2,
  //           setpiece.y * TileSize + TileSize / 2
  //         );

  //         canvas2d.fillStyle = "darkgrey";
  //         canvas2d.fill(path);
  //       }

  //       if (setpiece.tileType === "NorthWest") {
  //         var path = new Path2D();

  //         path.moveTo(
  //           setpiece.x * TileSize + TileSize / 2,
  //           setpiece.y * TileSize - TileSize / 2
  //         );
  //         path.lineTo(
  //           setpiece.x * TileSize + TileSize / 2,
  //           setpiece.y * TileSize + TileSize / 2
  //         );
  //         path.lineTo(
  //           setpiece.x * TileSize - TileSize / 2,
  //           setpiece.y * TileSize + TileSize / 2
  //         );

  //         canvas2d.fillStyle = "darkgrey";
  //         canvas2d.fill(path);
  //       }

  //       if (setpiece.tileType === "SouthEast") {
  //         var path = new Path2D();

  //         path.moveTo(
  //           setpiece.x * TileSize - TileSize / 2,
  //           setpiece.y * TileSize - TileSize / 2
  //         );
  //         path.lineTo(
  //           setpiece.x * TileSize - TileSize / 2,
  //           setpiece.y * TileSize + TileSize / 2
  //         );
  //         path.lineTo(
  //           setpiece.x * TileSize + TileSize / 2,
  //           setpiece.y * TileSize - TileSize / 2
  //         );

  //         canvas2d.fillStyle = "darkgrey";
  //         canvas2d.fill(path);
  //       }

  //       if (setpiece.tileType === "SouthWest") {
  //         var sWidth = setpiece.x * TileSize;
  //         var sHeight = setpiece.y * TileSize;

  //         var path = new Path2D();

  //         path.moveTo(
  //           setpiece.x * TileSize + TileSize / 2,
  //           setpiece.y * TileSize + TileSize / 2
  //         );
  //         path.lineTo(
  //           setpiece.x * TileSize + TileSize / 2,
  //           setpiece.y * TileSize - TileSize / 2
  //         );
  //         path.lineTo(
  //           setpiece.x * TileSize - TileSize / 2,
  //           setpiece.y * TileSize - TileSize / 2
  //         );

  //         canvas2d.fillStyle = "darkgrey";
  //         canvas2d.fill(path);
  //       }

  //       if (setpiece.tileType === "TileA") {
  //         var sWidth = setpiece.x * TileSize;
  //         var sHeight = setpiece.y * TileSize;

  //         var path = new Path2D();

  //         path.moveTo(
  //           setpiece.x * TileSize + TileSize / 2,
  //           setpiece.y * TileSize + TileSize / 2
  //         );
  //         path.lineTo(
  //           setpiece.x * TileSize + TileSize / 2,
  //           setpiece.y * TileSize
  //         );
  //         path.lineTo(
  //           setpiece.x * TileSize,
  //           setpiece.y * TileSize + TileSize / 2
  //         );

  //         canvas2d.fillStyle = "darkgrey";
  //         canvas2d.fill(path);
  //       }
  //       if (setpiece.tileType === "TileB") {
  //         canvas2d.fillStyle = "darkgrey";

  //         canvas2d.rect(
  //           setpiece.x * TileSize - TileSize / 2 + 1,
  //           setpiece.y * TileSize + 1,
  //           TileSize - 1,
  //           TileSize / 2 - 1
  //         );
  //         // canvas2d.fill();
  //       }
  //       if (setpiece.tileType === "FloorTile") {
  //         const [littableEntityId, littalbe] = (litEntities.find((a) => a[0] === id) as [number, LitableComponent]);

  //         if (littalbe && littalbe.luminance > 0) {
  //           canvas2d.fillStyle = "yellow";

  //         } else {
  //           canvas2d.fillStyle = "white";
  //         }

  //         canvas2d.rect(
  //           ((setpiece.x * TileSize) - TileSize / 2) + 1,
  //           ((setpiece.y * TileSize) - TileSize / 2) + 1,
  //           TileSize - 1,
  //           TileSize - 1
  //         );

  //       }
  //       if (setpiece.tileType === "WallTile") {
  //         canvas2d.fillStyle = "darkgrey";
  //         canvas2d.rect(
  //           setpiece.x * TileSize - TileSize / 2 + 1,
  //           setpiece.y * TileSize - TileSize / 2 + 1,
  //           TileSize - 1,
  //           TileSize - 1
  //         );
  //       }

  //       // if (opts?.fill) {
  //       //   // debugger
  //       //   canvas2d.fillStyle = opts.fill;
  //       //   // canvas2d.fill();
  //       // }
  //       // if (opts?.stroke) {
  //       //   // console.log(opts.stroke)
  //       //   canvas2d.strokeStyle = opts.stroke;
  //       //   // canvas2d.stroke();
  //       // }
  //       canvas2d.stroke();
  //       canvas2d.fill();
  //     }
  //   });
  // });

  // /////////////////////////////////////////////////

  for (let y = 0; y < MapSize-1; y++){
    for (let x = 0; x < MapSize-1; x++){
      thingsToDraw.push((canvas) => {
        const z = phaseZero[y][x];

        const canvas2d = canvas as OffscreenCanvasRenderingContext2D;
        canvas2d.beginPath();

        // console.log(x, ((x * TileSize) - TileSize / 2) + 1)
        // canvas2d.fillStyle = "darkgrey";
        //   canvas2d.rect(
        //     ((x * TileSize) - TileSize / 2) + 1,
        //     ((y * TileSize) - TileSize / 2) + 1,
        //     TileSize - 1,
        //     TileSize - 1
        //   );
          
        if (z.tileType === "FloorTile") {
          // const [littableEntityId, littalbe] = (litEntities.find((a) => a[0] === id) as [number, LitableComponent]);

          if (z.luminance > 0) {
            canvas2d.fillStyle = "yellow";

          } else {
            canvas2d.fillStyle = "white";
          }

          canvas2d.rect(
            Math.floor(((x * TileSize) - TileSize / 2) + 1),
            Math.floor(((y * TileSize) - TileSize / 2) + 1),
            TileSize - 1,
            TileSize - 1
          );

        }
        if (z.tileType === "WallTile") {
          canvas2d.fillStyle = "darkgrey";
          canvas2d.rect(
            Math.floor(((x * TileSize) - TileSize / 2) + 1),
            Math.floor(((y * TileSize) - TileSize / 2) + 1),
            TileSize - 1,
            TileSize - 1
          );
        }

        canvas2d.fill();
        canvas2d.stroke();

      })
    }
  }
  
  phaseOne.forEach((actor, i) => {
    thingsToDraw.push((canvas) => {

      const canvas2d = canvas as OffscreenCanvasRenderingContext2D;
      canvas2d.beginPath();
      canvas2d.arc(
        actor[1] * TileSize,
        actor[2] * TileSize,
        TileSize/2,
        0,
        2 * Math.PI
      );
      canvas2d.fillStyle = "orange";
      canvas2d.fill();
      canvas2d.stroke();
    })
  });

  // console.log(thingsToDraw)
  

  return thingsToDraw;
};
