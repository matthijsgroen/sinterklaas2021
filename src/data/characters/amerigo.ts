import { CharacterSprites, LevelCharacter } from "../../types";

export const amerigo: LevelCharacter = {
  characterSprite: CharacterSprites.Amerigo,
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
        "We moeten ze redden. Ik zal je helpen.",
      ],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Dat gaan we doen! Ik ben tenslotte een goede Pokémon trainer!"],
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
};
