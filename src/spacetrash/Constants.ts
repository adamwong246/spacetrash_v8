// 30 FPS is 33.33333 MS.
// 60 FPS is 16.66666 MS.

// load times
// MapV9 - 100 = 1.5 seconds
// MapV9 - 150 = 4.8 seconds
// MapV9 - 160 = 6.1 seconds
// MapV9 - 170 = 7.8 seconds
// MapV9 - 180 = 9.8 seconds
// MapV9 - 190 = 12.2 seconds
// MapV9 - 300 = minute+

// 3d render times baseline
// MapV9  - 100 = 9.2 ms
// MapV9  - 150 = 9.9 ms
// MapV9  - 200 = 32 ms
// MapV9  - 300 = 54 ms
// MapV10 - 50 = 1.73ms

// occlude 0.0 - 100 - 5.3
// occlude 10% - 100 - 4.8
// occlude 50% - 100 - 4.0 ms
// occlude 90% - 100 - 5.8

// occlude 0.0 - 200 - 45
// occlude 0.1 - 200 - 20
// occlude 0.5 - 200 - 20
// occlude 0.9 - 200 - 13

// chrome debugger can load a full profile at 200

// target
// 30FPS, map size 250, 75% occlusion - 12 second loadtime, drawtime 14ms

// const shipsize = (Math.pow(25, 2) * 5)

export const FPS = 60;
export const shipLength = 32;
const numberOfShips = 1;
export const MapSize = Math.round(
  Math.sqrt(Math.pow(shipLength, 2) * numberOfShips)
);

// export const MapSize = 30
console.log("MapSize: ", MapSize);

export const NumberOfActors = 1; //numberOfShips * 9

export const TileSize = 30;
const actorScaler = 0.9;
export const ActorSize = TileSize * actorScaler;

export const BotSlots = 9;
export const FRICTION_CONSTANT = 1; //0.999;
export const MapBoundHigh = MapSize - 1;
export const MapBoundLow = 0;

export const ShadowLimit = 1;
export const TANK_VELOCITY_ANGULAR = 0.05;
export const VELOCITY_CONSTANT = 0.001;
export const SPEED_CONSTANT = 0.0001;
export const TANK_VELOCITY = 3
