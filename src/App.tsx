import "./App.css";
import { Tabs } from "./components/tabs";
import { TabProvider } from "./components/tab-provider";
import { ZoomProvider } from "./components/zoom-provider";
import { MenuBar } from "./components/menu-bar";
import { TitleBarButtons } from "./components/title-bar-buttons";
import { Text } from "./components/text";

function App() {
  return (
    <TabProvider>
      <ZoomProvider>
        <MenuBar
          title={
            <>
              <img className="size-6" src="src/assets/Square71x71Logo.png" />
              <span className="py-1 font-medium text-sm text-foreground/70">
                Scriblers
              </span>
            </>
          }
        >
          <TitleBarButtons />
        </MenuBar>
        <main className="flex ">
          <Tabs />
          <div className="w-full flex flex-col h-[calc(100lvh-2.25rem)] overflow-hidden">
            <Text />
          </div>
        </main>
      </ZoomProvider>
    </TabProvider>
  );
}

export default App;

{
  /*<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="1"
  stroke-linecap="round"
  stroke-linejoin="round"
  className=""
>
  <path d="M2 6h4" />
  <path d="M2 12h4" />
  <path d="M2 18h4" />
  <rect width="16" height="20" x="4" y="2" rx="2" />
  <path
    d="M7 3.5c5-2 7 2.5 3 4C1.5 10 2 15 5 16c5 2 9-10 14-7s.5 13.5-4 12c-5-2.5.5-11 2-4"
    strokeWidth="2"
    transform="translate(6, 5) scale(0.55)"
  />
</svg>*/
}
