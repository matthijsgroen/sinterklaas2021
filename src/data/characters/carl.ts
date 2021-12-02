import { CharacterSprites, LevelCharacter } from "../../types";

export const carl: LevelCharacter = {
  characterSprite: CharacterSprites.Carl,
  position: [11, -7, 1],
  conditions: {
    minimalCards: 1,
  },
  conditionDialog: [
    {
      characterColor: "green",
      characterName: "Carl",
      text: ["Tris! Dit slijmmonster houdt mij gevangen!"],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Ik heb niets om mee te vechten!", "Ik kom later terug."],
    },
  ],
  initialDialog: [
    {
      characterColor: "green",
      characterName: "Carl",
      text: [
        "Tris! Dit slijmmonster houdt mij gevangen!",
        "Ik heb dit nog nooit meegemaakt!",
      ],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Ik help je wel Pa!"],
    },
  ],
  fights: [{ enemies: ["slime"] }],
  rewards: {
    follower: CharacterSprites.Carl,
    xp: 25,
  },
  winDialog: [
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Zo Pap, daar heb ik korte metten mee gemaakt!"],
    },
    {
      characterColor: "green",
      characterName: "Carl",
      text: ["Jij weet van aanpakken! Ik ga ook met je mee!"],
    },
  ],
  loseDialog: [
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Oei dat ging niet helemaal lekker!"],
    },
    {
      characterColor: "green",
      characterName: "Carl",
      text: ["Gewoon nog een keertje proberen!"],
    },
  ],
};
