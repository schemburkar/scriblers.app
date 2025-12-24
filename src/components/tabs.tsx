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
  MoonIcon,
  SunIcon,
} from "lucide-react";

import { useTabs } from "@/components/tab-provider";
import { FileTab } from "./file-tab";

export const Tabs = () => {
  const { tabs, currentId, toggleTheme } = useTabs();

  if (!currentId) return null;

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
              <SidebarMenu className="h-[calc(100vh-7.5rem)] overflow-auto">
                {Array.from(tabs.keys()).map((key, index) => {
                  const item = tabs.get(key);
                  if (!item) return;
                  return <FileTab key={key} item={item} index={index} />;
                })}
              </SidebarMenu>
            </SidebarGroupContent>
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
