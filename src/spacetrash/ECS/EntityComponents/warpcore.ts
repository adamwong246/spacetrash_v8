import * as THREE from "three";

import { ArcadePhysics } from "../../vendor/arcade-physics-main/src";
import { SpaceTrashEntityComponent } from ".";
import { AttackableComponent } from "../Components/v1/casting/in";
import { IntegerPositionComponent } from "../../../engine/game/physical";
import { SpaceTrashEntity } from "../Entity";
import { Component } from "../../../demiurge/ecs/Component";
import { RadiationEmitterComponent } from "../Components/v3/radiation";
import { TileSize } from "../../Constants";
import { bunnySprite, cylinder } from "./bots";
import { degToRad } from "three/src/math/MathUtils.js";
import { blueMaterial, greenMaterial } from "../../threejs";
import { HeatEmitterComponent } from "../Components/v3/heat";
import { ArcadePhysicsComponent } from "../Components/v4/PhaserArcade";
import { SP_IntegerPositionComponent } from "../Components/v4/IntegerPosition";
import { PixiJsRenderableComponent } from "../../../engine/rendering/pixijs";
import { ThreeJsRenderableComponent } from "../../../engine/rendering/threejs";

export class WarpCore extends SpaceTrashEntityComponent {
  rads: number;

  constructor(rads: number, x: number, y: number) {
    const spe = new SpaceTrashEntity();

    const comps: Component<any, any>[] = [
      new SP_IntegerPositionComponent(x, y),

      new AttackableComponent(),
      new RadiationEmitterComponent(rads),
      new HeatEmitterComponent(0.1),

      new PixiJsRenderableComponent(bunnySprite()),
      new ThreeJsRenderableComponent(
        (() => {
          const geometry = new THREE.CylinderGeometry(
            TileSize / 2,
            TileSize / 2,
            TileSize
          );

          const mesh = new THREE.Mesh(geometry, blueMaterial);
          mesh.rotateZ(degToRad(90));
          mesh.rotateX(degToRad(90));

          return mesh;
        })()
      ),

      new ArcadePhysicsComponent((ap: ArcadePhysics) => {
        const cube = ap.add.staticBody(
          x * TileSize,
          y * TileSize,
          TileSize,
          TileSize
        );
        cube.immovable = true;
        return cube;
      }),
    ];

    super(spe, comps);
  }

  position(): IntegerPositionComponent {
    const c = this.components.find((c) => {
      return c.constructor.name === "IntegerPositionComponent";
    }) as IntegerPositionComponent | undefined;

    if (!c) throw "missing component";

    return c;
  }
}
