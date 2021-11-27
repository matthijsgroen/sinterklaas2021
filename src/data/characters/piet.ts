import { CharacterSprites, LevelCharacter } from "../../types";

export const piet: LevelCharacter = {
  characterSprite: CharacterSprites.Piet,
  position: [7, 1, 1],
  conditions: {
    minimalCards: 1,
  },
  conditionDialog: [
    {
      characterColor: "navyblue",
      characterName: "Piet",
      text: ["Hey Tristan! Ons speelgoed is tot leven gekomen!"],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Ik heb niets om mee te vechten!", " Ik kom later terug."],
    },
  ],
  initialDialog: [
    {
      characterColor: "navyblue",
      characterName: "Piet",
      text: [
        "Hey Tristan! Ons speelgoed is tot leven gekomen!",
        "Zou jij mij kunnen helpen? Ik heb dan een tof cadeau voor jou!",
      ],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Ik ben benieuwd! Maar eerst jou helpen!"],
    },
  ],
  fights: [{ enemies: ["robot", "bear"] }],
  rewards: {
    follower: CharacterSprites.Piet,
    card: "ozosnel",
  },
  winDialog: [
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Kijk Piet, zo doe je dat!"],
    },
    {
      characterColor: "navyblue",
      characterName: "Piet",
      text: [
        "Wow, jij bent wel echt een goede Pokémon vechter!",
        "Ik heb echt een perfect cadeau voor jou!",
        "Kijk, hier een mooie Pokébal met Ozosnel!",
      ],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Wauw super vet!"],
    },
  ],
  loseDialog: [
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Oei dat moet ik nog maar eens proberen"],
    },
    {
      characterColor: "navyblue",
      characterName: "Piet",
      text: ["Je kan het, dat weet ik zeker!"],
    },
  ],
};
