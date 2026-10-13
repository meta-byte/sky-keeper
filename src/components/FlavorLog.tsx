import type { FlavorLine } from "../game/types.ts";

const toneClass: Record<FlavorLine["tone"], string> = {
  good: "text-emerald-100",
  bad: "text-red-300",
  warn: "text-amber-200",
};

type FlavorLogProps = {
  lines: FlavorLine[];
};

export function FlavorLog({ lines }: FlavorLogProps) {
  return (
    <ul className="pointer-events-none absolute inset-x-3 bottom-2 flex flex-col items-center gap-0.5 text-center text-[11px] leading-4 tracking-[0.16em] sm:text-xs">
      {lines.map((line, index) => {
        const latest = index === lines.length - 1;
        return (
          <li key={line.id} className={`${toneClass[line.tone]} ${latest ? "opacity-100" : "opacity-40"}`}>
            {`<< ${line.text} >>`}
          </li>
        );
      })}
    </ul>
  );
}
