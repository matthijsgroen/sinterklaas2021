import { LevelData, TerrainTile } from "../types";
import { tinka } from "./characters/tinka";
import { carl } from "./characters/carl";
import { piet } from "./characters/piet";

const livingroom: LevelData = {
  name: "Straat",
  tiles: [
    { coord: [7, -5, 0], img: "floorFull", set: "furniture" },
    { coord: [8, -4, 0], img: "block", set: "terrain" },
    { coord: [8, -5, 0], img: "blockDirt", set: "terrain" },
    { coord: [8, -6, 0], img: "blockDirt", set: "terrain" },
    { coord: [8, -7, 0], img: "block", set: "terrain" },

    { coord: [9, -4, 0], img: "block", set: "terrain" },
    { coord: [9, -5, 0], img: "blockDirt", set: "terrain" },
    { coord: [9, -6, 0], img: "blockDirt", set: "terrain" },
    { coord: [9, -7, 0], img: "block", set: "terrain" },

    { coord: [10, -4, 0], img: "block", set: "terrain" },
    { coord: [10, -5, 0], img: "blockDirt", set: "terrain" },
    { coord: [10, -6, 0], img: "blockDirt", set: "terrain" },
    { coord: [10, -7, 0], img: "block", set: "terrain" },

    { coord: [9, -4, 0], img: "block", set: "terrain" },
    { coord: [9, -5, 0], img: "blockDirt", set: "terrain" },
    { coord: [9, -6, 0], img: "blockDirt", set: "terrain" },
    { coord: [9, -7, 0], img: "block", set: "terrain" },
    { coord: [10, -4, 1], img: "treePine", set: "terrain" },

    { coord: [8, -3, 1], img: "wallHalf", set: "fantasy", direction: "west" },
    { coord: [9, -3, 1], img: "wallHalf", set: "fantasy", direction: "west" },

    { coord: [10, -3, 1], img: "wallHalf", set: "fantasy", direction: "west" },
    { coord: [10, -7, 1], img: "treePine", set: "terrain" },
    { coord: [10, -4, 1], img: "fence", set: "fantasy", direction: "south" },
    { coord: [10, -7, 1], img: "fence", set: "fantasy", direction: "south" },

    ...Array(4)
      .fill(0)
      .map((_, i) => -7 + i)
      .reduce(
        (r, y) =>
          r.concat([
            { coord: [11, y, 0], img: "roadCurb", set: "fantasy" },
            { coord: [12, y, 0], img: "roadEdge", set: "fantasy" },
            { coord: [13, y, 0], img: "road", set: "fantasy" },
            { coord: [14, y, 0], img: "road", set: "fantasy" },
          ]),
        [] as TerrainTile[]
      ),
    ...Array(10)
      .fill(0)
      .map((_, i) => -3 + i)
      .reduce(
        (r, y) =>
          r.concat([
            {
              coord: [10, y, 0],
              img: "block",
              set: "terrain",
            },
            {
              coord: [10, y, 1],
              img: "hedge",
              set: "fantasy",
              direction: "south",
            },
            { coord: [11, y, 0], img: "roadCurb", set: "fantasy" },
            { coord: [12, y, 0], img: "roadEdge", set: "fantasy" },
            { coord: [13, y, 0], img: "road", set: "fantasy" },
            { coord: [14, y, 0], img: "road", set: "fantasy" },
            ...((y % 3 === 0
              ? [{ coord: [12, y, 1], img: "lantern", set: "fantasy" }]
              : []) as TerrainTile[]),
          ]),
        [] as TerrainTile[]
      ),
    { coord: [13, 7, 0], img: "planks", set: "fantasy" },
    { coord: [13, 8, 0], img: "planks", set: "fantasy" },
    { coord: [14, 7, 1], img: "fence", set: "fantasy", direction: "north" },
    { coord: [14, 8, 1], img: "fence", set: "fantasy", direction: "north" },
    { coord: [12, 7, 1], img: "fence", set: "fantasy", direction: "south" },
    { coord: [12, 8, 1], img: "fence", set: "fantasy", direction: "south" },
    {
      coord: [13, 7, 0],
      img: "wallWoodArchTopDetail",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [14, 8, 0],
      img: "wallWoodArchTopDetail",
      set: "fantasy",
      direction: "north",
    },
    { coord: [13, 9, 0], img: "planks", set: "fantasy" },
    { coord: [13, 10, 0], img: "planks", set: "fantasy" },
    { coord: [14, 9, 1], img: "fence", set: "fantasy", direction: "north" },
    { coord: [14, 10, 1], img: "fence", set: "fantasy", direction: "north" },
    { coord: [12, 9, 1], img: "fence", set: "fantasy", direction: "south" },
    { coord: [12, 10, 1], img: "fence", set: "fantasy", direction: "south" },
    {
      coord: [13, 9, 0],
      img: "wallWoodArchTopDetail",
      set: "fantasy",
      direction: "south",
    },
    {
      coord: [14, 10, 0],
      img: "wallWoodArchTopDetail",
      set: "fantasy",
      direction: "north",
    },
  ],
  decorations: [
    { coord: [8, -5, 1], img: "wallDoorwayRound", set: "fantasy" },
    { coord: [8, -4, 1], img: "wallWindowStone", set: "fantasy" },
    { coord: [8, -6, 1], img: "wallDoor", set: "fantasy" },
    { coord: [8, -7, 1], img: "wallWindowStone", set: "fantasy" },
    { coord: [8, -7, 2], img: "wallWindowStone", set: "fantasy" },
    { coord: [8, -6, 2], img: "wallWindowStone", set: "fantasy" },
    { coord: [8, -5, 2], img: "wallWindowStone", set: "fantasy" },
    { coord: [8, -4, 2], img: "wallWindowStone", set: "fantasy" },
    { coord: [7, -7, 3], img: "roof", set: "fantasy" },
    { coord: [7, -6, 3], img: "roof", set: "fantasy" },
    { coord: [7, -5, 3], img: "roof", set: "fantasy" },
    { coord: [7, -4, 3], img: "roof", set: "fantasy" },
    { coord: [7, -4, 3], img: "chimneyTop", set: "fantasy" },
  ],
  characters: [tinka, carl, piet],
  exits: [
    { coord: [13, 10, 1], level: "Berg", startCoord: [18, 0, 1] },
    { coord: [7, -5, 1], level: "Woonkamer", startCoord: [8, -4, 1] },
  ],
};

export default livingroom;
