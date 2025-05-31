import { useState, useEffect, useRef, useCallback, useMemo } from "react";

export function useTypewriter(text, options = {}) {
  const memoizedOptions = useMemo(
    () => ({
      speed: 5, // milliseconds between characters
      startDelay: 0, // delay before starting
      onComplete: () => {},
      enabled: true, // allow disabling the effect
      ...options,
    }),
    [options.speed, options.startDelay, options.enabled]
  );

  const { speed, startDelay, onComplete, enabled } = memoizedOptions;

  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const animationRef = useRef(null);
  const timeoutRef = useRef(null);
  const indexRef = useRef(0);
  const lastTimeRef = useRef(0);
  const currentTextRef = useRef("");

  // Stable onComplete callback
  const stableOnComplete = useCallback(() => {
    if (typeof onComplete === "function") {
      onComplete();
    }
  }, [onComplete]);

  // Animation function using requestAnimationFrame for better performance
  const typeNextCharacter = useCallback(() => {
    const now = performance.now();

    if (now - lastTimeRef.current >= speed) {
      if (indexRef.current < currentTextRef.current.length) {
        setDisplayedText(currentTextRef.current.slice(0, indexRef.current + 1));
        indexRef.current++;
        lastTimeRef.current = now;
      } else {
        // Animation complete
        setIsTyping(false);
        setIsComplete(true);
        stableOnComplete();
        return;
      }
    }

    animationRef.current = requestAnimationFrame(typeNextCharacter);
  }, [speed, stableOnComplete]);

  // Start typing function
  const startTyping = useCallback(() => {
    setIsTyping(true);
    setIsComplete(false);
    lastTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(typeNextCharacter);
  }, [typeNextCharacter]);

  // Skip to end function
  const skipToEnd = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setDisplayedText(currentTextRef.current);
    setIsTyping(false);
    setIsComplete(true);
    indexRef.current = currentTextRef.current.length;
    stableOnComplete();
  }, [stableOnComplete]);

  useEffect(() => {
    // Clean up previous animations
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Update current text reference
    currentTextRef.current = text || "";

    // Reset state
    setDisplayedText("");
    setIsTyping(false);
    setIsComplete(false);
    indexRef.current = 0;

    if (!enabled || !text) {
      setDisplayedText(text || "");
      setIsComplete(true);
      return;
    }

    // Start typing with optional delay
    if (startDelay > 0) {
      timeoutRef.current = setTimeout(startTyping, startDelay);
    } else {
      startTyping();
    }

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [text, enabled, startDelay, startTyping]);

  return {
    displayedText,
    isTyping,
    isComplete,
    skipToEnd,
  };
}
