import { useRef, useEffect, useState } from "preact/hooks";
import { useSignal, useSignalEffect } from "@preact/signals";
import { useSignalRef } from "@preact/signals/utils";

export function useResizing({
  signal,
  onResize,
  onClear,
  eventProperty,
  minValue,
  maxValue,
  cursor,
}) {
  const handleRef = useSignalRef(null);

  useSignalEffect(() => {
    const onResizing = (e) => {
      // e.preventDefault();

      let prevValue = e[eventProperty];
      const resize = (e) => {
        e.preventDefault();

        const newValue = signal.value + (e[eventProperty] - prevValue);
        prevValue = e[eventProperty]

        if (minValue && newValue < minValue) return;
        if (maxValue && newValue > maxValue) return;

        onResize?.(newValue, e);
      };

      const clear = () => {
        document.removeEventListener("mousemove", resize);
        document.removeEventListener("mouseup", clear);

        document.body.style.cursor = "";
      };

      document.addEventListener("mousemove", resize);
      document.addEventListener("mouseup", clear);

      document.body.style.cursor = cursor || "pointer";
    };

    handleRef.current.addEventListener("mousedown", onResizing);

    return () => {
      handleRef.current.removeEventListener("mousedown", onResizing);
    };
  });

  return { handleRef };
}
