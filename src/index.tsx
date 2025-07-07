import { SpaceTrash } from "./spacetrash/Game/9-WithTiled";

document.addEventListener("DOMContentLoaded", async (event) => {
  const domNode = document.getElementById('react-root');
  if (!domNode) {
    throw `no rootHtml?! I expected an html element with id of "react-root"`;
  }

  const s = new SpaceTrash(domNode);
  await s.start()
});