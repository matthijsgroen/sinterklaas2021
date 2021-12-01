import { LevelData } from "../types";
import { matthijs } from "./characters/matthijs";

const finish: LevelData = {
  name: "Feest",
  tiles: [
    {
      coord: [10, -6, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [8, -6, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    { coord: [8, -6, 1], img: "treePineSnow", set: "terrain" },
    { coord: [10, -5, 1], img: "arrow", set: "terrain", direction: "south" },
    {
      coord: [12, -6, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [10, -4, 1],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [12, -4, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [10, -2, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [12, -2, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [10, 0, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [12, 0, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [8, 0, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [8, -2, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [8, 2, 0],
      img: "blockDirt",
      set: "terrain",
    },
    {
      coord: [9, 2, 0],
      img: "blockDirt",
      set: "terrain",
    },
    {
      coord: [8, 3, 0],
      img: "blockDirt",
      set: "terrain",
    },
    {
      coord: [6, 2, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [10, 2, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [6, 0, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [6, -2, 0],
      img: "blockSnowLarge",
      set: "terrain",
      size: "large",
    },
    {
      coord: [10, -2, 1],
      img: "treePineSnow",
      set: "terrain",
    },
    {
      coord: [9, -2, 1],
      img: "treePineSnow",
      set: "terrain",
    },
    {
      coord: [8, -2, 1],
      img: "treePineSnow",
      set: "terrain",
    },
    {
      coord: [8, -3, 0],
      img: "treePineSnow",
      set: "terrain",
    },
    {
      coord: [9, 3, 1],
      img: "wallWindowGlass",
      set: "fantasy",
      direction: "west",
    },
    {
      coord: [9, 3, 2],
      img: "wallWindowGlass",
      set: "fantasy",
      direction: "west",
    },
    {
      coord: [8, 3, 2],
      img: "wallWindowRound",
      set: "fantasy",
      direction: "west",
    },
    {
      coord: [9, 3, 2],
      img: "wall",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [8, 3, 1],
      img: "wall",
      set: "fantasy",
      direction: "north",
    },
    {
      coord: [9, 3, 1],
      img: "wall",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [8, 3, 1],
      img: "wallDoorwaySquare",
      set: "fantasy",
      direction: "west",
    },
    {
      coord: [8, 3, 3],
      img: "roofLeft",
      set: "fantasy",
      direction: "east",
    },
    {
      coord: [9, 3, 3],
      img: "roofRight",
      set: "fantasy",
      direction: "east",
    },
    {
      coord: [10, 4, 1],
      img: "wallWoodDoor",
      set: "fantasy",
      direction: "west",
    },
    { coord: [7, 3, 1], img: "treePineSnow", set: "terrain" },
    { coord: [6, 2, 1], img: "treePineSnow", set: "terrain" },
    { coord: [6, 1, 1], img: "treePineSnow", set: "terrain" },
  ],
  decorations: [],
  characters: [matthijs],
  exits: [{ coord: [9, -5, 1], level: "Berg", startCoord: [20, 12, 2] }],
};

export default finish;
