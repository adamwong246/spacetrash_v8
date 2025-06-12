import { LitableComponent } from "./Components/casting/in";
import { Phase0 } from "./Components/phase0";
import {
  PhysicsSetComponent,
  PhysicsActorComponent,
} from "./Components/physics";
import { MapSize, TileSize } from "./System";

export const shipMapUpdateLoop = (componentStores, reply) => {
  // console.log("tick", entities[0], entities[1], entities[2])

  const thingsToDraw: Record<string, any> = {};

  const phaseZero = componentStores[Phase0.name] as Phase0[][];
  // console.log("phaseZero", phaseZero)

  // map entity id to actor and light
  const setLights: Record<string, [number, number]> = {};

  /////////////////////////////////////////////////
  const litEntities = componentStores[LitableComponent.name] as [
    string,
    LitableComponent
  ][];

  litEntities.forEach(([eid, littable], n) => {
    if (!setLights[eid]) {
      setLights[eid] = [-1, -1];
    }
    setLights[eid][1] = n;
  });

  for (let y = 0; y < MapSize; y++) {
    // phaseZero[y] = [];
    for (let x = 0; x < MapSize; x++) {
      // phaseZero[y][x] = new Phase0();
      const tileid = `${x}-${y}`;


      if (!thingsToDraw[tileid]) {
        thingsToDraw[tileid] = {
          draw: () => {
            // no-opt
          },
          opts: {
            fill: "",
          },
        };
      }

      thingsToDraw[tileid].draw = (
        canvas2d: OffscreenCanvasRenderingContext2D,
        opts: {
          fill: string;
          stroke: string;
        }
      ) => {
        canvas2d.rect(
          ((x * TileSize) - TileSize / 2) + 1,
          ((y * TileSize) - TileSize / 2) + 1,
          TileSize - 1,
          TileSize - 1
        );
      }


    }
  }

  /////////////////////////////////////////////////
  const physicsSetPieces = componentStores[
    PhysicsSetComponent.name
  ] as [string, PhysicsSetComponent][];

  physicsSetPieces.forEach(([id, setpiece], sNdx) => {
    // console.log(physicsComponent);

    //
    if (!thingsToDraw[id]) {
      thingsToDraw[id] = {
        draw: () => {
          // no-opt
        },
        opts: {
          fill: "",
        },
      };
    }

    // const setpiece = ec as PhysicsSetComponent;
    thingsToDraw[id].draw = (
      canvas,
      opts: {
        fill: string;
        stroke: string;
      }
    ) => {
      if (
        canvas.constructor.name ===
        "OffscreenCanvasRenderingContext2D"
      ) {
        const canvas2d =
          canvas as OffscreenCanvasRenderingContext2D;

        // debugger
        canvas2d.beginPath();

        if (setpiece.tileType === "NorthEast") {
          // canvas2d.arc(
          //   (setpiece.x * TileSize) - TileSize / 2,
          //   (setpiece.y * TileSize) + TileSize/2,
          //   TileSize / 6,
          //   0,
          //   2 * Math.PI,
          // )

          // canvas2d.arc(
          //   (setpiece.x * TileSize) + TileSize / 2,
          //   (setpiece.y * TileSize) + TileSize/2,
          //   TileSize / 6,
          //   0,
          //   2 * Math.PI,
          // )

          var path = new Path2D();

          path.moveTo(
            setpiece.x * TileSize - TileSize / 2,
            setpiece.y * TileSize - TileSize / 2
          );
          path.lineTo(
            setpiece.x * TileSize - TileSize / 2,
            setpiece.y * TileSize + TileSize / 2
          );
          path.lineTo(
            setpiece.x * TileSize + TileSize / 2,
            setpiece.y * TileSize + TileSize / 2
          );

          canvas2d.fillStyle = "darkgrey";
          canvas2d.fill(path);
        }

        if (setpiece.tileType === "NorthWest") {
          var path = new Path2D();

          path.moveTo(
            setpiece.x * TileSize + TileSize / 2,
            setpiece.y * TileSize - TileSize / 2
          );
          path.lineTo(
            setpiece.x * TileSize + TileSize / 2,
            setpiece.y * TileSize + TileSize / 2
          );
          path.lineTo(
            setpiece.x * TileSize - TileSize / 2,
            setpiece.y * TileSize + TileSize / 2
          );

          canvas2d.fillStyle = "darkgrey";
          canvas2d.fill(path);
        }

        if (setpiece.tileType === "SouthEast") {
          var path = new Path2D();

          path.moveTo(
            setpiece.x * TileSize - TileSize / 2,
            setpiece.y * TileSize - TileSize / 2
          );
          path.lineTo(
            setpiece.x * TileSize - TileSize / 2,
            setpiece.y * TileSize + TileSize / 2
          );
          path.lineTo(
            setpiece.x * TileSize + TileSize / 2,
            setpiece.y * TileSize - TileSize / 2
          );

          canvas2d.fillStyle = "darkgrey";
          canvas2d.fill(path);
        }

        if (setpiece.tileType === "SouthWest") {
          var sWidth = setpiece.x * TileSize;
          var sHeight = setpiece.y * TileSize;

          var path = new Path2D();

          path.moveTo(
            setpiece.x * TileSize + TileSize / 2,
            setpiece.y * TileSize + TileSize / 2
          );
          path.lineTo(
            setpiece.x * TileSize + TileSize / 2,
            setpiece.y * TileSize - TileSize / 2
          );
          path.lineTo(
            setpiece.x * TileSize - TileSize / 2,
            setpiece.y * TileSize - TileSize / 2
          );

          canvas2d.fillStyle = "darkgrey";
          canvas2d.fill(path);
        }

        if (setpiece.tileType === "TileA") {
          var sWidth = setpiece.x * TileSize;
          var sHeight = setpiece.y * TileSize;

          var path = new Path2D();

          path.moveTo(
            setpiece.x * TileSize + TileSize / 2,
            setpiece.y * TileSize + TileSize / 2
          );
          path.lineTo(
            setpiece.x * TileSize + TileSize / 2,
            setpiece.y * TileSize
          );
          path.lineTo(
            setpiece.x * TileSize,
            setpiece.y * TileSize + TileSize / 2
          );

          canvas2d.fillStyle = "darkgrey";
          canvas2d.fill(path);
        }
        if (setpiece.tileType === "TileB") {
          canvas2d.fillStyle = "darkgrey";

          canvas2d.rect(
            setpiece.x * TileSize - TileSize / 2 + 1,
            setpiece.y * TileSize + 1,
            TileSize - 1,
            TileSize / 2 - 1
          );
          // canvas2d.fill();
        }
        if (setpiece.tileType === "FloorTile") {
          const [littableEntityId, littalbe] = (litEntities.find((a) => a[0] === id) as [string, LitableComponent]);

          if (littalbe && littalbe.luminance > 0) {
            canvas2d.fillStyle = "yellow";
            canvas2d.rect(
              ((setpiece.x * TileSize) - TileSize / 2) + 1,
              ((setpiece.y * TileSize) - TileSize / 2) + 1,
              TileSize - 1,
              TileSize - 1
            );
          } else {
            canvas2d.fillStyle = "white";
          }

          
        }
        if (setpiece.tileType === "WallTile") {
          canvas2d.fillStyle = "darkgrey";
          canvas2d.rect(
            setpiece.x * TileSize - TileSize / 2 + 1,
            setpiece.y * TileSize - TileSize / 2 + 1,
            TileSize - 1,
            TileSize - 1
          );
        }

        if (opts?.fill) {
          // debugger
          canvas2d.fillStyle = opts.fill;
          // canvas2d.fill();
        }
        if (opts?.stroke) {
          // console.log(opts.stroke)
          canvas2d.strokeStyle = opts.stroke;
          // canvas2d.stroke();
        }
        canvas2d.stroke();
        canvas2d.fill();
      }
    };
  });

  /////////////////////////////////////////////////

  const physicsActorPieces = componentStores[PhysicsActorComponent.name] as [
    string,
    PhysicsActorComponent
  ][];
  physicsActorPieces.forEach(([id, actor]) => {
    if (!thingsToDraw[id]) {
      thingsToDraw[id] = {
        draw: () => {
          // no-opt
        },
        opts: {
          fill: "",
        },
      };
    }

    // const actor = ec as PhysicsActorComponent;
    thingsToDraw[id].draw = (canvas) => {
      if (canvas.constructor.name === "OffscreenCanvasRenderingContext2D") {
        const canvas2d = canvas as OffscreenCanvasRenderingContext2D;
        canvas2d.beginPath();
        canvas2d.arc(
          actor.x * TileSize,
          actor.y * TileSize,
          actor.r,
          0,
          2 * Math.PI
        );
        canvas2d.fillStyle = "orange";
        canvas2d.fill();
        canvas2d.stroke();
      }
    };
  });

  return thingsToDraw;
};
