import { ReactNode } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { basename } from "@tauri-apps/api/path";
import { useActiveTab, useTabs } from "./tab-provider";
export const MenuBar = ({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) => {
  const {
    openFile,

    newTab,
    saveAsFile,
    saveFile,
  } = useTabs();

  const activeTab = useActiveTab();
  if (!activeTab) return null;

  const { path, content } = activeTab;

  const onOpenFile = async () => {
    try {
      // Show the file picker dialog
      const file = await open({
        multiple: false,
        directory: false,
        filters: [
          { name: "Text", extensions: ["txt", "md"] },
          { name: "JSON", extensions: ["json"] },
          { name: "XML", extensions: ["xml", "xaml"] },
        ],
      });
      console.log(file);
      if (!file) return;
      const data = await readTextFile(file);
      openFile(await basename(file), data, file);

      // You can use the file object to read its content
    } catch (err) {
      console.error(err);
    }
  };

  const onSaveFile = async () => {
    try {
      if (path) {
        await writeTextFile(path, content);
        saveFile();
      } else {
        const filePath = await save({
          filters: [
            { name: "Text", extensions: ["txt", "md"] },
            { name: "JSON", extensions: ["json"] },
            { name: "XML", extensions: ["xml", "xaml"] },
          ],
        });
        if (filePath) {
          await writeTextFile(filePath, content);
          saveAsFile(await basename(filePath), filePath);
        }
      }

      // You can use the file object to read its content
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Menubar
      data-tauri-drag-region
      className="rounded-none z-30 w-full bg-background"
    >
      <MenubarMenu >{title}</MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => onOpenFile()}>Open File</MenubarItem>
          <MenubarItem onClick={() => newTab()}>New File</MenubarItem>
          <MenubarItem onClick={() => onSaveFile()}>Save</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {children}
      {/*<TitleBarButtons />*/}
    </Menubar>
  );
};
