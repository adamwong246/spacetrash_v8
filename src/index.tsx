import * as React from 'react'
import { createRoot } from 'react-dom/client';

import ReactRoot from "./ReactRoot";

const worker = new Worker("./worker.js");

function stringifyEvent(e) {
  const obj = {};
  for (let k in e) {
    obj[k] = e[k];
  }
  return JSON.parse(JSON.stringify(obj, (k, v) => {
    if (v instanceof Node) return 'Node';
    if (v instanceof Window) return 'Window';
    return v;
  }, ' '));
}

function inputEvent(e) {
  worker.postMessage(["inputEvent", stringifyEvent(e)]);
}

document.addEventListener("DOMContentLoaded", function (event) {

  const domNode = document.getElementById('react-root');
  if (domNode) {
    createRoot(domNode).render(<ReactRoot worker={worker} />);
  }
  
  const canvas = document.getElementById('canvas-root');

  canvas?.addEventListener("wheel", (event) => {
    inputEvent(event);
  })
  canvas?.addEventListener('keydown', function (event) {
    inputEvent(event);
  }, false)
  canvas?.addEventListener('mousedown', function (event) {
    inputEvent(event);
  });
  canvas?.addEventListener('mousedown', function (event) {
    inputEvent(event);
  });

  const offscreen = (canvas as HTMLCanvasElement).transferControlToOffscreen()
  worker.postMessage(["canvas", offscreen], [offscreen]);
});
