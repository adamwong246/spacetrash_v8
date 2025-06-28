import { FOV } from "rot-js";
import { Sense } from ".";
import { TileSize, MapSize } from "../../../../Constants";
import { SetPieceComponent } from "../setPieces";
import { SpaceTrash } from "../../../..";
import { AiAgentComponent } from "../ai";

export class FovSense extends Sense {
  memory: {
    actors: number[];
    setPiece: SetPieceComponent;

    manhattenDistance: number;
    visibility: 0 | 1;
  }[][];

  inputSensoryData(game: SpaceTrash, ai: AiAgentComponent) {
    // const playerX = Math.round(GAME.camera.position.x / TileSize);
    // const playerY = Math.round(GAME.camera.position.y / TileSize);
    const playerX = Math.round(ai.arcadeBody.position.x / TileSize);
    const playerY = Math.round(ai.arcadeBody.position.y / TileSize);

    const lightPasses = (x, y) => {
      if (x > 0 && x <= MapSize - 1 && y > 0 && y <= MapSize - 1) {
        const z = game.components.SetPieces.at(x, y);

        if (z && z.tileType === "WallTile") {
          return false;
        } else {
          return true;
        }
      }
      return false;

      // var key = x + "," + y;
      // if (key in data) {
      //   return data[key] == 0;
      // }
      // return false;
    };

    var fov = new FOV.RecursiveShadowcasting(lightPasses);

    fov.compute(playerX, playerY, 5, (x, y, manhattenDistance, visibility) => {
      if (x > 0 && x <= MapSize - 1 && y > 0 && y <= MapSize - 1) {
        if (visibility === 1) {
          const setPiece: SetPieceComponent = game.components.SetPieces.at(
            x,
            y
          );

          if (setPiece) {
            const actors: number[] = game.components.Actors.byXandY(
              x,
              y
            ).filter((i) => {
              return i !== EID;
            });

            this.memory[y][x] = { actors, setPiece, d, v };
          } else {
            debugger;
          }
        }
      }
    });
  }
}
