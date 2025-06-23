import { EntityComponent } from "../../../engine/VECS.ts/EntityComponent";

export type ITiles =
  `VoidTile` | `Door` | 
  'SouthWest' | 'SouthEast' | 'NorthWest' | 'NorthEast' |
  `FloorTile` | `TileA` | `TileB` | `North` |
  `TileC` | `TileD` | `East` | `TileE` |
  `TileF` | `West` | `TileG` | `TileH` |
  `South` | `TileI` | `TileJ` | `WallTile`;


export abstract class SpaceTrashEntityComponent extends EntityComponent {

}

