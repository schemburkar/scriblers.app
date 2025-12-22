import { LazyStore } from "@tauri-apps/plugin-store";

export const loadStore = <T>(storeName: string) => {
  const store = new LazyStore(storeName);
  const get = async (key: string) => {
    const val = await store.get<T>(key);
    return val;
  };
  const set = async (key: string, val: T) => {
    await store.set(key, val);
  };
  const keys = async () => {
    const val = await store.keys();
    return val;
  };

  const remove = async (key: string) => {
    const val = await store.delete(key);
    return val;
  };
  return { get, set, keys, remove };
};

type OpenFile = {
  name: string;
  path?: string;
  hash?: string;
  content?: string;
};

type Settings = {
  theme: "dark" | "light";
  startup_tabs: "new-tab" | "re-open";
};

export const OpenFileStore = () => loadStore<OpenFile>("openFiles.json");

export const SettingsStore = () => {
  const store = loadStore<any>("settings.json");

  const get = async <K extends keyof Settings>(key: K) => {
    const val = await store.get(key);
    return val as Settings[K] | null;
  };
  const set = async <K extends keyof Settings>(key: K, val: Settings[K]) => {
    await store.set(key, val);
  };
  return { get, set };
};
