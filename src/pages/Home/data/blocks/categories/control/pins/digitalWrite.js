export default {
  label: "Установить значение пина",
  inputs: {
    value: {
      type: "boolean",
      label: "Значение"
    },
    prev: {
      type: "flow",
      label: "Пред"
    },
  },
  outputs: {
    next: {
      type: "flow",
      label: "След"
    }
  }
}
