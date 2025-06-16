import { EntityComponent } from "../../engine/EntityComponent";

export type ITiles =
  `Door` | 
  'SouthWest' | 'SouthEast' | 'NorthWest' | 'NorthEast' |
  `FloorTile` | `TileA` | `TileB` | `North` |
  `TileC` | `TileD` | `East` | `TileE` |
  `TileF` | `West` | `TileG` | `TileH` |
  `South` | `TileI` | `TileJ` | `WallTile`;

export enum ETiles {
  'Door',
  'SouthWest', 'SouthEast', 'NorthWest', 'NorthEast',
  'FloorTile', 'TileA', 'TileB', 'North',
  'TileC', 'TileD', 'East', 'TileE',
  'TileF', 'West', 'TileG', 'TileH',
  'South', 'TileI', 'TileJ','`WallTile'
}

export abstract class SpaceTrashEntityComponent extends EntityComponent {
  // x: number;
  // dx: number;
  // y: number;
  // dy: number;
}

