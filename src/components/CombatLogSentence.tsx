import creatures from "../data/creatures";
import { ActionSentence, ActionType } from "../types";

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

const unitMap: Record<"turns" | "points", string> = {
  turns: "beurten",
  points: "punten",
};

const CombatLogSentence: React.FunctionComponent<Props> = ({ sentence }) => (
  <p>
    <strong>{creatureName(sentence.source.card)}</strong>{" "}
    {actionMap[sentence.action]}{" "}
    <strong>
      {sentence.source === sentence.target
        ? "zichzelf"
        : creatureName(sentence.target.card)}
    </strong>{" "}
    met <span style={{ textTransform: "lowercase" }}>{sentence.with}</span> voor{" "}
    {sentence.points} {unitMap[sentence.unit]}
  </p>
);

export default CombatLogSentence;
