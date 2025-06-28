import { SpaceTrash } from "../../../..";
import { AiAgentComponent } from "../ai";
import { SetPieceComponent } from "../setPieces";

type IExplorePattern = (
  ai: AiAgentComponent,
  game: SpaceTrash,
  actors: number[],
  setPiece: SetPieceComponent,
  x: number,
  y: number,
  manhattenDistance: number,
  visibility: 0 | 1,
) => 'attack' | null;

const explore: Record<string, IExplorePattern> = {
  wander: (ai, game, a, s, x, y, d, v) => {

    if (a.length) {
      ai.gotoPosition(a[Math.round(Math.random() * a.length)])      
      
      if (d < 5) {
        return "attack"
      }
    }



  }
}
export default explore;