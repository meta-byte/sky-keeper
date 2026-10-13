import { CENTER, RADAR_RADIUS } from "../game/constants.ts";

const SCOPE_MARK = "rgb(16 185 129 / 0.25)";
const CENTER_MARK = "rgb(16 185 129 / 0.7)";

export function ScopeFrame() {
  return (
    <g fill="none" stroke={SCOPE_MARK} strokeWidth={1}>
      <circle cx={CENTER} cy={CENTER} r={RADAR_RADIUS} />
      <circle cx={CENTER} cy={CENTER} r={150} />
      <circle cx={CENTER} cy={CENTER} r={70} />
      <line x1={CENTER} y1={20} x2={CENTER} y2={480} />
      <line x1={20} y1={CENTER} x2={480} y2={CENTER} />
      <g className="radar-sweep" style={{ transformOrigin: `${CENTER}px ${CENTER}px` }}>
        <line x1={CENTER} y1={CENTER} x2={CENTER} y2={24} />
      </g>
      <line x1={CENTER} y1={CENTER - 8} x2={CENTER} y2={CENTER + 8} stroke={CENTER_MARK} />
      <line x1={CENTER - 8} y1={CENTER} x2={CENTER + 8} y2={CENTER} stroke={CENTER_MARK} />
    </g>
  );
}
