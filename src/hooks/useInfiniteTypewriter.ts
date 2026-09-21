import { useState, useEffect } from "react";

export interface CodeLine {
  text: string;
  indent: number;
  type: string;
}

interface UseInfiniteTypewriterOptions {
  typingSpeed?: number;
  lineDelay?: number;
  restartDelay?: number;
}

export function useInfiniteTypewriter(
  lines: CodeLine[],
  options: UseInfiniteTypewriterOptions = {}
) {
  const { typingSpeed = 35, lineDelay = 150, restartDelay = 2500 } = options;

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (currentLineIndex < lines.length) {
      if (currentCharIndex < lines[currentLineIndex].text.length) {
        // Typing each character
        timeout = setTimeout(() => {
          setCurrentCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        // Line completed -> move to next line after short delay
        timeout = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, lineDelay);
      }
    } else {
      // All lines completed -> wait restartDelay, then restart sequence
      timeout = setTimeout(() => {
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }, restartDelay);
    }

    return () => clearTimeout(timeout);
  }, [currentLineIndex, currentCharIndex, lines, typingSpeed, lineDelay, restartDelay]);

  return {
    currentLineIndex,
    currentCharIndex,
    isCompleted: currentLineIndex >= lines.length,
  };
}