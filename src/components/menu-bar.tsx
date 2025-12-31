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
import { useTabs } from "./tab-provider";
import { useZoom } from "./zoom-provider";
import { SidebarMenuBadge } from "./sidebar";
import {
  ArrowUpRightFromSquareIcon,
  CheckIcon,
  CircleQuestionMarkIcon,
  CopyIcon,
  DownloadIcon,
  FileEdit,
  FileIcon,
  GlobeIcon,
  KeyboardIcon,
  LetterTextIcon,
  PaletteIcon,
  PlusIcon,
  RefreshCwIcon,
  SaveAll,
  SaveIcon,
  SpellCheckIcon,
  SquareSquareIcon,
  XCircleIcon,
  XSquareIcon,
  ZoomInIcon,
  ZoomOutIcon,
} from "lucide-react";
import { writeText, readText } from "@tauri-apps/plugin-clipboard-manager";
import {
  TextAreaElement,
  getSelection,
  setSelection,
} from "../lib/text-area-helper";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { useKeyboardShortcuts } from "@/lib/tab-switch";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { useEvents } from "@/lib/events";
import { RenameFile } from "./rename-dialog";
import { UpdaterDialog } from "./updater-dialog";
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
    getActiveTab,
    currentId,
    toggleTheme,
    newTab,
    text,
    closeTab,
    duplicate,
    rename,
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
  const [dialogType, setDialogType] = useState<
    "" | "about" | "keyboard-shortcuts" | "update"
  >("");

  const e = useEvents();

  useKeyboardShortcuts();

  const { onOpenFile, onSaveFile, reloadFile, copyPath, copyName } = e;

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

  const activeTab = getActiveTab();
  if (!activeTab) return;
  const { name, path } = activeTab;

  return (
    <Menubar
      data-tauri-drag-region
      className="rounded-none z-30 w-full bg-background  h-7.5"
    >
      <MenubarMenu> {title}</MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="text-xs">File</MenubarTrigger>
        <Dialog>
          <MenubarContent className="**:text-xs">
            <MenubarItem onClick={() => newTab()}>
              <PlusIcon /> New File<MenubarShortcut>Ctrl + N</MenubarShortcut>
              {/*⌘*/}
            </MenubarItem>
            <MenubarItem onClick={() => onOpenFile()}>
              <FileIcon /> Open File
            </MenubarItem>
            <MenubarItem onClick={() => onSaveFile()}>
              <SaveIcon />
              Save<MenubarShortcut>Ctrl + S</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={() => onSaveFile(true)}>
              <SaveAll />
              Save As<MenubarShortcut>Ctrl + Shift + S</MenubarShortcut>
            </MenubarItem>
            <MenubarSeparator />
            <>
              <DialogTrigger asChild>
                <MenubarItem disabled={!path}>
                  <FileEdit />
                  Rename
                </MenubarItem>
              </DialogTrigger>
            </>
            <MenubarItem disabled={!path} onClick={reloadFile}>
              <RefreshCwIcon />
              Reload File
            </MenubarItem>
            <MenubarItem onClick={() => duplicate(currentId)}>
              <SquareSquareIcon />
              Duplicate
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled={!path} onClick={copyPath}>
              <CopyIcon /> Copy Path
            </MenubarItem>
            <MenubarItem onClick={copyName}>
              <CopyIcon /> Copy File Name
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => closeTab(currentId)}>
              <XSquareIcon /> Close tab
              <MenubarShortcut>Ctrl + W</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={() => getCurrentWindow().close()}>
              <XCircleIcon /> Close window
            </MenubarItem>
          </MenubarContent>
          <RenameFile name={name} onSubmit={(n) => rename(currentId, n)} />
        </Dialog>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger className="text-xs">Edit</MenubarTrigger>
        <MenubarContent className="**:text-xs">
          <MenubarItem onClick={cut}>Cut</MenubarItem>
          <MenubarItem onClick={copy}>Copy</MenubarItem>
          <MenubarItem onClick={paste}>Paste</MenubarItem>
          <MenubarSeparator />
          <MenubarItem disabled>Find</MenubarItem>
          <MenubarItem onClick={selectAll}>Select All</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="text-xs">View</MenubarTrigger>
        <MenubarContent className="**:text-xs">
          <MenubarItem onClick={zoomIn}>
            {" "}
            <ZoomInIcon /> Zoom In
          </MenubarItem>
          <MenubarItem onClick={zoomOut}>
            {" "}
            <ZoomOutIcon /> Zoom Out
          </MenubarItem>
          <MenubarItem onClick={reset}>Reset Zoom</MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={toggleTheme}>
            <PaletteIcon /> Toggle Theme
            <MenubarShortcut>Ctrl + T</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={toggleWordWrap}>
            <LetterTextIcon className="stroke-muted-foreground" /> Word wrap
            {wordWrap && (
              <SidebarMenuBadge>
                <CheckIcon />
              </SidebarMenuBadge>
            )}
          </MenubarItem>
          <MenubarItem onClick={toggleSpellCheck}>
            <SpellCheckIcon /> Spell Check
            {spellCheck && (
              <SidebarMenuBadge>
                <CheckIcon />
              </SidebarMenuBadge>
            )}
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger className="text-xs">Help</MenubarTrigger>

        <Dialog>
          <MenubarContent className="**:text-xs">
            <DialogTrigger onClick={() => setDialogType("update")} asChild>
              <MenubarItem>
                <DownloadIcon /> Check for updates
              </MenubarItem>
            </DialogTrigger>
            <DialogTrigger
              onClick={() => setDialogType("keyboard-shortcuts")}
              asChild
            >
              <MenubarItem>
                <KeyboardIcon /> Keyboard shortcuts
              </MenubarItem>
            </DialogTrigger>
            <DialogTrigger onClick={() => setDialogType("about")} asChild>
              <MenubarItem>
                <CircleQuestionMarkIcon /> About
              </MenubarItem>
            </DialogTrigger>
            <a href="https://scriblers.app?rel=app" target="_blank">
              <MenubarItem>
                <GlobeIcon /> scriblers.app{" "}
                <SidebarMenuBadge>
                  <ArrowUpRightFromSquareIcon className="size-3 self-baseline-last " />
                </SidebarMenuBadge>
              </MenubarItem>
            </a>
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
                    href="https://github.com/schemburkar/scriblers.app/blob/main/LICENSE"
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
              <table className=" text-xs table-auto border [&_td]:border [&_tr]:border **:p-2 [&_td]:first:font-mono">
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
            <Activity mode={dialogType == "update" ? "visible" : "hidden"}>
              <UpdaterDialog />
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
