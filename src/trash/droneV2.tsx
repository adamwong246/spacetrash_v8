import React, { useEffect, useRef } from "react";


// import { Application } from "pixi.js";
// import { Mesh3D, Light, LightingEnvironment } from "pixi3d";


import { IDockviewPanelProps } from "dockview";
import { IState } from "../spacetrash/UI/State";
import { SpaceTrashGameSingleton } from "../spacetrash/Game";

export const DroneAppV2 = (props: IDockviewPanelProps<IState>) => {

  // document.addEventListener('keydown', function (event) {

  //   if (event.key === 'ArrowUp' ||
  //     event.key === 'ArrowDown' ||
  //     event.key === 'ArrowLeft' ||
  //     event.key === 'ArrowRight' ||
  //     event.key === '1' ||
  //     event.key === '2' ||
  //     event.key === '3' ||
  //     event.key === '4' ||
  //     event.key === '5' ||
  //     event.key === '6' ||
  //     event.key === '7' ||
  //     event.key === '8' ||
  //     event.key === '9'
  //   ) {
  //     // props.worker.postMessage(["inputEvent", event.key, "drone"])
  //   }

  //   //   props.worker.postMessage(["inputEvent", "UP", "drone"]);
  //   // } else if (event.key === 'ArrowDown') {
  //   //   props.worker.postMessage(["inputEvent", "DOWN", "drone"]);
  //   // } else if (event.key === 'ArrowLeft') {
  //   //   props.worker.postMessage(["inputEvent", "LEFT", "drone"]);
  //   // } else if (event.key === 'ArrowRight') {
  //   //   props.worker.postMessage(["inputEvent", "RIGHT", "drone"]);
  //   // }
  // });

    // const parentRef = useRef(null);
    // const childRef = useRef(null);
  
    // useEffect(() => {
  
    //   const parentElement = parentRef.current;
  
    //   let app = new Application({
    //     backgroundColor: 0xdddddd,
    //     resizeTo: window,
    //     antialias: true
    //   });
  
    //   // Append the application canvas view to the document body.
    //   document.body.appendChild(app.view);
  
    //   // The "Mesh3D" object contains a few convenience functions which makes it
    //   // easier to create some simpler meshes used most for testing. The cube mesh is
    //   // being created and added as a child of the PixiJS application root.
    //   let mesh = app.stage.addChild(Mesh3D.createCube());
  
    //   // Create a light source and add it to the main lighting environment. Without
    //   // doing this, the rendered mesh would be completely black.
    //   let light = new Light()
    //   light.position.set(-1, 0, 3)
    //   LightingEnvironment.main.lights.push(light);
  
    //   let rotation = 0;
    //   app.ticker.add(() => {
    //     // This function will be called before each render happens. When rotating an
    //     // object in 3D, the "rotationQuaternion" is used instead of the regular
    //     // "rotation" available in PixiJS. "setEulerAngles" is called to be able to
    //     // set the rotation on all axes. In this case, only the y-axis is changed.
    //     mesh.rotationQuaternion.setEulerAngles(0, rotation++, 0);
    //   });
    //   const childElement = app.view;
    //   childElement.id = "child";
    //   childElement.classList.add("child");
    //   // childRef.current = childElement;
    //   parentElement.appendChild(childElement);
  
    //   // if (canvasRef.current) {
    //   // // const offscreen = (canvasRef.current as HTMLCanvasElement).transferControlToOffscreen()
    //   // //   props.worker.postMessage([props.app + "-register", offscreen, props.rendering], [offscreen]);
    //   // }
  // }, [parentRef]);
  
  const canvasRef = useRef(null)
      useEffect(() => {
        if (canvasRef.current) {
          // const offscreen = (canvasRef.current as HTMLCanvasElement).transferControlToOffscreen()

          const registree = canvasRef.current

          SpaceTrashGameSingleton.register("droneV2", false, registree, () => {}, "webgl2")
        }
      }, [canvasRef]);
    
  

      return (<div

        style={{
          height: "100%",
          width: "100%",
          position: "relative",
        }}
      >

        <canvas
          tabIndex={1}
          ref={canvasRef}
          ></canvas>
    
    
      </div>);
  
}