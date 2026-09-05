import { blocks } from "../../data/blocks/index";
import { connectionsColors } from "../../data/colors";

export default function Connection({
  type,
  blockType,
  name,
  isOutput,
  forwardedRef,
  onMouseDown = () => { },
  onMouseUp = () => { },
}) {
  return (
    <div
      className="connection"
      ref={forwardedRef || (() => { })}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      id={name}
    >
      {!isOutput && (
        <div
          className="circle"
          style={{ backgroundColor: connectionsColors[type] }}
        ></div>
      )}
      <div className="label">
        {isOutput
          ? blocks[blockType].outputs[name].label
          : blocks[blockType].inputs[name].label}
      </div>
      {isOutput && (
        <div
          className="circle"
          style={{ backgroundColor: connectionsColors[type] }}
        ></div>
      )}
    </div>
  );
}
