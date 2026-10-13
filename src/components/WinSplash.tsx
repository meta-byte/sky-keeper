type WinSplashProps = {
  onReset: () => void;
};

export function WinSplash({ onReset }: WinSplashProps) {
  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-slate-950/80 px-6 text-center">
      <p className="text-xs tracking-[0.45em] text-emerald-500/80">SORTIE COMPLETE</p>
      <p className="text-3xl font-bold tracking-widest text-emerald-300 sm:text-5xl">AIRSPACE CLEAR</p>
      <p className="text-sm tracking-[0.28em] text-emerald-400/80">VIP AND REX OUT</p>
      <button
        type="button"
        className="mt-2 border border-emerald-400 px-6 py-4 text-sm tracking-[0.3em] text-emerald-200 hover:bg-emerald-500/10"
        onClick={onReset}
      >
        NEW SORTIE
      </button>
    </div>
  );
}
