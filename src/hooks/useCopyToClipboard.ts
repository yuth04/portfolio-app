import { useState, useCallback } from "react";

export function useCopyToClipboard(resetDelay = 2000) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), resetDelay);
        return true;
      } catch (error) {
        console.error("Failed to copy text:", error);
        setCopied(false);
        return false;
      }
    },
    [resetDelay]
  );

  return { copied, copyToClipboard };
}