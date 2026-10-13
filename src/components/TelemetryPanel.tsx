import type { Bra } from "../game/selectors.ts";
import { isBogey } from "../game/selectors.ts";
import type { Bogey, TrueRole, Vip } from "../game/types.ts";
import { ClassifyBar } from "./ClassifyBar.tsx";
import { Readout } from "./Readout.tsx";

type TelemetryPanelProps = {
  track: Vip | Bogey | null;
  bra: Bra | null;
  onClassify: (role: TrueRole) => void;
};

export function TelemetryPanel({ track, bra, onClassify }: TelemetryPanelProps) {
  return (
    <section className="flex min-h-0 flex-col overflow-y-auto p-4 sm:p-6">
      <p className="text-xs tracking-[0.35em] text-emerald-500/70">TARGET TELEMETRY</p>
      {track && bra ? (
        <>
          <h2 className="mt-2 text-3xl tracking-wide text-emerald-300 sm:text-4xl">{track.name}</h2>
          <dl className="mt-6 grid gap-4 text-sm tracking-widest">
            <Readout label="BEARING" value={`${Math.round(bra.bearing).toString().padStart(3, "0")}`} />
            <Readout label="RANGE" value={Math.round(bra.range).toString()} />
            <Readout label="ALTITUDE" value={`${bra.altitude} FT`} />
          </dl>
          <p className="mt-6 text-xs tracking-[0.25em] text-emerald-500/60">CLASSIFY BEFORE WEAPONS RELEASE</p>
          <p className="mt-2 text-xs tracking-[0.25em] text-emerald-500/60">INBOUND ON VIP OR REX = HOSTILE</p>
          <div className="mt-auto pt-6">{isBogey(track) ? <ClassifyBar onClassify={onClassify} /> : null}</div>
        </>
      ) : (
        <p className="mt-6 text-sm tracking-[0.25em] text-emerald-500/60">SELECT A TRACK</p>
      )}
    </section>
  );
}
