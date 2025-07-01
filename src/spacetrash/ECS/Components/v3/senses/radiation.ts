import { FOV } from "rot-js";
import { Sense } from ".";
import { TileSize, MapSize } from "../../../../Constants";
import { SetPieceComponent } from "../setPieces";
import { SpaceTrash } from "../../../../Game/6-WithStateSpace";
import { AiAgentComponent } from "../ai";

export class RadiationSense extends Sense {
  memory: {
    rads: number;
  }[][];

  inputSensoryData(game: SpaceTrash, ai: AiAgentComponent) {
    const x = Math.round(ai.arcadeBody.position.x / TileSize);
    const y = Math.round(ai.arcadeBody.position.y / TileSize);

    const setPiece: SetPieceComponent = game.components.RadiationStore.at(x, y);

    this.memory[y][x] = setPiece.rads;
  }
}
