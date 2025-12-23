import { ReactNode, use } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRailToggle,
} from "./sidebar";
import { TitleBar, TitleBarButtons } from "./title-bar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "./ui/menubar";
import { Button } from "./ui/button";
import {
  ChevronsLeftIcon,
  ChevronsRightIcon,
  CircleSmallIcon,
  FileCodeIcon,
  FileIcon,
  FileJsonIcon,
  MoonIcon,
  NotebookIcon,
  SunIcon,
  XIcon,
} from "lucide-react";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import { basename } from "@tauri-apps/api/path";

import { useTabs } from "@/components/tab-provider";
import { cn } from "@/lib/utils";

export const Tabs = ({ children }: { children?: ReactNode }) => {
  const {
    openFile,
    tabs,
    currentId,
    selectTab,
    newTab,
    closeTab,
    saveAsFile,
    saveFile,
    toggleTheme,
  } = useTabs();

  if (!currentId) return null;

  const activeTab = tabs.get(currentId);

  if (!activeTab) return null;

  const { id, name, path, content, state } = activeTab;
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
    <section>
      <TitleBar>
        <Menubar className="rounded-none z-30 w-full bg-background">
          <MenubarMenu>
            <NotebookIcon /> Scriblers
          </MenubarMenu>
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
              {" "}
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              {" "}
              <MenubarItem>Print</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <TitleBarButtons />
        </Menubar>
      </TitleBar>

      <main className="flex ">
        <SidebarProvider>
          <Sidebar collapsible="icon">
            <SidebarContent>
              <SidebarGroup className="gap-1 overflow-hidden">
                <SidebarRailToggle className="flex items-center">
                  <span className="grow group-data-[collapsible=icon]:hidden text-xs">
                    Files
                  </span>
                  <Button
                    className="bg-background/50 w-8 group-data-[collapsible=icon]:w-full size-6"
                    variant={"outline"}
                    size={"icon-sm"}
                  >
                    <span className="group-data-[collapsible=icon]:hidden">
                      <ChevronsLeftIcon />
                    </span>
                    <span className="hidden group-data-[collapsible=icon]:block">
                      <ChevronsRightIcon />
                    </span>
                  </Button>
                </SidebarRailToggle>

                <SidebarGroupContent>
                  <SidebarMenu className="h-[calc(100vh-8rem)] overflow-auto">
                    {Array.from(tabs.keys()).map((key, index) => {
                      const item = tabs.get(key);
                      if (!item) return;
                      return (
                        <SidebarMenuItem
                          title={`${item.name}`}
                          onClick={() => selectTab(item.id)}
                          data-is-selected={item.id === id}
                          className={cn(
                            " border border-transparent rounded flex hover:[&_.badge]:hidden hover:[&_.close]:bg-accent not-hover:[&_.close]:hidden pr-2  hover:bg-accent/90",
                            item.id === id ? " border-border bg-accent" : "",
                          )}
                          key={`${index}-${item.id}`}
                        >
                          <SidebarMenuButton className="text-xs pl-1! group-data-[collapsible=icon]:whitespace-nowrap group-data-[collapsible=icon]:overflow-hidden group-data-[collapsible=icon]:truncate">
                            {item.name.endsWith(".json") ? (
                              <FileJsonIcon />
                            ) : item.name.endsWith(".xml") ? (
                              <FileCodeIcon />
                            ) : (
                              <FileIcon />
                            )}

                            {item.name}
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
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <Button
                className="bg-background/50  size-6"
                variant={"outline"}
                size={"icon-sm"}
                onClick={toggleTheme}
              >
                <SunIcon className="not-dark:hidden" />
                <MoonIcon className="dark:hidden" />
              </Button>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
        {/*{current?.id}*/}
        {/*{JSON.stringify(tabs.map((a) => a.name))}*/}
        {/*{JSON.stringify(tabs.map((a) => a.path))}*/}
        {/*JSON.stringify(current?.name)}*/}
        {children}
      </main>
      {/*<div className=" sticky bottom-0 flex gap-4 right-0">
        <span>{path}</span>
        <span>{name}</span>
        <span>{state || "-"}</span>
      </div>*/}
    </section>
  );
};
