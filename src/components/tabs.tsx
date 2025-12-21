import { ReactNode } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
} from "./ui/sidebar";
import { TitleBar, TitleBarButtons } from "./title-bar";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "./ui/menubar";
import { Button } from "./ui/button";
import { NotebookIcon } from "lucide-react";
const tab = {
  name: "a",
  state: "M",
};
const tabs = [tab, tab, tab, tab, tab, tab, tab];
export const Tabs = ({ children }: { children?: ReactNode }) => {
  return (
    <SidebarProvider className="min-h-[calc(100lvh-2.2.25rem)]">
      <Sidebar collapsible="icon" className="mt-10 ">
        <SidebarHeader data-tauri-drag-region className="p-0">
          <TitleBar>
            <Menubar className="rounded-none z-30 w-full">
              <MenubarMenu>
                <NotebookIcon /> Scriblers
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger>File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={() => {}}>Open File</MenubarItem>
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
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Changes</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {tabs.map((item, index) => (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton>
                      {/*<File />*/}
                      {item.name}
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{item.state}</SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel className="group-data-[collapsible=icon]:mt-8">
              Changes2
            </SidebarGroupLabel>
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
            a
          </Button>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>{children} </SidebarInset>
      {/*<SidebarInset>
        <SidebarHeader data-tauri-drag-region>
          <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <div className="bg-yellow-200 h-2"></div>s
          </header>
        </SidebarHeader>
      </SidebarInset>*/}
    </SidebarProvider>
  );
};
