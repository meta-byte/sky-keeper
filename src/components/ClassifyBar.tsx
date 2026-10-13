import type { TrueRole } from "../game/types.ts";

type ClassifyBarProps = {
  onClassify: (role: TrueRole) => void;
};

const roles: { role: TrueRole; label: string; className: string }[] = [
  {
    role: "bandit",
    label: "BANDIT",
    className: "border-red-500 bg-red-950/40 text-red-300 hover:bg-red-900/50",
  },
  {
    role: "neutral",
    label: "NEUTRAL",
    className: "border-yellow-400 bg-yellow-500/10 text-yellow-200 hover:bg-yellow-500/20",
  },
  {
    role: "friendly",
    label: "FRIENDLY",
    className: "border-emerald-400 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20",
  },
];

export function ClassifyBar({ onClassify }: ClassifyBarProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {roles.map((item) => (
        <button
          key={item.role}
          type="button"
          className={`border px-4 py-4 text-sm tracking-widest ${item.className}`}
          onClick={() => onClassify(item.role)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
