// Allows a game with multiple windows
// It is specific to the browser because it relies upon react and dockview

import * as React from 'react'
import { FunctionComponent, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import { DockviewApi, DockviewReact, DockviewReadyEvent, IDockviewPanelProps } from 'dockview';

import { StateSpace } from "./engine/StateSpace";
import { System } from "./engine/VECS.ts/System";
import { IComponentsStores, IStores } from "./engine/VECS.ts/types";
import { MultiSurfaceGame } from "./MultiSurfaceGame";

const WindowManager: (p: {
  initialUiState,
  game: WindowedGame<any, any, any>,
  onDockviewReadyEvent,
  dockViewComponentFactory,
  headerComponents
  // uiHooks
}) => any = (props) => {

  console.log("WindowManager", props)
  // const [state, stateSetter] = React.useState(props.initialUiState);

  // useEffect(() => {
  //   debugger
  //   // props.game.registerUiHooks(props.uiHooks, props)
  //   // props.game.registerUiHook((s) => {
  //   //   debugger
  //   //   return stateSetter(s)
  //   // });
  // }, []);



  return (

    <DockviewReact
      className={'dockview-theme-abyss'}
      onReady={(e) => {
        // props.game.registerUiHooks(
        //   props.uiHooks,
          
        //   props
        // )
        props.onDockviewReadyEvent(e)
      }}
      
      
      components={props.dockViewComponentFactory()}
      // defaultTabComponent={props.headerComponents.default}
    />
  );
}

export abstract class WindowedGame<IRenderings, II, IState> extends MultiSurfaceGame<IRenderings, II> {
  private reactRoot;
  private initialUiState;

  abstract gameReady: () => void;

  stateSetter: (s: any) => void;  
  abstract uiHooks: any;

  public dockviewAPI: DockviewApi;

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
    initialUiState: IState,
    onDockviewReadyEvent: (e: DockviewReadyEvent) => void,
    dockViewComponentFactory: (s: IState) => Record<string, FunctionComponent<IDockviewPanelProps>>,
    headerComponents,
    // uiHooks
  ) {
    super(stateSpace, system, componentStores, stores, config, renderings);
    this.reactRoot = createRoot(domNode)
    this.initialUiState = initialUiState

    this.reactRoot.render(<WindowManager
      initialUiState={this.initialUiState}
      game={this}
      onDockviewReadyEvent={onDockviewReadyEvent}
      dockViewComponentFactory={dockViewComponentFactory}
      headerComponents={headerComponents}
      // uiHooks={ uiHooks}
    />)

  }

  // async draw(): Promise<any> {
  //   console.log("draw")
  //   // throw new Error("Method not implemented.");
  // }
  
  // start() {

  //   return super.start()
  // }

  // async registerUiHook(stateSetter) {
  //   console.log("registerUiHook 1", stateSetter);
  //   this.stateSetter = stateSetter;
  //   this.gameReady()
  //   // console.log("registerUiHook 2", this.stateSetter);
  // }

  async registerUiHooks(
    uiHooks,
    stateSetter,
    state
  ) {
    // debugger
    this.stateSetter = stateSetter;
    // this.uiHooks = {
    //   ...uiHooks.map((s) => {
    //     debugger
    //   })
    // };
    const mappedArray = Object.entries(uiHooks).map(([key, value]) => [key, (a, b) => {
      return uiHooks[key](a, state, b)

    }]);
    const newObject = Object.fromEntries(mappedArray)
    this.uiHooks = newObject

    this.gameReady()
    // console.log("registerUiHook 2", this.stateSetter);
  }


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


