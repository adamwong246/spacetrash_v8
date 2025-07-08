import { GameWithRendering } from "../../demiurge/abstractClasses/3-WithRendering";
import { IPerformanceConfig } from "../../demiurge/ecs/ECS";

import { ICanvases } from "./3-WithStores";

export abstract class MultiSurfaceGame<
  IRenderings,
> extends GameWithRendering {
  renderings: Set<IRenderings>;

  constructor(
    config: IPerformanceConfig,
    renderings: Set<IRenderings>,
  ) {
    super(config);
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
    key: ICanvases,
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
      throw `you passed an illegal context: ${canvasContext}. I expected ${[...this.renderings]}`;
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
    return Promise.all(
      Object.keys(this.canvasContexts).map(async (c) => {
        return await this.drawCanvas(c);
      })
    );
  }

  async drawCanvas(key: string): Promise<any> {
    const scene = this.stateSpace.get(this.stateSpace.currrent);
    const canvas = this.canvasContexts[key].canvas;

    const clbk = this.canvasContexts[key].callback;
    const drawOps: ((
      g: MultiSurfaceGame<any>,
      canvas: any
    ) => Promise<any>)[] = scene.draw(key, clbk || (() => {}), this);

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
