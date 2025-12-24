import { OpenFileStore, SettingsStore } from "@/lib/store";
import { readTextFile } from "@tauri-apps/plugin-fs";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type TabContextProps = {
  theme: string | undefined | "light" | "dark";
  tabs: Map<string, Tab>;
  currentId?: string | null;
  newTab: () => void;
  openFile: (name: string, content: string, path: string) => void;
  selectTab: (id: string) => void;
  text: (id: string, text: string, reset?: true | undefined) => void;
  saveFile: () => void;
  saveAsFile: (name: string, path: string) => void;
  closeTab: (id: string, index: number) => void;
  toggleTheme: () => void;
};

const TabContext = createContext<TabContextProps | null>(null);

export const useTabs = () => {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabs must be used within a TabProvider.");
  }

  return context;
};

export const useActiveTab = () => {
  const { tabs, currentId } = useTabs();
  if (!currentId) return null;
  const activeTab = tabs.get(currentId);
  if (!activeTab) return null;

  const { id, name, path, content, state } = activeTab;
  return { id, name, path, content, state };
};

export type Tab = {
  id: string;
  name: string;
  content: string;
  state?: "modified" | "new" | "";
  path?: string;
};
const getValues = async () => {
  const { keys, get } = OpenFileStore();
  const tabs = new Map<string, Tab>();
  const openFiles = await keys();
  let id: string | null = null;
  for (let i = 0; i < openFiles.length; i++) {
    const f = await get(openFiles[i]);
    if (!f) continue;
    const { name, path } = f;
    let content = f.content || "";
    if (!content && f.path) content = await readTextFile(f.path);
    tabs.set(openFiles[i], {
      id: openFiles[i],
      name,
      path,
      content,
      state: !path ? "new" : f.content ? "modified" : "",
    });

    if (i == 0) {
      id = openFiles[0];
    }
  }
  return { id, tabs };
};
export const TabProvider = ({ children }: React.ComponentProps<"div">) => {
  const { set, remove, get } = OpenFileStore();
  const { get: getSettings, set: setSettings } = SettingsStore();
  const [tabs, setTabs] = useState<Map<string, Tab>>(new Map<string, Tab>());
  const [currentId, setCurrentId] = useState<string>();
  const [theme, setTheme] = useState<string>();

  const newTab = useCallback(() => {
    const tab: Tab = {
      name: "Untitled",
      content: "",
      id: crypto.randomUUID(),
      state: "new",
    };
    setTabs((prev) => {
      const newTabs = new Map(prev);
      newTabs.set(tab.id, tab);
      return newTabs;
    });

    setTabs((prev) => {
      setCurrentId(tab.id);
      return prev;
    });

    set(tab.id, { name: tab.name });
  }, []);

  const openFile = useCallback(
    (name: string, content: string, path: string) => {
      const tab: Tab = {
        name,
        content,
        path,
        id: crypto.randomUUID(),
        state: "",
      };
      setTabs((prev) => {
        const newTabs = new Map(prev);
        newTabs.set(tab.id, tab);
        return newTabs;
      });

      setTabs((prev) => {
        setCurrentId(tab.id);
        return prev;
      });
      set(tab.id, { name, path });
    },
    [],
  );

  const selectTab = useCallback((id: string) => {
    setCurrentId(id);
  }, []);

  const closeTab = useCallback((id: string, index: number) => {
    setTabs((prevTabs) => {
      const newTabs = new Map(prevTabs);
      newTabs.delete(id);

      setCurrentId((prevCurrent) => {
        if (prevCurrent !== id) return prevCurrent;
        const keys = Array.from(newTabs.keys());
        if (newTabs.size == 0) {
          return ""; // effect should handle current change
        } else {
          return keys[index] || keys[index - 1];
        }
      });

      return newTabs;
    });
    remove(id);
  }, []);

  const text = useCallback(
    async (id: string, txt: string, reset?: true | undefined) => {
      setTabs((prevTabs) => {
        const newTabs = new Map(prevTabs);
        const t = prevTabs.get(id);
        if (!t) return newTabs;

        newTabs.set(id, {
          ...t,
          content: txt,
          state: reset ? "" : t.state == "new" ? "new" : "modified",
        });
        return newTabs;
      });

      const existing = await get(id);
      existing &&
        (await set(id, {
          ...existing,
          content: txt,
          ...(reset ? { state: "" } : {}),
        }));
    },
    [],
  );

  const saveFile = useCallback(async () => {
    const activeId = currentId;
    if (!activeId) return;
    setTabs((prevTabs) => {
      const t = prevTabs.get(activeId);
      if (!t) return prevTabs;

      const newTabs = new Map(prevTabs);
      newTabs.set(activeId, { ...t, state: "" });
      return newTabs;
    });
    const existing = await get(activeId);
    existing && (await set(activeId, { ...existing, content: "" })); //clear content form store as file is save,
  }, [currentId]);

  const saveAsFile = useCallback(
    async (name: string, path: string) => {
      const activeId = currentId;
      if (!activeId) return;
      setTabs((prevTabs) => {
        const t = prevTabs.get(activeId);
        if (!t) return prevTabs;

        const newTabs = new Map(prevTabs);
        newTabs.set(activeId, { ...t, name, path, state: "" });
        return newTabs;
      });
      const existing = await get(activeId);
      existing &&
        (await set(activeId, { ...existing, name, path, content: "" })); //clear content form store as file is save,
    },
    [currentId],
  );

  const toggleTheme = useCallback(async () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    await setSettings("theme", nextTheme);
  }, [theme]);

  useEffect(() => {
    (async () => {
      if (currentId) return;
      if (tabs.size == 0) {
        const { id, tabs } = await getValues();
        if (tabs.size != 0) {
          setTabs(tabs);
          id && setCurrentId(id);
        } else {
          newTab();
        }
      } else setCurrentId(Array.from(tabs.keys())[0]);
    })();
  }, [currentId]);

  useEffect(() => {
    (async () => {
      const theme = await getSettings("theme");
      setTheme(theme || "");
    })();
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle("dark", theme === "dark");
    }
  }, [theme]);

  const contextValue = useMemo<TabContextProps>(
    () => ({
      tabs,
      theme,
      newTab,
      currentId,
      openFile,
      selectTab,
      text,
      closeTab,
      saveFile,
      saveAsFile,
      toggleTheme,
    }),
    [
      tabs,
      newTab,
      currentId,
      openFile,
      selectTab,
      text,
      close,
      saveFile,
      saveAsFile,
      toggleTheme,
    ],
  );

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  );
};
