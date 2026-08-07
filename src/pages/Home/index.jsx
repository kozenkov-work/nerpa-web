import preactLogo from "../../assets/preact.svg";
import Block from "./components/Block";
import Panel from "./components/Panel/index.jsx";
import Playground from "./components/Playground";
import { useSignal } from "@preact/signals";

import "./style.scss";

const newBlocks = [
  {
    label: "Ebalovo",
    inputs: [
      { name: "pin number", color: "lightgreen" },
      { name: "sus", color: "white" },
    ],
    outputs: [{ name: "success", color: "lightcoral" }],
    fabric: (block) => ({ ...block }),
  },
];

export function Home() {
  const blocks = useSignal([
    { label: "Ebalovo", inputs: [{ name: "sus", color: "white" }] },
    { label: "Fuck" },
  ]);

  return (
    <div className="home">
      <Panel className="new-block-panel" label="Добавление блока">
        <div className="blocks-list">
          {newBlocks.map((block) => (
            <Block
              label={block.label}
              inputs={block.inputs}
              outputs={block.outputs}
              onClick={() => (blocks.value = [...blocks.value, block.fabric(block)])}
            >
              {block.content}
            </Block>
          ))}
        </div>
      </Panel>
      <Playground blocks={blocks} />
    </div>
  );
}
