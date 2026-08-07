import "./style.scss";
import { useResizing } from "../../hooks/useResizing";

export default function Panel({
  className,
  defaultWidth = 200,
  minWidth = 200,
  children,
  label,
}) {
  const { handleRef, value: panelWidth } = useResizing({
    cursor: "col-resize",
    defaultValue: 200,
    minValue: 200,
    eventProperty: "clientX",
  });

  return (
    <div className={`panel ${className || ""}`} style={{ width: panelWidth.value }}>
      <div className="content">
        {label && <div className="label">{label}</div>}
        {children}
      </div>
      <div className="handle" ref={handleRef}></div>
    </div>
  );
}
