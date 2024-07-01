import * as React from 'react'
import { createRoot } from 'react-dom/client';

import ReactRoot from "./ReactRoot";

document.addEventListener("DOMContentLoaded", function (event) {
  const domNode = document.getElementById('react-root');
  if (domNode) {
    createRoot(domNode).render(<ReactRoot />);
  }

});