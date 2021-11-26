import React, { useEffect } from "react";

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
}) => {
  useEffect(() => {
    const keyListener = (event: KeyboardEvent) => {
      if (event.code === "Enter" || event.code === "Space") {
        onClick();
      }
    };
    window.addEventListener("keydown", keyListener);

    return () => {
      window.removeEventListener("keydown", keyListener);
    };
  }, [onClick]);
  return (
    <div onClick={onClick}>
      <p style={{ color }}>{name}</p>
      <p>{children}</p>
    </div>
  );
};

export default Dialog;
