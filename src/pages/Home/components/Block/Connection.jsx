export default function Connection({ color, name }) {
  return (
    <div className="connection">
      <div className="circle" style={{ backgroundColor: color }}></div>
      <div className="name">{name}</div>
    </div>
  );
}
