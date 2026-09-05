export default function Wire({ from, to }) {
  return (
    <svg stroke="black" className="wire" style={{width: Math.max(from.x, to.x), height: Math.max(from.y, to.y)}}>
      <line
        x1={from.x}
        y1={from.y}
        x2={to.x}
        y2={to.y}
        stroke-width={2}
      />
    </svg>
  );
}
