import { SpaceTrashEntityComponent } from "..";
import { SP_PhysicalComponent } from "../../../../engine/physics/SP_Physical";
import { PixiJsRenderableComponent } from "../../../../engine/rendering/pixijs";
import { ThreeJsRenderableComponent } from "../../../../engine/rendering/threejs";
import { Component } from "../../../../engine/VECS.ts/Component";
import { SamuraiTileComponent } from "../../../physics/SamuraiTile";
import { LightIncastingComponent } from "../../Components/v1/casting/in";
import { HeatConductorComponent } from "../../Components/v3/heat";
import { ArcadePhysicsComponent } from "../../Components/v4/PhaserArcade";
import { SpaceTrashEntity } from "../../Entity";

export class Tile extends SpaceTrashEntityComponent {
  x: number;
  y: number;

  constructor({
    pixi,
    threejs,
    arcade,
    samurai,
    sp_physical
  }: {
    pixi: PixiJsRenderableComponent;
    threejs: ThreeJsRenderableComponent;
    arcade?: ArcadePhysicsComponent;
      samurai: SamuraiTileComponent;
    sp_physical?: SP_PhysicalComponent

  }) {
    const spe = new SpaceTrashEntity();

    
    const comps: Component<any, any>[] = [
      pixi,
      threejs,
      samurai,
      new LightIncastingComponent(),
      new HeatConductorComponent(1),


    ];

    if (sp_physical) {
      comps.push(sp_physical);
    }

    super(spe, comps);

    this.x = samurai.x;
    this.y = samurai.y;

  }
}

export type ITiles =
  | `VoidTile`
  | `Door`
  | "SouthWest"
  | "SouthEast"
  | "NorthWest"
  | "NorthEast"
  | `FloorTile`
  | `TileA`
  | `TileB`
  | `North`
  | `TileC`
  | `TileD`
  | `East`
  | `TileE`
  | `TileF`
  | `West`
  | `TileG`
  | `TileH`
  | `South`
  | `TileI`
  | `TileJ`
  | `WallTile`;
