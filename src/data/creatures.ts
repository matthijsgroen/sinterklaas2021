import { ImageDefinition, prepareAnimation } from "geppetto-player";
import { CreatureCard, CreatureCardId, Dialog } from "../types";
import amerigoTexture from "./geppetto/combat_characters.png";
import amerigoAnimation from "./geppetto/amerigo.json";
import ozosnelAnimation from "./geppetto/ozosnel.json";
import ozoveelsnellerAnimation from "./geppetto/ozoveelsneller.json";
import ameerigogoAnimation from "./geppetto/ameerigogo.json";
import robotAnimation from "./geppetto/robot.json";
import bearAnimation from "./geppetto/beer.json";

const loadTexture = async (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    image.onload = () => resolve(image);
  });

export const genericCombatTexture = loadTexture(amerigoTexture);

const amerigo: CreatureCard = {
  id: "amerigo",
  name: "Amerigo",
  level: 1,
  xpResult: 75,
  type: "shoe",
  initiative: 4,

  health: 60,
  energy: 4,

  texture: genericCombatTexture,
  animation: prepareAnimation(amerigoAnimation as unknown as ImageDefinition),

  actions: [
    {
      name: "Kopstoot",
      animationTrack: { track: "headbutt", target: "self" },
      damage: 5,
      cost: 0,
      cooldown: 0,
      targets: ["enemy"],
    },
    {
      name: "Hoeftrap",
      animationTrack: { track: "kick", target: "self" },
      damage: 15,
      cost: 2,
      cooldown: 1,
      targets: ["enemy"],
    },
    {
      name: "Eet wortel",
      damage: -40,
      cost: 2,
      cooldown: 2,
      targets: ["self"],
    },
  ],
};

const ameerigogo: CreatureCard = {
  id: "ameerigogo",
  name: "Ameerigogo",
  level: 2,
  xpResult: 0,
  type: "shoe",
  initiative: 4,

  health: 80,
  energy: 8,

  texture: genericCombatTexture,
  animation: prepareAnimation(
    ameerigogoAnimation as unknown as ImageDefinition
  ),

  actions: [
    {
      name: "Kopstoot",
      animationTrack: { track: "headbutt", target: "self" },
      damage: 10,
      cost: 0,
      cooldown: 0,
      targets: ["enemy"],
    },
    {
      name: "Hoeftrap",
      animationTrack: { track: "kick", target: "self" },
      damage: 24,
      cost: 2,
      cooldown: 1,
      targets: ["enemy"],
    },
    {
      name: "Eet wortel",
      damage: -60,
      cost: 2,
      cooldown: 2,
      targets: ["friendly"],
    },
    {
      name: "Wortelfeest",
      animationTrack: { track: "massHeal", target: "environment" },

      damage: -40,
      cost: 4,
      cooldown: 4,
      targets: ["allFriendlies"],
    },
  ],
};

const ozosnel: CreatureCard = {
  id: "ozosnel",
  name: "Ozosnel",
  level: 1,
  xpResult: 100,
  type: "rod",
  initiative: 2,

  health: 50,
  energy: 4,

  texture: genericCombatTexture,
  animation: prepareAnimation(ozosnelAnimation as unknown as ImageDefinition),

  actions: [
    {
      name: "Hoefzoef",
      animationTrack: { track: "kick", target: "self" },
      damage: 6,
      cost: 0,
      cooldown: 0,
      targets: ["enemy"],
    },
    {
      name: "Stormloop",
      animationTrack: { target: "self", track: "zoef" },
      damage: 10,
      cost: 2,
      cooldown: 4,
      targets: ["allEnemies"],
    },
  ],
};

const ozoveelsneller: CreatureCard = {
  id: "ozoveelsneller",
  name: "Ozoveelsneller",
  level: 2,
  xpResult: 0,
  type: "rod",
  initiative: 2,

  health: 70,
  energy: 12,

  texture: genericCombatTexture,
  animation: prepareAnimation(
    ozoveelsnellerAnimation as unknown as ImageDefinition
  ),

  actions: [
    {
      name: "Hoefzoef",
      animationTrack: { track: "kick", target: "self" },
      damage: 6,
      cost: 0,
      cooldown: 0,
      targets: ["enemy"],
    },
    {
      name: "Zoefstomp",
      animationTrack: { track: "stomp", target: "self" },
      damage: 2,
      damageType: "stun",
      cost: 3,
      cooldown: 1,
      targets: ["enemy"],
    },
    {
      name: "Pepernoten storm",
      animationTrack: { track: "massAttack", target: "environment" },
      damage: 20,
      cost: 3,
      cooldown: 4,
      targets: ["allEnemies"],
    },
  ],
};

const robot: CreatureCard = {
  id: "robot",
  name: "Robot",
  level: 1,
  xpResult: 0,
  type: "rod",
  initiative: 6,

  health: 30,
  energy: 0,

  texture: genericCombatTexture,
  animation: prepareAnimation(robotAnimation as unknown as ImageDefinition),

  actions: [
    {
      name: "Arm klap",
      animationTrack: { target: "self", track: "armklap" },
      damage: 8,
      cost: 0,
      cooldown: 0,
      targets: ["maxHealth"],
    },
    {
      name: "Arm stomper",
      animationTrack: { target: "self", track: "stomper" },
      damage: 12,
      cost: 0,
      cooldown: 3,
      targets: ["maxHealth"],
    },
  ],
};

const bear: CreatureCard = {
  id: "bear",
  name: "Teddybeer",
  level: 1,
  xpResult: 0,
  type: "shoe",
  initiative: 3,

  health: 30,
  energy: 4,

  texture: genericCombatTexture,
  animation: prepareAnimation(bearAnimation as unknown as ImageDefinition),

  actions: [
    {
      name: "Knuffel",
      animationTrack: { target: "self", track: "hugAttack" },
      damage: 6,
      cost: 0,
      cooldown: 0,
      targets: ["weakness", "minHealth"],
    },
    {
      name: "Knuffel sprong",
      animationTrack: { target: "self", track: "hugJump" },
      damage: 12,
      cost: 0,
      cooldown: 3,
      targets: ["maxHealth"],
    },
    {
      name: "Groepsknuffel",
      animationTrack: { target: "self", track: "groupHug" },
      damage: -30,
      cost: 2,
      cooldown: 4,
      targets: ["allFriendlies"],
    },
  ],
};

const slime: CreatureCard = {
  id: "slime",
  name: "Slijm",
  level: 1,
  xpResult: 0,
  type: "bag",
  initiative: 8,

  health: 40,
  energy: 4,

  texture: genericCombatTexture,
  animation: prepareAnimation(amerigoAnimation as unknown as ImageDefinition),

  actions: [
    {
      name: "Klodder",
      damage: 10,
      cost: 0,
      cooldown: 0,
      targets: ["weakness", "maxHealth"],
    },
    {
      name: "Plakkerigheid",
      damage: 2,
      damageType: "stun",
      cost: 2,
      cooldown: 4,
      targets: ["maxHealth"],
    },
  ],
};

const creatures = [
  amerigo,
  ameerigogo,
  ozosnel,
  ozoveelsneller,
  robot,
  bear,
  slime,
].reduce(
  (result, creature) => ({ ...result, [creature.id]: creature }),
  {} as Record<string, CreatureCard>
);

export const evolutions: Record<
  string,
  { dialog: Dialog[]; newCard: CreatureCardId }
> = {
  amerigo: {
    newCard: "ameerigogo",
    dialog: [
      {
        characterName: "Amerigo",
        characterColor: "lightblue",
        text: ["Tristan! Ik... Ik ben aan het veranderen...."],
      },
      {
        characterName: "Tristan",
        characterColor: "orange",
        text: ["Ojee... gaat alles goed???"],
      },
      {
        characterName: "Amerigo",
        characterColor: "lightblue",
        text: ["Ik... Ik... "],
      },
      {
        characterName: "Ameerigogo",
        characterColor: "lightblue",
        text: [
          "Evolueer!! Ik ben nu Ameerigogo!",
          "Go! Go! Meer Go!",
          "Ameerigogo!",
        ],
      },
    ],
  },
  ozosnel: {
    newCard: "ozoveelsneller",
    dialog: [
      {
        characterName: "Ozosnel",
        characterColor: "sandybrown",
        text: ["Tristan! Ik... Ik ben aan het veranderen...."],
      },
      {
        characterName: "Tristan",
        characterColor: "orange",
        text: ["Evolueer je nu al??"],
      },
      {
        characterName: "Ozosnel",
        characterColor: "sandybrown",
        text: ["Ik... Ik... denk het... "],
      },
      {
        characterName: "Ozoveelsneller",
        characterColor: "sandybrown",
        text: [
          "Evolueer!! Ik ben nu Ozoveelsneller!",
          "Snel snel!!",
          "Ozoveelsneller!",
        ],
      },
    ],
  },
};

export default creatures;
