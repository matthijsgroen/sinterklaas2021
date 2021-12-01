import { CharacterSprites, LevelCharacter } from "../../types";

export const matthijs: LevelCharacter = {
  characterSprite: CharacterSprites.Matthijs,
  position: [8, 2, 1],
  conditions: {
    minimalCards: 2,
    encountersCompleted: [CharacterSprites.Sint],
  },
  conditionDialog: [
    {
      characterColor: "green",
      characterName: "Matthijs",
      text: ["Hee Tristan, kom je het Sinterklaas feest bij ons vieren?"],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Ja graag, maar ik moet eerst nog Sinterklaas helpen geloof ik!"],
    },
    {
      characterColor: "green",
      characterName: "Matthijs",
      text: ["Okee success! Kom je snel terug als je hem geholpen hebt?"],
    },
  ],
  initialDialog: [
    {
      characterColor: "green",
      characterName: "Matthijs",
      text: ["Hee Tristan, kom je het Sinterklaas feest bij ons vieren?"],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Zeker, ik heb hem zelfs meegenomen!"],
    },
    {
      characterColor: "green",
      characterName: "Matthijs",
      text: ["Wow wat tof, laten we snel naar binnen gaan!"],
    },
  ],
  fights: [],
  rewards: {},
  winDialog: [],
  loseDialog: [],
};
