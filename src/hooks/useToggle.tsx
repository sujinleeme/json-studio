import React from "react";

type CallbackType = (...args: string[]) => void;

export const useToggle = (
  initialValue = false
): [value: boolean, toggle: () => void] => {
  const [value, setValue] = React.useState<boolean>(initialValue);
  const toggle = React.useCallback<CallbackType>(() => {
    setValue((v) => !v);
  }, []);
  return [value, toggle];
};
