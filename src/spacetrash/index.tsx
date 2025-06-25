const frustum = new THREE.Frustum();
const matrix = new THREE.Matrix4();

import React from "react";
import { Text, TextStyle, Ticker } from 'pixi.js';
import * as THREE from "three";
import brick from "./Assets/brick.png";
import stone from "./Assets/stone.png";
import voidPng from "./Assets/void.png";
import * as PIXI from "pixi.js";
import {
  DockviewReadyEvent, IDockviewPanelHeaderProps, IDockviewPanelProps
} from "dockview";

import { StateSpace } from "../engine/StateSpace";
import { IPerformanceConfig } from "../engine/VECS.ts/ECS";

import { AttackableStore, CameraStore, LightIncastingStore } from "./ECS/Components/casting/in";

import { SetPieceStore } from "./ECS/Components/phase0";
import { ActorStore } from "./ECS/Components/phase1";
import { ITermWindowState, TerminalWindow } from "./UI/terminal";
import bootScene from "./Scenes/Boot";
import mainLoopScene from "./Scenes/MainLoop";
import { BotWindow } from "./UI/BotWindow";
import { MapWindow } from "./UI/map";
import { BotsWindow } from "./UI/BotsWindow";
import { ITerminalLine, TerminalGame } from "./Terminal";
import {
  IntegerPositionStore, FloatPositionStore, DegreesDirectionStore, FloatMovingStore, OrdinalDirectionStore, OridinalMovingStore,
  TankMovingStore,
  DirectionComponent
} from "./ECS/Components/v2/physical";
import { ClassificationStore } from "./ECS/Components/v2/classifiable";
import { NameableStore } from "./ECS/Components/v2/nameable";
import { LightComponentStore, LightingComponentStore } from "./ECS/Components/v2/lights";

import { Eid2PMStore } from "./ECS/Components/v2/eid2PMC";

import { TileComponentStore } from "./ECS/Components/v2/tileable";
import { TileSize, MapSize, FPS, shipLength } from "./Constants";
import { SpaceTrashMainSystem } from "./ECS/System/MainSystem";
import { DrawableStoreV2 } from "./ECS/Components/v2/drawable";
import { LightPositionStore } from "./ECS/Components/v3/LightPosition";
import { LightOutcastingStore } from "./ECS/Components/casting/out";

const ticker = Ticker.shared;
ticker.maxFPS = FPS;

const pixi2dApp = new PIXI.Application();

const performanceConfig: IPerformanceConfig = {
  fps: FPS,
  performanceLogging: false,
  headless: false
};

const defToRad = (d: number) => (d * Math.PI) / 180;

let shipMapMouseX = 0;
let shipMapMouseY = 0;
export type ISpaceTrashApps =
  | "terminal"
  | `shipmap`
  | `manual`
  | `drone`
  | "drones"
  | "shipmapV2"
  | "droneV2";


const bootScreenTermLine: ITerminalLine = {
  status: "pass",
  out: `
  
  ┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
  │                                                                                                        │
  │ ███████╗██████╗  █████╗  ██████╗███████╗████████╗██████╗  █████╗ ███████╗██╗  ██╗    ██╗   ██╗ █████╗  │
  │ ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║  ██║    ██║   ██║██╔══██╗ │
  │ ███████╗██████╔╝███████║██║     █████╗     ██║   ██████╔╝███████║███████╗███████║    ██║   ██║╚█████╔╝ │
  │ ╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝     ██║   ██╔══██╗██╔══██║╚════██║██╔══██║    ╚██╗ ██╔╝██╔══██╗ │
  │ ███████║██║     ██║  ██║╚██████╗███████╗   ██║   ██║  ██║██║  ██║███████║██║  ██║     ╚████╔╝ ╚█████╔╝ │
  │ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝      ╚═══╝   ╚════╝  │
  │                                                                                                        │
  └────────────────────────────────────────────────────────────────────────────────────────────────────────┘
            
boot sequence initiated...
Oonix v457.3.2 by Demiurge Labs, 3003
QPU 1998885d-3ec5-4185-9321-e618a89b34d8 aka "Wintermute" is now online
boot sequence complete!
  `,
};

export type IState = {
  game: SpaceTrash;
};

export type IRenderings = "2d" | "webgl2" | "pixi2d" | "threejs" | null;

function isAlphabetic(str: string): boolean {
  if (!str) return false;
  return /^[A-Za-z]+$/.test(str) && str.length === 1;
}

function isNumeric(str: string): boolean {
  return /^[1-9]+$/.test(str) && str.length === 1;
}

const Drawings = new DrawableStoreV2();

export class SpaceTrash extends TerminalGame<IRenderings, {
  SetPieceComponent: SetPieceStore,
  ActorComponent: ActorStore
}, number> {

  threejsBotCanvasRef: HTMLCanvasElement;
  threejsBotParentRef: HTMLElement;
  threejsRenderer: THREE.WebGLRenderer;
  camera: THREE.Camera;
  scene: THREE.Scene;

  pixijsBotCanvasRef: HTMLCanvasElement;
  pixijsBotParentRef: HTMLElement;
  pixijsRenderer: PIXI.Application;

  public pixiLoaded: boolean = false;
  
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

  terminalWindowHook: React.Dispatch<React.SetStateAction<ITermWindowState | undefined>>;

  bufferRef: React.MutableRefObject<null>;
  
  forward: boolean = false;
  back: boolean = false;
  left: boolean = false;
  right: boolean = false;

  botsHook: React.Dispatch<any>;

  constructor(domNode: HTMLElement) {
    const stateSpace = new StateSpace("stateSpace_v0", "boot", "goodbye");
    stateSpace.connect(`boot`, `mainloop`);
    stateSpace.connect(`mainloop`, `goodbye`);
    stateSpace.set("boot", bootScene);
    stateSpace.set("mainloop", mainLoopScene);

    super(
      stateSpace,
      SpaceTrashMainSystem,
      {
        IntegerPositionComponent: new IntegerPositionStore(),
        FloatPositionComponent: new FloatPositionStore(),
        DegreesDirectionComponent: new DegreesDirectionStore(),
        OrdinalDirectionComponent: new OrdinalDirectionStore(),
        FloatMovingComponent: new FloatMovingStore(),
        OridinalMovingComponent: new OridinalMovingStore(),
        NameableComponent: new NameableStore(),
        ClassificationComponent: new ClassificationStore(),
        LightOutcastingComponent: new LightOutcastingStore(),
        LightIncastingComponent: new LightIncastingStore(),
        CameraComponent: new CameraStore(),
        AttackableComponent: new AttackableStore(),
        DrawableComponent: Drawings,
        TileComponent: new TileComponentStore(),
        TankMovingComponent: new TankMovingStore(),
      },
      {
        SetPieceComponent: new SetPieceStore(),
        ActorComponent: new ActorStore(),
        LightComponent: new LightComponentStore(),
        ActorsLit: new LightingComponentStore(),
        SetPiecesLit: new LightingComponentStore(),
        Eid2PMComponent: new Eid2PMStore(),
        LightPositionComponent: new LightPositionStore()
      },
      performanceConfig,
      new Set(["2d", "webgl2", "pixi2d", "threejs"]),
      domNode,
      [
        "Tile", "SpaceTrashBot", "FloorTile", "WallTile"
      ]
    );

    this.camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.5, TileSize * 20);
    this.camera.rotateX(defToRad(-90));
    this.camera.rotateY(defToRad(90));

    this.scene = new THREE.Scene();
    
    this.addToHistory(bootScreenTermLine)

    const self = this;
    document.addEventListener('keydown', function (event) {
      if (event.repeat) return;


      if (event.key === 'Escape') {
        self.focusMapWindow();
      }
      else if (event.key === "`") {
        self.focusTerminalWindow();
      }
      else if (event.key === 'ArrowUp') {
        self.driveForward();
        return
      }
      else if (event.key === 'ArrowDown') {
        self.driveBack();
        return
      }
      else if (event.key === 'ArrowLeft') {
        self.turnLeft();
        return
      }
      else if (event.key === 'ArrowRight') {
        self.turnRight();
        return
      }
      else if (isNumeric((event.key)) && self.buffer === "") {
        self.focusVideoWindow(event.key)
      }
      else if (isAlphabetic(event.key)) {
        self.focusTerminalWindow(event.key)
      }
      else {
        // console.log(event);
      }
    });

    document.addEventListener('keyup', function (event) {

      if (event.key === 'ArrowUp') {
        self.stopForward();
      }
      else if (event.key === 'ArrowDown') {
        self.stopBack();
      }
      else if (event.key === 'ArrowLeft') {
        self.stopLeft();
      }
      else if (event.key === 'ArrowRight') {
        self.stopRight();
      }
      else {
        // console.log(event);
      }
    });

    this.pixijsRenderer = new PIXI.Application();
  }

  start() {
    PIXI.Assets.load([
      "https://pixijs.com/assets/bunny.png",
      stone,
      brick,
      voidPng,
      'https://pixijs.com/assets/bitmap-font/desyrel.xml'
    ])
      .then(() => {

        PIXI.Texture.from(
          "https://pixijs.com/assets/bunny.png"
        );
        PIXI.Texture.from(stone);
        PIXI.Texture.from(brick);
        PIXI.Texture.from(voidPng);

      })
    super.start()
  }

  registerTerminalBuffer(inputRef: React.MutableRefObject<null>) {
    this.bufferRef = inputRef;
  }

  dockViewComponents: Record<string, React.FunctionComponent<IDockviewPanelProps>> = {

    default: (props: IDockviewPanelHeaderProps<IState>) => {
      return (
        <div>
          <p>default</p>
          {/* <div>{`custom tab: ${props.api.title}`}</div>
              <span>{`value: ${props.params.myValue}`}</span> */}
        </div>
      );
    },

    map: (props: IDockviewPanelHeaderProps<IState>) => {
      return (
        <MapWindow game={this} />
      );
    },

    bot: (props: IDockviewPanelHeaderProps<IState>) => {
      return (
        <BotWindow game={this} />
      );
    },

    bots: (props: IDockviewPanelHeaderProps<IState>) => (<BotsWindow game={this} />),
    term: (props: IDockviewPanelHeaderProps<IState>) => <TerminalWindow game={this} />,
  }

  onDockviewReady(event: DockviewReadyEvent) {
    super.onDockviewReady(event);
    event.api.addPanel({
      id: 'term',
      component: 'term',
      floating: {
        position: { left: 10, top: 10 },
        width: 900,
        height: 600
      },
      params: {
        game: this
      }
    })
  }

  loginHook() {
    this.changeScene("mainloop")
  }

  focusMapWindow() {
    this.unFocusOnTermInput();
    super.focusWindowById(`map`);
  }

  focusTerminalWindow() {
    super.focusWindowById(`term`)
    this.focusOnTermInput()
  }

  focusVideoWindow(s: string) {
    const n: number = Number(s);
    if (!n || n < 1 || n > 9) throw `${n} is out of range, given ${s}`
    this.videoFeed = n;
    this.unFocusOnTermInput();
    super.focusWindowById(`vid`)
  }

  driveForward() {
    this.forward = true;
  }
  driveBack() {
    this.back = true;
  }
  turnLeft() {
    this.left = true;
  }
  turnRight() {
    this.right = true;
  }
  stopForward() {
    this.forward = false;
  }
  stopBack() {
    this.back = false;
  }
  stopLeft() {
    this.left = false;
  }
  stopRight() {
    this.right = false;
  }

  movingForward(): boolean {
    if ((this.back === false) && (this.forward === true)) {
      return true
    } else if ((this.back === true) && (this.forward === false)) {
      return false;
    } else if (!this.back && !this.forward) {
      return false;
    }
    else {
      return false;
    }
  }

  movingBack(): boolean {
    if ((this.back === true) && (this.forward === false)) {
      return true
    } else if ((this.back === false) && (this.forward === true)) {
      return false;
    } else if (!this.back && !this.forward) {
      return false;
    } else {
      return false;
    }
  }

  movingLeft(): boolean {
    if ((this.left === true) && (this.right === false)) {
      return true
    } else if ((this.left === false) && (this.right === true)) {
      return false;
    } else if (!this.left && !this.right) {
      return false;
    } else {
      return false;
    }
  }

  movingRight(): boolean {
    if ((this.right === true) && (this.left === false)) {
      return true
    } else if ((this.right === false) && (this.left === true)) {
      return false;
    } else if (!this.left && !this.right) {
      return false;
    } else {
      return false;
    }
  }


  rotationOfBot(eid: number): { r: number; } {
    const storeName = "DegreesDirectionComponent";

    if (!this.componentStores[storeName]) throw `missing component store ${storeName}`;

    const c = this.componentStores[storeName].get(eid);
    if (!c) throw "missing entity";

    return {
      r: c.r,
    };
  }

  positionOfBot(eid: number): { x: number; y: number } {
    const storeName = "FloatPositionComponent";

    if (!this.componentStores[storeName]) throw `missing component store ${storeName}`;

    const c = this.componentStores[storeName].get(eid);
    if (!c) throw "missing entity";

    return {
      x: c.x,
      y: c.y,
    };
  }

  videoFeedRotation(): DirectionComponent {
    const p = this.rotationOfBot(
      (this.bots[this.videoFeed] as [number, string])[0]
    );
    return p;
  }

  public videoFeedPosition(): { x: number; y: number } {
    const p = this.positionOfBot(
      (this.bots[this.videoFeed] as [number, string])[0]
    );
    
    return p;
  }

  
  registerBotsHook(stateSetter: React.Dispatch<any>) {
    this.botsHook = stateSetter;
    this.fireBotsHook()
  }

  fireBotsHook() {
    this.botsHook(this.bots)
  }

  isFriendly(aeid: number): boolean {
    if (!this.bots) throw "no bots?!";

    return Object.keys(this.bots).find((b) => {

      const bot: [number, string] = this.bots[b];
      const bid: number = bot[0]

      if (bot && aeid === bid) {
        return true;
      } else {
        return false;
      }
    }) !== undefined || false
  }

  focusWindowById(s: string, p: string) {
    if (s == 'map') {
      this.focusMapWindow();
    } else if (s === `term`) {
      this.focusTerminalWindow();
    } else if (s === `vid`) {
      this.focusVideoWindow(p);
    } else {
      throw `no window by id ${s}, ${p}`
    }
  }

  focusOnTermInput() {
    this.bufferRef.current.focus()
  }

  unFocusOnTermInput() {
    this.bufferRef.current.blur()
  }

  async registerCanvas(
    key: ICanvases,
    run: boolean,
    canvas: HTMLCanvasElement,
    callback: (data: any) => void,
    canvasContext: IRenderings | undefined,
    parentComponent: HTMLElement
  ) {
    super.registerCanvas(key, run, canvas, callback, canvasContext, parentComponent);

    if (key === "bot") {
      this.threejsBotCanvasRef = canvas;
      this.threejsBotParentRef = parentComponent;

      this.threejsRenderer = new THREE.WebGLRenderer({
        canvas,
        context: canvas.getContext("webgl2") as WebGL2RenderingContext,
        antialias: true,
      });

    }
    if (key === "map") {
      this.pixijsBotCanvasRef = canvas;
      this.pixijsBotParentRef = parentComponent;

      await pixi2dApp.init({
        sharedTicker: true,
        view: canvas.getContext("webgl2")?.canvas,
        backgroundColor: 0x1099bb,
        width: (MapSize + 7) * TileSize,
        height: (MapSize + 7) * TileSize,
      });

    }
  }
  
  async renderBotCanvas() {
    const p = this.threejsBotCanvasRef.parentElement.getBoundingClientRect();
    this.threejsRenderer.setSize(p.width, p.height)    
    const position = this.videoFeedPosition();
    this.camera.position.x = position.x * TileSize;
    this.camera.position.y = position.y * TileSize;
    const rotation = this.videoFeedRotation();
    this.camera.rotation.y = (-rotation.r);
    this.threejsRenderer.render(this.scene, this.camera);
  }

  async renderShipMap() {
    // todo
  }

  BeginTheGame() {
    this.openAllWindows();
    Drawings.each(([a, d, c]) => {
      pixi2dApp.stage.addChild(d.sprite)
      pixi2dApp.stage.addChild(d.char);
      this.scene.add(d.mesh)
    })
    this.unpause();
  }

}

export type ICanvases = "map" | "bot";