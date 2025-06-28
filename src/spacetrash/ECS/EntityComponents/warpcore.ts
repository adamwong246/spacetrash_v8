import * as THREE from "three";
import { Text } from "pixi.js";

import { SpaceTrashEntityComponent } from ".";
import { AttackableComponent } from "../Components/v1/casting/in";
import { ClassificationComponent } from "../Components/v2/classifiable";
import { IntegerPositionComponent } from "../Components/v2/physical";
import { SpaceTrashEntity } from "../Entity";
import { DrawableComponent } from "../Components/v2/drawable";
import { Component } from "../../../engine/VECS.ts/Component";
import { ArcadePhysicsComponent } from "../Components/v2/arcadePhysics";
import { RadiationEmitterComponent } from "../Components/v3/radiation";
import { ArcadePhysics } from "arcade-physics";
import { TileSize } from "../../Constants";
import { bunnySprite, cylinder } from "./bots";
import { degToRad } from "three/src/math/MathUtils.js";
import { blueMaterial, greenMaterial } from "../../threejs";
import { HeatEmitterComponent } from "../Components/v3/heat";

export class WarpCore extends SpaceTrashEntityComponent {
  rads: number;

  constructor(rads: number, x: number, y: number) {
    const spe = new SpaceTrashEntity();

    const comps: Component<any, any>[] = [
      new DrawableComponent(
        bunnySprite(),

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
        })(),

        new Text("W")
      ),

      new IntegerPositionComponent(x, y),
      new ClassificationComponent("WarpCore"),

      new AttackableComponent(),
      new RadiationEmitterComponent(rads),
      new HeatEmitterComponent(0.1),

      new ArcadePhysicsComponent((ap: ArcadePhysics) => {

        const cube = ap.add.staticBody(
            x * TileSize,
            y * TileSize,
            TileSize,
            TileSize
        );
        cube.immovable = true;
        return cube;
        // const ball = ap.add.body(x * TileSize, y * TileSize);
        // ball.setCircle(TileSize / 2);
        // ball.setBounce(0.1);
        // ball.setCollideWorldBounds(true);
        // ball.setFriction(-1, -1);
        // return ball;
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
