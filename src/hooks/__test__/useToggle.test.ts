import { act, renderHook } from "@testing-library/react-hooks";

import { useToggle } from "..";

describe("useToggle", () => {
  test("should change the value to true if the initial value is empty and its first toggle is called.", () => {
    const { result } = renderHook(() => useToggle());
    const [value, toggle] = result.current;

    // The default value is false
    expect(value).toBe(false);

    act(() => {
      toggle();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      toggle();
    });
    expect(result.current[0]).toBe(false);
  });
});
