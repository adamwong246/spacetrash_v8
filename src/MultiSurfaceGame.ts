// Allows a game with multiple HTML canvases
// It is not platform specific and needs to target node-canvas as well as client canvases

import { Game } from "./engine/Game";
import { StateSpace } from "./engine/StateSpace";
import { IPerformanceConfig } from "./engine/VECS.ts/ECS";
import { System } from "./engine/VECS.ts/System";
import { IArchtypesMapping, IComponentsStores, IStores } from "./engine/VECS.ts/types";


export abstract class MultiSurfaceGame<IRenderings, II> extends Game<IRenderings, II> {
  renderings: Set<IRenderings>;

  constructor(
    stateSpace: StateSpace,
    system: System,
    componentStores: IComponentsStores<any>,
    stores: IStores<any>,
    config: IPerformanceConfig,
    renderings: Set<IRenderings>,
    archetypeMappings: IArchtypesMapping
  ) {
    super(stateSpace, system, componentStores, stores, config, archetypeMappings);
    this.renderings = renderings;
    this.canvasContexts = {};
  }
  canvasContexts: Record<
    any,
    {
      run: boolean;
      canvas?: HTMLCanvasElement;
      callback?: (a: any) => void;
      canvasContext?: IRenderings;
      parentComponent?: HTMLElement;
    }
  >;

  registerCanvas(
    key: any,
    run: boolean,
    canvas?: HTMLCanvasElement,
    callback?: (data: any) => void,
    canvasContext?: IRenderings,
    parentComponent?: HTMLElement
  ) {
    if ((canvasContext === undefined) !== (canvasContext === undefined)) {
      throw `you must pass both canvas and context, or neither. canvas, canvasContext: ${canvas}, ${canvasContext}`;
    }

    if (canvasContext !== undefined && !this.renderings.has(canvasContext)) {
      throw `you passed an illegal context: ${canvasContext}. I expected ${this.renderings.entries}`;
    }

    this.canvasContexts[key] = {
      run,
      canvas,
      callback,
      canvasContext,
      parentComponent,
    };
    this.canvasContexts[key].callback &&
      this.canvasContexts[key].callback(false);
  }

  draw() {
    return Promise.all(Object.keys(this.canvasContexts).map(async (c) => {
      return await this.drawCanvas(c)
    }));
  }

  
  async drawCanvas(key: string): Promise<any> {
    const scene = this.stateSpace.get(this.stateSpace.currrent);
    const canvas = this.canvasContexts[key].canvas;
    
    const clbk = this.canvasContexts[key].callback;
    const drawOps: ((g: MultiSurfaceGame<any, any>, canvas: any) => Promise<any>)[] = scene.draw(
      key,
      clbk || (() => { }),
      this
    );

    await Promise.all(
      drawOps.map(async (d) => {
        if (canvas === null) {
          console.error(this.canvasContexts[key].toString());
          throw `could not find a mapping of ${canvas} to ${key}`;
        }

        await d(this, canvas);
      })
    );
  }
}
  