import * as THREE from "three";

import { MapSize, TileSize } from "../../../Constants";
import { SpaceTrash } from "../../../Game";

const arcadeBodiesToAgentOnCollisionCallbacks: { body; callback }[] = [];

export const setupArcadePhysics = () => {
  const staticGroup: any[] = [];
  const dynamicGroup: any[] = [];

  (GAME as SpaceTrash).components.ArcadePhysicsComponent.each((v, k) => {
    if (v.arcadeObject.immovable) staticGroup.push(v.arcadeObject);
    else dynamicGroup.push(v.arcadeObject);
  });

  dynamicGroup.forEach((s) => {
    s.position.x = Math.random() * MapSize * TileSize;
    s.position.y = Math.random() * MapSize * TileSize;
  });

  dynamicGroup.forEach((d) => {
    staticGroup.forEach((s) => {
      (GAME as SpaceTrash).arcadePhysics.world.addCollider(
        s,
        d,
        (...a) => {
          const x = a[1];
          for (let z of arcadeBodiesToAgentOnCollisionCallbacks) {
            if (z.body === x) {
              // z.callback();
            }
          }
          // const cb = x.getData('onCollide');
          // cb(s, d)
          // debugger
          // Actors.update({
          //   onCollision
          // })

          // debugger
        },
        () => {
          // debugger
        },
        () => {
          // debugger
        }
      );
    });
  });

  dynamicGroup.forEach((s) => {
    dynamicGroup.forEach((s2) => {
      if (s !== s2) {
        // game.arcadePhysics.world.addCollider(s, s2);// add.collider(s, s2);
      }
    });
  });

  // game.arcadePhysics.world.ad

  (GAME as SpaceTrash).arcadePhysics.world.on(
    "collide",
    (object1, object2, body1, body2) => {
      console.log("collide", object1, object2, body1, body2);
    }
  );
};

export function setupAiAgents() {
  (GAME as SpaceTrash).components.Actors.each((ac, eid) => {
    if (!ac.friendly) {
      (GAME as SpaceTrash).components.AiAgentComponent.each((ai, eid2) => {
        if (eid === eid2) {
          // const onCollide = () => { };

          // ac.onCollision = onCollide;
          // ai.

          ac.agent = ai;
          arcadeBodiesToAgentOnCollisionCallbacks.push({
            body: ac.arcadeBody,
            callback: ai.collideCallback,
          });
          // ac.arcadeBody.setData('onCollide', ai.onCollide)
          ai.boot(ac.arcadeBody, eid);
        }
      });
    }
  });
}

export function setup2dAnd3dGames() {
  // debugger
  (GAME as SpaceTrash).components.DrawableComponent.each((d, deid) => {
    (GAME as SpaceTrash).pixi2dApp.stage.addChild(d.sprite);
    (GAME as SpaceTrash).pixi2dApp.stage.addChild(d.char);
    (GAME as SpaceTrash).scene.add(d.mesh);
  });

  // this.scene.add(spotlight);
  const pointlight = new THREE.PointLight(0x00ff00, 1000, 0, 2);
  // pointlight.position.set(
  //   (GAME as SpaceTrash).camera.position.x,
  //   (GAME as SpaceTrash).camera.position.y,
  //   (GAME as SpaceTrash).camera.position.z
  // );
  // pointlight.position.z = -10;

  // (GAME as SpaceTrash).scene.add(pointlight);

  const ambientLight = new THREE.AmbientLight(0x0000ff, 1000);
  // ambientLight.position.set(
  //   (GAME as SpaceTrash).camera.position.x,
  //   (GAME as SpaceTrash).camera.position.y,
  //   (GAME as SpaceTrash).camera.position.z
  // );

  ambientLight.position.z = -10;

  (GAME as SpaceTrash).scene.add(ambientLight);

  

  // (GAME as SpaceTrash).spotlight = new THREE.SpotLight(0xff0000, 1000);
}
