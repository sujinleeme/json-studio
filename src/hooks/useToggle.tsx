import React from "react";

type CallbackType = (...args: string[]) => void;

export const useToggle = (initialValue = false): [boolean, () => void] => {
  const [value, setValue] = React.useState<boolean>(initialValue);
  const toggle = React.useCallback<CallbackType>(() => {
    setValue((v: boolean) => !v);
  }, []);
  return [value, toggle];
};
