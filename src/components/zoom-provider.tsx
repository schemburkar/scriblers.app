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

  const zoomIn = useCallback(async () => {
    setZoom((prev) => Math.min(300, prev + 5));
  }, []);
  const zoomOut = useCallback(async () => {
    setZoom((prev) => Math.max(5, prev - 5));
  }, []);

  const contextValue = useMemo<ZoomProps>(
    () => ({
      zoom,
      zoomIn,
      zoomOut,
    }),
    [zoom, zoomIn, zoomOut],
  );

  return (
    <ZoomContext.Provider value={contextValue}>{children}</ZoomContext.Provider>
  );
};
