import { CharacterSprites, LevelCharacter } from "../../types";

export const tinka: LevelCharacter = {
  characterSprite: CharacterSprites.Tinka,
  position: [11, -4, 1],
  conditions: {
    minimalCards: 1,
  },
  conditionDialog: [
    {
      characterColor: "red",
      characterName: "Tinka",
      text: ["Help Tristan! Deze beer houdt mij in zijn greep!"],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Mam ik wil je helpen, maar ik heb nu niets om mee te vechten!"],
    },
  ],
  initialDialog: [
    {
      characterColor: "red",
      characterName: "Tinka",
      text: ["Help Tristan! Deze beer houdt mij in zijn greep!"],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Ik help je mam. Blijf maar rustig, geen paniek."],
    },
    {
      characterColor: "red",
      characterName: "Tinka",
      text: ["Iiieee!!! Ik vindt het eng!!"],
    },
  ],
  fights: [{ enemies: ["bear"] }],
  rewards: {
    follower: CharacterSprites.Tinka,
    xp: 25,
  },
  winDialog: [
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Zie je mam, geen probleem!"],
    },
    {
      characterColor: "pink",
      characterName: "Tinka",
      text: [
        "Tristan, je bent geweldig!",
        "Ik ga met je mee, dan kunnen we anderen helpen.",
      ],
    },
  ],
  loseDialog: [
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Hmm dat moet ik nog maar eens oefenen!"],
    },
    {
      characterColor: "pink",
      characterName: "Tinka",
      text: ["Kom snel terug!!"],
    },
  ],
};
