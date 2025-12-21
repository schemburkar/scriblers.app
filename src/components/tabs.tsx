import { ReactNode } from "react";
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
  FileIcon,
  MoonIcon,
  NotebookIcon,
  SunIcon,
} from "lucide-react";
import { open } from "@tauri-apps/plugin-dialog";
import { readTextFile } from "@tauri-apps/plugin-fs";
import { basename } from "@tauri-apps/api/path";

import { useTabs } from "@/components/tab-provider";
import { cn } from "@/lib/utils";

const tab = {
  name: "a",
  state: "M",
};
export const Tabs = ({ children }: { children?: ReactNode }) => {
  const { openFile, tabs, current, select, newTab } = useTabs();
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
              <MenubarItem>New Window</MenubarItem>
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
              <SidebarGroup className="gap-1">
                <SidebarRailToggle className="flex items-center">
                  <span className="grow group-data-[collapsible=icon]:hidden text-xs">
                    Files
                  </span>
                  <Button
                    className="bg-background/50 w-8 group-data-[collapsible=icon]:w-full "
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
                  <SidebarMenu>
                    {tabs.map((item, index) => (
                      <SidebarMenuItem
                        onClick={() => select(item)}
                        data-is-selected={item.id === current?.id}
                        className={cn(
                          "border border-transparent rounded ",
                          item.id === current?.id
                            ? " border-border bg-accent"
                            : "",
                        )}
                        key={`${index}-${item.id}`}
                      >
                        <SidebarMenuButton className="text-xs">
                          <FileIcon />
                          {item.name}
                        </SidebarMenuButton>
                        <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <Button
                className="bg-background/50  size-6"
                variant={"outline"}
                size={"icon-sm"}
                onClick={() =>
                  !document.documentElement.classList.contains("dark")
                    ? document.documentElement.classList.add("dark")
                    : document.documentElement.classList.remove("dark")
                }
              >
                <SunIcon className="not-dark:hidden" />
                <MoonIcon className="dark:hidden" />
              </Button>
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>
        {/*{current?.id}*/}
        {/*{JSON.stringify(tabs.map((a) => a.name))}*/}
        {/*JSON.stringify(current?.name)}*/}
        {children}
      </main>
    </section>
  );
};
