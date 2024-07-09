// import osjs from '@osjs/dev-meta';

import {
  SettingsServiceProvider,
  AuthServiceProvider, Core, CoreServiceProvider, DesktopServiceProvider, NotificationServiceProvider, VFSServiceProvider,
  Packages, Desktop, Settings, Application,
  PackageMetadata,
  PackageReference, 
} from "@osjs/client";

export * from '@osjs/client';
// import osjs from 'osjs';
// console.log("osjs", osjs)
import { PanelServiceProvider } from "@osjs/panels";
import { GUIServiceProvider } from "@osjs/gui";

// import droneMData from "./metadata.json";





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

document.addEventListener("DOMContentLoaded", async function (event) {

  const droneMData = await (await fetch("metadata.json")).json();
  const metadata : any[] = [droneMData]

  console.log("osjs", metadata);

  const packages: PackageReference[] = [{
    metadata,
    callback: (x) => { debugger }
  } as any];
  const prs: PackageMetadata[] = metadata as PackageMetadata[];

  const osjsCore = new Core({
    name: "my-core",
    standalone: true,
    packages: {
      metadata,
      // packages,
      manifest: "http://localhost:8000/metadata.json"
    },
  });
  const osjsDesktop = new Desktop(osjsCore);
  const osjsSettings = new Settings(osjsCore, {});
  const osjsPackages = new Packages(osjsCore);
  // osjsPackages.packages = "asd" as any;
  // osjsPackages.metadata = "qwe" as any;  //metadata;
  
  
  osjsCore.register(CoreServiceProvider, {});
  osjsCore.register(DesktopServiceProvider, {});
  osjsCore.register(VFSServiceProvider, {});
  osjsCore.register(PanelServiceProvider, {});
  osjsCore.register(NotificationServiceProvider, {});
  osjsCore.register(SettingsServiceProvider, { before: true });
  osjsCore.register(GUIServiceProvider, {});
  // await osjsCore.start();
  
  

  
  osjsDesktop.initLocales();
  
  // await osjsPackages.init()
  
  
  

  
  
  // osjsPackages.packages = packages;
  // osjsPackages.metadata = metadata;

  
  
  osjsSettings.init();
  
  
  // await osjsCore.make('osjs/locale') as any;
  // await osjsCore.make('osjs/dnd') as any;
    
  // osjsPackages.addPackages(prs)
  // osjsPackages.register("drones", (x) => {
  //   debugger
  // })
  
  await osjsPackages.init()
  await osjsCore.make('osjs/settings') as any;
  
  // osjsDesktop.init();
  
  osjsCore.once("osjs/core:start  ", async () => { 
    await osjsCore.make('osjs/settings') as any;
  });

  osjsCore.once("osjs/core:started", async () => {
  

    

    
    


    const win = osjsCore.make('osjs/window', {
      // classList: [],
      title: 'Standalone Window Manager',
      position: {
        top: 10,
        left: 10
      },
      dimension: {
        width: 300,
        height: 300
      }
    })
      .render($content => {
        // $content.appendChild(document.createTextNode('Hello World'))
        const canvas = document.createElement('canvas');
        $content.appendChild(canvas);

        canvas?.addEventListener("wheel", (event) => {
          inputEvent(event);
        })
        canvas?.addEventListener('keydown', function (event) {
          debugger
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

    win.on('keypress', (...args) => console.log("mark4", ...args));

   
    // console.log("registering", metadata[0].name)
    // osjsPackages.register(metadata[0].name, (core, args, options, metadata) => {
    //   debugger

    //   const proc = core.make('osjs/application', { args, options, metadata });

    //   // Create your windows etc here
    //   const win = core.make('osjs/window', {
    //     // classList: [],
    //     title: 'An application',
    //     position: {
    //       top: 20,
    //       left: 20
    //     },
    //     dimension: {
    //       width: 200,
    //       height: 200
    //     }
    //   })
    //     .render($content => {
    //       $content.appendChild(document.createTextNode('Hello World'))

    //     });

    //   console.log("proc", proc)
    //   return proc;
    // });
    // const x = await osjsSettings.init()
    // const y = await osjsPackages.init()
    // debugger
    // osjsPackages.register("drones", (x) => {
    //   debugger
    // })

    // await osjsDesktop.init()
    
    // const x = await osjsSettings.init()
    // await osjsDesktop.init()
    

    
    return;
    
  });

  osjsCore.boot();

  

  
  // debugger
  // osjsPackages.register("drones", (x) => {
  //   debugger
  // })

  

  

});
