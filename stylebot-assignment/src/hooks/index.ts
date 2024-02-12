import { MouseEvent, useCallback, useRef } from "react";

export const useDragableContainer = () => {
  const offsetRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const ele = offsetRef.current;
    if (!ele) {
      return;
    }
    const startPos = {
      top: ele.scrollTop,
      y: e.clientY,
    };
    const handleMouseMove = (e: any) => {
      const dy = e.clientY - startPos.y;
      ele.scrollTop = startPos.top - dy;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, []);

  return { offsetRef, handleMouseDown };
};
