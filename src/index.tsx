import * as React from 'react'
import { createRoot } from 'react-dom/client';

// import ReactRoot from "./ReactRoot";
import stringifyEvent from './engine/Event';
import { WM } from './engine/UI/WM';
import { UIWindow } from './engine/UI/UIWindow';

const worker = new Worker("./worker.js");

function inputEvent(e) {
  worker.postMessage(["inputEvent", stringifyEvent(e)]);
}

document.addEventListener("DOMContentLoaded", function (event) {

  const domNode = document.getElementById('react-root');
  if (domNode) {
    createRoot(domNode).render(<WM
      worker={worker}
      desktopState={{
        windows: {
          terminal: {
            top: 90,
            left: 90,
            width: 1200,
            height: 600,
            visible: true,
            app: () => <UIWindow/>
          },
          ship: {
            top: 600,
            left: 500,
            width: 800,
            height: 500,
            visible: true,
            app: () => <UIWindow/>
          }
        },
        stack: [
          `terminal`,
          `ship`,
        ]
      }}
    />);
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
  canvas?.addEventListener('mouseup', function (event) {
    inputEvent(event);
  });
  canvas?.addEventListener('mouseover', function (event) {
    inputEvent(event);
  });
  canvas?.addEventListener('mousemove', function (event) {
    inputEvent(event);
  });

  const offscreen = (canvas as HTMLCanvasElement).transferControlToOffscreen()
  worker.postMessage(["canvas", offscreen], [offscreen]);
});
