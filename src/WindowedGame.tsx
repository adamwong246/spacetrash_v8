import { DockviewDefaultTab, DockviewReadyEvent, IDockviewPanelHeaderProps, IDockviewPanelProps } from "dockview";
// Allows a game with multiple windows
// It is specific to the browser because it relies upon react and dockview

import * as React from 'react'
import { createRoot } from 'react-dom/client';

import { DockviewApi, DockviewReact } from 'dockview';

import { StateSpace } from "./engine/StateSpace";
import { System } from "./engine/VECS.ts/System";
import { IComponentsStores, IStores } from "./engine/VECS.ts/types";
import { MultiSurfaceGame } from "./MultiSurfaceGame";
import { FunctionComponent } from "react";

const MenuBar: (p: {


}) => any = (props) => <>
  <div
    style={{
      display: 'block',
    }}
  >
    <button>map</button>
    <button>term</button>
    <button>bot 1</button>
    <button>bot 2</button>
    <button>bot 3</button>
    <button>bot 4</button>
    <button>bot 5</button>
    <button>bot 6</button>
    <button>bot 7</button>
    <button>bot 8</button>
    <button>bot 9</button>
    <button>QPU</button>
  </div>
</>

// const WindowManager: (p: {
//   game: WindowedGame<any, any, any>,
//   onDockviewReadyEvent,
//   dockViewComponentFactory,
//   // headerComponents

// }) => any = (props) => <>
//   <MenuBar />
//   <DockviewReact
//     className={'dockview-theme-abyss'}
//     onReady={(e) => {
//       this.onDockviewReadyEvent(e)
//     }}
//     components={props.dockViewComponentFactory()}
//   // defaultTabComponent={props.headerComponents.default}
//   /></>

let self;
export abstract class WindowedGame<IRenderings, II, IState> extends MultiSurfaceGame<IRenderings, II> {
  private reactRoot;
  dockviewAPI: DockviewApi;

  abstract gameReady: () => void;

  stateSetter: (s: any) => void;
  abstract uiHooks: any;

  onDockviewReady(e: DockviewReadyEvent) {
    self.dockviewAPI = e.api;
  }

  // dockViewComponents(): Record<string, FunctionComponent<IDockviewPanelProps>> {
  //   return {}
  // }
  abstract dockViewComponents(): Record<string, FunctionComponent<IDockviewPanelProps>> 

  // dockViewComponentFactory():  any{
  //   // no-op
  // }

  constructor(
    stateSpace: StateSpace,
    system: System,
    componentStores: IComponentsStores<any>,
    stores: IStores<any>,
    config: {
      fps: number;
      performanceLogging: boolean;
    },
    renderings: Set<IRenderings>,
    domNode: HTMLElement,
  ) {
    super(stateSpace, system, componentStores, stores, config, renderings);
    this.reactRoot = createRoot(domNode)
    self = this;
    // this.dockviewAPI.bind(this);
    // this.onDockviewReady.bind(this);
  }

  async start() {
    super.start();

    this.reactRoot.render(<div>
      <MenuBar />
      <DockviewReact
        className={'dockview-theme-abyss'}
        onReady={this.onDockviewReady}
        components={this.dockViewComponents()}
      />
    </div>)
  }


  // async registerUiHooks(
  //   uiHooks,
  //   stateSetter,
  //   state
  // ) {
  //   // debugger
  //   this.stateSetter = stateSetter;
  //   // this.uiHooks = {
  //   //   ...uiHooks.map((s) => {
  //   //     debugger
  //   //   })
  //   // };
  //   const mappedArray = Object.entries(uiHooks).map(([key, value]) => [key, (a, b) => {
  //     return uiHooks[key](a, state, b)

  //   }]);
  //   const newObject = Object.fromEntries(mappedArray)
  //   this.uiHooks = newObject

  //   this.gameReady()
  //   // console.log("registerUiHook 2", this.stateSetter);
  // }


  // start() {
  //   createRoot(this.reactRoot).render(<DockviewReact
  //     className={'dockview-theme-abyss'}
  //     onReady={this.onDockviewReadyEvent}
  //     components={this.dockViewComponents} />)
  //   return super.start()
  // }

  // draw() {
  //   return super.draw()
  // }
  // renderings: Set<IRenderings>;

  // constructor(
  //   stateSpace: StateSpace,
  //   system: System,
  //   componentStores: IComponentsStores<any>,
  //   stores: IStores<any>,
  //   config: {
  //     fps: number;
  //     performanceLogging: boolean;
  //   },
  //   renderings: Set<IRenderings>,
  // ) {
  //   super(stateSpace, system, componentStores, stores, config);
  //   this.renderings = renderings;
  //   this.canvasContexts = {};
  // }
  // canvasContexts: Record<
  //   any,
  //   {
  //     run: boolean;
  //     canvas?: HTMLCanvasElement;
  //     callback?: (a: any) => void;
  //     canvasContext?: IRenderings;
  //     parentComponent?: HTMLElement;
  //   }
  // >;

  // registerCanvas(
  //   key: any,
  //   run: boolean,
  //   canvas?: HTMLCanvasElement,
  //   callback?: (data: any) => void,
  //   canvasContext?: IRenderings,
  //   parentComponent?: HTMLElement
  // ) {
  //   console.log("register", key, canvas);
  //   if ((canvasContext === undefined) !== (canvasContext === undefined)) {
  //     throw `you must pass both canvas and context, or neither. canvas, canvasContext: ${canvas}, ${canvasContext}`;
  //   }

  //   if (canvasContext !== undefined && !this.renderings.has(canvasContext)) {
  //     throw `you passed an illegal context: ${canvasContext}. I expected ${this.renderings.entries}`;
  //   }

  //   this.canvasContexts[key] = {
  //     run,
  //     canvas,
  //     callback,
  //     canvasContext,
  //     parentComponent,
  //   };
  //   this.canvasContexts[key].callback &&
  //     this.canvasContexts[key].callback(false);
  // }
}
// const e = createRoot(domNode).render(<DockviewReact
//   className={'dockview-theme-abyss'}
//   onReady={this.onDockviewReadyEvent}
//   components={this.dockViewComponents}
// defaultTabComponent={headerComponents.default}
// />)
// .render(<Idk />);

// document.addEventListener("DOMContentLoaded", function (event) {

//   if (!rootHtml) {
//     throw "no rootHtml?!"
//   }



// });


