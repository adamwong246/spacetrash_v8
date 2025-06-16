import SpacetrashGame from "./Game";

export default class SpaceTrashPlayer {
  public static videoFeed: number = 1;

  public static bots: {
    1: [number, string];
    2: [number, string];
    3: [number, string];
    4: [number, string];
    5: [number, string];
    6: [number, string];
    7: [number, string];
    8: [number, string];
    9: [number, string];
  };

  public static videoFeedPosition(): { x: number; y: number } {
    return SpacetrashGame.positionOfEntity(
      (SpaceTrashPlayer.bots[SpaceTrashPlayer.videoFeed] as [number, string])[0]
    );
  }

  public static yup() {
    for (let ndx = 1; ndx <= 9; ndx++) {
      if (this.videoFeed === ndx) {
        SpaceTrashPlayer.bots[this.videoFeed].dy =
          SpaceTrashPlayer.bots[this.videoFeed].dy - 0.001;
      }
    }
  }
  public static ydown() {
    for (let ndx = 1; ndx <= 9; ndx++) {
      if (this.videoFeed === ndx) {
        SpaceTrashPlayer.bots[this.videoFeed].dy =
          SpaceTrashPlayer.bots[this.videoFeed].dy + 0.001;
      }
    }
  }

  public static xleft() {
    for (let ndx = 1; ndx <= 9; ndx++) {
      if (this.videoFeed === ndx) {
        SpaceTrashPlayer.bots[this.videoFeed].dx =
          SpaceTrashPlayer.bots[this.videoFeed].dx - 0.001;
      }
    }
  }
  public static xright() {
    for (let ndx = 1; ndx <= 9; ndx++) {
      if (this.videoFeed === ndx) {
        SpaceTrashPlayer.bots[this.videoFeed].dx =
          SpaceTrashPlayer.bots[this.videoFeed].dx + 0.001;
      }
    }
  }
}
