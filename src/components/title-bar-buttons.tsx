import { Button } from "./ui/button";
import { SquareIcon, MinusIcon, XIcon } from "lucide-react";
import { getCurrentWindow } from "@tauri-apps/api/window";

const getWindow = () => {
  try {
    return getCurrentWindow();
  } catch {
    return null;
  }
};
export const TitleBarButtons = () => {
  const appWindow = getWindow();

  return (
    <div data-tauri-drag-region className="flex justify-end w-auto gap-1">
      <Button
        className="bg-background/50 size-5 cursor-pointer"
        variant={"outline"}
        size={"icon-sm"}
        onClick={() => appWindow?.minimize()}
      >
        <MinusIcon className="size-3.5" />
      </Button>
      <Button
        className="bg-background/50  size-5"
        variant={"outline"}
        size={"icon-sm"}
        onClick={() => appWindow?.toggleMaximize()}
      >
        <SquareIcon className="size-3.5" />
      </Button>
      <Button
        className="bg-background/50  size-5 hover:bg-destructive dark:hover:bg-destructive hover:text-background"
        variant={"outline"}
        size={"icon-sm"}
        onClick={() => appWindow?.close()}
      >
        <XIcon className="size-4" />
      </Button>
    </div>
  );
};
