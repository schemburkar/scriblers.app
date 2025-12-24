import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tab, useTabs } from "./tab-provider";
import { useTabSwitcher } from "../lib/tab-switch";
import { useEffect } from "react";
import { CircleSmallIcon } from "lucide-react";

const TabSwitcherDialog = ({
  isOpen,
  tabs,
  highlightedId,
}: {
  isOpen: boolean;
  tabs: Map<string, Tab>;
  highlightedId: string | null;
}) => {
  useEffect(() => {
    if (isOpen && highlightedId) {
      const activeElement = document.querySelector(`.switcher .selected`);

      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    }
  }, [highlightedId, isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="max-w-md  max-h-[80dvh] p-1 switcher grid-rows-[auto_1fr] [&_button[data-slot=dialog-close]]:hidden"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <ul
          style={{
            minHeight: tabs.size < 15 ? `${tabs.size * 2.5}rem` : undefined,
          }}
          className={`flex flex-col gap-1 m-2 overflow-auto h-[calc(100%-2rem)]`}
        >
          <>
            {Array.from(tabs.values()).map((tab) => (
              <li
                key={tab.id}
                className={`p-2 rounded transition-colors text-xs border flex gap-1 items-baseline ${
                  highlightedId === tab.id
                    ? "bg-accent border-border selected"
                    : "border-transparent "
                }`}
              >
                <span className="grow ">{tab.name || "Untitled"}</span>
                <span className="text-muted-foreground">
                  <pre>{tab.path || ""}</pre>
                </span>
                {tab.state == "modified" ? (
                  <CircleSmallIcon className="fill-amber-300 stroke-0 size-4 self-center" />
                ) : tab.state == "new" ? (
                  <CircleSmallIcon className="fill-lime-300 stroke-0 size-4 self-center" />
                ) : null}
              </li>
            ))}
          </>
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export const TabHandler = () => {
  const { tabs, selectTab } = useTabs();
  const { isOpen, highlightedId } = useTabSwitcher(tabs, selectTab);

  return (
    <TabSwitcherDialog
      isOpen={isOpen}
      tabs={tabs}
      highlightedId={highlightedId}
    />
  );
};
