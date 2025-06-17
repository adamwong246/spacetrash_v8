import { IState } from "./State";

export const initialState: IState = {
    stack: [
      `terminal`,
      `droneV2`,
      `shipmap`,
      `manual`,
      `drone`,
      `drones`,

      `shipmapV2`,
    ],

    terminal: {
      mapOrVideo: 'map',
      loggedIn: false,
      buffer: "login",
      history: [
        {
          "in": "",
          out: `┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                                                                                        │
│ ███████╗██████╗  █████╗  ██████╗███████╗████████╗██████╗  █████╗ ███████╗██╗  ██╗    ██╗   ██╗ █████╗  │
│ ██╔════╝██╔══██╗██╔══██╗██╔════╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║  ██║    ██║   ██║██╔══██╗ │
│ ███████╗██████╔╝███████║██║     █████╗     ██║   ██████╔╝███████║███████╗███████║    ██║   ██║╚█████╔╝ │
│ ╚════██║██╔═══╝ ██╔══██║██║     ██╔══╝     ██║   ██╔══██╗██╔══██║╚════██║██╔══██║    ╚██╗ ██╔╝██╔══██╗ │
│ ███████║██║     ██║  ██║╚██████╗███████╗   ██║   ██║  ██║██║  ██║███████║██║  ██║     ╚████╔╝ ╚█████╔╝ │
│ ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝      ╚═══╝   ╚════╝  │
│                                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
          `,
          status: "niether"
        }
      ],
    },
    windows: {
      terminal: {
        top: 0,
        left: 0,
        width: 900,
        height: 600,
        visible: true,
      },
      shipmap: {
        top: 200,
        left: 50,
        width: 900,
        height: 500,
        visible: false,
      },

      manual: {
        top: 90,
        left: 90,
        width: 129,
        height: 165,
        visible: false,
      },
      drone: {
        top: 360,
        left: 50,
        width: 280,
        height: 250,
        visible: false,
      },
      drones: {
        top: 0,
        left: 0,
        width: 100,
        height: 100,
        visible: false,
      },

      droneV2: {
        top: 300,
        left: 0,
        width: 280,
        height: 250,
        visible: false,
      },

      shipmapV2: {
        top: 0,
        left: 1000,
        width: 500,
        height: 500,
        visible: false,
      },
    }

  }
