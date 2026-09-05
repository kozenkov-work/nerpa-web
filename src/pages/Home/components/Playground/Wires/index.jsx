import { computed } from "@preact/signals";
import blocksModel from "../../../models/BlocksModel";
import { For } from "@preact/signals/utils";
import Wire from "./Wire";
import wiresModel from "../../../models/WiresModel";

export default function Wires({ }) {
  return (
    <>
      <For each={wiresModel.wires}>
        {(wire) => <Wire key={wire.id} {...wire} />}
      </For>
      {wiresModel.tempWire.value && <Wire {...wiresModel.tempWire.value} />}
    </>
  );
}
