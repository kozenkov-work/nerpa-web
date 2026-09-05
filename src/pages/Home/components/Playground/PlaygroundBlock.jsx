import { computed } from "@preact/signals";
import { useResizing } from "../../hooks/useResizingNew";
import Block from "../Block";
import { useRef, useEffect } from "preact/hooks";
import blocksModel from "../../models/BlocksModel";
import { blocks } from "../../data/blocks";
import wiresModel from "../../models/WiresModel";
import { useComputed } from "@preact/signals";

export default function PlaygroundBlock({ options, position, onXChange }) {
  const x = useComputed(() => blocksModel.positions.value[options.id].x)
  const { handleRef: xRef} = useResizing({
    signal: computed(() => blocksModel.positions.value[options.id].x),
    eventProperty: "clientX",
    onResize: (x) => {
      blocksModel.move('x', options.id, x)
    },
  });

  const y = useComputed(() => blocksModel.positions.value[options.id].y)
  const { handleRef: yRef} = useResizing({
    signal: y,
    eventProperty: "clientY",
    onResize: (y) => {
      blocksModel.move('y', options.id, y)
    },
  });

  return (
    <Block
      {...options}
      type={options.type}
      style={{ top: y.value, left: x.value }}
      forwardedRef={(element) => {
        xRef.current = element;
        yRef.current = element;
      }}
      key={options.id}
      onInputMouseUp={(event, inputName) => wiresModel.onWiringEnded(event, options.id, inputName)}
      onOutputMouseDown={(event, outputName) => wiresModel.onWiringStarted(event, options.id, outputName)}
    />
  );
}
