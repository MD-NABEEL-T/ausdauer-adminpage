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
  Present: "text-[#9FE1CB] bg-[#0F1E19]/70 border-[#1D3A31]",
  Absent: "text-[#F0997B] bg-[#211511]/70 border-[#3A2318]",
};

export default function UserCard({ user, onClick }) {
  const { name, employeeId, department, status } = user;

  return (
    <button
      type="button"
      onClick={() => onClick(user)}
      className="
        w-full flex items-center gap-3.5
        rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md
        px-4 py-2.5 text-left
        transition-all duration-200
        hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-0.5
        focus:outline-none focus-visible:border-neutral-600
      "
    >
      {/* Avatar */}
      <div
        className="
          shrink-0 w-9 h-9 rounded-full
          bg-white/5 border border-white/10
          flex items-center justify-center
          text-[13px] font-medium text-neutral-300
        "
      >
        {getInitials(name)}
      </div>

      {/* Name + meta */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-neutral-100 truncate">{name}</p>
        <p className="text-xs text-neutral-500 mt-0.5 truncate">
          {employeeId} &middot; {department}
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
      <ChevronRight size={16} className="shrink-0 text-neutral-600" strokeWidth={1.75} />
    </button>
  );
}