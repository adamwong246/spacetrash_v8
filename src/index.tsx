import * as React from 'react'
import { createRoot } from 'react-dom/client';

// import 'dockview/dist/styles/dockview.css';

import { SpaceTrashDesktop } from './spacetrash/UI';

document.addEventListener("DOMContentLoaded", function (event) {
  const domNode = document.getElementById('react-root');
  if (domNode) {
    createRoot(domNode).render(<SpaceTrashDesktop />);
  }
});

