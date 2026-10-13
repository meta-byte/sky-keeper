type MissileMarkProps = {
  x: number;
  y: number;
  heading: number;
};

export function MissileMark({ x, y, heading }: MissileMarkProps) {
  const rad = (heading * Math.PI) / 180;
  const length = 6;
  return (
    <line
      x1={x}
      y1={y}
      x2={x + length * Math.sin(rad)}
      y2={y - length * Math.cos(rad)}
      stroke="#f8fafc"
      strokeWidth={1}
    />
  );
}
