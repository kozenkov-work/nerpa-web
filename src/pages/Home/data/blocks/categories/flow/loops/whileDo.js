export default {
  label: "Пока",
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
    start: {
      type: "flow",
      label: "Начало тела",
    },
    after: {
      type: "flow",
      label: "Следующая",
    },
  },
}
