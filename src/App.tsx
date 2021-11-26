import React, { useState, useEffect } from "react";
import "./App.css";
import CombatArena from "./components/CombatArena";
import Dialog from "./components/Dialog";
import Level from "./components/Level";
import zones from "./data";
import {
  addFollower,
  getCard,
  removeCard,
  selectCardIds,
  selectZone,
} from "./state/characterSlice";
import { endEncounter, selectInCombat, startFight } from "./state/combatSlice";
import {
  closeEncounter,
  EncounterState,
  selectActiveEncounter,
  winEncounter,
} from "./state/encounterSlice";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { LevelCharacter, LevelData } from "./types";

type DialogType = "initial" | "conditional" | "win" | "lose" | "none";

type DialogState = {
  type: DialogType;
  sentence: number;
};

type DialogProps = {
  characterName: string;
  characterColor: string;
  text: string;
};

const hasDialogEnded = (
  dialogType: DialogType,
  character: LevelCharacter | undefined,
  dialogState: DialogState
): boolean => {
  if (!character) return false;
  if (dialogState.type !== dialogType) return false;

  const dialogData = selectDialogData(character, dialogState);
  return dialogData === false;
};

const selectDialogData = (
  character: LevelCharacter | undefined,
  dialogState: DialogState
): DialogProps | false => {
  if (!character) return false;

  let dialogList: typeof character.initialDialog = [];

  if (dialogState.type === "initial") {
    dialogList = character.initialDialog;
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

function App() {
  const dispatch = useAppDispatch();
  const encounter = useAppSelector(selectActiveEncounter);
  const zoneId = useAppSelector(selectZone);
  const cardIds = useAppSelector(selectCardIds);

  const zone = zones[zoneId];

  const inCombat = useAppSelector(selectInCombat);
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
      }

      setDialogState({
        type: metConditions ? "initial" : "conditional",
        sentence: 0,
      });
    }
    if (
      !inCombat &&
      character &&
      hasDialogEnded("initial", character, dialogState)
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
        dispatch(addFollower(character.characterSprite));
      }
    }
  }, [
    inCombat,
    character,
    dialogState,
    dispatch,
    encounter.fightsFinished,
    cardIds.length,
  ]);

  useEffect(() => {
    if (
      character &&
      encounter.result === "lost" &&
      dialogState.type === "initial"
    ) {
      setDialogState({ type: "lose", sentence: 0 });
      dispatch(endEncounter());
    }
    if (
      character &&
      encounter.result === "won" &&
      dialogState.type === "initial"
    ) {
      setDialogState({ type: "win", sentence: 0 });
      dispatch(endEncounter());
    }
  }, [encounter.result, character, dialogState.type, dispatch]);

  const dialogData = selectDialogData(character, dialogState);

  return (
    <main>
      <Level data={zone} />
      {inCombat && character && <CombatArena character={character} />}
      {dialogData && (
        <Dialog
          name={dialogData.characterName}
          color={dialogData.characterColor}
          onClick={() => {
            setDialogState((state) => ({
              ...state,
              sentence: state.sentence + 1,
            }));
          }}
        >
          {dialogData.text}
        </Dialog>
      )}
    </main>
  );
}

export default App;
