import { useTabs } from "@/components/tab-provider";
import { onOpenFileDialog, onSaveFileDialog } from "@/lib/file-dialog-helper";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { useCallback } from "react";

export const useEvents = () => {
  const { getActiveTab, currentId, openFile, saveAsFile, saveFile, text } =
    useTabs();

  const activeTab = getActiveTab();

  const onOpenFile = useCallback(async () => {
    await onOpenFileDialog((name, data, path) => openFile(name, data, path));
  }, []);

  const onSaveFile = useCallback(
    async (createCopy?: boolean) => {
      if (!activeTab) return;
      const { path, content } = activeTab;

      try {
        if (!createCopy && path) {
          await writeTextFile(path, content);
          saveFile();
        } else {
          onSaveFileDialog(content, (name, path) => saveAsFile(name, path));
        }

        // You can use the file object to read its content
      } catch (err) {
        console.error(err);
      }
    },
    [activeTab],
  );
  const reloadFile = useCallback(async () => {
    try {
      if (!activeTab) return;
      const { path } = activeTab;
      if (!path) return;

      const data = await readTextFile(path);
      text(currentId!, data, true);
    } catch (err) {
      console.error(err);
    }
  }, [activeTab]);

  const copyPath = useCallback(async () => {
    if (!activeTab) return;
    const { path } = activeTab;
    await writeText(path!);
  }, [activeTab]);
  const copyName = useCallback(async () => {
    if (!activeTab) return;
    const { name } = activeTab;
    await writeText(name!);
  }, [activeTab]);

  return { onOpenFile, onSaveFile, reloadFile, copyPath, copyName };
};
