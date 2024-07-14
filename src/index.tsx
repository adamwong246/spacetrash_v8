// import { StateSpace } from "../../engine/StateSpace";
// import { Game } from "../../engine/Game";
// import { Scene } from "../../engine/Scene";

import { ISpaceTrashSystems, MapSize, SpaceTrashSystems } from "./Systems";
import { ISpaceTrashApps } from "./UI";
// import { SpaceTrashTerminal } from "../../Terminal";
import { PhysicsActorComponent, PhysicsSetComponent } from "./Components/physics";

import { SpaceTrashECS } from "./EC";

import { DoorTile, FloorTile, WallTile } from "./Entities/setpieces";
import { OpacityComponent } from "./Components/opacity";
import { LitableComponent } from "./Components/casting/in";
import { SpaceTrashEntityComponent } from "./EntityComponent";
import { SpaceTrashDrone } from "./Entities";
import { SpaceTrashTerminal } from './Terminal';
import { Game } from './engine/Game';
import { Scene } from './engine/Scene';
import { StateSpace } from './engine/StateSpace';
import * as React from 'react'
import { createRoot } from 'react-dom/client';

import { SpaceTrashDesktop } from './UI';

const worker = new Worker("./worker.js");



document.addEventListener("DOMContentLoaded", function (event) {
  const domNode = document.getElementById('react-root');
  if (domNode) {

    
    createRoot(domNode).render(<SpaceTrashDesktop
      worker={worker}
    />);
  }
});




