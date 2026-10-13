type ReadoutProps = {
  label: string;
  value: string;
};

export function Readout({ label, value }: ReadoutProps) {
  return (
    <div className="flex justify-between gap-4 border-b border-emerald-500/20 pb-2">
      <dt className="text-emerald-500/70">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
