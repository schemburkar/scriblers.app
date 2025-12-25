import { ReactNode } from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
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
import { getCurrentWindow } from "@tauri-apps/api/window";
import { onOpenFileDialog, onSaveFileDialog } from "@/lib/file-dialog-helper";
import { useKeyboardShortcuts } from "@/lib/tab-switch";
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
    closeTab,
    duplicate,
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

  const { name, path, content } = activeTab;

  const onOpenFile = async () => {
    await onOpenFileDialog((name, data, path) => openFile(name, data, path));
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
        onSaveFileDialog(content, (name, path) => saveAsFile(name, path));
      }

      // You can use the file object to read its content
    } catch (err) {
      console.error(err);
    }
  };
  useKeyboardShortcuts({
    newTab,
    onSaveFile,
    closeTab,
    toggleTheme,
    currentId,
  });

  return (
    <Menubar
      data-tauri-drag-region
      className="rounded-none z-30 w-full bg-background"
    >
      <MenubarMenu>{title}</MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={() => newTab()}>
            New File<MenubarShortcut>Ctrl + N</MenubarShortcut>
            {/*⌘*/}
          </MenubarItem>
          <MenubarItem onClick={() => onOpenFile()}>Open File</MenubarItem>
          <MenubarItem onClick={() => onSaveFile()}>
            Save<MenubarShortcut>Ctrl + S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => onSaveFile(true)}>
            Save As<MenubarShortcut>Ctrl + Shift + S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => duplicate(currentId!)}>
            Duplicate
          </MenubarItem>
          <MenubarItem disabled={!path} onClick={reloadFile}>
            Reload File
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem
            disabled={!path}
            onClick={async () => await writeText(path!)}
          >
            Copy Path
          </MenubarItem>
          <MenubarItem onClick={async () => await writeText(name)}>
            Copy File Name
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={() => closeTab(currentId!)}>
            Close tab<MenubarShortcut>Ctrl + W</MenubarShortcut>
          </MenubarItem>
          <MenubarItem onClick={() => getCurrentWindow().close()}>
            Close window
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={cut}>Cut</MenubarItem>
          <MenubarItem onClick={copy}>Copy</MenubarItem>
          <MenubarItem onClick={paste}>Paste</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Find</MenubarItem>
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
          <MenubarItem onClick={toggleTheme}>
            Toggle Theme<MenubarShortcut>Ctrl + T</MenubarShortcut>
          </MenubarItem>
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
