export default function StatsCard({ label, value }) {
  return (
    <div
      className="
        rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md
        px-4.5 py-4
        transition-all duration-200
        hover:border-white/20 hover:bg-white/[0.05] hover:-translate-y-0.5
        shadow-[0_1px_0_0_rgba(255,255,255,0.03)_inset]
      "
    >
      <p className="text-xs text-neutral-500">{label}</p>
      <p className="mt-2 text-2xl font-medium text-neutral-100 tabular-nums">
        {value}
      </p>
    </div>
  );
}