import React, {
  ReactNode,
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";

enum Viewport {
  PHONE = "PHONE",
  PHABLET = "PHABLET",
  TABLET = "TABLET",
  DESKTOP = "DESKTOP",
  WIDE = "WIDE",
}

const defaultValue = {
  viewport: Viewport.WIDE,
  vw: 0,
  vh: 0,
};

interface UseViewPort {
  viewport: Viewport;
  vw: number;
  vh: number;
}

const ViewportContext = createContext(defaultValue);

const convertViewportTOpx = (): { vw: number; vh: number } => {
  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName("body")[0];
  const x = w.innerWidth || e.clientWidth || g.clientWidth;
  const y = w.innerHeight || e.clientHeight || g.clientHeight;
  return {
    vw: x,
    vh: y,
  };
};

const getDeviceConfig = (width: number): Viewport => {
  if (width < 400) {
    return Viewport.PHONE;
  }
  if (width < 768) {
    return Viewport.PHABLET;
  }
  if (width < 1024) {
    return Viewport.TABLET;
  }
  if (width < 1536) {
    return Viewport.DESKTOP;
  }
  return Viewport.WIDE;
};

type ViewportProps = {
  children: ReactNode;
  // on the request (SSR) we detect using library 'mobile-detect', value is used for our initial state
  reqViewport?: Viewport;
};

interface ViewportPX {
  vw: number;
  vh: number;
}

const ViewportProvider: React.FC<ViewportProps> = ({
  children,
  reqViewport,
}) => {
  const initialViewport = reqViewport || Viewport.WIDE;
  const [viewport, setViewport] = useState<Viewport>(initialViewport);
  const [viewportPX, setViewportPX] = useState<ViewportPX>({
    vw: 0,
    vh: 0,
  });

  const setCurrentViewport = useCallback(
    (currentViewport: Viewport) => {
      if (viewport !== currentViewport) {
        setViewport(currentViewport);
      }
    },
    [viewport]
  );

  const setCurrentViewportPX = () => setViewportPX(convertViewportTOpx());

  useEffect(() => {
    // initial state
    const initialViewportCS = getDeviceConfig(window.innerWidth);
    setCurrentViewport(initialViewportCS);

    setCurrentViewportPX();

    const calcViewport = () => {
      const newViewport = getDeviceConfig(window.innerWidth);
      setCurrentViewport(newViewport);
      setCurrentViewportPX();
    };

    // add event listener
    window.addEventListener("resize", calcViewport);

    // remove event listener
    return () => {
      window.removeEventListener("resize", calcViewport);
    };
    // if we add viewport the whole setup of setting the event listener only once is gone
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ViewportContext.Provider
      value={{
        viewport,
        ...viewportPX,
      }}
    >
      {children}
    </ViewportContext.Provider>
  );
};

const useViewport = (): UseViewPort => {
  const context = useContext(ViewportContext);
  if (context === defaultValue) {
    throw new Error("useViewport is not used within a ViewportProvider");
  }
  return context;
};

type MockedViewportProps = {
  children: ReactNode;
  viewport?: Viewport;
  viewportPX?: ViewportPX;
};

const MockedViewportProvider: React.FC<MockedViewportProps> = ({
  children,
  viewport = Viewport.DESKTOP,
  viewportPX = {
    vw: 0,
    vh: 0,
  },
}) => {
  return (
    <ViewportContext.Provider
      value={{
        viewport,
        ...viewportPX,
      }}
    >
      {children}
    </ViewportContext.Provider>
  );
};

// for testing purposes
export { MockedViewportProvider };

// public api
export { useViewport, ViewportProvider, Viewport };

// TEST
// import React, { FC } from "react";
// import { render, act } from "@testing-library/react";
// import { renderHook } from "@testing-library/react-hooks";
// import matchMediaPolyfill from "mq-polyfill";
// import {
//   useViewport,
//   MockedViewportProvider,
//   Viewport,
//   ViewportProvider,
// } from "./viewport";

// describe("Viewport", () => {
//   beforeAll(() => {
//     matchMediaPolyfill(window);
//     window.resizeTo = function resizeTo(width, height) {
//       Object.assign(this, {
//         innerWidth: width,
//         innerHeight: height,
//         outerWidth: width,
//         outerHeight: height,
//       }).dispatchEvent(new this.Event("resize"));
//     };
//   });

//   const DummyView: FC = () => {
//     const viewport = useViewport();
//     return <div data-testid="view">{viewport}</div>;
//   };

//   it("Provider works correctly", async () => {
//     const { queryByText } = render(
//       <ViewportProvider reqViewport={Viewport.PHONE}>
//         <DummyView />
//       </ViewportProvider>
//     );

//     expect(queryByText(/PHONE/)).toBeDefined();

//     act(() => {
//       window.resizeTo(767, 1024);
//     });

//     expect(queryByText(/PHABLET/)).toBeDefined();

//     act(() => {
//       window.resizeTo(768, 1024);
//     });

//     expect(queryByText(/TABLET/)).toBeDefined();

//     act(() => {
//       window.resizeTo(1400, 1024);
//     });

//     expect(queryByText(/DESKTOP/)).toBeDefined();

//     act(() => {
//       window.resizeTo(1800, 1024);
//     });

//     expect(queryByText(/WIDE/)).toBeDefined();
//   });

//   it("useViewport hook can not be used without the ViewportProvider", async () => {
//     const { result } = renderHook(() => useViewport());
//     expect(result.error.message).toBe(
//       "useViewport is not used within a ViewportProvider"
//     );
//   });

//   it("MockedProvider works correctly", async () => {
//     const { rerender, queryByText } = render(
//       <MockedViewportProvider viewport={Viewport.PHONE}>
//         <DummyView />
//       </MockedViewportProvider>
//     );

//     expect(queryByText(/PHONE/)).toBeDefined();

//     rerender(
//       <MockedViewportProvider viewport={Viewport.DESKTOP}>
//         <DummyView />
//       </MockedViewportProvider>
//     );

//     expect(queryByText(/DESKTOP/)).toBeDefined();
//   });
// });
