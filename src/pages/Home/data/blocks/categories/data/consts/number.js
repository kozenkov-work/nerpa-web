export default {
  label: "Число",
  inputs: {},
  outputs: {
    value: {
      type: "number",
      label: "Значение",
    },
  },
  fabric: (block) => {
    return { ...block };
  },
};
