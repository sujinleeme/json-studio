import { useState, useCallback } from "react";

type CallbackType = (...args: string[]) => void;

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [toggled, setToggled] = useState(initialValue);
  const toggle = useCallback<CallbackType>(() => {
    setToggled((v) => !v);
  }, []);
  return [toggled, toggle];
};
