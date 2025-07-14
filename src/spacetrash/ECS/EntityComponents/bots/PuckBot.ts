import { Circle, deg2rad } from "detect-collisions";
import * as THREE from "three";

import { SpaceTrashEntity } from "../../Entity";
import { TileSize } from "../../../Constants";
import { LightIncastingComponent } from "../../Components/v1/casting/in";
import { SP_PhysicalComponent } from "../../../../demiurge/physics/SP_Physical";
import { PixiJsRenderableComponent } from "../../../../demiurge/rendering/pixijs";
import { ThreeJsRenderableComponent } from "../../../../demiurge/rendering/threejs";

import { Actor, bunnySprite } from ".";
import { degToRad } from "three/src/math/MathUtils.js";

// const redMaterial = new THREE.MeshBasicMaterial({ color: "FF0000" });

export class PuckBot extends Actor {
  constructor(
    x: number,
    y: number,
    image,
    textures
    // aiAgentConfig: AiAgentComponent
  ) {
    const spe = new SpaceTrashEntity();

    const physical = new Circle({ x, y }, TileSize / 5);

    physical.setPosition(x, y, true);
    physical.setAngle(deg2rad((Math.random() - 0.5) * 360), true);

    physical.isStatic = false;
    physical.updateBody(true);

    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(TileSize / 2, 0, TileSize),
      new THREE.MeshBasicMaterial({color: 'red', wireframe: true})
    );
    m.rotateZ(degToRad(90));
    m.rotateX(degToRad(90));

    super(
      spe,
      [
        new SP_PhysicalComponent(physical, 0.1),
        new LightIncastingComponent(1),
        new PixiJsRenderableComponent(bunnySprite()),
        new ThreeJsRenderableComponent([m]),

        // aiAgentConfig,
        // new FloatMovingComponent((Math.random()-0.5)*3, (Math.random()-0.5) * 3),
        // new FloatPositionComponent(x, y),
        // new DegreesDirectionComponent(r),

        // // new LightOutcastingComponent(1),
      ]

      // V2
      // {
      //   attackPattern: "melee",
      //   explorePattern: RandomExplorePattern(),
      //   defendPattern: "protectTheNest",
      //   diePattern: "explode",
      //   seekPattern: "FOV",
      //   repelPattern: "FOV",
      //   motion: "tank",
      //   weaknesses: "heat",
      //   strength: "heat",
      // }
    );
  }
}
