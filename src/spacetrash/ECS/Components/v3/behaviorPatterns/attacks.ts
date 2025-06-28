import { SpaceTrash } from "../../../..";

import { AiAgentComponent } from "../ai";
import { SetPieceComponent } from "../setPieces";

type IAttackPattern = (
  ai: AiAgentComponent,
  game: SpaceTrash,

  FOV: {
    actors: number[],
    setPiece: SetPieceComponent,
    manhattenDistance: number,
  visibility: 0 | 1,
  }[][]
  
  
  
) => `explore` | `defend`;

let distance = Infinity;

const attacks: Record<string, IAttackPattern> = {
  melee: (ai, game, a, s, x, y, d, v) => {
    
    if (d < distance) {
      ai.gotoPosition(
        game.components.Actors.take(ai.attackTargetId).arcadeBody.position
      );
      distance = d;

    }

    // const dist = ai.distanceToTarget();
    
    if (d < 5) {
      // ai.gotoPosition(
      //   game.components.Actors.take(ai.attackTargetId).arcadeBody.position
      // );
    } else {
      // ai.attackTarget();
    }

  }
}
export default attacks;