import React, { useState, useEffect } from "react";
import "./App.css";
import CombatArena from "./components/CombatArena";
import Dialog from "./components/Dialog";
import Level from "./components/Level";
import zones from "./data";
import { selectCardIds, selectZone } from "./state/characterSlice";
import { selectInCombat, startFight } from "./state/combatSlice";
import { EncounterState, selectActiveEncounter } from "./state/encounterSlice";
import { useAppDispatch, useAppSelector } from "./state/hooks";
import { LevelCharacter, LevelData } from "./types";

type DialogState = {
  type: "initial" | "win" | "lose";
  sentence: number;
};

type DialogProps = {
  characterName: string;
  characterColor: string;
  text: string;
};

const initialDialogEnded = (
  character: LevelCharacter | undefined,
  dialogState: DialogState
): boolean => {
  if (!character) return false;
  if (dialogState.type !== "initial") return false;

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

  const zone = zones[zoneId];

  const cardIds = useAppSelector(selectCardIds);
  const inCombat = useAppSelector(selectInCombat);
  const [dialogState, setDialogState] = useState<DialogState>({
    type: "initial",
    sentence: 0,
  });
  const character = selectEncounterCharacter(zone, encounter);

  useEffect(() => {
    if (!inCombat && character && initialDialogEnded(character, dialogState)) {
      // TODO: There will not always be fighting involved!
      // if there are not fights, go directly to the rewards and win dialog.
      if (character.fights.length > 0) {
        const activeFight = character.fights[encounter.fightsFinished];
        console.log("start fight!");
        dispatch(startFight({ partyA: cardIds, partyB: activeFight.enemies }));
      }
    }
  }, [
    inCombat,
    character,
    dialogState,
    dispatch,
    encounter.fightsFinished,
    cardIds,
  ]);

  const dialogData = selectDialogData(character, dialogState);

  return (
    <main>
      {inCombat && <CombatArena />}
      <Level data={zone} />
      {dialogData && (
        <Dialog
          name={dialogData.characterName}
          color={dialogData.characterColor}
          onClick={() => {
            console.log("Dialog state");
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
