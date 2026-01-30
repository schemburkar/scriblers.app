import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarProvider,
  SidebarRailToggle,
} from "./sidebar";

import { Button } from "./ui/button";
import {
  ChevronsLeftIcon,
  ChevronsRightIcon,
  FileIcon,
  MoonIcon,
  PlusIcon,
  SunIcon,
} from "lucide-react";

import { useTabs } from "@/components/tab-provider";
import { FileTab } from "./file-tab";
import { ButtonGroup } from "./ui/button-group";
import { onOpenFileDialog } from "@/lib/file-dialog-helper";

export const Tabs = () => {
  const { tabs, toggleTheme, newTab, openFile } = useTabs();

  const onOpenFile = async () => {
    await onOpenFileDialog((name, data, path) => openFile(name, data, path));
  };
  return (
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
              <SidebarMenu className="max-h-[calc(100vh-10.5rem)] group-data-[collapsible=icon]:max-h-[calc(100vh-12.5rem)] overflow-auto p-0.5">
                {Array.from(tabs.keys()).map((key, index) => {
                  const item = tabs.get(key);
                  if (!item) return;
                  return <FileTab key={key} item={item} index={index} />;
                })}
              </SidebarMenu>
            </SidebarGroupContent>
            <ButtonGroup className="w-full group-data-[collapsible=icon]:flex-col font-normal bg-accent mt-2">
              <Button
                title="New Tab"
                onClick={newTab}
                className="bg-background/50 px-1! not-group-data-[collapsible=icon]:w-1/2 text-xs group-data-[collapsible=icon]:rounded-t! group-data-[collapsible=icon]:rounded-b-none group-data-[collapsible=icon]:border-t"
                variant={"outline"}
                size={"sm"}
              >
                <PlusIcon className="size-3 group-data-[collapsible=icon]:size-3.5 group-data-[collapsible=icon]:w-full" />
                <span className="group-data-[collapsible=icon]:hidden font-normal">
                  New Tab
                </span>
              </Button>
              <Button
                title="Open File"
                onClick={onOpenFile}
                className="bg-background/50 px-1! not-group-data-[collapsible=icon]:w-1/2 pl-1.5! text-xs group-data-[collapsible=icon]:rounded-b! group-data-[collapsible=icon]:rounded-t-none! group-data-[collapsible=icon]:border-l! group-data-[collapsible=icon]:border-t-0!"
                variant={"outline"}
                size={"sm"}
              >
                <FileIcon className="size-3 group-data-[collapsible=icon]:size-3.5 group-data-[collapsible=icon]:w-full" />
                <span className="group-data-[collapsible=icon]:hidden font-normal">
                  Open File
                </span>
              </Button>
            </ButtonGroup>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="">
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
  );
};
