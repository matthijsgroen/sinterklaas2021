import { CharacterSprites, LevelCharacter } from "../../types";

export const gina: LevelCharacter = {
  characterSprite: CharacterSprites.Gina,
  position: [14, 3, 2],
  conditions: {
    minimalCards: 1,
  },
  conditionDialog: [
    {
      characterColor: "red",
      characterName: "Gina",
      text: ["Help Tristan! Al dit speelgoed is ineens op hol geslagen!"],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: [
        "Dat klopt Amma! ik ben dat aan het fixen!",
        "Ik moet alleen iets hebben om mee te vechten!",
      ],
    },
  ],
  initialDialog: [
    {
      characterColor: "red",
      characterName: "Gina",
      text: ["Help Tristan! Al dit speelgoed is ineens op hol geslagen!"],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Dat klopt Amma! ik ben dat aan het fixen!"],
    },
    {
      characterColor: "red",
      characterName: "Gina",
      text: ["Help!!"],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Blijf rustig Amma! Ik knok ze wel weg!"],
    },
  ],
  fights: [
    { enemies: ["robot", "robot", "robot"] },
    { enemies: ["slime", "bear"] },
  ],
  rewards: {
    follower: CharacterSprites.Gina,
    xp: 100,
  },
  winDialog: [
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Poe, dat was wel even een gevecht..."],
    },
    {
      characterColor: "red",
      characterName: "Gina",
      text: ["Goed gedaan jongen! Ik ga met je mee!"],
    },
  ],
  loseDialog: [
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Dat was best wel lastig..."],
    },
    {
      characterColor: "red",
      characterName: "Gina",
      text: ["Als iemand dit moet kunnen dan ben jij dit!"],
    },
  ],
};
