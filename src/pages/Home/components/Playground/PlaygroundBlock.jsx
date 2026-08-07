import { useResizing } from "../../hooks/useResizing";
import Block from "../Block";

export default function PlaygroundBlock({ key, options, position, onXChange}) {
  const { handleRef: xRef, value: x } = useResizing({
    eventProperty: "clientX",
    defaultValue: 100,
    onResize: (_,x) => onXChange(x)
  });
  const { handleRef: yRef, value: y } = useResizing({
    eventProperty: "clientY",
    defaultValue: 100,
  });

  console.log(options.label, 'rerendered')

  return (
    <Block
      {...options}
      style={{ top: y.value, left: x.value }}
      forwardedRef={(element) => {
        xRef.current = element
        yRef.current = element
      }}
      key={key}
    />
  );
}
