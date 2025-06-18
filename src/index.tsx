import { SpaceTrash } from "./spacetrash";

document.addEventListener("DOMContentLoaded", function (event) {
  const domNode = document.getElementById('react-root');
  if (!domNode) {
    throw `no rootHtml?! I expected an html element with id of "react-root"`;
  }
  const s = new SpaceTrash(domNode);
  // s.start()
});