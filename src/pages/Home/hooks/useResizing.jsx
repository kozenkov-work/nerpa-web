import { useRef, useEffect, useState } from "preact/hooks";
import { useSignal, useSignalEffect } from "@preact/signals";
import { useSignalRef } from "@preact/signals/utils";

export function useResizing({
  onResize,
  onClear,
  eventProperty,
  defaultValue,
  minValue,
  maxValue,
  cursor,
}) {
  const value = useSignal(defaultValue);
  const handleRef = useSignalRef(null);

  useSignalEffect(() => {
    const onResizing = (e) => {
      e.preventDefault();

      let prevValue = e[eventProperty];
      const resize = (e) => {
        e.preventDefault();

        const newValue = value.value + (e[eventProperty] - prevValue);
        prevValue = e[eventProperty]

        if (minValue && newValue < minValue) return;
        if (maxValue && newValue > maxValue) return;

        onResize?.(e, newValue);
        value.value = newValue;
      };

      const clear = () => {
        document.removeEventListener("pointermove", resize);
        document.removeEventListener("pointerup", clear);

        document.body.style.cursor = "";
      };

      document.addEventListener("pointermove", resize);
      document.addEventListener("pointerup", clear);

      document.body.style.cursor = cursor || "pointer";
    };

    handleRef.current.addEventListener("pointerdown", onResizing);

    return () => {
      handleRef.current.removeEventListener("pointerdown", onResizing);
    };
  });

  return { handleRef, value };
}
