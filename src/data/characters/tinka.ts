import { CharacterSprites, LevelCharacter } from "../../types";

export const tinka: LevelCharacter = {
  characterSprite: CharacterSprites.Tinka,
  position: [4, -2, 1],
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
      text: ["Tristan, je bent geweldig!"],
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