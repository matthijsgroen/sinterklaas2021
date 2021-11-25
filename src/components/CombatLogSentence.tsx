import creatures from "../creatures";
import { ActionSentence, ActionType } from "../state/combatSlice";

const creatureName = (cardId: string) => creatures[cardId].name;

type Props = {
  sentence: ActionSentence;
};

type ActionMap = {
  [Key in ActionType]: string;
};

const actionMap: ActionMap = {
  hurts: "raakt",
  heals: "geneest",
  stuns: "verdoofd",
};

const CombatLogSentence: React.FunctionComponent<Props> = ({ sentence }) => (
  <p>
    <strong>{creatureName(sentence.source.card)}</strong>{" "}
    {actionMap[sentence.action]}{" "}
    <strong>{creatureName(sentence.target.card)}</strong> met{" "}
    <span style={{ textTransform: "lowercase" }}>{sentence.with}</span> voor{" "}
    {sentence.points} {sentence.unit}
  </p>
);

export default CombatLogSentence;
