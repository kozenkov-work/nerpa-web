import { blocks } from "../../data/blocks/index";
import Connection from "./Connection";
import "./style.scss";

export default function Block({
  type,
  children,
  style,
  forwardedRef,
  onClick,
  onOutputMouseDown = () => { },
  onInputMouseUp = () => { },
  id = "",
}) {
  const block = blocks[type];
  const inputs = block.inputs;
  const outputs = block.outputs;

  return (
    <div
      className="block"
      style={style || {}}
      ref={forwardedRef}
      onClick={onClick}
      id={id ? `block-${id}` : ""}
    >
      <div className="label">{block.label}</div>
      <div className="container">
        {inputs && (
          <div className="connections inputs">
            {Object.keys(inputs).map((input) => (
              <Connection
                {...inputs[input]}
                blockType={type}
                name={input}
                onMouseUp={(event) => onInputMouseUp(event, input)}
              />
            ))}
          </div>
        )}
        {outputs && (
          <div className="connections outputs">
            {Object.keys(outputs).map((output) => (
              <Connection
                {...outputs[output]}
                blockType={type}
                name={output}
                onMouseDown={(event) => onOutputMouseDown(event, output)}
                isOutput={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
