export default function GridBackground() {
  return (
    <div
      aria-hidden="true"
      className="
        fixed inset-0 z-0 pointer-events-none opacity-0
        transition-opacity duration-300
        light:opacity-100
        light:bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]
        light:bg-[size:36px_36px]
      "
    />
  );
}