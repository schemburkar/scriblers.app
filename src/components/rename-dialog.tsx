import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { basename } from "@tauri-apps/api/path";

export const RenameFile = ({
  name: initialName,
  onSubmit,
}: {
  name?: string;
  onSubmit: (name: string) => void;
}) => {
  const [name, setName] = useState<string>(initialName || "");
  const [error, setError] = useState<string | undefined>(undefined);

  // Reset state when dialog opens with a new name
  useEffect(() => {
    if (initialName) {
      setName(initialName);
      setError(undefined);
    }
  }, [initialName]);

  const validate = async (input: string) => {
    if (!input.trim()) return "File name cannot be empty.";

    // 1. Path Traversal & Basic Flattening
    const fileNameOnly = await basename(input);

    // 2. Windows Reserved Names
    const reservedNames = /^(con|prn|aux|nul|com[1-9]|lpt[1-9])(\..*)?$/i;
    if (reservedNames.test(fileNameOnly)) return "System reserved name.";

    // 3. Illegal Characters
    if (/[<>:"/\\|?*\x00-\x1f]/.test(fileNameOnly)) {
      return 'Contains invalid characters (<>:"/\\|?*)';
    }

    // 4. Windows trailing restrictions
    if (/[ .]+$/.test(fileNameOnly)) return "Cannot end with a space or dot.";

    if (input !== fileNameOnly) return "File name should not be a path";

    return undefined; // Valid
  };

  // Real-time validation
  useEffect(() => {
    const handler = setTimeout(async () => {
      const err = await validate(name);
      setError(err);
    }, 100); // Debounce to avoid flickering
    return () => clearTimeout(handler);
  }, [name]);

  const handleSubmit = async () => {
    const err = await validate(name);
    if (!err) {
      onSubmit(name);
    } else {
      setError(err);
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Rename File: {initialName}</DialogTitle>
      </DialogHeader>

      <div className="flex flex-col gap-2 ">
        <label className="text-xs">File Name</label>
        <Input
          value={name}
          className="text-xs!"
          aria-invalid={!!error}
          aria-errormessage={error}
          onChange={(e) => setName(e.currentTarget.value)}
          autoFocus
        />
        <div className="h-5">
          {error && (
            <p className="text-xs text-destructive animate-in fade-in slide-in-from-top-1">
              {error}
            </p>
          )}
        </div>
      </div>
      <DialogFooter>
        <DialogClose>
          <Button
            className="text-xs"
            disabled={!!error || !name || name === initialName}
            onClick={handleSubmit}
          >
            Rename
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant="outline" className="text-xs">
            Cancel
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};
