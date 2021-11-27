import { CreatureCard, CreatureCardId, Dialog } from "./types";

const amerigo: CreatureCard = {
  id: "amerigo",
  name: "Amerigo",
  level: 1,
  xpResult: 50,
  type: "shoe",
  initiative: 4,

  health: 60,
  energy: 4,

  actions: [
    {
      name: "Kopstoot",
      damage: 5,
      cost: 0,
      cooldown: 0,
      targets: ["enemy"],
    },
    {
      name: "Hoeftrap",
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

  actions: [
    {
      name: "Kopstoot",
      damage: 10,
      cost: 0,
      cooldown: 0,
      targets: ["enemy"],
    },
    {
      name: "Hoeftrap",
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
  xpResult: 0,
  type: "rod",
  initiative: 2,

  health: 60,
  energy: 10,

  actions: [
    {
      name: "Lichte aanval",
      damage: 6,
      cost: 0,
      cooldown: 0,
      targets: ["enemy"],
    },
    {
      name: "Zware aanval",
      damage: 10,
      cost: 1,
      cooldown: 1,
      targets: ["enemy"],
    },
    {
      name: "Stormloop",
      damage: -10,
      cost: 3,
      cooldown: 2,
      targets: ["allEnemies"],
    },
  ],
};

const ozoefsnel: CreatureCard = {
  id: "ozoefsnel",
  name: "Ozoefsnel",
  level: 2,
  xpResult: 0,
  type: "rod",
  initiative: 2,

  health: 70,
  energy: 15,

  actions: [
    {
      name: "Lichte aanval",
      damage: 6,
      cost: 0,
      cooldown: 0,
      targets: ["enemy"],
    },
    {
      name: "Zware aanval",
      damage: 14,
      cost: 1,
      cooldown: 1,
      targets: ["enemy"],
    },
    {
      name: "Stormloop",
      damage: 10,
      cost: 2,
      cooldown: 2,
      targets: ["allEnemies"],
    },
    {
      name: "Pepernoten storm",
      damage: 20,
      cost: 6,
      cooldown: 2,
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

  actions: [
    {
      name: "Arm klap",
      damage: 8,
      cost: 0,
      cooldown: 0,
      targets: ["maxHealth"],
    },
    {
      name: "Arm stomper",
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

  actions: [
    {
      name: "Knuffel",
      damage: 6,
      cost: 0,
      cooldown: 0,
      targets: ["weakness", "minHealth"],
    },
    {
      name: "Knuffel sprong",
      damage: 12,
      cost: 0,
      cooldown: 3,
      targets: ["maxHealth"],
    },
    {
      name: "Groepsknuffel",
      damage: -30,
      cost: 2,
      cooldown: 4,
      targets: ["allFriendlies"],
    },
  ],
};

const creatures = [amerigo, ameerigogo, ozosnel, ozoefsnel, robot, bear].reduce(
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
};

export default creatures;
