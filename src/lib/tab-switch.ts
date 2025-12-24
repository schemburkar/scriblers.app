import { useState, useEffect, useCallback, useRef } from "react";
import { Tab } from "../components/tab-provider";

export const useTabSwitcher = (
  tabs: Map<string, Tab>,
  selectTab: (id: string) => void,
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const tabIds = Array.from(tabs.keys());

  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCycle = useCallback(() => {
    // setIsOpen(true);
    setHighlightedId((prev) => {
      if (!prev) return tabIds[0] || null;
      const currentIndex = tabIds.indexOf(prev);
      const nextIndex = (currentIndex + 1) % tabIds.length;
      return tabIds[nextIndex];
    });

    if (!isOpen && !openTimerRef.current) {
      openTimerRef.current = setTimeout(() => {
        setIsOpen(true);
      }, 200); // 200ms delay before showing dialog
    }
  }, [tabIds]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Trigger cycling on Ctrl + Tab
      if (e.ctrlKey && e.key === "Tab") {
        e.preventDefault();
        handleCycle();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      // On releasing Control, confirm selection and close dialog
      if (e.key === "Control") {
        if (openTimerRef.current) {
          clearTimeout(openTimerRef.current);
          openTimerRef.current = null;
        }

        if (highlightedId) {
          selectTab(highlightedId);
        }
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isOpen, highlightedId, handleCycle, selectTab]);

  return { isOpen, highlightedId };
};

export function useKeyboardShortcuts({
  newTab,
  onSaveFile,
  closeTab,
  toggleTheme,
  currentId,
}: any) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Use metaKey for Mac support and ctrlKey for Windows/Linux
      const isMod = e.ctrlKey || e.metaKey;

      if (isMod && e.key.toLowerCase() === "n") {
        e.preventDefault();
        newTab();
      }

      if (isMod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        onSaveFile();
      }

      if (isMod && e.key.toLowerCase() === "w") {
        e.preventDefault();
        if (currentId) closeTab(currentId);
      }

      if (isMod && e.key.toLowerCase() === "t") {
        e.preventDefault();
        toggleTheme();
      }

      if (isMod && e.shiftKey && e.key.toLowerCase() === "s") {
        e.preventDefault();
        onSaveFile(true);
      }

      // Note: Ctrl+Tab logic is handled by the useTabSwitcher hook
      // we built previously, so it's not needed here.
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [newTab, onSaveFile, closeTab, toggleTheme, currentId]);
}
