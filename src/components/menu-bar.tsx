import { Activity, ReactNode, useState } from "react";
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
import { message } from "@tauri-apps/plugin-dialog";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
export const MenuBar = ({
  title,
  header,
  children,
}: {
  title: ReactNode;
  header?: ReactNode;
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
  const [dialogType, setDialogType] = useState<
    "" | "about" | "keyboard-shortcuts"
  >("");
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
    text(currentId!, newValue, undefined, true);

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
      text(currentId!, newValue, undefined, true);

      setSelection(start, start);
    }
  };

  const selectAll = () => {
    const textarea = TextAreaElement();
    setSelection(0, textarea.value.length);
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
      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>

        <Dialog>
          <MenubarContent>
            <DialogTrigger
              onClick={() => setDialogType("keyboard-shortcuts")}
              asChild
            >
              <MenubarItem>Keyboard shortcuts</MenubarItem>
            </DialogTrigger>
            <DialogTrigger onClick={() => setDialogType("about")} asChild>
              <MenubarItem>About</MenubarItem>
            </DialogTrigger>
          </MenubarContent>

          <DialogContent data-dialog-type={dialogType}>
            <Activity mode={dialogType == "about" ? "visible" : "hidden"}>
              <DialogHeader>
                {" "}
                <DialogTitle>Scriblers v0.1.0</DialogTitle>
                <DialogDescription>
                  Scriblers is a blazing-fast, lightweight tabbed notepad
                  application built with Tauri, React, and TypeScript. Designed
                  for distraction-free writing, it combines the performance of
                  Rust with a modern, responsive UI.
                </DialogDescription>
                <DialogDescription>
                  Distributed under the GNU AGPLv3 License. See{" "}
                  <a
                    target="_blank"
                    className="hover:underline"
                    href="https://github.com/schemburkar/scriblers.app/LICENSE"
                  >
                    LICENSE
                  </a>{" "}
                  for more information.{" "}
                </DialogDescription>
                <DialogDescription>
                  Created by{" "}
                  <a
                    target="_blank"
                    className="hover:underline"
                    href="https://x.com/shubhan3009"
                  >
                    x.com/shubhan3009
                  </a>
                </DialogDescription>
                <DialogDescription>Open source credits</DialogDescription>
              </DialogHeader>
            </Activity>
            <Activity
              mode={dialogType == "keyboard-shortcuts" ? "visible" : "hidden"}
            >
              <DialogHeader>
                {" "}
                <DialogTitle>Keyboard shortcuts</DialogTitle>
              </DialogHeader>
              <table className="table-auto border [&_td]:border [&_tr]:border **:p-2 [&_td]:first:font-mono">
                <tr>
                  <th>Shortcut</th>
                  <th>Action</th>
                </tr>
                <tr>
                  <td>Ctrl + N </td>
                  <td>New Tab </td>
                </tr>
                <tr>
                  <td>Ctrl + Tab</td>
                  <td>Switch Tabs</td>
                </tr>
                <tr>
                  <td>Ctrl + S </td>
                  <td>Save File </td>
                </tr>
                <tr>
                  <td>Ctrl + W </td>
                  <td>Close Current Tab </td>
                </tr>
                <tr>
                  <td> Ctrl + T </td>
                  <td>Toggle Dark Mode </td>
                </tr>
                <tr>
                  <td>Ctrl + Shift + S </td>
                  <td>Save File As</td>
                </tr>
                <tr>
                  <td> Ctrl + B </td>
                  <td>Toggle Sidebar</td>
                </tr>
                {/*<tr>
                      <td></td>
                      <td></td>
                    </tr>*/}
              </table>
            </Activity>
          </DialogContent>
        </Dialog>
      </MenubarMenu>
      <span className="w-full flex items-baseline justify-center gap-1">
        {header}
      </span>
      {children}
    </Menubar>
  );
};
