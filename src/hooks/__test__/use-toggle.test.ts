import { act, renderHook } from "@testing-library/react-hooks";

import { useToggle } from "../use-toggle";

describe("useToggle", () => {
  test("should change the value to false if the initial value is empty and its first toggle is called.", () => {
    const { result } = renderHook(() => useToggle());
    const [toggled, toggle] = result.current;

    // The default value is false
    expect(toggled).toBe(false);
    expect(result.current[0]).toBe(false);

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
