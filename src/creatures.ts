import { CreatureCard } from "./types";

const amerigo: CreatureCard = {
  id: "amerigo",
  name: "Amerigo",
  level: 1,
  xpResult: 0,
  type: "shoe",
  initiative: 4,

  health: 50,
  energy: 6,

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
      cooldown: 0,
      targets: ["enemy"],
    },
    {
      name: "Eet wortel",
      damage: -20,
      cost: 2,
      cooldown: 2,
      targets: ["self"],
    },
  ],
};

const ameerigogo: CreatureCard = {
  id: "ameerigo",
  name: "Ameerigogo",
  level: 2,
  xpResult: 0,
  type: "shoe",
  initiative: 4,

  health: 80,
  energy: 15,

  actions: [
    {
      name: "Lichte aanval",
      damage: 8,
      cost: 0,
      cooldown: 0,
      targets: ["enemy"],
    },
    {
      name: "Zware aanval",
      damage: 20,
      cost: 2,
      cooldown: 0,
      targets: ["enemy"],
    },
    {
      name: "Genees",
      damage: -20,
      cost: 3,
      cooldown: 1,
      targets: ["friendly"],
    },
    {
      name: "Genees iedereen",
      damage: -10,
      cost: 5,
      cooldown: 2,
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
  type: "bag",
  initiative: 6,

  health: 40,
  energy: 0,

  actions: [
    {
      name: "Arm klap",
      damage: 30,
      cost: 0,
      cooldown: 0,
      targets: ["maxHealth"],
    },
    {
      name: "Arm stomper",
      damage: 50,
      cost: 0,
      cooldown: 3,
      targets: ["maxHealth"],
    },
  ],
};

const creatures = [amerigo, ameerigogo, ozosnel, ozoefsnel, robot].reduce(
  (result, creature) => ({ ...result, [creature.id]: creature }),
  {} as Record<string, CreatureCard>
);

export default creatures;
