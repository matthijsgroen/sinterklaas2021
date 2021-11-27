import { LevelData } from "../types";
import { amerigo } from "./characters/amerigo";
import { carl } from "./characters/carl";
import { catoo } from "./characters/catoo";
import { gina } from "./characters/gina";
import { piet } from "./characters/piet";
import { sint } from "./characters/sint";
import { tinka } from "./characters/tinka";

const stage1: LevelData = {
  name: "Stage1",
  tiles: [
    { coord: [1, 1, 1], img: "block", set: "terrain" },
    { coord: [1, 1, 0], img: "blockDirt", set: "terrain" },
    { coord: [2, 1, 0], img: "blockDirt", set: "terrain" },
    { coord: [3, 1, 0], img: "blockDirt", set: "terrain" },
    { coord: [2, 1, 1], img: "block", set: "terrain" },
    {
      coord: [3, 1, 1],
      img: "blockCornerSmall",
      set: "terrain",
      direction: "east",
    },
    { coord: [1, 2, 1], img: "block", set: "terrain" },
    { coord: [3, 3, 1], img: "block", set: "terrain" },
    { coord: [2, 2, 1], img: "blockDirt", set: "terrain" },
    { coord: [3, 2, 1], img: "blockDirt", set: "terrain" },
    { coord: [4, 1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [4, 3, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [6, 3, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [6, 5, 1], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [6, 1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [6, -1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [4, -1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [4, -3, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [6, -3, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [8, -3, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [8, -1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [8, 1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [10, 1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [10, -1, 0], img: "blockLarge", set: "terrain", size: "large" },
    {
      coord: [4, 2, 1],
      img: "blockDirtRamp",
      set: "terrain",
      direction: "east",
    },
    {
      coord: [6, 4, 1],
      img: "blockDirtRamp",
      set: "terrain",
      direction: "south",
    },
    { coord: [5, -1, 1], img: "block", set: "terrain" },
    { coord: [6, -1, 1], img: "treePine", set: "terrain" },
  ],
  decorations: [{ coord: [6, 1, 1], img: "plant", set: "terrain" }],
  characters: [
    { ...amerigo, position: [1, 1, 2] },
    { ...catoo, position: [7, 6, 2] },
    { ...tinka, position: [4, -2, 1] },
    { ...carl, position: [7, -1, 1] },
    { ...piet, position: [7, 1, 1] },
    { ...gina, position: [9, 0, 1] },
    { ...sint, position: [9, -3, 1] },
  ],
  exits: [],
};

export default stage1;
