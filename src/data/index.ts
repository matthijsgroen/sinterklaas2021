import { LevelData } from "../types";
import stage1 from "./stage1";
import bedroom from "./bedroom";

const zones = [stage1, bedroom].reduce(
  (r, e) => ({ ...r, [e.name]: e }),
  {} as Record<string, LevelData>
);

export default zones;
