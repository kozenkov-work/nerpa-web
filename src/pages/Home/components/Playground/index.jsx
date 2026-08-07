import Block from "../Block";
import { useSignal } from "@preact/signals";
import { For } from "@preact/signals/utils";

import "./style.scss";
import { useCallback } from "preact/hooks";
import PlaygroundBlock from "./PlaygroundBlock";

export default function Playground({ blocks }) {
  

  console.log(blocks)
  return (
    <div className="playground">
      <For each={blocks}>
        {(item, index) => (
          <PlaygroundBlock
            key={index}
            options={item}
            position={{ x: 100, y: 100 }}
            onXChange={(x) =>
              (blocks.value = blocks.value.toSpliced(index, 1, { ...item, x }))
            }
          />
        )}
      </For>
      <button onClick={() => blocks.value = [...blocks.value, {label: 1}]}>Click</button>
    </div>
  );
}
