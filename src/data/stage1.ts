import { CharacterSprites, LevelData } from "../types";

const stage1: LevelData = {
  name: "Stage1",
  tiles: [
    { coord: [1, 1, 1], img: "block", set: "terrain" },
    { coord: [1, 1, 0], img: "blockDirt", set: "terrain" },
    { coord: [2, 1, 0], img: "blockDirt", set: "terrain" },
    { coord: [3, 1, 0], img: "blockDirt", set: "terrain" },
    { coord: [2, 1, 1], img: "block", set: "terrain" },
    {
      coord: [3, 1, 1],
      img: "blockCornerSmall",
      set: "terrain",
      direction: "east",
    },
    { coord: [1, 2, 1], img: "block", set: "terrain" },
    { coord: [3, 3, 1], img: "block", set: "terrain" },
    { coord: [2, 2, 1], img: "blockDirt", set: "terrain" },
    { coord: [3, 2, 1], img: "blockDirt", set: "terrain" },
    { coord: [4, 1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [4, 3, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [6, 3, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [6, 5, 1], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [6, 1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [6, -1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [4, -1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [4, -3, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [6, -3, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [8, -3, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [8, -1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [8, 1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [10, 1, 0], img: "blockLarge", set: "terrain", size: "large" },
    { coord: [10, -1, 0], img: "blockLarge", set: "terrain", size: "large" },
    {
      coord: [4, 2, 1],
      img: "blockDirtRamp",
      set: "terrain",
      direction: "east",
    },
    {
      coord: [6, 4, 1],
      img: "blockDirtRamp",
      set: "terrain",
      direction: "south",
    },
    { coord: [5, -1, 1], img: "block", set: "terrain" },
    { coord: [6, -1, 1], img: "treePine", set: "terrain" },
  ],
  decorations: [{ coord: [6, 1, 1], img: "plant", set: "terrain" }],
  characters: [
    {
      characterSprite: CharacterSprites.Catoo,
      position: [7, 6, 2],
      conditions: {
        minimalCards: 1,
      },
      conditionDialog: [
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: [
            "Help grote broer! Ik wordt door speelgoed gevangen gehouden!",
            "Kan jij deze robot verslaan?",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ik heb niets om mee te vechten!", " Ik kom later terug."],
        },
      ],
      initialDialog: [
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: [
            "Help grote broer! Ik wordt door speelgoed gevangen gehouden!",
            "Kan jij deze robot verslaan?",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Natuurlijk kan ik dat!"],
        },
      ],
      fights: [{ enemies: ["robot"] }],
      rewards: {
        follower: CharacterSprites.Catoo,
        xp: 25,
      },
      winDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ha! Daar heb ik mooi van gewonnen!"],
        },
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: ["Goed gedaan broer!"],
        },
      ],
      loseDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Oei dat moet ik nog maar eens proberen"],
        },
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: ["Je kan het!"],
        },
      ],
    },
    {
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
          text: [
            "Mam ik wil je helpen, maar ik heb nu niets om mee te vechten!",
          ],
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
    },
    {
      characterSprite: CharacterSprites.Carl,
      position: [7, -1, 1],
      conditions: {
        minimalCards: 1,
      },
      conditionDialog: [
        {
          characterColor: "green",
          characterName: "Carl",
          text: ["Tris! Dit speelgoed houdt mij gevangen!"],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ik heb niets om mee te vechten!", " Ik kom later terug."],
        },
      ],
      initialDialog: [
        {
          characterColor: "green",
          characterName: "Carl",
          text: [
            "Tris! Dit speelgoed houdt mij gevangen!",
            "Ik heb dit nog nooit meegemaakt!",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ik help je wel Pa!"],
        },
      ],
      fights: [{ enemies: ["robot", "bear"] }],
      rewards: {
        follower: CharacterSprites.Carl,
      },
      winDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ha! Daar heb ik mooi van gewonnen!"],
        },
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: ["Goed gedaan broer!"],
        },
      ],
      loseDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Hmm zou Amerigo hier sterk genoeg voor zijn?"],
        },
        {
          characterColor: "green",
          characterName: "Carl",
          text: ["Misschien moet je hem verder trainen?"],
        },
      ],
    },
    {
      characterSprite: CharacterSprites.Piet,
      position: [7, 1, 1],
      conditions: {
        minimalCards: 1,
      },
      conditionDialog: [
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: [
            "Help grote broer! Ik wordt door speelgoed gevangen gehouden!",
            "Kan jij deze robot verslaan?",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ik heb niets om mee te vechten!", " Ik kom later terug."],
        },
      ],
      initialDialog: [
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: [
            "Help grote broer! Ik wordt door speelgoed gevangen gehouden!",
            "Kan jij deze robot verslaan?",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Natuurlijk kan ik dat!"],
        },
      ],
      fights: [{ enemies: ["robot"] }],
      rewards: {
        follower: CharacterSprites.Catoo,
      },
      winDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ha! Daar heb ik mooi van gewonnen!"],
        },
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: ["Goed gedaan broer!"],
        },
      ],
      loseDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Oei dat moet ik nog maar eens proberen"],
        },
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: ["Je kan het!"],
        },
      ],
    },
    {
      characterSprite: CharacterSprites.Gina,
      position: [9, 0, 1],
      conditions: {
        minimalCards: 1,
      },
      conditionDialog: [
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: [
            "Help grote broer! Ik wordt door speelgoed gevangen gehouden!",
            "Kan jij deze robot verslaan?",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ik heb niets om mee te vechten!", " Ik kom later terug."],
        },
      ],
      initialDialog: [
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: [
            "Help grote broer! Ik wordt door speelgoed gevangen gehouden!",
            "Kan jij deze robot verslaan?",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Natuurlijk kan ik dat!"],
        },
      ],
      fights: [{ enemies: ["robot"] }],
      rewards: {
        follower: CharacterSprites.Catoo,
      },
      winDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ha! Daar heb ik mooi van gewonnen!"],
        },
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: ["Goed gedaan broer!"],
        },
      ],
      loseDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Oei dat moet ik nog maar eens proberen"],
        },
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: ["Je kan het!"],
        },
      ],
    },
    {
      characterSprite: CharacterSprites.Sint,
      position: [9, -3, 1],
      conditions: {
        minimalCards: 1,
      },
      conditionDialog: [
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: [
            "Help grote broer! Ik wordt door speelgoed gevangen gehouden!",
            "Kan jij deze robot verslaan?",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ik heb niets om mee te vechten!", " Ik kom later terug."],
        },
      ],
      initialDialog: [
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: [
            "Help grote broer! Ik wordt door speelgoed gevangen gehouden!",
            "Kan jij deze robot verslaan?",
          ],
        },
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Natuurlijk kan ik dat!"],
        },
      ],
      fights: [{ enemies: ["robot"] }],
      rewards: {
        follower: CharacterSprites.Catoo,
      },
      winDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Ha! Daar heb ik mooi van gewonnen!"],
        },
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: ["Goed gedaan broer!"],
        },
      ],
      loseDialog: [
        {
          characterColor: "orange",
          characterName: "Tristan",
          text: ["Oei dat moet ik nog maar eens proberen"],
        },
        {
          characterColor: "pink",
          characterName: "Catootje",
          text: ["Je kan het!"],
        },
      ],
    },
  ],
  exits: [],
};

export default stage1;
