import { CharacterSprites, LevelCharacter } from "../../types";

export const sint: LevelCharacter = {
  characterSprite: CharacterSprites.Sint,
  position: [10, 9, 3],
  conditions: {
    minimalCards: 2,
  },
  conditionDialog: [
    {
      characterColor: "yellow",
      characterName: "Sinterklaas",
      text: [
        "Hoi Tristan, begrijp ik goed dat jij me van dit...",
        "...probleempje kan verlossen?",
        "Normaal ben ik juist blij met speelgoed, maar dit loopt een beetje uit de hand...",
      ],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Ik kom terug zodra ik beter kan vechten!"],
    },
  ],
  initialDialog: [
    {
      characterColor: "yellow",
      characterName: "Sinterklaas",
      text: [
        "Hoi Tristan, begrijp ik goed dat jij me van dit...",
        "...probleempje kan verlossen?",
        "Normaal ben ik juist blij met speelgoed, maar dit loopt een beetje uit de hand...",
      ],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: [
        "Ik ben de beste Pokémon trainer van het land Sinterklaas!",
        "Hier ben ik weer hoor!",
        "Bereid je maar voor!",
        "OP EEN EPISCH GEVECHT!!",
      ],
    },
  ],
  fights: [
    { enemies: ["robot", "slime"] },
    { enemies: ["bear", "bear", "slime"] },
    { enemies: ["robot", "robot", "bear"] },
  ],
  rewards: {
    follower: CharacterSprites.Sint,
  },
  winDialog: [
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Ha! Daar heb ik mooi van gewonnen!"],
    },
    {
      characterColor: "yellow",
      characterName: "Sinterklaas",
      text: [
        "Fantastisch gedaan jongen! Dat was...",
        "GEWELDIG!",
        "(en geweldadig)",
        "Trouwens, wat heb je precies met mijn paarden gedaan?",
        "Ze zien er zo... Blits uit...",
      ],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Ik heb ze even ge-evolueerd Sinterklaas."],
    },
    {
      characterColor: "yellow",
      characterName: "Sinterklaas",
      text: [
        "Nou, euhm, goed dan... laten we nu fijn mijn verjaardag gaan vieren!",
        "Zullen we naar dat gezellige huisje bovenaan de berg gaan?",
        "Volgens mij liggen daar alle pakjes...",
      ],
    },
  ],
  loseDialog: [
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Jikes! Dat was echt moeilijk!"],
    },
    {
      characterColor: "yellow",
      characterName: "Sinterklaas",
      text: [
        "Ik lees hier net wat tips in mijn grote boek.",
        "Let op dat Zak :paper: altijd sterker is tegen Roe :rock:",
        "en Roe :rock: sterker is tegen Schoen :scissors:",
        "en Schoen :scissors: sterker is tegen Zak :paper:.",
        "Oja. En wees zuinig met waar je je energie aan uitgeeft!",
        "Ik kwam er net achter dat de beren pas gaan genezen onder 15 punten.",
        "Dus misschien net daarboven een grote aanval plannen?",
      ],
    },
    {
      characterColor: "orange",
      characterName: "Tristan",
      text: ["Dat zijn goede tips Sinterklaas, bedankt!"],
    },
  ],
};
