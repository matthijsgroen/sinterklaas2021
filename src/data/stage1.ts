import { LevelData } from "../types";

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
    {
      characterSprite: 1,
      position: [7, 6, 2],
      conditions: {
        minimalCards: 1,
      },
      conditionDialog: [
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: [
            "Help grote broer! Ik wordt door speelgoed gevangen gehouden!",
            "Kan jij deze robot verslaan?",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ik heb niets om mee te vechten!", " Ik kom later terug."],
        },
      ],
      initialDialog: [
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: [
            "Help grote broer! Ik wordt door speelgoed gevangen gehouden!",
            "Kan jij deze robot verslaan?",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Natuurlijk kan ik dat!"],
        },
      ],
      fights: [{ enemies: ["robot"] }],
      rewards: {
        follower: 1,
      },
      winDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ha! Daar heb ik mooi van gewonnen!"],
        },
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: ["Goed gedaan broer!"],
        },
      ],
      loseDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Oei dat moet ik nog maar eens proberen"],
        },
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: ["Je kan het!"],
        },
      ],
    },
    {
      characterSprite: 7,
      position: [4, -2, 1],
      conditionDialog: [],
      initialDialog: [
        {
          characterColor: "blue",
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
            "Dat gaan we doen! Ik ben tenslotte en goede Pokemon trainer!",
          ],
        },
        {
          characterColor: "blue",
          characterName: "Amerigo",
          text: ["Amerigo, go!"],
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
  exits: [],
};

export default stage1;
