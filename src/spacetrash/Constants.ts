export const FPS = 30;

// load times
// MapV9 - 100 = 1.5 seconds
// MapV9 - 150 = 4.8 seconds
// MapV9 - 160 = 6.1 seconds
// MapV9 - 170 = 7.8 seconds
// MapV9 - 180 = 9.8 seconds
// MapV9 - 190 = 12.2 seconds
// MapV9 - 300 = minute+

// 3d render times
// MapV9 - 100 = 9.2 ms
// MapV9 - 150 = 9.9 ms
// MapV9 - 200 = 32 ms
// MapV9 - 300 = 54 ms

export const MapSize = 100;
export const NumberOfActors = 50; // BotSlots * numberOfShips + numberOfRooms * numberOfShips;

export const TileSize = 10;

export const ActorSize = TileSize / 1;
export const BotSlots = 9;
export const FRICTION_CONSTANT = 1; //0.999;
export const MapBoundHigh = MapSize - 1;
export const MapBoundLow = 0;

export const ShadowLimit = 1;
export const VELOCITY_CONSTANT = 0.001;
