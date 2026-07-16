import { Search, X } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search by name, employee ID, or department" }) {
  return (
    <div
      className="
        flex items-center gap-2.5 h-11 w-full
        rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md
        light:border-neutral-200 light:bg-white light:shadow-sm
        px-4 transition-colors duration-200
        focus-within:border-white/25 focus-within:bg-white/[0.05]
        light:focus-within:border-neutral-400 light:focus-within:bg-neutral-50
      "
    >
      <Search size={16} className="text-neutral-500 light:text-neutral-400 shrink-0" strokeWidth={1.75} />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          flex-1 bg-transparent text-sm text-neutral-100 light:text-neutral-900
          placeholder:text-neutral-600 light:placeholder:text-neutral-400
          outline-none
        "
      />

      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="text-neutral-600 hover:text-neutral-300 light:text-neutral-400 light:hover:text-neutral-700 transition-colors duration-200 shrink-0"
        >
          <X size={15} strokeWidth={1.75} />
        </button>
      )}
    </div>
  );
}