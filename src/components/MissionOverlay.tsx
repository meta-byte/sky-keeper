import type { Failure } from "../game/types.ts";

type MissionOverlayProps = {
  failure: Exclude<Failure, "delivered">;
  onReset: () => void;
};

const copy: Record<Exclude<Failure, null | "delivered">, string> = {
  "package-lost": "PACKAGE LOST",
  "escort-down": "ESCORT DOWN",
};

export function MissionOverlay({ failure, onReset }: MissionOverlayProps) {
  if (!failure) return null;
  return (
    <div className="missile-flash fixed inset-0 z-10 flex flex-col items-center justify-center gap-8 px-6 text-center text-white">
      <p className="text-2xl font-bold tracking-widest sm:text-4xl">{copy[failure]}</p>
      <button
        type="button"
        className="border border-white bg-black/30 px-6 py-4 text-sm tracking-[0.3em] hover:bg-black/50"
        onClick={onReset}
      >
        RESET SORTIE
      </button>
    </div>
  );
}
