import * as React from 'react'
import { createRoot } from 'react-dom/client';

import { SpaceTrashDesktop } from './spacetrash/UI';

const worker = new Worker("./worker.js");

document.addEventListener("DOMContentLoaded", function (event) {
  const domNode = document.getElementById('react-root');
  if (domNode) {
    createRoot(domNode).render(<SpaceTrashDesktop
      worker={worker}
    />);
  }
});
