import { ChevronRight } from "lucide-react";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

const statusStyles = {
  Present:
    "text-[#9FE1CB] bg-[#0F1E19]/70 border-[#1D3A31] light:text-emerald-700 light:bg-emerald-50 light:border-emerald-200",
  Absent:
    "text-[#F0997B] bg-[#211511]/70 border-[#3A2318] light:text-orange-700 light:bg-orange-50 light:border-orange-200",
};

const highlightDotColors = {
  green: "#22c55e",
  orange: "#f59e0b",
  yellow: "#eab308",
};

export default function UserCard({ user, onClick }) {
  const { name, bookingId, companyName, collegeName, status, sheetHighlight } = user;
  const org = companyName || collegeName || "—";
  const dotColor = highlightDotColors[sheetHighlight];

  return (
    <button
      type="button"
      onClick={() => onClick(user)}
      className="
        w-full flex items-center gap-3.5
        rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md
        light:border-neutral-200 light:bg-white light:shadow-sm
        px-4 py-2.5 text-left
        transition-all duration-200
        hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-0.5
        light:hover:border-neutral-300 light:hover:bg-neutral-50
        focus:outline-none focus-visible:border-neutral-600
      "
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className="
            w-9 h-9 rounded-full
            bg-white/5 border border-white/10
            light:bg-neutral-100 light:border-neutral-200
            flex items-center justify-center
            text-[13px] font-medium text-neutral-300 light:text-neutral-600
          "
        >
          {getInitials(name)}
        </div>
        {dotColor && (
          <span
            title={`Sheet color: ${sheetHighlight} (meaning unconfirmed)`}
            className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-[#111111] light:border-white"
            style={{ backgroundColor: dotColor }}
          />
        )}
      </div>

      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-100 light:text-neutral-900 truncate">{name}</p>
        <p className="text-xs text-neutral-500 mt-0.5 truncate">
          {bookingId ?? "No booking ID"} &middot; {org}
        </p>
      </div>

      {/* Status badge */}
      <span
        className={`
          shrink-0 text-xs px-3 py-1 rounded-full border backdrop-blur-sm
          ${statusStyles[status] ?? statusStyles.Absent}
        `}
      >
        {status}
      </span>

      {/* Chevron */}
      <ChevronRight size={16} className="shrink-0 text-neutral-600 light:text-neutral-400" strokeWidth={1.75} />
    </button>
  );
}