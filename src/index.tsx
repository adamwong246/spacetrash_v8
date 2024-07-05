const ecs = new Worker("./worker.js");

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
  ecs.postMessage(["inputEvent", stringifyEvent(e)]);
}

document.addEventListener("DOMContentLoaded", function (event) {
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
  ecs.postMessage(["canvas", offscreen], [offscreen]);

});
