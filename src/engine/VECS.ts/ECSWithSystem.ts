import { ECS, IPerformanceConfig } from "./ECS";

export abstract class ECSWithSystem extends ECS {
  // runs once before the first tick
  abstract load();

  // runs repeatedly after load
  abstract tick(delta: number);
  abstract draw(): Promise<any>;

  paused = true;
  headless: boolean;

  constructor(
    config: IPerformanceConfig
  ) {
    super(config);
    this.headless = config.headless;
  }

  async run() {
    
    this.load();

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

  unpause() {
    console.log("ecs unpaused");
    this.paused = false;
  }

  pause() {
    console.log("ecs paused");
    this.paused = true;
  }
}
