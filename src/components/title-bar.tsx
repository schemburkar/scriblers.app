import { ReactNode } from "react";
import { Button } from "./ui/button";
import { SquareIcon, MinusIcon, XIcon } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";

export const TitleBar = ({ children }: { children: ReactNode }) => {
  return (
    <div data-tauri-drag-region className="flex  ">
      {children}
    </div>
  );
};

const getWindow = () => {
  try {
    return getCurrentWindow();
  } catch {
    return null;
  }
};
export const TitleBarButtons = ({ children }: { children?: ReactNode }) => {
  const appWindow = getWindow();

  return (
    <div data-tauri-drag-region className="flex justify-end w-full gap-1">
      <Button
        className="bg-background/50 size-6 cursor-pointer"
        variant={"outline"}
        size={"icon-sm"}
        onClick={() => appWindow?.minimize()}
      >
        <MinusIcon />
      </Button>
      <Button
        className="bg-background/50  size-6"
        variant={"outline"}
        size={"icon-sm"}
        onClick={() => appWindow?.toggleMaximize()}
      >
        <SquareIcon />
      </Button>
      <Button
        className="bg-background/50  size-6 hover:bg-destructive dark:hover:bg-destructive hover:text-background"
        variant={"outline"}
        size={"icon-sm"}
        onClick={() => appWindow?.close()}
      >
        <XIcon />
      </Button>
    </div>
  );
};
