import React, { useState, useEffect } from "react";
import CombatArena from "./components/CombatArena";
import DialogView from "./components/Dialog";
import Level from "./components/Level";
import creatures, { evolutions } from "./data/creatures";
import zones from "./data";
import {
  addFollower,
  getCard,
  giveXP,
  removeCard,
  selectCardIds,
  selectZone,
} from "./state/characterSlice";
import {
  endEncounter,
  selectFightWon,
  selectInCombat,
  selectLevelingUp,
  startFight,
} from "./state/combatSlice";
import {
  closeEncounter,
  EncounterState,
  selectActiveEncounter,
  winEncounter,
} from "./state/encounterSlice";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { LevelCharacter, LevelData, Dialog } from "./types";
import Icon from "./components/Icon";

const AFTER_FIGHT_COOLDOWN = 3000;

type DialogType =
  | "initial"
  | "conditional"
  | "win"
  | "lose"
  | "evolve"
  | "none";

type DialogState = {
  type: DialogType;
  sentence: number;
};

type DialogProps = {
  characterName: string;
  characterColor: string;
  text: string;
};

const processText = (text: string): React.ReactNode =>
  text
    .replaceAll(":rock:", "|rockIcon|")
    .replaceAll(":paper:", "|paperIcon|")
    .replaceAll(":scissors:", "|scissorsIcon|")
    .split("|")
    .map((element, index) => {
      if (element === "rockIcon") return <Icon symbol={"rod"} key={index} />;
      if (element === "paperIcon") return <Icon symbol={"bag"} key={index} />;
      if (element === "scissorsIcon")
        return <Icon symbol={"shoe"} key={index} />;
      return <React.Fragment key={index}>{element}</React.Fragment>;
    });

const hasDialogEnded = (
  dialogType: DialogType,
  character: LevelCharacter | undefined,
  dialogState: DialogState,
  evolving?: string,
  cardIds?: string[]
): boolean => {
  if (dialogState.type !== dialogType) return false;

  const dialogData = selectDialogData(
    character,
    dialogState,
    evolving,
    cardIds
  );
  return dialogData === false;
};

const selectDialogData = (
  character: LevelCharacter | undefined,
  dialogState: DialogState,
  evolving?: string,
  cardIds?: string[]
): DialogProps | false => {
  let dialogList: Dialog[] = [];
  if (character) {
    if (dialogState.type === "initial") {
      dialogList = character.initialDialog.concat(
        (cardIds ?? [])
          .map((id) => creatures[id].name)
          .map((name) => ({
            characterColor: "orange",
            characterName: "Tristan",
            text: [`Ik kies jou, ${name}!`],
          }))
      );
    }
    if (dialogState.type === "lose") {
      dialogList = character.loseDialog;
    }
    if (dialogState.type === "win") {
      dialogList = character.winDialog;
    }
    if (dialogState.type === "conditional") {
      dialogList = character.conditionDialog;
    }
  }
  if (evolving) {
    const evolveData = evolutions[evolving];
    dialogList = evolveData.dialog;
  }
  if (dialogList.length === 0) return false;

  let sentencesConsumed = dialogState.sentence;
  let dialogIndex = 0;
  while (sentencesConsumed > -1) {
    const activeDialog = dialogList[dialogIndex];
    if (!activeDialog) return false;
    if (activeDialog.text.length <= sentencesConsumed) {
      dialogIndex++;
      sentencesConsumed -= activeDialog.text.length;
    } else {
      return {
        characterColor: activeDialog.characterColor,
        characterName: activeDialog.characterName,
        text: activeDialog.text[sentencesConsumed],
      };
    }
  }

  return {
    characterColor: "orange",
    characterName: "Tristan",
    text: "Awesome!",
  };
};

const selectEncounterCharacter = (
  data: LevelData,
  encounter: EncounterState
): LevelCharacter | undefined => {
  if (encounter.encounterCharacter === -1) return undefined;

  return data.characters.find(
    (ch) => ch.characterSprite === encounter.encounterCharacter
  );
};

type Props = {
  onComplete: () => void;
};

const Game: React.FunctionComponent<Props> = ({ onComplete }) => {
  const dispatch = useAppDispatch();
  const encounter = useAppSelector(selectActiveEncounter);
  const zoneId = useAppSelector(selectZone);
  const cardIds = useAppSelector(selectCardIds);
  const evolving = useAppSelector(selectLevelingUp);

  const zone = zones[zoneId];

  const inCombat = useAppSelector(selectInCombat);
  const fightWon = useAppSelector(selectFightWon);
  const [dialogState, setDialogState] = useState<DialogState>({
    type: "none",
    sentence: 0,
  });
  const character = selectEncounterCharacter(zone, encounter);

  useEffect(() => {
    if (character && dialogState.type === "none") {
      let metConditions = true;
      if (character.conditions) {
        if (
          character.conditions.minimalCards &&
          character.conditions.minimalCards > cardIds.length
        ) {
          metConditions = false;
        }
        if (
          character.conditions.encountersCompleted &&
          !character.conditions.encountersCompleted.every((e) =>
            encounter.encountersCompleted.includes(e)
          )
        ) {
          metConditions = false;
        }
      }

      setDialogState({
        type: metConditions ? "initial" : "conditional",
        sentence: 0,
      });
    }
    if (
      !inCombat &&
      character &&
      hasDialogEnded("initial", character, dialogState, undefined, cardIds)
    ) {
      const activeFight = character.fights[encounter.fightsFinished];
      if (activeFight) {
        dispatch(startFight(activeFight.enemies));
      } else {
        dispatch(winEncounter());
      }
    }
    if (
      character &&
      (hasDialogEnded("lose", character, dialogState) ||
        hasDialogEnded("conditional", character, dialogState))
    ) {
      dispatch(closeEncounter(false));
      setDialogState({ type: "none", sentence: 0 });
    }
    if (
      evolving &&
      hasDialogEnded("evolve", character, dialogState, evolving)
    ) {
      setDialogState({ type: "none", sentence: 0 });

      const evolveData = evolutions[evolving];
      dispatch(removeCard(evolving));
      dispatch(getCard(evolveData.newCard));
    }
    if (character && hasDialogEnded("win", character, dialogState)) {
      dispatch(closeEncounter(true));
      setDialogState({ type: "none", sentence: 0 });
      if (character.rewards.card) {
        dispatch(getCard(character.rewards.card));
      }
      if (character.rewards.removeCard) {
        dispatch(removeCard(character.rewards.removeCard));
      }
      if (character.rewards.follower) {
        dispatch(addFollower(character.rewards.follower));
      }
      if (character.rewards.xp) {
        dispatch(giveXP(character.rewards.xp));
      }
      if (character.rewards.gameCompleted) {
        onComplete();
      }
    }
  }, [
    onComplete,
    inCombat,
    character,
    dialogState,
    dispatch,
    encounter.fightsFinished,
    encounter.encountersCompleted,
    cardIds.length,
    evolving,
    cardIds,
  ]);

  useEffect(() => {
    if (
      character &&
      encounter.result === "lost" &&
      dialogState.type !== "lose"
    ) {
      const timeoutId = setTimeout(() => {
        setDialogState({ type: "lose", sentence: 0 });
        dispatch(endEncounter());
      }, AFTER_FIGHT_COOLDOWN);
      return () => clearTimeout(timeoutId);
    }
    if (character && encounter.result === "won" && dialogState.type !== "win") {
      if (inCombat) {
        const timeoutId = setTimeout(() => {
          setDialogState({ type: "win", sentence: 0 });
          dispatch(endEncounter());
        }, AFTER_FIGHT_COOLDOWN);
        return () => clearTimeout(timeoutId);
      } else {
        setDialogState({ type: "win", sentence: 0 });
        dispatch(endEncounter());
      }
    }
    if (
      inCombat &&
      character &&
      encounter.result === "inProgress" &&
      fightWon &&
      encounter.fightsFinished > 0 &&
      character.fights[encounter.fightsFinished]
    ) {
      const timeoutId = setTimeout(() => {
        dispatch(
          startFight(character.fights[encounter.fightsFinished].enemies)
        );
      }, AFTER_FIGHT_COOLDOWN);
      return () => clearTimeout(timeoutId);
    }
  }, [
    encounter.result,
    character,
    dialogState.type,
    dispatch,
    fightWon,
    inCombat,
    encounter.fightsFinished,
  ]);

  const dialogData = selectDialogData(
    character,
    dialogState,
    evolving,
    cardIds
  );

  return (
    <main>
      <Level data={zone} />
      {inCombat && character && <CombatArena character={character} />}
      {dialogData && (
        <DialogView
          name={dialogData.characterName}
          color={dialogData.characterColor}
          onClick={() => {
            setDialogState((state) => ({
              ...state,
              type: evolving ? "evolve" : state.type,
              sentence: state.sentence + 1,
            }));
          }}
        >
          {processText(dialogData.text)}
        </DialogView>
      )}
    </main>
  );
};

export default Game;
