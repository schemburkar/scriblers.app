import {
  createContext,
  FC,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type TabContextProps = {
  tabs: Tab[];
  current: Tab | undefined;
  newTab: () => void;
  openFile: (name: string, content: string, path: string) => void;
  select: (tab: Tab) => void;
  text: (text: string) => void;
};

const TabContext = createContext<TabContextProps | null>(null);

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabProvider.");
  }

  return context;
};
type Tab = {
  id: string;
  name: string;
  content: string;
  state?: "modified" | undefined;
  path?: string;
};

export const TabProvider = ({ children }: React.ComponentProps<"div">) => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [current, setCurrent] = useState<Tab | undefined>();

  const newTab = useCallback(() => {
    const tab = { name: "Untitled", content: "", id: crypto.randomUUID() };
    setTabs((prev) => [...prev, tab]);
    setCurrent(tab);
  }, []);

  const openFile = useCallback(
    (name: string, content: string, path: string) => {
      const tab = { name, content, path, id: crypto.randomUUID() };
      setTabs((prev) => [...prev, tab]);
      setCurrent(tab);
    },
    [],
  );

  const select = useCallback((tab: Tab) => {
    setCurrent(tab);
  }, []);

  const text = useCallback(
    (txt: string) => {
      setCurrent((prev) => (prev ? { ...prev, content: txt } : prev));
      setTabs((prev) =>
        prev.map((t) => (t.id === current?.id ? { ...t, content: txt } : t)),
      );
    },
    [current?.id],
  );

  useEffect(() => {
    if (current) return;
    if (!tabs.length) {
      newTab();
    }
    setCurrent(tabs[0]);
  }, [tabs, current, newTab]);

  const contextValue = useMemo<TabContextProps>(
    () => ({
      tabs,
      newTab,
      current,
      openFile,
      select,
      text,
    }),
    [tabs, newTab, current, openFile, select, text],
  );

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  );
};
