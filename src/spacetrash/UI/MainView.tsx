import { Application, Container, Sprite } from 'pixi.js';
import React, { useEffect, useRef } from "react";
// import * as PIXI from 'pixi.js'

import { Assets } from '@pixi/assets'

import { BatchPluginFactory } from "@pixi/core";
import { extensions, ExtensionType } from "@pixi/extensions";

// const BatchRenderer = BatchPluginFactory.create();
// extensions.add({
//   name: 'batch',
//   ref: BatchRenderer,
//   type: ExtensionType.RendererPlugin,
// });

// import { UICanvas } from "../../engine/UI/UICanvas";

// const p = new Promise(async (res, rej) => {
//   // const app = new Application();
//   // // Initialize the application
//   // await app.init({ background: '#1099bb', resizeTo: window });

//   // Append the application canvas to the document body
//   // document.body.appendChild(app.canvas);

//   const app = new Application({
//     width: 300,
//     height: 300,
//     antialias: true, // 抗锯齿，圆滑边界
//     resolution: 1,
//     // backgroundColor: "0x1d9ce0" // 需要十六进制
//   });

//   // document.body.appendChild(app.view);

//   // Load an image (replace with your asset)
//   Assets.load('https://pixijs.com/assets/bunny.png').then(texture => {
//     // Create a sprite
//     const bunny = new Sprite(texture);

//     // Set the sprite's anchor point to its center
//     bunny.anchor.set(0.5);

//     // Set the sprite's position
//     bunny.x = app.screen.width / 2;
//     bunny.y = app.screen.height / 2;

//     // Add the sprite to the stage
//     app.stage.addChild(bunny);

//     // Animate the sprite
//     app.ticker.add((delta) => {
//       bunny.rotation += 0.01 * delta;
//     });
//   });




//   // // Create and add a container to the stage
//   // const container = new Container();

//   // app.stage.addChild(container);

//   // // Load the bunny texture
//   // const texture = await Assets.load('https://pixijs.com/assets/bunny.png');

//   // // Create a 5x5 grid of bunnies in the container
//   // for (let i = 0; i < 25; i++) {
//   //   const bunny = new Sprite(texture);

//   //   bunny.x = (i % 5) * 40;
//   //   bunny.y = Math.floor(i / 5) * 40;
//   //   container.addChild(bunny);
//   // }

//   // // Move the container to the center
//   // container.x = app.screen.width / 2;
//   // container.y = app.screen.height / 2;

//   // // Center the bunny sprites in local container coordinates
//   // container.pivot.x = container.width / 2;
//   // container.pivot.y = container.height / 2;

//   // // Listen for animate update
//   // app.ticker.add((time) => {
//   //   // Continuously rotate the container!
//   //   // * use delta to create frame-independent transform *
//   //   container.rotation -= 0.01 * time.deltaTime;
//   // });
//   // document.body.appendChild(app.view);
//   // app.start()
//   // app.render();
// })




export const MainView = (props: {
  // worker: Worker
}) => {

  const parentRef = useRef(null);
  const childRef = useRef(null);

  useEffect(() => {
      
    const parentElement = parentRef.current;
    const app = new Application({
      width: 300,
      height: 300,
      antialias: true, // 抗锯齿，圆滑边界
      resolution: 1,
      // backgroundColor: "0x1d9ce0" // 需要十六进制
    });
  
    // document.body.appendChild(app.view);
  
    // Load an image (replace with your asset)
    Assets.load('https://pixijs.com/assets/bunny.png').then(texture => {
      // Create a sprite
      const bunny = new Sprite(texture);
  
      // Set the sprite's anchor point to its center
      bunny.anchor.set(0.5);
  
      // Set the sprite's position
      bunny.x = app.screen.width / 2;
      bunny.y = app.screen.height / 2;
  
      // Add the sprite to the stage
      app.stage.addChild(bunny);
  
      // Animate the sprite
      app.ticker.add((delta) => {
        bunny.rotation += 0.01 * delta;
      });
    });

    const childElement = app.view;
    childElement.id = "child";
    childElement.classList.add("child");
    childRef.current = childElement;
    parentElement.appendChild(childElement);

      // if (canvasRef.current) {
      // // const offscreen = (canvasRef.current as HTMLCanvasElement).transferControlToOffscreen()
      // //   props.worker.postMessage([props.app + "-register", offscreen, props.rendering], [offscreen]);
      // }
    }, [parentRef]);
  
  return (<div

  >
    <pre>MainView</pre>

    <div className="parent" ref={parentRef}>
        {/* <canvas className="child" id="child" ref={childRef}></canvas> */}
    </div>
    
    {/* <canvas
      tabIndex={1}
      // onKeyUp={(e) => {
      //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
      // }}
      // onKeyDown={(e) => {
      //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
      // }}
      // onMouseDown={(e) => {
      //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
      // }}
      // onMouseUp={(e) => {
      //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
      // }}
      // onMouseOver={(e) => {
      //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
      // }}
      // onMouseMove={(e) => {
      //   props.worker.postMessage(["inputEvent", stringifyEvent(e), props.app]);
      // }}
      ref={canvasRef}
      width="800"
      height="600"></canvas> */}

  </div>);
}