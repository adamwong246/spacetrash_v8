import React, { useState } from "react";
import { Desktop } from "../../../engine/UI/index";


export type ISpaceTrashApps = 'terminal' | 'manual' | 'shipmap' | 'drone';
export enum ESpaceTrashApps {
  terminal,
  manual,
  shipmap,
  drone
};

export const SpaceTrashDesktop = Desktop({
  'terminal': {
    top: 100,
    left: 200,
    width: 800,
    height: 200,
    visible: true,
    app: {},
  },
  'manual': {
    top: 100,
    left: 200,
    width: 700,
    height: 200,
    visible: true,
    app: {},
  }
})

