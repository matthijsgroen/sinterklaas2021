import React from "react";
import { CreatureType } from "../types";
import rodImage from "../data/geppetto/roe.png";
import shoeImage from "../data/geppetto/schoen.png";
import bagImage from "../data/geppetto/zak.png";

type Props = {
  symbol: CreatureType;
};

const imageMapping: Record<CreatureType, string> = {
  bag: bagImage,
  shoe: shoeImage,
  rod: rodImage,
};

const Icon: React.FunctionComponent<Props> = ({ symbol }) => (
  <img
    width={24}
    height={24}
    src={imageMapping[symbol]}
    alt={symbol}
    style={{ verticalAlign: "sub" }}
  />
);

export default Icon;
