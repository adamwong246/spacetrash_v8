import { Circle } from "detect-collisions";
import * as PIXI from "pixi.js";
import * as THREE from "three";
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  DockviewReadyEvent,
  IDockviewPanelHeaderProps,
  IDockviewPanelProps,
} from "dockview";
import { DockviewApi, DockviewReact } from "dockview";

import bootScene from "../Scenes/Boot";
import mainLoopScene from "../Scenes/MainLoop";
import { BotWindow, IBotWindowState } from "../UI/BotWindow";
import { MapWindow } from "../UI/map";
import { ITermWindowState, TerminalWindow } from "../UI/terminal";

import { ArcadePhysicsWindow } from "../UI/ArcadePhysicsWindow";
import { MultiSurfaceGame } from "./0-multisurface";

import { TileSize, MapSize } from "../Constants";
import { defToRad } from "../lib";
import { DirectionComponent } from "../../demiurge/game/physical";

import { CustomPhysicsWindow } from "../UI/CustomPhysicsWindow";
import { SamuraiEngine } from "../physics/SamuraIEngine";
import { SP_PhysicalComponent } from "../../demiurge/physics/SP_Physical";

import {
  alreadyLoggedInTermLine,
  bootScreenTermLine,
  commandNotFoundTermLine,
  dateTermLine,
  helpLoggedInTermLine,
  helpLoggedOutTermLine,
  initialTerminalHistory,
  ITerminalLine,
  loggedInTermLine,
  missionTermLine,
  settingsTermLine,
  shipTermLine,
  whoAmITermLine,
} from "./Terminal";
import { IPerformanceConfig } from "../../demiurge/ecs/ECS";
import { IAssets } from "../../demiurge/abstractClasses/3-WithRendering";
import { StateSpace } from "../../demiurge/game/StateSpace";

let self: DesktopGame<any, any>;

export abstract class DesktopGame<
  IRenderings,
  ICanvases
> extends MultiSurfaceGame<IRenderings> {
  loggedIn = false;

  history: ITerminalLine[] = [initialTerminalHistory];
  public buffer: string = "login";

  uiUpdateCallback: any;

  bufferRef: React.MutableRefObject<null>;

  private reactRoot;
  dockviewAPI: DockviewApi;
  stateSetter: (s: any) => void;
  abstract uiHooks: any;

  terminalWindowHook: React.Dispatch<
    React.SetStateAction<ITermWindowState | undefined>
  >;

  botsHook: React.Dispatch<any>;
  botHook: React.Dispatch<React.SetStateAction<IBotWindowState>>;
  botWindowState: IBotWindowState;

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
  // pixijsThermalCanvasRef: HTMLCanvasElement;
  // pixijsThermalParentRef: HTMLElement;
  // pixijsThermalRenderer: PIXI.Application;
  // pixi2dThermalApp: PIXI.Application;

  samuraiCanvasContext: any;

  samuraiBotCanvasRef: HTMLCanvasElement;
  samuraiBotParentRef: HTMLElement;
  // samuraiRenderer: PIXI.Renderer;
  samuraiPixi: PIXI.Application;
  samuraiEngine: SamuraiEngine;

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

  stateSpace: StateSpace;

  constructor(
    config: IPerformanceConfig,
    renderings: Set<IRenderings>,
    domNode: HTMLElement,
  ) {
    super(config, renderings);
    this.reactRoot = createRoot(domNode);
    self = this;

    this.stateSpace = new StateSpace("stateSpace_v0", "boot", "goodbye");
    this.stateSpace.connect(`boot`, `mainloop`);
    this.stateSpace.connect(`mainloop`, `goodbye`);
    this.stateSpace.set("boot", bootScene);
    this.stateSpace.set("mainloop", mainLoopScene);

    this.camera = new THREE.PerspectiveCamera(
      75,
      600 / 400,
      0.5,
      1000
    );
    this.camera.rotateX(defToRad(-90));
    this.camera.rotateY(defToRad(90));

    this.scene = new THREE.Scene();

    // this.scene.fog = new THREE.Fog(0x000000, 0, 150);

    this.pixi2dApp = new PIXI.Application();
    // this.pixi2dThermalApp = new PIXI.Application();

    this.pixijsRenderer = new PIXI.Application();

    this.samuraiPixi = new PIXI.Application();

    this.addToHistory(bootScreenTermLine);

    document.addEventListener("keydown", function (event) {
      if (event.repeat) return;
      if (event.key === "Escape") {
        self.focusMapWindow();
      } else if (event.key === "`") {
        self.focusTerminalWindow();
      } else if (isNumeric(event.key) && self.buffer === "") {
        self.focusVideoWindow(event.key);
      } else if (isAlphabetic(event.key)) {
        self.focusTerminalWindow(event.key);
      } else {
        // console.log(event);
      }
    });
  }

  async start(config: IAssets) {
    super.start(config)

    self.reactRoot.render(
      <div>
        <div
          style={{
            top: 0,
            left: 0,
            position: "absolute",
            zIndex: 1,
          }}
        >
          <button onClick={() => this.focusWindowById("map")}>map</button>
          <button onClick={() => this.focusWindowById("term")}>term</button>
          <button onClick={() => this.focusWindowById("vid", 1)}>1</button>
          <button onClick={() => this.focusWindowById("vid", 2)}>2</button>
          <button onClick={() => this.focusWindowById("vid", 3)}>3</button>
          <button onClick={() => this.focusWindowById("vid", 4)}>4</button>
          <button onClick={() => this.focusWindowById("vid", 5)}>5</button>
          <button onClick={() => this.focusWindowById("vid", 6)}>6</button>
          <button onClick={() => this.focusWindowById("vid", 7)}>7</button>
          <button onClick={() => this.focusWindowById("vid", 8)}>8</button>
          <button onClick={() => this.focusWindowById("vid", 9)}>9</button>
        </div>

        <DockviewReact
          className={"dockview-theme-abyss"}
          onReady={self.onDockviewReady}
          components={{
            default: (props: IDockviewPanelHeaderProps<any>) => {
              return (
                <div>
                  <p>default</p>
                </div>
              );
            },

            map: (props: IDockviewPanelHeaderProps<any>) => {
              return <MapWindow game={self} />;
            },

            vid: (props: IDockviewPanelHeaderProps<any>) => {
              return <BotWindow game={self} />;
            },
            term: (props: IDockviewPanelHeaderProps<any>) => (
              <TerminalWindow game={self} />
            ),
            arcadePhysics: (props: IDockviewPanelHeaderProps<any>) => (
              <ArcadePhysicsWindow game={self} />
            ),
            customPhysics: (props: IDockviewPanelHeaderProps<any>) => (
              <CustomPhysicsWindow game={self} />
            ),
            // bots: (props: IDockviewPanelHeaderProps<any>) => (<BotsWindow game={self} />),
            // fab: (props: IDockviewPanelHeaderProps<any>) => (<FabricatorWindow game={self} />),
            // data: (props: IDockviewPanelHeaderProps<any>) => (<DataWindow game={self} />),
            // thermal: (props: IDockviewPanelHeaderProps<any>) => (<ThermalWindow game={self} />),
            // matter: (props: IDockviewPanelHeaderProps<any>) => (<MatterWindow game={self} />),
          }}
        />
      </div>
    );
  }

  registerBotsHook(stateSetter: React.Dispatch<any>) {
    this.botsHook = stateSetter;
    this.botsHook(this.bots);
  }

  registerBotHook(
    stateSetter: React.Dispatch<React.SetStateAction<IBotWindowState>>,
    state: IBotWindowState
  ) {
    this.botHook = stateSetter;
    this.botWindowState = state;
  }

  focusMapWindow() {
    this.unFocusOnTermInput();
    this.focusWindowById(`map`);
  }

  focusTerminalWindow() {
    this.focusWindowById(`term`);
    this.focusOnTermInput();
  }

  focusVideoWindow(s: string) {
    const n: number = Number(s);
    if (!n || n < 1 || n > 9) throw `${n} is out of range, given ${s}`;
    this.videoFeed = n;

    this.botHook(this.botWindowState);

    this.unFocusOnTermInput();
    this.focusWindowById(`vid`);
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
      // (canvas.getContext("webgl2")).imageSmoothingEnabled = false

    }
    if (key === "map") {
      this.pixijsBotCanvasRef = canvas;
      this.pixijsBotParentRef = parentComponent;

      await this.pixi2dApp.init({
        sharedTicker: true,
        view: canvas.getContext("webgl2")?.canvas,
        backgroundColor: 0x000000,
        width: MapSize * TileSize,
        height: MapSize * TileSize,
      });
    }

    // if (key === "arcadePhysics") {
    //   // this.arcadePhysicsCanvasContext = canvas.getContext("2d");
    //   // canvas.width = 800;
    //   // canvas.height = 800;
    //   // const config = {
    //   //   width: 1200,
    //   //   height: 1200,
    //   //   gravity: {
    //   //     x: 0,
    //   //     y: 0,
    //   //   },
    //   // };
    //   // this.arcadePhysics = new ArcadePhysics(config);
    //   // let gravity = new RAPIER.Vector2(0.0, -9.81);
    //   // this.rapierWorld = new RAPIER.World(gravity);
    // }

    if (key === "samurai") {

      this.samuraiBotCanvasRef = canvas;
      this.samuraiBotParentRef = parentComponent;

      this.samuraiCanvasContext = canvas.getContext("2d");
      canvas.width = 10000;
      canvas.height = 10000;
      this.samuraiEngine = new SamuraiEngine();

      // this.samuraiCanvasContext.strokeStyle = "#FFFFFF";
      // this.samuraiCanvasContext.beginPath();

      // this.samuraiEngine.system.draw(this.samuraiCanvasContext);
      // this.samuraiCanvasContext.stroke();

    }

    // if (key === "matter") {
    //   var width = (MapSize) * TileSize,
    //     height = (MapSize) * TileSize;
    //   canvas.width = width;
    //   canvas.height = height;

    //   this.matterRenderer = Render.create({
    //     canvas,
    //     element: parentComponent,
    //     engine: this.matterEngine,
    //     options: {
    //       width,
    //       height,
    //       wireframes: false
    //     }
    //   });

    //   const boxA = Bodies.rectangle(400, 200, 80, 80);
    //   const ballA = Bodies.circle(380, 100, 40, 10);
    //   const ballB = Bodies.circle(460, 10, 40, 10);
    //   const ground = Bodies.rectangle(400, 380, 810, 60, { isStatic: true });
    //   Composite.add(this.matterEngine.world, [boxA, ballA, ballB, ground]);

    //   let runner = Matter.Runner.create();
    //   Matter.Render.run(this.matterRenderer);
    //   Matter.Runner.run(runner, this.matterEngine);
    //   Render.lookAt(this.matterRenderer, {
    //     min: { x: 0, y: 0 },
    //     max: { x: 800, y: 600 }
    //   });
    // }

    // if (key === "thermal") {
    //   this.pixijsThermalCanvasRef = canvas;
    //   this.pixijsThermalParentRef = parentComponent;

    //   await this.pixi2dThermalApp.init({
    //     sharedTicker: true,
    //     view: canvas.getContext("webgl2")?.canvas,
    //     backgroundColor: 0xffffff,
    //     width: 500,
    //     height: 500,
    //   });

    //   // this.pixi2dThermalApp.render()
    // }

    if (
      this.pixi2dApp &&
      this.threejsRenderer &&
      // this.samuraiPixi &&
      this.samuraiEngine
    ) {

      this.runIfNotAlreadyRunning();



    } else {

    }
  }

  dockViewComponents: Record<
    string,
    React.FunctionComponent<IDockviewPanelProps>
  > = {
      default: (props: IDockviewPanelHeaderProps<IState>) => {
        return (
          <div>
            <p>default</p>
            {/* <div>{`custom tab: ${props.api.title}`}</div>
              <span>{`value: ${props.params.myValue}`}</span> */}
          </div>
        );
      },

      // fab: (props: IDockviewPanelHeaderProps<IState>) => <FabricatorWindow game={this} />,
      // matter: (props: IDockviewPanelHeaderProps<IState>) => (<MatterWindow game={this} />),
      // bots: (props: IDockviewPanelHeaderProps<IState>) => (<BotsWindow game={this} />),
      // thermal: (props: IDockviewPanelHeaderProps<IState>) => {
      //   return (
      //     <ThermalWindow game={this} />
      //   );
      // },

      map: (props: IDockviewPanelHeaderProps<IState>) => {
        return <MapWindow game={this} />;
      },

      bot: (props: IDockviewPanelHeaderProps<IState>) => {
        return <BotWindow game={this} />;
      },

      term: (props: IDockviewPanelHeaderProps<IState>) => (
        <TerminalWindow game={this} />
      ),

      customPhysics: (props: IDockviewPanelHeaderProps<IState>) => (
        <CustomPhysicsWindow game={this} />
      ),
    };

  onDockviewReady(event: DockviewReadyEvent) {
    self.dockviewAPI = event.api;

    event.api.addPanel({
      id: "term",
      component: "term",
      floating: {
        position: { left: 10, top: 10 },
        width: 900,
        height: 600,
      },
      params: {
        game: this,
      },
    });
  }

  openAllWindows() {
    // this.dockviewAPI.component.addPanel({
    //   id: 'bots',
    //   component: 'bots',
    //   floating: {
    //     position: { left: 90, top: 90 },
    //     width: 500,
    //     height: 500
    //   },
    //   params: {
    //   }
    // })

    // this.dockviewAPI.component.addPanel({
    //   id: 'thermal',
    //   component: 'thermal',
    //   floating: {
    //     position: { left: 120, top: 190 },
    //     width: 600,
    //     height: 600
    //   },
    //   params: {
    //   }
    // })

    // this.dockviewAPI.component.addPanel({
    //   id: 'matter',
    //   component: 'matter',
    //   floating: {
    //     position: { left: 120, top: 190 },
    //     width: 600,
    //     height: 600
    //   },
    //   params: {
    //   }
    // })

    // this.dockviewAPI.component.addPanel({
    //   id: 'fab',
    //   component: 'fab',
    //   floating: {
    //     position: { left: 120, top: 190 },
    //     width: 600,
    //     height: 600
    //   },
    //   params: {
    //   }
    // })

    // this.dockviewAPI.component.addPanel({
    //   id: 'data',
    //   component: 'data',
    //   floating: {
    //     position: { left: 120, top: 190 },
    //     width: 600,
    //     height: 600
    //   },
    //   params: {
    //   }
    // })
    // this.dockviewAPI.component.addPanel({
    //   id: "arcadePhysics",
    //   component: "arcadePhysics",
    //   floating: {
    //     position: { left: 120, top: 190 },
    //     width: 600,
    //     height: 600,
    //   },
    //   params: {},
    // });


    // this.dockviewAPI.component.addPanel({
    //   id: "map",
    //   component: "map",
    //   floating: {
    //     position: { left: 100, top: 150 },
    //     width: 600,
    //     height: 600,
    //   },
    //   params: {},
    // });



    this.dockviewAPI.component.addPanel({
      id: "vid",
      component: "vid",
      floating: {
        position: { left: 150, top: 150 },
        width: 800,
        height: 800,
      },
      params: {},
    });

    this.dockviewAPI.component.addPanel({
      id: "customPhysics",
      component: "customPhysics",
      floating: {
        position: { left: 10, top: 10 },
        width: 800,
        height: 800,
      },
      params: {},
    });

  }

  focusWindowById(s: string, x?) {
    this.dockviewAPI.panels.forEach((p) => {
      if (p.id === s) {
        p.focus();
        p.setTitle(`${s}`);
      }
    });
  }

  focusOnTermInput() {
    this.bufferRef.current.focus();
  }

  unFocusOnTermInput() {
    this.bufferRef.current.blur();
  }

  registerTerminalBuffer(inputRef: React.MutableRefObject<null>) {
    this.bufferRef = inputRef;
  }

  // get the state to send to react ui
  state(): {
    history: ITerminalLine[];
    buffer: string;
    submitBuffer: any;
    setBuffer: any;
    // uiUpdateCallback: any;
  } {
    return {
      history: this.history,
      buffer: this.buffer,
      submitBuffer: this.submitBuffer.bind(this),
      setBuffer: this.setBuffer.bind(this),
      // uiUpdateCallback: this.uiUpdateCallback,
    };
  }

  commandNotFound(unknownCommand: string) {
    this.returnCommand(commandNotFoundTermLine(unknownCommand));
    this.updateTerminalWindow();
  }

  initalTerminalState(): ITermWindowState {
    return {
      history: this.history,
      buffer: this.buffer,
      submitBuffer: this.submitBuffer,
      setBuffer: this.setBuffer,
    };
  }

  addToHistory(t: ITerminalLine) {
    this.history = [...this.history, t];

    if (!this.terminalUiHook) {
      console.log("no terminalUiHook");
      return;
    }

    this.terminalUiHook({
      history: this.history,
      buffer: this.buffer,
      submitBuffer: this.submitBuffer,
      setBuffer: this.setBuffer,
    });
  }

  terminalUiHook: (s: ITermWindowState) => void;

  returnCommand(t: ITerminalLine) {
    this.buffer = "";
    this.history.push(t);
    this.updateTerminalWindow();
  }

  registerTerminal(
    updateState: React.Dispatch<React.SetStateAction<ITermWindowState>>
  ) {
    this.terminalUiHook = updateState;
    this.updateTerminalWindow();
  }

  setBuffer(b: string) {
    if ([`1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `0`].includes(b)) {
      this.focusWindowById("vid", b);
    } else {
      if (b === "`") {
        return;
      }

      this.buffer = b;
      this.updateTerminalWindow();
    }
  }

  addToBuffer(b: string) {
    this.buffer = `${this.buffer}${b}`;
    this.updateTerminalWindow();
  }

  updateTerminalWindow() {
    this.terminalUiHook({
      buffer: this.buffer,
      history: this.history,
      setBuffer: this.setBuffer,
      submitBuffer: this.submitBuffer,
    });
  }

  submitBuffer() {
    this.processCommand();
  }

  processCommand(): void {
    const command = this.buffer;
    const loggedIn = this.loggedIn;

    if (command === "login") {
      if (!loggedIn) {
        this.login();
        return;
      } else {
        this.alreadyLoggedIn();
        return;
      }
    }

    // if (command === "bots") {
    //   if (!loggedIn) {
    //     this.error(props);
    //     return;
    //   } else {
    //     this.bots(props);
    //     return;
    //   }
    // }

    if (command === "help") {
      if (!this.loggedIn) {
        this.helpLoggedOut();
        return;
      } else {
        this.helpLoggedIn();
        return;
      }
    }

    if (command === "whoami") {
      this.whoAmI();
      return;
    }

    if (command === "ship") {
      this.ship();
      return;
    }

    if (command === "mission") {
      this.mission();
      return;
    }

    if (command === "date") {
      this.date();
      return;
    }

    if (command === "settings") {
      this.settings();
      return;
    }

    // if (command === "map") {
    //   this.map(state, stateSetter);
    //   return;
    // }

    // if (command === "video") {
    //   this.video(state, stateSetter);
    //   return;
    // }

    // const matchForBot = (/b ([1-9])*/gm).exec(command);

    // if (matchForBot && matchForBot?.length > 0) {

    //   // if (!matchForBot || !matchForBot[0]) {
    //   //   return {
    //   //     out: `couldn't parse bot id`,
    //   //     status: 'fail'
    //   //   }
    //   // }

    //   SpaceTrashPlayer.videoFeed = Number.parseInt(matchForBot[0]);

    //   return {
    //     out: `now commanding Bot #${SpaceTrashPlayer.videoFeed}`,
    //     status: 'pass'
    //   }
    // }
    return this.commandNotFound(command);
  }

  login(): void {
    if (!this.loggedIn) {
      this.loggedIn = true;
      this.changeScene("mainloop");
      this.returnCommand(loggedInTermLine);
    } else {
      this.returnCommand(alreadyLoggedInTermLine);
    }
  }

  alreadyLoggedIn(): void {
    this.returnCommand(alreadyLoggedInTermLine);
  }

  helpLoggedIn(): void {
    this.returnCommand(helpLoggedInTermLine);
  }

  helpLoggedOut(): void {
    this.returnCommand(helpLoggedOutTermLine);
  }

  whoAmI(): void {
    this.returnCommand(whoAmITermLine);
  }

  ship(): void {
    this.returnCommand(shipTermLine);
  }

  mission(): void {
    this.returnCommand(missionTermLine);
  }

  date(): void {
    this.returnCommand(dateTermLine);
  }

  settings() {
    this.returnCommand(settingsTermLine);
  }

  positionOfBot(eid: number): { x: number; y: number } {
    const arcadeObjectComponent: SP_PhysicalComponent =
      this.components.SP_PhysicalComponent.take(eid);

    if (!arcadeObjectComponent.body)
      return { x: arcadeObjectComponent.x, y: arcadeObjectComponent.y };


    return {
      x: arcadeObjectComponent.body.pos.x,
      y: arcadeObjectComponent.body.pos.y,
    };
  }

  public videoFeedPosition(): { x: number; y: number } {
    const p = this.positionOfBot(
      (this.bots[this.videoFeed] as [number, string])[0]
    );

    return p;
  }

  rotationOfBot(eid: number): { r: number } {
    const spPhysical =
      this.components.SP_PhysicalComponent.take(eid).body as Circle;

    // if (!spPhysical.body)
    //   return { r: spPhysical.r };

    return {
      r: spPhysical.angle
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


    // this.threejsRenderer.setPixelRatio(window.devicePixelRatio / 8)

    const position = this.videoFeedPosition();
    const rotation = this.videoFeedRotation();

    const mag = Math.sqrt(Math.pow(position.x, 2) + Math.pow(position.y, 2));
    const unitX = position.x / mag;
    const unitY = position.y / mag;

    const degrees = rotation.r % 360;

    this.camera.position.setX(position.x);
    this.camera.position.setY(position.y);
    // if (degrees < 180) {
    //   this.camera.position.x = position.x + unitX * -TileSize / 2;
    //   this.camera.position.y = position.y + unitY * -TileSize / 2;
    // } else {
    //   this.camera.position.x = position.x + unitX * TileSize / 2;
    //   this.camera.position.y = position.y + unitY * TileSize / 2;
    // }




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

  async renderMatterJs() {
    // Engine.update(this.matterEngine);
  }

  async renderArcadePhysics() {
    // this.arcadePhysics.world.update(this.arcadePhysicsTick * 1000, 1000 / 60);
    // this.arcadePhysics.world.postUpdate(
    //   this.arcadePhysicsTick * 1000,
    //   1000 / 60
    // );
    // this.arcadePhysicsTick++;

    // draw debug
    // this.arcadePhysicsCanvasContext.clearRect(
    //   0,
    //   0,
    //   this.arcadePhysicsCanvasContext.canvas.width,
    //   this.arcadePhysicsCanvasContext.canvas.height
    // );
    // this.arcadePhysics.world.bodies.forEach((b) => {
    //   b.drawDebug(this.arcadePhysicsCanvasContext);
    // });
    // this.arcadePhysics.world.staticBodies.forEach((b) => {
    //   b.drawDebug(this.arcadePhysicsCanvasContext);
    // });
  }

  BeginTheGame() {
    this.openAllWindows();
  }
}

function isAlphabetic(str: string): boolean {
  if (!str) return false;
  return /^[A-Za-z]+$/.test(str) && str.length === 1;
}

function isNumeric(str: string): boolean {
  return /^[1-9]+$/.test(str) && str.length === 1;
}
