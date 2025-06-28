
import { useEffect, useCallback } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  callback: (event: KeyboardEvent) => void;
  description?: string;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      shortcuts.forEach(({ key, ctrlKey, altKey, shiftKey, metaKey, callback }) => {
        const keyMatches = event.key.toLowerCase() === key.toLowerCase();
        const ctrlMatches = ctrlKey ? event.ctrlKey : !event.ctrlKey;
        const altMatches = altKey ? event.altKey : !event.altKey;
        const shiftMatches = shiftKey ? event.shiftKey : !event.shiftKey;
        const metaMatches = metaKey ? event.metaKey : !event.metaKey;

        if (keyMatches && ctrlMatches && altMatches && shiftMatches && metaMatches) {
          event.preventDefault();
          callback(event);
        }
      });
    },
    [shortcuts]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return shortcuts;
};
