import { signal, computed } from "@preact/signals";
import { createModel } from "@preact/signals";
import { blocks as newBlocks } from "../data/blocks";

const BlocksModel = createModel(() => {
  const blocks = signal({});
  const positions = signal({});

  return {
    positions,
    blocks,
    move(axis, id, value) {
      positions.value = {
        ...positions.value,
        [id]: {
          ...positions.value[id],
          [axis]: value,
        },
      };
    },
    connect(fromId, outputName, toId, inputName ) {
      if (
        fromId &&
        blocks.value[toId].inputs[inputName].type !==
        blocks.value[fromId].outputs[outputName].type
      ) {
        //TODO: add error handling
        console.error('Input and output type mismatch')
        return;
      }

      blocks.value = {
        ...blocks.value,
        [toId]: {
          ...blocks.value[toId],
          inputs: {
            ...blocks.value[toId].inputs,
            [inputName]: {
              ...blocks.value[toId].inputs[inputName],
              source: {
                id: fromId,
                output: outputName
              },
            },
          },
        },
      };
    },
    create(type) {
      const id = crypto.randomUUID();
      const newBlock = newBlocks[type];

      const block = {
        type,
        inputs: Object.keys(newBlock.inputs).reduce(
          (inputs, input) => ({
            ...inputs,
            [input]: {
              type: newBlock.inputs[input].type,
              source: null,
            },
          }),
          {},
        ),
        outputs: Object.keys(newBlock.outputs).reduce(
          (outputs, output) => ({
            ...outputs,
            [output]: {
              type: newBlock.outputs[output].type,
            },
          }),
          {},
        ),
      };

      blocks.value = {
        ...blocks.value,
        [id]: newBlock.fabric?.(block) || block,
      };

      positions.value = {
        ...positions.value,
        [id]: {
          x: 100,
          y: 100,
        },
      };
    },
  };
});

const blocksModel = new BlocksModel();
window.blocksModel = blocksModel;

export default blocksModel;
