import "./App.css";
import { Tabs } from "./components/tabs";
import { TabProvider } from "./components/tab-provider";
import { ZoomProvider } from "./components/zoom-provider";
import { MenuBar } from "./components/menu-bar";
import { TitleBarButtons } from "./components/title-bar-buttons";
import { Text } from "./components/text";
import { TabHandler } from "./components/tab-dialog";
import { Updater } from "./components/updater";
import { FilesIcon } from "lucide-react";

function App() {
  return (
    <TabProvider>
      <ZoomProvider>
        <MenuBar
          title={
            <>
              <img className="size-6" src="/Square71x71Logo.png" />
              <span className="text-xs py-1 font-medium  text-foreground/70">
                Scriblers
              </span>
            </>
          }
          header={<Updater />}
        >
          <TitleBarButtons />
        </MenuBar>
        <main className="flex app">
          <Tabs />
          <div className="w-full flex flex-col h-[calc(100lvh-1.9rem)] overflow-hidden">
            <Text />
          </div>
        </main>
        <div className="absolute top-0 bg-accent/90 not-file-view:hidden flex h-dvh w-dvw justify-center items-center">
          <div className="flex flex-col items-center gap-1">
            <FilesIcon /> Drop files here to open/view
          </div>
        </div>
        <TabHandler />
      </ZoomProvider>
    </TabProvider>
  );
}

export default App;
