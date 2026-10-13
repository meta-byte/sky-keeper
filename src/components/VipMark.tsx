type VipMarkProps = {
  heading: number;
};

export function VipMark({ heading }: VipMarkProps) {
  return (
    <>
      <polygon points="0,-5 4,0 0,5 -4,0" fill="none" stroke="#22d3ee" strokeWidth={1} />
      <g transform={`rotate(${-heading})`}>
        <text y={10} textAnchor="middle" fill="#22d3ee" fontSize={6} className="font-mono tracking-widest">
          VIP
        </text>
      </g>
    </>
  );
}
