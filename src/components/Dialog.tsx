import React from "react";

type Props = {
  color: string;
  name: string;
  onClick: () => void;
};

const Dialog: React.FunctionComponent<Props> = ({
  color,
  name,
  onClick,
  children,
}) => (
  <div onClick={onClick}>
    <p style={{ color }}>{name}</p>
    <p>{children}</p>
  </div>
);

export default Dialog;
