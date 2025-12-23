import "./App.css";
import { Tabs } from "./components/tabs";
import { Textarea } from "./components/ui/textarea";
import { TabProvider, useTabs } from "./components/tab-provider";
import { useZoom, ZoomProvider } from "./components/zoom-provider";
import { Button } from "./components/ui/button";
import { ZoomInIcon, ZoomOutIcon } from "lucide-react";

function App() {
  return (
    <TabProvider>
      <ZoomProvider>
        <Tabs>
          <div className="w-full flex flex-col h-[calc(100lvh-2.25rem)] overflow-hidden">
            {/*<div className=" w-10 bg-sidebar-accent text-right text-accent-foreground pr-3 pt-2.5 font-mono text-sm  pointer-events-none select-none md:text-sm">
            {Array.from({ length: lines }, (_, i) => i + 1).map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>*/}

            <Text />
          </div>
        </Tabs>
      </ZoomProvider>
    </TabProvider>
  );
}

const Text = () => {
  const { currentId, text, tabs } = useTabs();
  const { zoom, zoomIn, zoomOut } = useZoom();
  if (!currentId) return null;
  const activeTab = tabs.get(currentId);
  if (!activeTab) return null;
  const { name, path, state } = activeTab;
  return (
    <>
      <Textarea
        onChange={(e) => {
          text(currentId, e.target.value);
        }}
        value={activeTab.content}
        style={{ zoom: zoom / 100 }}
        className=" whitespace-pre dark:bg-background/85 rounded-none focus-visible:ring-[1px] m-0.5  border-none dark:border-none focus-visible:ring-black-200  resize-none font-mono flex overflow-auto p-2  h-full content-div w-[calc(100dvw-var(--sidebar-width))] group-has-data-[state='collapsed']/root:w-[calc(100dvw-var(--sidebar-width-icon))] "
      ></Textarea>
      <footer className="bg-accent text-xs flex py-0.5 px-1 gap-2">
        <span>
          <pre>{name}</pre>
        </span>
        <span className="border-r h-full" />
        <span>
          <pre>{path}</pre>
        </span>
        <span className="border-r h-full" />
        <span>
          <pre>
            {state == "modified" ? "Edited" : state === "new" ? "New" : "Saved"}
          </pre>
        </span>
        <span className="border-r h-full" />
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
export default App;
