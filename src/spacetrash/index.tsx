import * as THREE from "three";
import brick from "./Assets/brick.png";
import stone from "./Assets/stone.png";
import * as PIXI from "pixi.js";
import { DockviewReadyEvent, IDockviewPanelHeaderProps, IDockviewPanelProps } from "dockview";
import React from "react";

import { StateSpace } from "../engine/StateSpace";
import { IPerformanceConfig } from "../engine/VECS.ts/ECS";

import {
  AttackableStore, CameraStore, LittableStore,
} from "./ECS/Components/casting/in";
import { LitStore } from "./ECS/Components/casting/out";
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
  IntegerPositionStore, FloatPositionStore, DegreesDirectionStore, FloatMovingStore, OrdinalDirectionStore, OridinalMovingStore
} from "./ECS/Components/v2/physical";
import { ClassificationStore } from "./ECS/Components/v2/classifiable";
import { NameableStore } from "./ECS/Components/v2/nameable";
import { LightComponentStore, LightingComponentStore } from "./ECS/Components/v2/lights";
import { DrawableStore, } from "./ECS/Components/v2/drawable";
import { Eid2PMStore } from "./ECS/Components/v2/eid2PMC";

import { Ticker } from 'pixi.js';
import { TileComponentStore } from "./ECS/Components/v2/tileable";
import { TileSize } from "./Constants";
import { SpaceTrashMainSystem, MapSize } from "./ECS/System/MainSystem";

const fps = 30;
const ticker = Ticker.shared;
ticker.maxFPS = fps;

const pixi2dApp = new PIXI.Application();
var scene = new THREE.Scene();

const performanceConfig: IPerformanceConfig = {
  fps,
  performanceLogging: false,
  headless: false
};
const defToRad = (d: number) => (d * Math.PI) / 180;
var camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 10000);
camera.rotateX(defToRad(-90));
camera.rotateZ(defToRad(180));
camera.position.z = 5;


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

const Drawings = new DrawableStore();

export class SpaceTrash extends TerminalGame<IRenderings, {
  SetPieceComponent: SetPieceStore,
  ActorComponent: ActorStore
}, number> {
  

  threejsBotCanvasRef: HTMLCanvasElement;
  threejsBotParentRef: HTMLElement;
  threejsRenderer: THREE.WebGLRenderer;

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
  forward: boolean;
  back: boolean;
  left: boolean;
  right: boolean;

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
        LitableComponent: new LittableStore(),
        LitComponent: new LitStore(),
        CameraComponent: new CameraStore(),
        AttackableComponent: new AttackableStore(),
        DrawableComponent: Drawings,
        TileComponent: new TileComponentStore()
      },
      {
        SetPieceComponent: new SetPieceStore(),
        ActorComponent: new ActorStore(),
        LightComponent: new LightComponentStore(),
        ActorsLit: new LightingComponentStore(),
        SetPiecesLit: new LightingComponentStore(),
        Eid2PMComponent: new Eid2PMStore(),
      },
      performanceConfig,
      new Set(["2d", "webgl2", "pixi2d", "threejs"]),
      domNode,
      [
        "Tile", "SpaceTrashBot", "FloorTile", "WallTile"
      ]
    );

    this.addToHistory(bootScreenTermLine)

    const self = this;
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        self.focusMapWindow();
      }
      else if (event.key === "`") {
        self.focusTerminalWindow();
      }
      else if (event.key === 'ArrowUp') {
        self.driveForward();
      }
      else if (event.key === 'ArrowDown') {
        self.driveBack();
      }
      else if (event.key === 'ArrowLeft') {
        self.turnLeft();
      }
      else if (event.key === 'ArrowRight') {
        self.turnRight();
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
    ])
    .then(() => {

        PIXI.Texture.from(
          "https://pixijs.com/assets/bunny.png"
        );
        PIXI.Texture.from(stone);
        PIXI.Texture.from(brick);

      })


    super.start()
  }

  bufferRef: React.MutableRefObject<null>;

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

    vid: (props: IDockviewPanelHeaderProps<IState>) => {
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

  openAllWindows() {
    this.dockviewAPI.component.addPanel({
      id: 'bots',
      component: 'bots',
      floating: {
        position: { left: 90, top: 90 },
        width: 600,
        height: 400
      },
      params: {

      }
    })

    this.dockviewAPI.component.addPanel({
      id: 'vid',
      component: 'vid',
      floating: {
        position: { left: 50, top: 50 },
        width: 1200,
        height: 1200
      },
      params: {

      }
    })

    this.dockviewAPI.component.addPanel({
      id: 'map',
      component: 'map',
      floating: {
        position: { left: 100, top: 150 },
        width: 900,
        height: 700
      },
      params: {

      }
    })

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

  public videoFeedPosition(): { x: number; y: number } {
    const p = this.positionOfBot(
      (this.bots[this.videoFeed] as [number, string])[0]
    );
    return p;
  }

  botsHook: React.Dispatch<any>;
  registerBotsHook(stateSetter: React.Dispatch<any>) {
    this.botsHook = stateSetter;
    this.fireBotsHook()
  }

  fireBotsHook() {
    this.botsHook(this.bots)
  }

  isFriendly(aeid: number): boolean {
    // return Math.random() > 0.5
    let isFriend: boolean = false;

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
    // throw new Error("Method not implemented.");
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

      await pixi2dApp.init({
        sharedTicker: true,
        view: canvas.getContext("webgl2")?.canvas,
        backgroundColor: 0x1099bb,
        width: (MapSize + 7) * TileSize,
        height: (MapSize + 7) * TileSize,
      });
    }
    if (key === "map") {
      this.pixijsBotCanvasRef = canvas;
      this.pixijsBotParentRef = parentComponent;

      this.threejsRenderer = new THREE.WebGLRenderer({
        canvas,
        context: canvas.getContext("webgl2") as WebGL2RenderingContext,
        antialias: true,
      });
    }

  }

  async renderBotCanvas() {
    const position = this.videoFeedPosition();
    camera.position.x = position.x * TileSize;
    camera.position.y = position.y * TileSize;
    // console.log("camera", camera.position)

    // camera.rotation.x = camera.rotation.x + 0.001;
    camera.rotation.y = camera.rotation.y + 0.01;
    // camera.rotation.y = camera.rotation.y + 0.001;

    // const p = this.threejsBotCanvasRef.parentElement.getBoundingClientRect();
    // this.threejsRenderer.setSize(p.width, p.height)
    this.threejsRenderer.setSize(500, 500);
    this.threejsRenderer.render(scene, camera);
  }

  async renderShipMap() {
    // todo
  }

  BeginTheGame() {

    this.openAllWindows();

    Drawings.each(([a, d, c]) => {
      pixi2dApp.stage.addChild(d[1].sprite)
      scene.add(d[1].mesh)
    })
    
    this.unpause();
    
  }

}

export type ICanvases = "map" | "bot";