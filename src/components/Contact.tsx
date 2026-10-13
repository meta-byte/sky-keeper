import type { ReactNode } from "react";

type ContactProps = {
  x: number;
  y: number;
  heading: number;
  selected?: boolean;
  onSelect?: () => void;
  children: ReactNode;
};

export function Contact({ x, y, heading, selected = false, onSelect, children }: ContactProps) {
  return (
    <g
      transform={`translate(${x} ${y}) rotate(${heading})`}
      onClick={onSelect}
      className={onSelect ? "cursor-pointer" : undefined}
    >
      {selected ? <circle r={8} fill="none" stroke="#6ee7b7" strokeWidth={0.75} /> : null}
      {children}
      <circle r={8} fill="transparent" />
    </g>
  );
}
