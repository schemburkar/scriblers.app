import { CircleSmallIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react";
import { useTabs } from "./tab-provider";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useZoom } from "./zoom-provider";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { TextAreaClassName } from "../lib/text-area-helper";

export const Text = () => {
  const { currentId, text, tabs } = useTabs();
  const { zoom, zoomIn, zoomOut, spellCheck, wordWrap } = useZoom();
  // const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!currentId) return;
    const t = document.querySelector(".textarea") as HTMLTextAreaElement;
    t.removeAttribute("selectionStart");
    t.removeAttribute("selectionEnd");
  }, [currentId]);

  if (!currentId) return null;
  const activeTab = tabs.get(currentId);
  if (!activeTab) return null;
  const { name, path, state } = activeTab;

  return (
    <>
      <Textarea
        autoFocus
        onSelect={(e) => {
          e.currentTarget.setAttribute(
            "selectionStart",
            e.currentTarget.selectionStart.toString(),
          );

          e.currentTarget.setAttribute(
            "selectionEnd",
            e.currentTarget.selectionEnd.toString(),
          );
        }}
        onFocusCapture={(e) => {
          const start = e.currentTarget.getAttribute("selectionStart");
          const end = e.currentTarget.getAttribute("selectionEnd");

          start &&
            end &&
            setTimeout(
              () =>
                (
                  document.querySelector(".textarea") as HTMLTextAreaElement
                )?.setSelectionRange(+start, +end),
              5,
            );
        }}
        //  ref={ref}
        spellCheck={spellCheck}
        onChange={(e) => {
          text(currentId, e.target.value);
        }}
        value={activeTab.content}
        style={{ zoom: zoom / 100 }}
        className={cn(
          TextAreaClassName,
          wordWrap ? "whitespace-normal" : " whitespace-pre",
          "dark:bg-background/85 rounded-none focus-visible:ring-[1px]  border-none focus-visible:ring-secondary-foreground/50 ",
          "selection:bg-blue-100 dark:selection:bg-sky-800 ",
          " resize-none font-mono flex overflow-auto p-2  m-0.5 h-full content-div w-[calc(100dvw-var(--sidebar-width))] group-has-data-[state='collapsed']/root:w-[calc(100dvw-var(--sidebar-width-icon))] ",
        )}
      ></Textarea>
      <footer className="bg-accent text-xs flex py-0.5 px-1 gap-2   ">
        <span>
          <pre>
            {activeTab.content.split("\n").length} lines{" "}
            {activeTab.content.length} chars
          </pre>
        </span>
        <span className="border-r border-r-secondary-foreground/50 h-full" />
        <span title={name}>
          <pre>{name}</pre>
        </span>
        <span className="border-r border-r-secondary-foreground/50 h-full" />
        {!!path && (
          <>
            <span className="min-w-0 shrink truncate" title={path}>
              <pre className="truncate">{path}</pre>
            </span>
            <span className="border-r border-r-secondary-foreground/50 h-full" />
          </>
        )}
        <span>
          <pre className="flex items-center">
            {state == "modified" ? (
              <CircleSmallIcon className="fill-amber-300  stroke-1 stroke-amber-500 size-4 inline" />
            ) : state == "new" ? (
              <CircleSmallIcon className="fill-lime-300 stroke-1 stroke-lime-600 size-4 inline" />
            ) : null}
            {state == "modified" ? "Edited" : state === "new" ? "New" : "Saved"}
          </pre>
        </span>
        <span className="border-r border-r-secondary-foreground/50 h-full" />
        <span className="grow min-w-2" />
        <span className="border-r border-r-secondary-foreground/50 h-full" />
        <Button className="size-4" variant={"ghost"} onClick={zoomOut}>
          <ZoomOutIcon />
        </Button>
        <span>
          <pre>{zoom}</pre>
        </span>
        <Button className="size-4" variant={"ghost"} onClick={zoomIn}>
          <ZoomInIcon />
        </Button>
      </footer>
    </>
  );
};
