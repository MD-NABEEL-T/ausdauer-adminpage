import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("theme") || "dark"; // dark stays the default
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
      aria-label="Toggle theme"
      className="
        relative shrink-0 w-11 h-11 rounded-full overflow-hidden
        border border-white/10 bg-white/[0.03] backdrop-blur-md
        light:border-neutral-200 light:bg-white light:shadow-sm
        flex items-center justify-center
        transition-all duration-200
        hover:-translate-y-0.5 hover:border-white/20 light:hover:border-neutral-300
      "
    >
      <Sun
        size={17}
        strokeWidth={1.75}
        className="absolute text-amber-500 transition-all duration-300 scale-0 opacity-0 light:scale-100 light:opacity-100"
      />
      <Moon
        size={17}
        strokeWidth={1.75}
        className="absolute text-neutral-300 transition-all duration-300 scale-100 opacity-100 light:scale-0 light:opacity-0"
      />
    </button>
  );
}