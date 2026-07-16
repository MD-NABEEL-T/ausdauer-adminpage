import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="mb-8 flex items-start justify-between gap-4">
      <div>
        <h1 className="text-[22px] md:text-[26px] font-medium tracking-tight text-neutral-100 light:text-neutral-900">
          Admin Dashboard
        </h1>
        <p className="mt-1.5 text-sm text-neutral-500 light:text-neutral-500 leading-relaxed max-w-lg">
          Manage registrations, monitor attendance, and keep records organized.
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
}