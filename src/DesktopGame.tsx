// Allows a game with multiple windows
// It is specific to the browser because it relies upon react and dockview

import * as React from 'react'
import { createRoot } from 'react-dom/client';

import { DockviewReadyEvent, IDockviewPanelHeaderProps, IDockviewPanelProps } from "dockview";
import { DockviewApi, DockviewReact } from 'dockview';

import { StateSpace } from "./engine/StateSpace";
import { System } from "./engine/VECS.ts/System";
import { IArchtypesMapping, IComponentsStores, IStores, Store } from "./engine/VECS.ts/types";
import { MultiSurfaceGame } from "./MultiSurfaceGame";
import { BotsWindow } from "./spacetrash/UI/BotsWindow";
import { BotWindow } from "./spacetrash/UI/BotWindow";
import { MapWindow } from "./spacetrash/UI/map";
import { TerminalWindow } from "./spacetrash/UI/terminal";
import { IPerformanceConfig } from "./engine/VECS.ts/ECS";
import { MatterWindow } from './spacetrash/UI/MatterWindow';
import { ArcadePhysicsWindow } from './spacetrash/UI/ArcadePhysicsWindow';
import { FabricatorWindow } from './spacetrash/UI/FabricatorWindow';
import { DataWindow } from './spacetrash/UI/DataWindow';
import { IState } from './spacetrash';

let self: DesktopGame<any, any,  any>;

export abstract class DesktopGame<IRenderings, ICanvases, IComponents> extends MultiSurfaceGame<IRenderings, IComponents> {
  private reactRoot;
  dockviewAPI: DockviewApi;
  stateSetter: (s: any) => void;
  abstract uiHooks: any;
  constructor(
    stateSpace: StateSpace,
    system: System,
    components: IComponentsStores<any, IComponents>,
    config: IPerformanceConfig,
    renderings: Set<IRenderings>,
    domNode: HTMLElement,
  ) {
    super(stateSpace, system, components, config, renderings);
    this.reactRoot = createRoot(domNode)
    self = this;
  }

  async start() {
    super.start();

    self.reactRoot.render(<div>


      <div
        style={{
          top: 0,
          left: 0,
          position: 'absolute',
          zIndex: 1
        }}
      >
        <button onClick={() => this.focusWindowById('map')}>map</button>
        <button onClick={() => this.focusWindowById('term')}>term</button>
        <button onClick={() => this.focusWindowById('vid', 1)}>1</button>
        <button onClick={() => this.focusWindowById('vid', 2)}>2</button>
        <button onClick={() => this.focusWindowById('vid', 3)}>3</button>
        <button onClick={() => this.focusWindowById('vid', 4)}>4</button>
        <button onClick={() => this.focusWindowById('vid', 5)}>5</button>
        <button onClick={() => this.focusWindowById('vid', 6)}>6</button>
        <button onClick={() => this.focusWindowById('vid', 7)}>7</button>
        <button onClick={() => this.focusWindowById('vid', 8)}>8</button>
        <button onClick={() => this.focusWindowById('vid', 9)}>9</button>
      </div>

      <DockviewReact
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

          matter: (props: IDockviewPanelHeaderProps<any>) => <MatterWindow game={self} />,
          arcadePhysics: (props: IDockviewPanelHeaderProps<any>) => <ArcadePhysicsWindow game={self} />,
          fab: (props: IDockviewPanelHeaderProps<any>) => (<FabricatorWindow game={self} />),
          data: (props: IDockviewPanelHeaderProps<any>) => (<DataWindow game={self} />),
        }}
      />
    </div >)
  }

  registerCanvas(key: ICanvases, run: boolean, canvas?: HTMLCanvasElement, callback?: (data: any) => void, canvasContext?: IRenderings | undefined, parentComponent?: HTMLElement): void {
    super.registerCanvas(key, run, canvas, callback, canvasContext, parentComponent);
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
    fab: (props: IDockviewPanelHeaderProps<IState>) => <FabricatorWindow game={this} />,
  }

  onDockviewReady(event: DockviewReadyEvent) {
    self.dockviewAPI = event.api;
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

  openAllWindows() {
    this.dockviewAPI.component.addPanel({
      id: 'bots',
      component: 'bots',
      floating: {
        position: { left: 90, top: 90 },
        width: 500,
        height: 500
      },
      params: {

      }
    })

    this.dockviewAPI.component.addPanel({
      id: 'vid',
      component: 'vid',
      floating: {
        position: { left: 50, top: 50 },
        width: 500,
        height: 500
      },
      params: {

      }
    })

    this.dockviewAPI.component.addPanel({
      id: 'map',
      component: 'map',
      floating: {
        position: { left: 100, top: 150 },
        width: 600,
        height: 600
      },
      params: {

      }
    })


    this.dockviewAPI.component.addPanel({
      id: 'arcadePhysics',
      component: 'arcadePhysics',
      floating: {
        position: { left: 120, top: 190 },
        width: 600,
        height: 600
      },
      params: {

      }
    })

    this.dockviewAPI.component.addPanel({
      id: 'fab',
      component: 'fab',
      floating: {
        position: { left: 120, top: 190 },
        width: 600,
        height: 600
      },
      params: {

      }
    })

    this.dockviewAPI.component.addPanel({
      id: 'data',
      component: 'data',
      floating: {
        position: { left: 120, top: 190 },
        width: 600,
        height: 600
      },
      params: {

      }
    })

  }

  focusWindowById(s: string) {
    this.dockviewAPI.panels.forEach((p) => {
      if (p.id === s) {
        p.focus();
        p.setTitle(`${s}`)
      }
    })
  }
}
