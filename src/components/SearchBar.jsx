import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search by name, employee ID, or department" }) {
  return (
    <div
      className="
        flex items-center gap-2.5 h-11 w-full
        rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md
        px-4 transition-colors duration-200
        focus-within:border-white/25 focus-within:bg-white/[0.05]
      "
    >
      <Search size={16} className="text-neutral-500 shrink-0" strokeWidth={1.75} />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          flex-1 bg-transparent text-sm text-neutral-100
          placeholder:text-neutral-600
          outline-none
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="text-neutral-600 hover:text-neutral-300 transition-colors duration-200 shrink-0"
        >
          <X size={15} strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
}