import { ReactNode } from "react";
import { Button } from "./ui/button";
import { SquareIcon, MinusIcon, XIcon } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import { createPortal } from "react-dom";

export const TitleBar = ({ children }: { children: ReactNode }) => {
  return (
    <div data-tauri-drag-region className="flex  ">
      {createPortal(children, document.getElementById("header") as HTMLElement)}
    </div>
  );
};

export const TitleBarButtons = ({ children }: { children?: ReactNode }) => {
  const appWindow = getCurrentWindow();

  return (
    <div data-tauri-drag-region className="flex justify-end w-full gap-1">
      <Button
        className="bg-background/50 size-6 cursor-pointer"
        variant={"outline"}
        size={"icon-sm"}
        onClick={() => appWindow.minimize()}
      >
        <MinusIcon />
      </Button>
      <Button
        className="bg-background/50  size-6"
        variant={"outline"}
        size={"icon-sm"}
        onClick={() => appWindow.toggleMaximize()}
      >
        <SquareIcon />
      </Button>
      <Button
        className="bg-background/50  size-6"
        variant={"outline"}
        size={"icon-sm"}
        onClick={() => appWindow.close()}
      >
        <XIcon />
      </Button>
    </div>
  );
};
