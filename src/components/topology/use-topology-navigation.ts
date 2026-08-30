"use client";

import {
  type KeyboardEvent,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from "react";

type UseTopologyNavigationOptions = {
  itemCount: number;
};

export function useTopologyNavigation({
  itemCount,
}: UseTopologyNavigationOptions) {
  const [focusIndex, setFocusIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const moveFocus = useCallback(
    (nextIndex: number) => {
      const normalizedIndex = (nextIndex + itemCount) % itemCount;
      setFocusIndex(normalizedIndex);
      itemRefs.current[normalizedIndex]?.focus();
    },
    [itemCount],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault();
          moveFocus(index + 1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault();
          moveFocus(index - 1);
          break;
        case "Home":
          event.preventDefault();
          moveFocus(0);
          break;
        case "End":
          event.preventDefault();
          moveFocus(itemCount - 1);
          break;
      }
    },
    [itemCount, moveFocus],
  );

  return {
    focusIndex,
    handleKeyDown,
    itemRefs: itemRefs as RefObject<Array<HTMLButtonElement | null>>,
    setFocusIndex,
  };
}
