import { CharacterSprites, LevelCharacter } from "../../types";

export const catoo: LevelCharacter = {
  characterSprite: CharacterSprites.Catoo,
  position: [10, 2, 1],
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
      text: ["Ha! Daar hebben we mooi van gewonnen Amerigo!"],
    },
    {
      characterColor: "lightblue",
      characterName: "Amerigo",
      text: [
        "Ja zeker. Maar mijn schade kwam niet volledig aan.",
        "Dit komt omdat ik een :scissors: (schoen) type ben, en deze robot is van het type :rock: (roe)",
        ":rock: (roe) is sterker tegen :scissors: (schoen), :scissors: (schoen) is sterker tegen :paper: (zak), en :paper: (zak) is weer sterker tegen :rock: (roe).",
        "Gebruik die informatie voor tactische keuzes!",
      ],
    },
    {
      characterColor: "pink",
      characterName: "Catootje",
      text: [
        "Goed gedaan broer!",
        "Ik ga met je mee! Dan gaan we de anderen redden!",
      ],
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
