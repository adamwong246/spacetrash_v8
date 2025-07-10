import {
  AccessibilitySystem,
  DOMPipe,
  EventSystem,
  FederatedContainer,
  accessibilityTarget
} from "./chunk-WJBRD6KE.mjs";
import "./chunk-QJV2NNRO.mjs";
import "./chunk-HDW26HVJ.mjs";
import "./chunk-3SR7JMTM.mjs";
import {
  Container,
  extensions
} from "./chunk-2J273L3I.mjs";

// node_modules/pixi.js/lib/accessibility/init.mjs
extensions.add(AccessibilitySystem);
extensions.mixin(Container, accessibilityTarget);

// node_modules/pixi.js/lib/events/init.mjs
extensions.add(EventSystem);
extensions.mixin(Container, FederatedContainer);

// node_modules/pixi.js/lib/dom/init.mjs
extensions.add(DOMPipe);
