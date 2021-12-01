import { LevelData } from "../types";
import { gina } from "./characters/gina";
import { sint } from "./characters/sint";

const mountain: LevelData = {
  name: "Berg",
  tiles: [
    { coord: [18, -2, 0], img: "planks", set: "fantasy" },
    { coord: [18, -1, 0], img: "planks", set: "fantasy" },
    { coord: [19, -2, 1], img: "fence", set: "fantasy", direction: "north" },
    { coord: [19, -1, 1], img: "fence", set: "fantasy", direction: "north" },
    { coord: [17, -2, 1], img: "fence", set: "fantasy", direction: "south" },
    { coord: [17, -1, 1], img: "fence", set: "fantasy", direction: "south" },
    {
      coord: [18, -2, 0],
      img: "wallWoodArchTopDetail",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [19, -1, 0],
      img: "wallWoodArchTopDetail",
      set: "fantasy",
      direction: "north",
    },
    { coord: [18, 0, 0], img: "planks", set: "fantasy" },
    { coord: [18, 1, 0], img: "planks", set: "fantasy" },

    { coord: [19, 0, 1], img: "fence", set: "fantasy", direction: "north" },
    { coord: [19, 1, 1], img: "fence", set: "fantasy", direction: "north" },
    { coord: [17, 0, 1], img: "fence", set: "fantasy", direction: "south" },
    { coord: [17, 1, 1], img: "fence", set: "fantasy", direction: "south" },
    {
      coord: [18, -2, 0],
      img: "wallWood",
      set: "fantasy",
      direction: "west",
    },
    {
      coord: [18, 0, 0],
      img: "wallWoodArchTopDetail",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [19, 1, 0],
      img: "wallWoodArchTopDetail",
      set: "fantasy",
      direction: "north",
    },
    { coord: [19, 2, 0], img: "block", set: "terrain" },
    { coord: [18, 2, 0], img: "blockDirt", set: "terrain" },
    { coord: [17, 2, 0], img: "block", set: "terrain" },
    { coord: [16, 2, 0], img: "block", set: "terrain" },
    { coord: [15, 2, 0], img: "block", set: "terrain" },

    { coord: [19, 3, 0], img: "block", set: "terrain" },
    { coord: [18, 3, 0], img: "blockDirt", set: "terrain" },
    { coord: [17, 3, 0], img: "blockDirt", set: "terrain" },
    { coord: [16, 3, 0], img: "blockDirt", set: "terrain" },
    { coord: [15, 3, 0], img: "block", set: "terrain" },

    { coord: [17, 4, 0], img: "block", set: "terrain" },
    { coord: [16, 4, 0], img: "blockDirt", set: "terrain" },
    { coord: [15, 4, 0], img: "blockDirt", set: "terrain" },

    { coord: [18, 4, 0], img: "blockLarge", set: "terrain", size: "large" },

    { coord: [17, 5, 0], img: "blockSnow", set: "terrain" },
    { coord: [16, 5, 0], img: "blockDirt", set: "terrain" },
    { coord: [15, 5, 0], img: "blockSnow", set: "terrain" },

    { coord: [19, 4, 1], img: "treePine", set: "terrain" },
    { coord: [17, 2, 1], img: "treePine", set: "terrain" },
    { coord: [14, 5, 2], img: "treePineSnow", set: "terrain" },

    {
      coord: [14, 4, 1],
      img: "blockDirtRamp",
      set: "terrain",
      direction: "east",
    },
    { coord: [14, 5, 1], img: "blockSnow", set: "terrain" },
    { coord: [14, 3, 1], img: "blockSnow", set: "terrain" },
    { coord: [14, 2, 1], img: "blockSnow", set: "terrain" },
    { coord: [14, 2, 0], img: "blockDirt", set: "terrain" },

    { coord: [13, 2, 0], img: "blockDirt", set: "terrain" },
    { coord: [12, 2, 0], img: "blockDirt", set: "terrain" },

    { coord: [12, 2, 1], img: "blockSnowLarge", set: "terrain", size: "large" },
    { coord: [12, 4, 1], img: "blockSnowLarge", set: "terrain", size: "large" },

    {
      coord: [11, 5, 2],
      img: "wallDetailCross",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [11, 3, 2],
      img: "wallDetailCross",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [11, 4, 2],
      img: "wallDoor",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [11, 3, 2],
      img: "wallDetailDiagonal",
      set: "fantasy",
      direction: "west",
    },
    {
      coord: [11, 3, 3],
      img: "wallDetailCross",
      set: "fantasy",
      direction: "west",
    },
    {
      coord: [11, 3, 3],
      img: "wallWindowGlass",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [11, 4, 3],
      img: "wallWindowGlass",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [11, 5, 3],
      img: "wallWindowGlass",
      set: "fantasy",
      direction: "south",
    },
    { coord: [12, 5, 1], img: "planks", set: "fantasy" },
    { coord: [12, 4, 1], img: "planks", set: "fantasy" },
    {
      coord: [11, 2, 2],
      img: "wallBroken",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [12, 6, 2],
      img: "wallHalf",
      set: "fantasy",
      direction: "west",
    },
    {
      coord: [13, 6, 2],
      img: "wallHalf",
      set: "fantasy",
      direction: "west",
    },
    {
      coord: [11, 3, 4],
      img: "roofHighWindow",
      set: "fantasy",
      direction: "north",
    },
    {
      coord: [11, 4, 4],
      img: "roofHigh",
      set: "fantasy",
      direction: "north",
    },
    {
      coord: [11, 5, 4],
      img: "roofHighWindow",
      set: "fantasy",
      direction: "north",
    },

    { coord: [17, 6, 0], img: "blockSnow", set: "terrain" },
    { coord: [16, 6, 0], img: "blockDirt", set: "terrain" },
    { coord: [15, 6, 0], img: "blockSnow", set: "terrain" },
    { coord: [14, 6, 1], img: "blockSnow", set: "terrain" },
    { coord: [15, 6, 1], img: "treePineSnow", set: "terrain" },

    { coord: [17, 7, 0], img: "blockSnow", set: "terrain" },
    { coord: [16, 7, 0], img: "blockDirt", set: "terrain" },
    { coord: [15, 7, 0], img: "blockSnow", set: "terrain" },
    { coord: [14, 7, 1], img: "blockSnow", set: "terrain" },

    { coord: [17, 8, 0], img: "blockSnow", set: "terrain" },
    { coord: [16, 8, 0], img: "blockDirt", set: "terrain" },
    { coord: [15, 8, 0], img: "blockDirt", set: "terrain" },
    {
      coord: [14, 8, 1],
      img: "blockSnowSlope",
      set: "terrain",
      direction: "east",
    },

    { coord: [17, 8, 1], img: "treePineSnow", set: "terrain" },
    { coord: [16, 9, 1], img: "treePineSnow", set: "terrain" },

    { coord: [17, 9, 0], img: "blockSnow", set: "terrain" },
    { coord: [16, 9, 0], img: "blockSnow", set: "terrain" },
    { coord: [15, 9, 0], img: "blockSnow", set: "terrain" },
    { coord: [14, 9, 1], img: "blockSnow", set: "terrain" },

    { coord: [13, 9, 1], img: "blockSnow", set: "terrain" },
    { coord: [13, 8, 1], img: "blockSnow", set: "terrain" },
    { coord: [13, 7, 1], img: "blockSnow", set: "terrain" },
    { coord: [13, 6, 1], img: "blockSnow", set: "terrain" },

    { coord: [12, 9, 2], img: "blockSnow", set: "terrain" },
    {
      coord: [12, 8, 2],
      img: "blockSnowSlope",
      set: "terrain",
      direction: "south",
    },
    { coord: [12, 7, 1], img: "blockSnow", set: "terrain" },
    { coord: [12, 6, 1], img: "blockSnow", set: "terrain" },

    { coord: [11, 9, 2], img: "blockSnow", set: "terrain" },
    { coord: [11, 8, 2], img: "blockSnow", set: "terrain" },
    { coord: [11, 7, 2], img: "blockSnow", set: "terrain" },
    { coord: [11, 6, 1], img: "blockSnow", set: "terrain" },

    { coord: [10, 9, 2], img: "blockSnow", set: "terrain" },
    { coord: [10, 8, 2], img: "blockSnow", set: "terrain" },
    { coord: [10, 7, 2], img: "blockSnow", set: "terrain" },
    { coord: [10, 6, 1], img: "blockSnow", set: "terrain" },

    { coord: [9, 9, 3], img: "blockSnow", set: "terrain" },
    { coord: [9, 8, 3], img: "blockSnow", set: "terrain" },
    { coord: [9, 7, 3], img: "blockSnow", set: "terrain" },

    { coord: [10, 10, 2], img: "treePineSnow", set: "terrain" },
    { coord: [12, 10, 2], img: "treePineSnow", set: "terrain" },

    { coord: [13, 10, 2], img: "blockSnow", set: "terrain" },
    {
      coord: [14, 10, 2],
      img: "blockSnowSlope",
      set: "terrain",
      direction: "south",
    },

    { coord: [15, 11, 2], img: "blockSnow", set: "terrain" },
    { coord: [15, 10, 1], img: "blockSnow", set: "terrain" },
    { coord: [16, 10, 1], img: "blockSnow", set: "terrain" },
    { coord: [17, 10, 1], img: "blockSnow", set: "terrain" },

    {
      coord: [13, 11, 2],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },

    {
      coord: [15, 12, 2],
      img: "blockSnowSlope",
      set: "terrain",
      direction: "east",
    },
    { coord: [16, 10, 2], img: "treePineSnow", set: "terrain" },
    {
      coord: [16, 11, 1],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [18, 11, 1],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    { coord: [19, 11, 2], img: "treePineSnow", set: "terrain" },
    { coord: [17, 12, 2], img: "treePineSnow", set: "terrain" },
    {
      coord: [20, 11, 1],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },

    { coord: [21, 12, 2], img: "arrow", set: "terrain", direction: "south" },
  ],
  decorations: [
    {
      coord: [12, 5, 2],
      img: "overhang",
      set: "fantasy",
      direction: "north",
    },
    {
      coord: [12, 4, 2],
      img: "overhang",
      set: "fantasy",
      direction: "north",
    },
  ],
  characters: [gina, sint],
  exits: [
    { coord: [18, -2, 1], level: "Straat", startCoord: [13, 7, 1] },
    { coord: [21, 11, 2], level: "Feest", startCoord: [10, -6, 1] },
  ],
};

export default mountain;
