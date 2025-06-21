// Allows a game with multiple windows
// It is specific to the browser because it relies upon react and dockview

import * as React from 'react'
import { createRoot } from 'react-dom/client';
import { DockviewDefaultTab, DockviewReadyEvent, IDockviewPanelHeaderProps, IDockviewPanelProps } from "dockview";
import { DockviewApi, DockviewReact } from 'dockview';

import { StateSpace } from "./engine/StateSpace";
import { System } from "./engine/VECS.ts/System";
import { IComponentsStores, IStores } from "./engine/VECS.ts/types";
import { MultiSurfaceGame } from "./MultiSurfaceGame";
import { BotsWindow } from "./spacetrash/UI/BotsWindow";
import { BotWindow } from "./spacetrash/UI/BotWindow";
import { MapWindow } from "./spacetrash/UI/map";
import { TerminalWindow } from "./spacetrash/UI/terminal";
import { IPerformanceConfig } from "./engine/VECS.ts/ECS";

let self: WindowedGame<any, any, any>;
export abstract class WindowedGame<IRenderings, II, IState> extends MultiSurfaceGame<IRenderings, II> {
  private reactRoot;
  dockviewAPI: DockviewApi;

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
