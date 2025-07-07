import { ECS, IPerformanceConfig } from "../VECS.ts/ECS";

export abstract class ECSWithSystem extends ECS {
  
  // runs once before the first tick
  abstract load();

  // runs repeatedly after load
  abstract tick(delta: number);
  abstract draw(): Promise<any>;

  loaded = false;
  headless: boolean = false;

  constructor(config: IPerformanceConfig) {
    super(config);
    this.headless = config.headless;
  }

  runIfNotAlreadyRunning() {
    if (!this.loaded) {
      this.run();
    }
  }

  async run() {
    this.load();
    this.loaded = true;

    let then = performance.now();

    while (true) {
      let now = await new Promise(requestAnimationFrame);
      this.tick(now - then);
      await this.draw();
      then = now;
    }

    // if (!this.headless) {
    //   while (!this.paused) {
    //     let now = await new Promise(requestAnimationFrame);
    //     this.tick(now - then);
    //     await this.draw();
    //     then = now;
    //   }
    // } else {
    //   console.log("running in headless mode");
    //   while (!this.paused) {
    //     let now = performance.now();
    //     this.tick(now - then);
    //     then = now;
    //   }
    // }
  }
}
