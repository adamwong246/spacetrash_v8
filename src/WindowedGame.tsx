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
import { BotsWindow } from "./spacetrash/UI/BotsWindow";
import { BotWindow } from "./spacetrash/UI/BotWindow";
import { MapWindow } from "./spacetrash/UI/map";
import { TerminalWindow } from "./spacetrash/UI/terminal";
import { IPerformanceConfig } from "./engine/VECS.ts/ECS";

let self: WindowedGame<any, any, any>;
export abstract class WindowedGame<IRenderings, II, IState> extends MultiSurfaceGame<IRenderings, II> {
  private reactRoot;
  dockviewAPI: DockviewApi;

  abstract gameReady: () => void;

  stateSetter: (s: any) => void;
  abstract uiHooks: any;

  onDockviewReady(event: DockviewReadyEvent) {
    self.dockviewAPI = event.api;
  }

  constructor(
    stateSpace: StateSpace,
    system: System,
    componentStores: IComponentsStores<any>,
    stores: IStores<any>,
    config: IPerformanceConfig,
    renderings: Set<IRenderings>,
    domNode: HTMLElement,
  ) {
    super(stateSpace, system, componentStores, stores, config, renderings);
    this.reactRoot = createRoot(domNode)
    self = this;
  }

  async start() {
    super.start();

    self.reactRoot.render(<DockviewReact
      className={'dockview-theme-abyss'}
      onReady={self.onDockviewReady}
      components={{

        default: (props: IDockviewPanelHeaderProps<any>) => {
          return (
            <div>
              <p>default</p>
              {/* <div>{`custom tab: ${props.api.title}`}</div>
                  <span>{`value: ${props.params.myValue}`}</span> */}
            </div>
          );
        },

        map: (props: IDockviewPanelHeaderProps<any>) => {
          return (
            <MapWindow game={self} />
          );
        },

        vid: (props: IDockviewPanelHeaderProps<any>) => {
          return (
            <BotWindow game={self} />
          );
        },

        bots: (props: IDockviewPanelHeaderProps<any>) => (<BotsWindow game={self} />),
        term: (props: IDockviewPanelHeaderProps<any>) => <TerminalWindow game={self} />,
      }}
    />)
  }

  focusWindowById(s: string, p?: any) {
    this.dockviewAPI.panels.forEach((p) => {
      if (p.id === s) {
        p.focus()
      }
    })
  }



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