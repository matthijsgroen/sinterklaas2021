import { LevelData } from "../types";
import { amerigo } from "./characters/amerigo";

const bedroom: LevelData = {
  name: "Slaapkamer",
  tiles: [
    { coord: [2, 0, 1], img: "floorFull", set: "furniture" },
    { coord: [2, 1, 1], img: "floorFull", set: "furniture" },
    { coord: [2, 2, 1], img: "floorFull", set: "furniture" },
    { coord: [3, 0, 1], img: "floorFull", set: "furniture" },
    { coord: [3, 1, 1], img: "floorFull", set: "furniture" },
    { coord: [3, 2, 1], img: "floorFull", set: "furniture" },
    { coord: [4, 0, 1], img: "floorFull", set: "furniture" },
    { coord: [4, 1, 1], img: "floorFull", set: "furniture" },
    { coord: [4, 2, 1], img: "floorFull", set: "furniture" },
    { coord: [5, 0, 1], img: "floorFull", set: "furniture" },
    { coord: [5, 1, 1], img: "floorFull", set: "furniture" },
    { coord: [5, 2, 1], img: "floorFull", set: "furniture" },
    { coord: [2, 3, 2], img: "wall", set: "furniture", direction: "west" },
    { coord: [3, 3, 2], img: "wall", set: "furniture", direction: "west" },
    { coord: [4, 3, 2], img: "wall", set: "furniture", direction: "west" },
    { coord: [5, 3, 2], img: "wall", set: "furniture", direction: "west" },
    {
      coord: [2, 1, 2],
      img: "desk",
      set: "furniture",
      direction: "east",
    },
    {
      coord: [2, 2, 2],
      img: "bedSingle",
      set: "furniture",
      direction: "east",
    },
    {
      coord: [1, 2, 2],
      img: "wall",
      set: "furniture",
      direction: "north",
    },
    {
      coord: [1, 1, 2],
      img: "wall",
      set: "furniture",
      direction: "north",
    },
    {
      coord: [1, 0, 2],
      img: "wall",
      set: "furniture",
      direction: "north",
    },
    { coord: [5, -1, 1], img: "floorFull", set: "furniture" },
    { coord: [6, -1, 1], img: "floorFull", set: "furniture" },
    { coord: [5, -2, 1], img: "floorFull", set: "furniture" },
    { coord: [6, -2, 1], img: "floorFull", set: "furniture" },
    { coord: [5, -3, 1], img: "floorFull", set: "furniture" },
    {
      coord: [6, -3, 1],
      img: "stairs",
      set: "furniture",
      direction: "east",
      size: "wide",
    },
    {
      coord: [5, 0, 1],
      img: "wallDoorway",
      set: "furniture",
      direction: "west",
    },
  ],
  decorations: [],
  characters: [amerigo],
  exits: [{ coord: [6, -3, 1.5], level: "Woonkamer", startCoord: [8, -3, 1] }],
};

export default bedroom;
