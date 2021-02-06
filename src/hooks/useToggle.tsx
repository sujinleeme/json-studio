import React from "react";

type CallbackType = (...args: string[]) => void;

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [toggled, setToggled] = React.useState<boolean>(initialValue);
  const toggle = React.useCallback<CallbackType>(() => {
    setToggled((v) => !v);
  }, []);
  return [toggled, toggle];
};
