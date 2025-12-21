import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { Tabs } from "./components/tabs";
import { Textarea } from "./components/ui/textarea";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <>
      <Tabs>
        <div className="w-full  flex flex-col h-[calc(100lvh-2.25rem)]">
          <Textarea className="resize-none font-mono flex overflow-auto p-2 h-full content-div w-[calc(100dvw-var(--sidebar-width))] group-has-data-[state='collapsed']/root:w-[calc(100dvw-var(--sidebar-width-icon))] "></Textarea>
        </div>
      </Tabs>
    </>
  );
}

export default App;
