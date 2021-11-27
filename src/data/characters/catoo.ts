import { CharacterSprites, LevelCharacter } from "../../types";

export const catoo: LevelCharacter = {
  characterSprite: CharacterSprites.Catoo,
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
    follower: CharacterSprites.Catoo,
    xp: 25,
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
};
