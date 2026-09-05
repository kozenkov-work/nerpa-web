export default {
  label: "Строка",
  inputs: {},
  outputs: {
    value: {
      type: "string",
      label: "Значение",
    },
  },
  fabric: (block) => {
    return { ...block };
  },
};
