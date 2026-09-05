import { signal, computed } from "@preact/signals";
import { createModel } from "@preact/signals";
import blocksModel from "./BlocksModel";

const WiresModel = createModel(() => {
  const wires = computed(() => {
    const { blocks: blocksSignal, positions: positionsSignal } = blocksModel;
    const blocks = blocksSignal.value;
    const positions = positionsSignal.value;

    return Object.keys(blocks)
      .reduce((wires, toId) => {
        const inputs = blocks[toId].inputs;

        return [
          ...wires,
          ...Object.keys(inputs).map((inputName) => {
            const source = inputs[inputName].source;

            if (!source) return null;

            const fromRect = document
              .querySelector(
                `#block-${source.id} .outputs .connection#${source.output} .circle`,
              )
              .getBoundingClientRect();
            const toRect = document
              .querySelector(
                `#block-${toId} .inputs .connection#${inputName} .circle`,
              )
              .getBoundingClientRect();
            const playgroundRect = document
              .querySelector(".playground")
              .getBoundingClientRect();

            return {
              id: `${source.id} ${toId}`,
              from: {
                x: fromRect.left + fromRect.width / 2 - playgroundRect.left,
                y: fromRect.top + fromRect.height / 2 - playgroundRect.top,
              },
              to: {
                x: toRect.left + toRect.width / 2 - playgroundRect.left,
                y: toRect.top + toRect.height / 2 - playgroundRect.top,
              },
            };
          }),
        ];
      }, [])
      .filter((wire) => !!wire);
  });

  const tempWire = signal(null);

  return {
    wires,
    tempWire,
    onWiringStarted(event, fromId, outputName) {
      event.preventDefault();

      const { toId, inputName } = Object.keys(blocksModel.blocks.value).reduce(
        (result, toId) => {
          const to = blocksModel.blocks.value[toId];
          const inputName = Object.keys(to.inputs).find(
            (inputName) => to.inputs[inputName].source?.id === fromId,
          );
          if (!inputName) return result;

          return { toId, inputName };
        },
        {},
      );
      if (toId) blocksModel.connect(null, null, toId, inputName);

      const playgroundRect = document
        .querySelector(".playground")
        .getBoundingClientRect();
      const rect = event.currentTarget
        .querySelector(".circle")
        .getBoundingClientRect();
      const x = rect.left + rect.width / 2 - playgroundRect.left;
      const y = rect.top + rect.height / 2 - playgroundRect.top;

      tempWire.value = {
        fromId,
        outputName,
        from: {
          x,
          y,
        },
        to: {
          x,
          y,
        },
      };
    },
    onWiringEnded(event, toId, inputName) {
      if (!tempWire.value) return;

      event.preventDefault();

      if (!toId) {
        tempWire.value = null;
        return;
      }

      blocksModel.connect(
        tempWire.value.fromId,
        tempWire.value.outputName,
        toId,
        inputName,
      );
      tempWire.value = null;
    },
    onWiring(event) {
      if (!tempWire.value) return;

      event.stopPropagation();

      const rect = event.currentTarget.getBoundingClientRect();
      tempWire.value = {
        ...tempWire.value,
        to: {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        },
      };
    },
  };
});

const wiresModel = new WiresModel();

export default wiresModel;
