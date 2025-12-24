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
import { useZoom } from "./zoom-provider";
import { SidebarMenuBadge } from "./sidebar";
import { CheckIcon } from "lucide-react";
import { writeText, readText } from "@tauri-apps/plugin-clipboard-manager";
import {
  TextAreaElement,
  getSelection,
  setSelection,
} from "../lib/text-area-helper";
export const MenuBar = ({
  title,
  children,
}: {
  title: ReactNode;
  children: ReactNode;
}) => {
  const {
    currentId,
    openFile,
    toggleTheme,
    newTab,
    saveAsFile,
    saveFile,
    text,
  } = useTabs();

  const {
    zoomIn,
    zoomOut,
    reset,
    spellCheck,
    toggleSpellCheck,
    wordWrap,
    toggleWordWrap,
  } = useZoom();
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
          { name: "HTML", extensions: ["htm", "html"] },
          { name: "All files", extensions: ["*"] },
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

  const reloadFile = async () => {
    try {
      if (!path) return;

      const data = await readTextFile(path);
      text(currentId!, data, true);
    } catch (err) {
      console.error(err);
    }
  };

  const copy = async () => {
    const textarea = TextAreaElement();
    const [start, end] = getSelection();
    const selectedText = textarea.value.substring(start, end);

    if (selectedText) {
      await writeText(selectedText);
    }
  };

  const paste = async () => {
    const copiedText = await readText();
    if (!copiedText) return;

    const textarea = TextAreaElement();
    const [start, end] = getSelection();

    const newValue = `${textarea.value.substring(0, +start)}${copiedText}${textarea.value.substring(+end)}`;
    text(currentId!, newValue);

    const newCursorPos = start + copiedText.length;
    setSelection(newCursorPos, newCursorPos);
  };

  const cut = async () => {
    const textarea = TextAreaElement();

    const [start, end] = getSelection();

    const selectedText = textarea.value.substring(start, end);

    if (selectedText) {
      await writeText(selectedText);
      const newValue = `${textarea.value.substring(0, start)}${textarea.value.substring(end)}`;
      text(currentId!, newValue);

      setSelection(start, start);
    }
  };

  const selectAll = () => {
    const textarea = TextAreaElement();
    setSelection(0, textarea.value.length);
  };
  const onSaveFile = async (createCopy?: boolean) => {
    try {
      if (!createCopy && path) {
        await writeTextFile(path, content);
        saveFile();
      } else {
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
      <MenubarMenu>{title}</MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => newTab()}>New File</MenubarItem>
          <MenubarItem onClick={() => onOpenFile()}>Open File</MenubarItem>
          <MenubarItem onClick={() => onSaveFile()}>Save</MenubarItem>
          <MenubarItem onClick={() => onSaveFile(true)}>Save As</MenubarItem>
          <MenubarItem onClick={() => {}}>Duplicate</MenubarItem>
          <MenubarItem onClick={reloadFile}>Reload File</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Copy Path</MenubarItem>
          <MenubarItem>Copy File Name</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Close tab</MenubarItem>
          <MenubarItem>Close window</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={cut}>Cut</MenubarItem>
          <MenubarItem onClick={copy}>Copy</MenubarItem>
          <MenubarItem onClick={paste}>Paste</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Find</MenubarItem>
          <MenubarItem onClick={selectAll}>Select All</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={zoomIn}>Zoom In</MenubarItem>
          <MenubarItem onClick={zoomOut}>Zoom Out</MenubarItem>
          <MenubarItem onClick={reset}>Reset Zoom</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={toggleTheme}>Toggle Theme</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={toggleWordWrap}>
            Word wrap
            {wordWrap && (
              <SidebarMenuBadge>
                <CheckIcon />
              </SidebarMenuBadge>
            )}
          </MenubarItem>
          <MenubarItem onClick={toggleSpellCheck}>
            Spell Check
            {spellCheck && (
              <SidebarMenuBadge>
                <CheckIcon />
              </SidebarMenuBadge>
            )}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      {children}
    </Menubar>
  );
};
