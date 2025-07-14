import { IProject } from "testeranto/src/Types";

const config: IProject = {
  projects: {
    spacetrash: {
      tests: [

        ["./src/demiurge/physics/SP_2d_Vector.test.ts", "pure", { ports: 0 }, []],
        // ["./src/demiurge/physics/SP_Polygon.test.ts", "pure", { ports: 0 }, []],
        ["./src/demiurge/physics/SP_MultiPolygon.test.ts", "pure", { ports: 0 }, []],
        // ["./src/demiurge/physics/SP_NavMesh.test.ts", "pure", { ports: 0 }, []],
        // ["./src/demiurge/ecs/ECS.test.ts", "pure", { ports: 0 }, []],

        ["./src/demiurge/ecs/SP_Store.test.ts", "node", { ports: 0 }, []],
        ["./src/demiurge/ecs/SP_MapStore.test.ts", "node", { ports: 0 }, []],
        
        // ["./src/spacetrash/game/7-WithLoad.test.ts", "web", { ports: 0 }, []],
        // ["./src/spacetrash/game/7-5-WithLevel.test.ts", "web", { ports: 0 }, []],
      ],

      ports: ["3001"],
      src: "src",
      debugger: false,
      minify: false,
      clearScreen: false,
      externals: [],
      importPlugins: [],
      nodePlugins: [],
      webPlugins: [],
      
      featureIngestor: async function (s: string): Promise<string> {
        return s;
      },
      
    },
  },

  reportDomain: "https://adamwong246.github.io/spacetrash_v8/"
};
export default config;