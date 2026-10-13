type HudProps = {
  score: number;
  vipHealth: number;
  playerHealth: number;
  paused: boolean;
  speed: number;
  canSlow: boolean;
  canSpeed: boolean;
  onTogglePause: () => void;
  onSlower: () => void;
  onFaster: () => void;
};

const controlClass =
  "border border-emerald-500/40 px-3 py-2 text-xs tracking-widest text-emerald-300 hover:bg-emerald-500/10 disabled:opacity-30";

export function Hud({
  score,
  vipHealth,
  playerHealth,
  paused,
  speed,
  canSlow,
  canSpeed,
  onTogglePause,
  onSlower,
  onFaster,
}: HudProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3 border-b border-emerald-500/30 px-4 py-3 sm:px-6">
      <div>
        <p className="text-xs tracking-[0.35em] text-emerald-500/70">TAC-OPERATIONS</p>
        <h1 className="text-lg tracking-widest text-emerald-300 sm:text-xl">AWACS: SKY KEEPER // ESCORT</h1>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className={controlClass} onClick={onSlower} disabled={!canSlow}>
          SLOWER
        </button>
        <span className="min-w-10 text-center text-xs tracking-widest text-emerald-300">{speed}x</span>
        <button type="button" className={controlClass} onClick={onFaster} disabled={!canSpeed}>
          FASTER
        </button>
        <button type="button" className={controlClass} onClick={onTogglePause}>
          {paused ? "CONTINUE" : "PAUSE"}
        </button>
      </div>
      <div className="text-right text-xs leading-5 tracking-widest text-emerald-500/80">
        <p>IFF LINK: STABLE</p>
        <p>VIP {Math.max(0, vipHealth).toString().padStart(3, "0")}</p>
        <p>ESCORT {Math.max(0, playerHealth).toString().padStart(3, "0")}</p>
        <p className="text-sm text-emerald-300">
          SCORE {score < 0 ? `-${Math.abs(score).toString().padStart(5, "0")}` : score.toString().padStart(6, "0")}
        </p>
      </div>
    </header>
  );
}
