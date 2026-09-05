import Block from "../Block";
import { computed } from "@preact/signals";
import { For } from "@preact/signals/utils";
import { useCallback } from "preact/hooks";

import PlaygroundBlock from "./PlaygroundBlock";

import "./style.scss";
import blocksModel from "../../models/BlocksModel";
import Wires from "./Wires";
import wiresModel from "../../models/WiresModel";

export default function Playground() {
  return (
    <div className="playground" onMouseMoveCapture={(event) => wiresModel.onWiring(event)} onMouseUp={(event) => wiresModel.onWiringEnded(event)}>
      <For each={computed(() => Object.keys(blocksModel.blocks.value).map(id => ({id, ...blocksModel.blocks.value[id]})))}>
        {(block) => (
          <PlaygroundBlock
            key={block.id}
            options={block}
          />
        )}
      </For>
      <Wires />
    </div>
  );
}
