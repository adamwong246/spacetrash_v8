import { assert } from "chai";
import  Testeranto from "testeranto/src/Node";
import { SP_2d_Vector } from "./SP_2d_Vector";
import { SP_Polygon } from "./SP_Polygon";
import { SP_NavMesh } from "./SP_NavMesh";
import { IPM } from "testeranto/src/lib/types";
import {
  Ibdd_in,
  Ibdd_out,
  ITestImplementation,
  ITestSpecification,
} from "testeranto/src/Types";

type I = Ibdd_in<
  null,
  null,
  SP_NavMesh,
  SP_NavMesh,
  SP_NavMesh,
  (...x: unknown[]) => (p: SP_NavMesh, utils: IPM) => Promise<SP_NavMesh>,
  (p: SP_NavMesh, utils: IPM) => Promise<SP_NavMesh>
>;

type O = Ibdd_out<
  { Default: ["NavMesh Tests"] },
  {
    FromPolygons: [SP_Polygon[]];
    Empty: [];
  },
  {
    addObstacle: [SP_Polygon];
    findPath: [SP_2d_Vector, SP_2d_Vector];
    subtractSpace: [SP_Polygon];
  },
  {
    pathExists: [boolean];
    pathLength: [number];
    waypointCount: [number];
  },
  { Default: [] }
>;

export const imp: ITestImplementation<I, O> = {
  suites: {
    Default: "NavMesh Tests",
  },

  givens: {
    Empty: () => new SP_NavMesh(100, 100),
    FromPolygons: (polygons) => {
      const navmesh = new SP_NavMesh(100, 100);
      polygons.forEach(poly => navmesh.subtractSpace(poly));
      return navmesh;
    },
  },

  whens: {
    addObstacle: (polygon) => async (navmesh) => {
      navmesh.subtractSpace(polygon);
      return navmesh;
    },
    findPath: (start, end) => async (navmesh, _tr, _utils) => {
      navmesh.findPath(start, end);
      return navmesh;
    },
    subtractSpace: (polygon) => async (navmesh, _tr, _utils) => {
      navmesh.subtractSpace(polygon);
      return navmesh;
    },
  },

  thens: {
    pathExists: (expected) => (navmesh, _utils) => {
      assert.equal(navmesh.hasPath(), expected);
      return navmesh;
    },
    pathLength: (expected) => (navmesh, _utils) => {
      assert.closeTo(navmesh.getPathLength(), expected, 0.001);
      return navmesh;
    },
    waypointCount: (expected) => (navmesh, _utils) => {
      assert.equal(navmesh.getWaypoints().length, expected);
      return navmesh;
    },
  },

  checks: {
    Default: () => new SP_NavMesh(),
  },
};

const interf = {
  beforeAll: async () => {},
  beforeEach: async (subject, i, tr, iv: unknown[]) => {
    return i(...(iv || []));
  },
  andWhen: async function (s, whenCB, tr, utils) {
    return whenCB(s, utils) as Promise<SP_NavMesh>;
  },
  butThen: async (s, t, tr, pm) => {
    return t(s, pm);
  },
};

export const spec: ITestSpecification<I, O> = (Suite, Given, When, Then, _Check) => [
  Suite.Default("NavMesh pathfinding tests", {
    test0: Given.Empty(
      ["Empty navmesh should find direct path"],
      [When.findPath(new SP_2d_Vector(0, 0), new SP_2d_Vector(10, 10))],
      [
        Then.pathExists(true),
        Then.pathLength(14.142), // ~sqrt(200)
        Then.waypointCount(2), // start and end
      ]
    ),

    test1: Given.FromPolygons(
      ["Path around simple obstacle"],
      [
        When.addObstacle(
          new SP_Polygon(
            new SP_2d_Vector(5, 5),
            [
              new SP_2d_Vector(-2, -2),
              new SP_2d_Vector(2, -2),
              new SP_2d_Vector(2, 2),
              new SP_2d_Vector(-2, 2)
            ]
          )
        ),
        When.findPath(new SP_2d_Vector(0, 0), new SP_2d_Vector(10, 10))
      ],
      [
        Then.pathExists(true),
        Then.waypointCount(4), // start, 2 waypoints around obstacle, end
      ],
      [] // No initial polygons
    ),

    test2: Given.Empty(
      ["Path around subtracted space"],
      [
        When.subtractSpace(
          new SP_Polygon(
            new SP_2d_Vector(5, 5),
            [
              new SP_2d_Vector(-2, -2),
              new SP_2d_Vector(2, -2),
              new SP_2d_Vector(2, 2),
              new SP_2d_Vector(-2, 2)
            ]
          )
        ),
        When.findPath(new SP_2d_Vector(0, 0), new SP_2d_Vector(10, 10))
      ],
      [
        Then.pathExists(true),
        Then.waypointCount(4), // start, 2 waypoints around subtracted area, end
      ]
    ),
  }),
];

export default Testeranto<I, O>(null as unknown as I['input'], spec, imp, interf);
