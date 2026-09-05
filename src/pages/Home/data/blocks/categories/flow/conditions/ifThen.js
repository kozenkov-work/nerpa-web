export default {
  label: "Если",
  inputs: {
    condition: {
      type: "boolean",
      label: "Условие",
    },
    prev: {
      type: "flow",
      label: "Предыдущая",
    },
  },
  outputs: {
    then: {
      type: "flow",
      label: "Тогда",
    },
    else: {
      type: "flow",
      label: "Иначе",
    },
  },
};
