import { IPerformanceConfig } from "../../engine/VECS.ts/ECS";
import { GameWithStores } from "./3-WithStores";

export abstract class GameWithControls extends GameWithStores {
  forward: boolean = false;
  back: boolean = false;
  left: boolean = false;
  right: boolean = false;

  constructor(
    domNode: HTMLElement,
    performanceConfig: IPerformanceConfig,
    renderings: Set<any>
  ) {
    super(domNode, performanceConfig, renderings);

    const self = this;
    document.addEventListener("keydown", function (event) {
      if (event.repeat) return;
      else if (event.key === "ArrowUp") {
        self.driveForward();
        return;
      } else if (event.key === "ArrowDown") {
        self.driveBack();
        return;
      } else if (event.key === "ArrowLeft") {
        self.turnLeft();
        return;
      } else if (event.key === "ArrowRight") {
        self.turnRight();
        return;
      }
    });

    document.addEventListener("keyup", function (event) {
      if (event.key === "ArrowUp") {
        self.stopForward();
      } else if (event.key === "ArrowDown") {
        self.stopBack();
      } else if (event.key === "ArrowLeft") {
        self.stopLeft();
      } else if (event.key === "ArrowRight") {
        self.stopRight();
      } else {
        // console.log(event);
      }
    });
  }

  driveForward() {
    this.forward = true;
  }
  driveBack() {
    this.back = true;
  }
  turnLeft() {
    this.left = true;
  }
  turnRight() {
    this.right = true;
  }
  stopForward() {
    this.forward = false;
  }
  stopBack() {
    this.back = false;
  }
  stopLeft() {
    this.left = false;
  }
  stopRight() {
    this.right = false;
  }

  movingForward(): boolean {
    if (this.back === false && this.forward === true) {
      return true;
    } else if (this.back === true && this.forward === false) {
      return false;
    } else if (!this.back && !this.forward) {
      return false;
    } else {
      return false;
    }
  }

  movingBack(): boolean {
    if (this.back === true && this.forward === false) {
      return true;
    } else if (this.back === false && this.forward === true) {
      return false;
    } else if (!this.back && !this.forward) {
      return false;
    } else {
      return false;
    }
  }

  movingLeft(): boolean {
    if (this.left === true && this.right === false) {
      return true;
    } else if (this.left === false && this.right === true) {
      return false;
    } else if (!this.left && !this.right) {
      return false;
    } else {
      return false;
    }
  }

  movingRight(): boolean {
    if (this.right === true && this.left === false) {
      return true;
    } else if (this.right === false && this.left === true) {
      return false;
    } else if (!this.left && !this.right) {
      return false;
    } else {
      return false;
    }
  }
}
