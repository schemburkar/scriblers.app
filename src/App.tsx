import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Tabs } from "./components/tabs";
import { Textarea } from "./components/ui/textarea";
import { TabProvider, useTabs } from "./components/tab-provider";

function App() {
  return (
    <TabProvider>
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
    </TabProvider>
  );
}

const Text = () => {
  const { current, text } = useTabs();
  return (
    <Textarea
      onChange={(e) => {
        text(e.target.value);
      }}
      value={current?.content}
      className="whitespace-pre dark:bg-background/85 rounded-none focus-visible:ring-[1px] m-0.5 rounded-br border-none dark:border-none focus-visible:ring-black-200  resize-none font-mono flex overflow-auto p-2  h-full content-div w-[calc(100dvw-var(--sidebar-width))] group-has-data-[state='collapsed']/root:w-[calc(100dvw-var(--sidebar-width-icon))] "
    ></Textarea>
  );
};
export default App;
