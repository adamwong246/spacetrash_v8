import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import fs from "fs"; // For file system access
import { JSDOM } from "jsdom"; // For JSDOM environment

// import npbfr from 'node-polyfill-blob-file-reader';
import { FileReader, File } from "@lyleunderwood/filereader-polyfill";

// In a non-browser environment, you need to emulate the browser environment
// using JSDOM and other polyfills
global.window = global;
global.document = new JSDOM().window.document;
global.Blob = Blob; //require('blob-polyfill').Blob;
global.FileReader = FileReader; //npbfr.FileReader;  //require('blob-polyfill').FileReader;

// Create the scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x222222);

// Main industrial base with frame
const baseGeometry = new THREE.BoxGeometry(2.2, 0.1, 3.2);
const baseMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x222222,
    metalness: 0.9,
    roughness: 0.7
});
const base = new THREE.Mesh(baseGeometry, baseMaterial);
scene.add(base);

// Platform
const platformGeometry = new THREE.BoxGeometry(2, 0.05, 3);
const platformMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x444444,
    metalness: 0.7,
    roughness: 0.5
});
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.position.y = 0.075;
scene.add(platform);

// Support beams
const beamGeometry = new THREE.BoxGeometry(0.1, 0.4, 0.1);
const beamMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x555555,
    metalness: 0.8
});

// Add 4 support beams
const positions = [
    [-1, -0.2, -1.5], [1, -0.2, -1.5],
    [-1, -0.2, 1.5], [1, -0.2, 1.5]
];
positions.forEach(pos => {
    const beam = new THREE.Mesh(beamGeometry, beamMaterial);
    beam.position.set(pos[0], pos[1], pos[2]);
    scene.add(beam);
});

// Detailed conveyor belt system
const conveyorGeometry = new THREE.BoxGeometry(1.8, 0.05, 2.8);
const conveyorMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x777777,
    metalness: 0.6,
    roughness: 0.4
});
const conveyor = new THREE.Mesh(conveyorGeometry, conveyorMaterial);
conveyor.position.y = 0.3;
scene.add(conveyor);

// Conveyor belt segments
const segmentGeometry = new THREE.BoxGeometry(1.8, 0.02, 0.2);
const segmentMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x999999,
    metalness: 0.3,
    roughness: 0.7
});

// Add multiple belt segments
for (let z = -1.3; z <= 1.3; z += 0.22) {
    const segment = new THREE.Mesh(segmentGeometry, segmentMaterial);
    segment.position.set(0, 0.33, z);
    scene.add(segment);
}

// Conveyor belt rollers
const rollerGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.8);
const rollerMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x888888,
    metalness: 0.7
});
const roller1 = new THREE.Mesh(rollerGeometry, rollerMaterial);
roller1.position.set(0, 0.35, 1.3);
roller1.rotation.z = Math.PI/2;
scene.add(roller1);

const roller2 = new THREE.Mesh(rollerGeometry, rollerMaterial);
roller2.position.set(0, 0.35, -1.3);
roller2.rotation.z = Math.PI/2;
scene.add(roller2);

// Robotic arms with joints
const armGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1);
const armMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xaaaaaa,
    metalness: 0.9
});

const arm1 = new THREE.Mesh(armGeometry, armMaterial);
arm1.position.set(-0.5, 1, 0);
arm1.rotation.z = Math.PI/4;
scene.add(arm1);

const arm2 = new THREE.Mesh(armGeometry, armMaterial);
arm2.position.set(0.5, 1, 0);
arm2.rotation.z = -Math.PI/4;
scene.add(arm2);

// Arm joints
const jointGeometry = new THREE.SphereGeometry(0.08);
const jointMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xcccccc,
    metalness: 0.9
});

const joint1 = new THREE.Mesh(jointGeometry, jointMaterial);
joint1.position.set(-0.5, 1.5, 0);
scene.add(joint1);

const joint2 = new THREE.Mesh(jointGeometry, jointMaterial);
joint2.position.set(0.5, 1.5, 0);
scene.add(joint2);

// Robot being assembled (more detailed)
const robotBody = new THREE.BoxGeometry(0.3, 0.5, 0.3);
const robotHead = new THREE.SphereGeometry(0.15);
const robotMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x00aaff,
    metalness: 0.7
});

const body = new THREE.Mesh(robotBody, robotMaterial);
body.position.set(0, 0.6, 0);
scene.add(body);

const head = new THREE.Mesh(robotHead, robotMaterial);
head.position.set(0, 0.85, 0);
scene.add(head);

// Control panel
const panelGeometry = new THREE.BoxGeometry(0.4, 0.2, 0.1);
const panelMaterial = new THREE.MeshStandardMaterial({ 
    color: 0x111111,
    emissive: 0x00aaff,
    emissiveIntensity: 0.3
});
const panel = new THREE.Mesh(panelGeometry, panelMaterial);
panel.position.set(0.7, 0.6, 1.2);
scene.add(panel);

// Add lights
const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

// Instantiate the exporter
const exporter = new GLTFExporter();

// Options for the exporter (e.g., binary format)
const options = {
  binary: false, // Set to true for GLB format
  // other options like:
  // trs: false,
  // onlyVisible: false,
  // truncateDrawRange: true,
  // forcePowerOfTwoTextures: false,
  // maxTextureSize: Infinity
};

// Export the scene or object
exporter.parse(
  scene,
  function (gltf) {
    // gltf is the generated GLTF data (JSON or ArrayBuffer).

    if (options.binary) {
      // Save as .glb
      fs.writeFile(
        "./src/spacetrash/Assets/spawner.glb",
        Buffer.from(gltf),
        (err) => {
          if (err) {
            console.error("Error saving GLB file:", err);
          } else {
            console.log("GLB file saved successfully!");
          }
        }
      );
    } else {
      // Save as .gltf (JSON)
      const output = JSON.stringify(gltf, null, 2); // Pretty print JSON
      fs.writeFile("./src/spacetrash/Assets/spawner.gltf", output, (err) => {
        if (err) {
          console.error("Error saving GLTF file:", err);
        } else {
          console.log("GLTF file saved successfully!");
        }
      });
    }
  },
  function (error) {
    console.error("Error exporting GLTF:", error);
  },
  options
);
