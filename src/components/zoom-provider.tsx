import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type ZoomProps = {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  reset: () => void;

  spellCheck: boolean;
  toggleSpellCheck: () => void;

  wordWrap: boolean;
  toggleWordWrap: () => void;
};

const ZoomContext = createContext<ZoomProps | null>(null);

export const useZoom = () => {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error("useZoom must be used within a ZoomProvider.");
  }

  return context;
};
export const ZoomProvider = ({ children }: React.ComponentProps<"div">) => {
  const [zoom, setZoom] = useState(100);
  const [spellCheck, setSpellCheck] = useState(true);
  const [wordWrap, setWordWrap] = useState(false);

  const zoomIn = useCallback(async () => {
    setZoom((prev) => Math.min(300, prev + 5));
  }, []);
  const zoomOut = useCallback(async () => {
    setZoom((prev) => Math.max(5, prev - 5));
  }, []);
  const reset = useCallback(async () => {
    setZoom(100);
  }, []);

  const toggleSpellCheck = useCallback(async () => {
    setSpellCheck((prev) => !prev);
  }, []);

  const toggleWordWrap = useCallback(async () => {
    setWordWrap((prev) => !prev);
  }, []);
  const contextValue = useMemo<ZoomProps>(
    () => ({
      zoom,
      zoomIn,
      zoomOut,
      reset,

      spellCheck,
      toggleSpellCheck,

      wordWrap,
      toggleWordWrap,
    }),
    [
      zoom,
      zoomIn,
      zoomOut,
      spellCheck,
      toggleSpellCheck,
      wordWrap,
      toggleWordWrap,
    ],
  );

  return (
    <ZoomContext.Provider value={contextValue}>{children}</ZoomContext.Provider>
  );
};
