import { Circle, deg2rad } from "detect-collisions";
import * as THREE from "three";

import { SpaceTrashEntity } from "../../Entity";
import { TileSize } from "../../../Constants";
import { LightIncastingComponent } from "../../Components/v1/casting/in";
import { SP_PhysicalComponent } from "../../../../demiurge/physics/SP_Physical";
import { PixiJsRenderableComponent } from "../../../../demiurge/rendering/pixijs";
import { ThreeJsRenderableComponent } from "../../../../demiurge/rendering/threejs";

import { Actor, bunnySprite } from ".";
import { FloatMovingComponent } from "../../../../demiurge/game/physical";
import { AiAgentComponent } from "../../Components/v3/ai";

export class AiBot extends Actor {
  constructor(
    x: number,
    y: number,
    image,
    textures

  ) {
    const spe = new SpaceTrashEntity();

    const physical = new Circle({ x, y }, TileSize / 5, {
      isStatic: false,
      angle: deg2rad((Math.random() - 0.5) * 360)
    });

    const m = new THREE.Mesh(
      new THREE.CylinderGeometry(TileSize/4, TileSize/4, TileSize/2, 8),
      new THREE.MeshBasicMaterial({color: 0x9900ff})
    );
    m.position.set(x, y, 0);
    m.rotation.set(0, 0, 0);

    super(
      spe,
      [
        new AiAgentComponent('langdonsAnt', spe),
        new SP_PhysicalComponent(physical, 0.1),
        new LightIncastingComponent(1),
        new PixiJsRenderableComponent(bunnySprite()),
        new ThreeJsRenderableComponent([m]),
        new FloatMovingComponent(
          (Math.random() - 0.5) * 2, 
          (Math.random() - 0.5) * 2
        ),


        // aiAgentConfig,
        // new FloatMovingComponent((Math.random()-0.5)*3, (Math.random()-0.5) * 3),
        
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
