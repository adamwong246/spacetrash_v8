import { SpaceTrash } from "./spacetrash";

document.addEventListener("DOMContentLoaded", async (event) => {
  const domNode = document.getElementById('react-root');
  if (!domNode) {
    throw `no rootHtml?! I expected an html element with id of "react-root"`;
  }
  const s = new SpaceTrash(domNode);
     window.SPACE_TRASH = s;
  
  await s.start()
});

