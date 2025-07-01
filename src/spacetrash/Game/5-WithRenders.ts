import * as PIXI from "pixi.js";
import * as THREE from "three";
import { ArcadePhysics } from "../vendor/arcade-physics-main/src";

import brick from "./../Assets/brick.png";
import stone from "../Assets/stone.png";
import voidPng from "../Assets/void.png";

import { IPerformanceConfig } from "../../engine/VECS.ts/ECS";

import { TileSize, MapSize, FPS } from "../Constants";

import { GameWithControls } from "./4-WithControls";
import { ArcadePhysicsComponent } from "../ECS/Components/v4/PhaserArcade";
import { DirectionComponent } from "../../engine/game/physical";

const defToRad = (d: number) => (d * Math.PI) / 180;

export type ICanvases = "map" | "bot" | "arcadePhysics" | "thermal";

export type IRenderings =
  | "2d"
  | "webgl2"
  | "pixi2d"
  | "threejs"
  | "arcadePhysics"
  | null;

export abstract class GameWithRenders extends GameWithControls {
  threejsBotCanvasRef: HTMLCanvasElement;
  threejsBotParentRef: HTMLElement;
  threejsRenderer: THREE.WebGLRenderer;
  camera: THREE.Camera;
  scene: THREE.Scene;
  spotlight: THREE.SpotLight;

  pixijsBotCanvasRef: HTMLCanvasElement;
  pixijsBotParentRef: HTMLElement;
  pixijsRenderer: PIXI.Application;
  pixi2dApp: PIXI.Application;

  // thermals are a another pixi app
  pixijsThermalCanvasRef: HTMLCanvasElement;
  pixijsThermalParentRef: HTMLElement;
  pixijsThermalRenderer: PIXI.Application;
  pixi2dThermalApp: PIXI.Application;

  arcadePhysics: ArcadePhysics;
  arcadePhysicsTick: any;
  arcadePhysicsCanvasContext: any;

  public videoFeed: number = 1;

  public bots: {
    1: [number, string];
    2: [number, string];
    3: [number, string];
    4: [number, string];
    5: [number, string];
    6: [number, string];
    7: [number, string];
    8: [number, string];
    9: [number, string];
  };

  constructor(domNode: HTMLElement, performanceConfig: IPerformanceConfig) {
    super(
      domNode,
      performanceConfig,
      new Set(["2d", "webgl2", "pixi2d", "threejs", "arcadePhysics"])
    );

    this.camera = new THREE.PerspectiveCamera(
      75,
      600 / 400,
      0.5,
      TileSize * MapSize
    );
    this.camera.rotateX(defToRad(-90));
    this.camera.rotateY(defToRad(90));

    this.scene = new THREE.Scene();

    this.pixi2dApp = new PIXI.Application();
    this.pixi2dThermalApp = new PIXI.Application();

    this.pixijsRenderer = new PIXI.Application();
  }

  async start() {
    PIXI.Assets.load([
      "https://pixijs.com/assets/bunny.png",
      stone,
      brick,
      voidPng,
      "https://pixijs.com/assets/bitmap-font/desyrel.xml",
    ]).then(() => {
      PIXI.Texture.from("https://pixijs.com/assets/bunny.png");
      PIXI.Texture.from(stone);
      PIXI.Texture.from(brick);
      PIXI.Texture.from(voidPng);
    });
    super.start();
  }

  async registerCanvas(
    key: ICanvases,
    run: boolean,
    canvas: HTMLCanvasElement,
    callback: (data: any) => void,
    canvasContext: IRenderings | undefined,
    parentComponent: HTMLElement
  ) {
    super.registerCanvas(
      key,
      run,
      canvas,
      callback,
      canvasContext,
      parentComponent
    );

    if (key === "bot") {
      this.threejsBotCanvasRef = canvas;
      this.threejsBotParentRef = parentComponent;

      this.threejsRenderer = new THREE.WebGLRenderer({
        canvas,
        context: canvas.getContext("webgl2") as WebGL2RenderingContext,
        antialias: false,
      });
      // this.threejsRenderer.
      // this.threejsRenderer.physicallyCorrectLights = true;
      // this.threejsRenderer.
    }
    if (key === "map") {
      this.pixijsBotCanvasRef = canvas;
      this.pixijsBotParentRef = parentComponent;

      await this.pixi2dApp.init({
        sharedTicker: true,
        view: canvas.getContext("webgl2")?.canvas,
        backgroundColor: 0x1099bb,
        width: MapSize * TileSize,
        height: MapSize * TileSize,
      });
    }

    if (key === "arcadePhysics") {
      this.arcadePhysicsCanvasContext = canvas.getContext("2d");
      canvas.width = 800;
      canvas.height = 800;

      const config = {
        width: 1200,
        height: 1200,
        gravity: {
          x: 0,
          y: 0,
        },
      };

      this.arcadePhysics = new ArcadePhysics(config);

      // this.arcadePhysics.plugins.add();
    }

    if (key === "thermal") {
      // debugger
      this.pixijsThermalCanvasRef = canvas;
      this.pixijsThermalParentRef = parentComponent;

      await this.pixi2dThermalApp.init({
        sharedTicker: true,
        view: canvas.getContext("webgl2")?.canvas,
        backgroundColor: 0xffffff,
        width: 500,
        height: 500,
      });

      // this.pixi2dThermalApp.render()
    }

    if (
      this.pixi2dThermalApp &&
      this.pixi2dApp &&
      this.threejsRenderer &&
      this.arcadePhysics
    ) {
      this.run();
    }
  }

  positionOfBot(eid: number): { x: number; y: number } {
    const arcadeObjectComponent: ArcadePhysicsComponent =
      this.components.ArcadePhysicsComponent.take(eid);

    if (!arcadeObjectComponent.arcadeObject)
      return { x: arcadeObjectComponent.x, y: arcadeObjectComponent.y };
    return {
      x: arcadeObjectComponent.arcadeObject.position.x,
      y: arcadeObjectComponent.arcadeObject.position.y,
    };
  }

  public videoFeedPosition(): { x: number; y: number } {
    const p = this.positionOfBot(
      (this.bots[this.videoFeed] as [number, string])[0]
    );

    return p;
  }

  rotationOfBot(eid: number): { r: number } {
    const arcadeObjectComponent =
      this.components.ArcadePhysicsComponent.take(eid);

    if (!arcadeObjectComponent.arcadeObject)
      return { r: arcadeObjectComponent.r };

    return {
      r: arcadeObjectComponent?.arcadeObject.rotation,
    };
  }


  videoFeedRotation(): DirectionComponent {
    const p = this.rotationOfBot(
      (this.bots[this.videoFeed] as [number, string])[0]
    );
    return p;
  }

  async renderBotCanvas() {
    const p = this.threejsBotCanvasRef.parentElement.getBoundingClientRect();
    this.threejsRenderer.setSize(p.width, p.height);
    const position = this.videoFeedPosition();
    this.camera.position.x = position.x;
    this.camera.position.y = position.y;
    const rotation = this.videoFeedRotation();

    this.camera.rotation.y = -rotation.r;
    // console.log(this.camera.position, this.camera.rotation)

    let spotlightRot = -rotation.r;
    if (this.camera.rotation.y < -Math.PI / 2) {
      spotlightRot = Math.PI / 2;
    } else if (this.camera.rotation.y > Math.PI / 2) {
      spotlightRot = -Math.PI / 2;
    }

    if (this.spotlight) {
      this.spotlight.rotation.y = spotlightRot;
      this.spotlight.position.set(
        this.camera.position.x,
        this.camera.position.y,
        this.camera.position.z
      );
    }

    this.threejsRenderer.render(this.scene, this.camera);
  }

  async renderShipMap() {
    // todo
  }

  async renderThermals() {
    // todo
  }

  async renderArcadePhysics() {
    this.arcadePhysics.world.update(this.arcadePhysicsTick * 1000, 1000 / 60);
    this.arcadePhysics.world.postUpdate(
      this.arcadePhysicsTick * 1000,
      1000 / 60
    );
    this.arcadePhysicsTick++;

    // draw debug
    this.arcadePhysicsCanvasContext.clearRect(
      0,
      0,
      this.arcadePhysicsCanvasContext.canvas.width,
      this.arcadePhysicsCanvasContext.canvas.height
    );
    this.arcadePhysics.world.bodies.forEach((b) => {
      b.drawDebug(this.arcadePhysicsCanvasContext);
    });
    this.arcadePhysics.world.staticBodies.forEach((b) => {
      b.drawDebug(this.arcadePhysicsCanvasContext);
    });
  }

  BeginTheGame() {
    this.openAllWindows();
  }
}
