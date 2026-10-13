import { SCOPE } from "../game/constants.ts";
import { inRadar } from "../game/math.ts";
import { trackColor } from "../game/trackColor.ts";
import type { Bogey, Missile, PlayerFlight, Vip } from "../game/types.ts";
import { Contact } from "./Contact.tsx";
import { MissileMark } from "./MissileMark.tsx";
import { ScopeFrame } from "./ScopeFrame.tsx";
import { TrackArrow } from "./TrackArrow.tsx";
import { VipMark } from "./VipMark.tsx";

type ScopeProps = {
  vip: Vip;
  player: PlayerFlight;
  bogeys: Bogey[];
  missiles: Missile[];
  selectedId: string | null;
  onSelect: (id: string) => void;
};

export function Scope({ vip, player, bogeys, missiles, selectedId, onSelect }: ScopeProps) {
  return (
    <svg
      viewBox={`0 0 ${SCOPE} ${SCOPE}`}
      className="aspect-square h-[min(100cqh,100cqw)] w-[min(100cqh,100cqw)] overflow-hidden"
    >
      <ScopeFrame />
      {missiles.map((missile) => (
        <MissileMark key={missile.id} x={missile.x} y={missile.y} heading={missile.heading} />
      ))}
      <Contact
        x={vip.x}
        y={vip.y}
        heading={vip.heading}
        selected={selectedId === vip.id}
        onSelect={() => onSelect(vip.id)}
      >
        <VipMark heading={vip.heading} />
      </Contact>
      <Contact x={player.x} y={player.y} heading={player.heading}>
        <TrackArrow color="#22c55e" />
        <g transform={`rotate(${-player.heading})`}>
          <text y={10} textAnchor="middle" fill="#22c55e" fontSize={6} className="font-mono tracking-widest">
            REX
          </text>
        </g>
      </Contact>
      {bogeys.filter(inRadar).map((bogey) => (
        <Contact
          key={bogey.id}
          x={bogey.x}
          y={bogey.y}
          heading={bogey.heading}
          selected={selectedId === bogey.id}
          onSelect={() => onSelect(bogey.id)}
        >
          <TrackArrow color={trackColor(bogey.classifiedAs)} />
        </Contact>
      ))}
    </svg>
  );
}
