import { LevelData } from "../types";

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
    },
    {
      coord: [5, 0, 1],
      img: "wallDoorway",
      set: "furniture",
      direction: "west",
    },
  ],
  decorations: [],
  characters: [
    {
      characterSprite: 7,
      position: [4, 2, 2],
      conditionDialog: [],
      initialDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Whaa er staat een paard in mijn kamer!"],
        },
        {
          characterColor: "lightblue",
          characterName: "Amerigo",
          text: [
            "Tristan help!",
            "Al het speelgoed van Sinterklaas is tot leven gekomen!",
            "En nu houden ze de Sint, Hoofdpiet en jouw familie gevangen!",
            "We moeten ze redden",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: [
            "Dat gaan we doen! Ik ben tenslotte een goede Pokémon trainer!",
          ],
        },
        {
          characterColor: "lightblue",
          characterName: "Amerigo",
          text: ["Amerigo, go!"],
        },
        {
          characterColor: "lightblue",
          characterName: "Amerigo",
          text: ["**Poef**"],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Wow! Amerigo is nu in mijn Pokébal gegaan!"],
        },
      ],
      fights: [],
      rewards: {
        card: "amerigo",
      },
      winDialog: [],
      loseDialog: [],
    },
  ],
  exits: [{ coord: [6, -3, 1.5], level: "Stage1", startCoord: [2, 2, 2] }],
};

export default bedroom;
