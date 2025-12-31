import {
  CircleSmallIcon,
  CopyIcon,
  FileCodeIcon,
  FileEdit,
  FileIcon,
  FileJsonIcon,
  RefreshCwIcon,
  SaveAll,
  SaveIcon,
  SquareSquareIcon,
  XIcon,
  XSquareIcon,
} from "lucide-react";
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { Tab, useTabs } from "./tab-provider";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { MenubarShortcut } from "./ui/menubar";
import { useEvents } from "@/lib/events";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { RenameFile } from "./rename-dialog";

export const FileTab = ({ item, index }: { item: Tab; index: number }) => {
  const { currentId, selectTab, closeTab, duplicate, rename } = useTabs();
  const { onSaveFile, reloadFile, copyPath, copyName } = useEvents()!;

  if (!currentId) return null;

  const selected = currentId === item.id;
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <SidebarMenuItem
          title={`${item.name}`}
          onClick={() => selectTab(item.id)}
          data-is-selected={item.id === currentId}
          className={cn(
            " border border-transparent rounded flex hover:[&_.badge]:hidden hover:[&_.close]:bg-accent not-hover:[&_.close]:hidden pr-2  hover:bg-accent/90",
            item.id === currentId ? " border-border bg-accent" : "",
          )}
          key={`${index}-${item.id}`}
        >
          <SidebarMenuButton className="text-xs px-1! group-data-[collapsible=icon]:whitespace-nowrap group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:truncate">
            {item.name.endsWith(".json") ? (
              <FileJsonIcon />
            ) : item.name.endsWith(".xml") ? (
              <FileCodeIcon />
            ) : (
              <FileIcon />
            )}
            <span className="mr-2">{item.name}</span>
          </SidebarMenuButton>
          <SidebarMenuBadge className="badge">
            {item.state == "modified" ? (
              <CircleSmallIcon className="fill-amber-300 stroke-0 size-4" />
            ) : item.state == "new" ? (
              <CircleSmallIcon className="fill-lime-300 stroke-0 size-4" />
            ) : null}
          </SidebarMenuBadge>
          <SidebarMenuBadge
            className="close pointer-events-auto"
            title={`Close ${item.name}`}
          >
            <Button
              className="size-4 cursor-pointer [&_svg]:stroke-accent-foreground/50 hover:[&_svg]:stroke-destructive"
              variant={"ghost"}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                closeTab(item.id, index);
              }}
            >
              <XIcon className="ml-1.5" />
            </Button>
          </SidebarMenuBadge>
        </SidebarMenuItem>
      </ContextMenuTrigger>
      <Dialog>
        <ContextMenuContent className="**:text-xs">
          <ContextMenuLabel>{item.name}</ContextMenuLabel>
          <ContextMenuItem onClick={() => onSaveFile()}>
            <SaveIcon /> Save <MenubarShortcut>Ctrl + S</MenubarShortcut>
          </ContextMenuItem>
          <ContextMenuItem onClick={() => onSaveFile(true)}>
            <SaveAll /> Save As{" "}
            <MenubarShortcut>Ctrl + Shift + S</MenubarShortcut>
          </ContextMenuItem>
          <ContextMenuSeparator />
          <DialogTrigger asChild>
            <ContextMenuItem disabled={!item.path}>
              <FileEdit /> Rename
            </ContextMenuItem>
          </DialogTrigger>
          <ContextMenuItem disabled={!item.path} onClick={reloadFile}>
            <RefreshCwIcon /> Reload
          </ContextMenuItem>
          <ContextMenuItem onClick={() => duplicate(currentId!)}>
            <SquareSquareIcon /> Duplicate
          </ContextMenuItem>
          <ContextMenuSeparator />

          <ContextMenuItem disabled={!item.path} onClick={copyPath}>
            <CopyIcon /> Copy Path
          </ContextMenuItem>
          <ContextMenuItem disabled={!item.path} onClick={copyName}>
            <CopyIcon /> Copy File Name
          </ContextMenuItem>
          <ContextMenuSeparator />
          <ContextMenuItem onClick={() => closeTab(currentId!)}>
            <XSquareIcon /> Close{" "}
            {selected ? (
              <>
                {" this tab"} <MenubarShortcut>Ctrl + W</MenubarShortcut>
              </>
            ) : null}
          </ContextMenuItem>
        </ContextMenuContent>
        <RenameFile name={item.name} onSubmit={(n) => rename(currentId, n)} />
      </Dialog>
    </ContextMenu>
  );
};
