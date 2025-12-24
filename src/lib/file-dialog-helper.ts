import { basename } from "@tauri-apps/api/path";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
export const onOpenFileDialog = async (
  callback: (name: string, content: string, path: string) => void,
) => {
  try {
    const file = await open({
      multiple: false,
      directory: false,
      filters: [
        { name: "Text", extensions: ["txt", "md"] },
        { name: "JSON", extensions: ["json"] },
        { name: "XML", extensions: ["xml", "xaml"] },
        { name: "HTML", extensions: ["htm", "html"] },
        { name: "All files", extensions: ["*"] },
      ],
    });

    if (!file) return;
    const data = await readTextFile(file);
    callback(await basename(file), data, file);
  } catch (err) {
    console.error(err);
  }
};
export const onSaveFileDialog = async (
  content: string,
  callback: (name: string, path: string) => void,
) => {
  try {
    const filePath = await save({
      filters: [
        { name: "Text", extensions: ["txt", "md"] },
        { name: "JSON", extensions: ["json"] },
        { name: "XML", extensions: ["xml", "xaml"] },
        { name: "HTML", extensions: ["htm", "html"] },
        { name: "All files", extensions: ["*"] },
      ],
    });
    if (filePath) {
      await writeTextFile(filePath, content);
      callback(await basename(filePath), filePath);
    }

    // You can use the file object to read its content
  } catch (err) {
    console.error(err);
  }
};
