import { LevelData } from "../types";
import stage1 from "./stage1";
import bedroom from "./bedroom";
import livingroom from "./livingroom";
import street from "./street";
import mountain from "./mountain";
import finish from "./finish";

const zones = [stage1, bedroom, livingroom, street, mountain, finish].reduce(
  (r, e) => ({ ...r, [e.name]: e }),
  {} as Record<string, LevelData>
);

export default zones;
