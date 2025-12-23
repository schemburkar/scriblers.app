import {
  CircleSmallIcon,
  FileCodeIcon,
  FileIcon,
  FileJsonIcon,
  XIcon,
} from "lucide-react";
import {
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./sidebar";
import { Tab, useTabs } from "./tab-provider";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const FileTab = ({ item, index }: { item: Tab; index: number }) => {
  const { currentId, selectTab, closeTab } = useTabs();

  if (!currentId) return null;

  return (
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
  );
};
