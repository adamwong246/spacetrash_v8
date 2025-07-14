import * as THREE from "three";
import { degToRad } from "three/src/math/MathUtils";
import { SpaceTrashEntityComponent } from ".";
import { IntegerPositionComponent } from "../../../demiurge/game/physical";
import { PixiJsRenderableComponent } from "../../../demiurge/rendering/pixijs";
import { ThreeJsRenderableComponent } from "../../../demiurge/rendering/threejs";
import { TileSize } from "../../Constants";
import { AttackableComponent } from "../Components/v1/casting/in";
import { HeatEmitterComponent } from "../Components/v3/heat";
import { RadiationEmitterComponent } from "../Components/v3/radiation";
import { SP_IntegerPositionComponent } from "../Components/v4/IntegerPosition";
import { SpaceTrashEntity } from "../Entity";
import { bunnySprite } from "./bots";
import { Component } from "../../../demiurge/ecs/Component";

export class WarpCore extends SpaceTrashEntityComponent {
  rads: number;

  constructor(rads: number, x: number, y: number) {
    const spe = new SpaceTrashEntity();

    const comps: Component[] = [
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
