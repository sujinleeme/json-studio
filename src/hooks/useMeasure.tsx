// A React hook for resize-observer, uses resize-observer-polyfill
// reference : https://github.com/cvpcasada/use-measure/blob/master/src/use-measure.ts

import { useState, useLayoutEffect, useRef, RefObject } from "react";

import ResizeObserver from "resize-observer-polyfill";

export interface DOMRectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

export const useMeasure = (): [
  { ref: RefObject<Element> },
  DOMRectReadOnly
] => {
  const ref = useRef<Element>(null);

  const [bounds, setContentRect] = useState<DOMRectReadOnly>(
    // DOMRectReadOnly.fromRect()
    { x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0 }
  );

  useLayoutEffect(() => {
    const { current } = ref;
    if (current === null) return undefined;

    let animationFrameId: number | null = null;
    const measure: ResizeObserverCallback = ([
      entry,
    ]: ResizeObserverEntry[]) => {
      animationFrameId = window.requestAnimationFrame(() =>
        setContentRect(entry.contentRect)
      );
    };

    const ro = new ResizeObserver(measure);
    ro.observe(current);

    return () => {
      window.cancelAnimationFrame(animationFrameId!);
      ro.disconnect();
    };
  }, []);

  return [{ ref }, bounds];
};
