import Connection from "./Connection";
import "./style.scss";

export default function Block({ inputs, outputs, label, children, style, forwardedRef, onClick }) {
  return (
    <div className="block" style={style || {}} ref={forwardedRef} onCLick={onClick}>
      <div className="label">{label}</div>
      <div className="container">
        {inputs && (
          <div className="connections inputs">
            {inputs.map((input) => (
              <Connection {...input} />
            ))}
          </div>
        )}
        <div className="content">{children}</div>
        {outputs && (
          <div className="connections outputs">
            {outputs.map((output) => (
              <div className="connection">
                <div className="name">{output.name}</div>
                <div
                  className="circle"
                  style={{ backgroundColor: output.color }}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
