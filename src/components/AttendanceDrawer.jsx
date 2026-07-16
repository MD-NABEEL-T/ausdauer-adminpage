import { useEffect, useState } from "react";
import { X, Mail, Phone } from "lucide-react";

function getInitials(name = "") {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function AttendanceDrawer({ user, isOpen, onClose, onSave }) {
  const [status, setStatus] = useState(user?.status ?? "Present");

  // Sync local selection whenever a different user is opened
  useEffect(() => {
    if (user) setStatus(user.status);
  }, [user]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const hasChanges = user && status !== user.status;

  const handleSave = () => {
    if (!user) return;
    onSave(user.employeeId, status);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0 z-40 bg-black/60
          transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-user-name"
        className={`
          fixed top-0 right-0 z-50 h-full w-full max-w-sm
          bg-[#111111] border-l border-neutral-800
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          flex flex-col
        `}
      >
        {user && (
          <>
            <div className="flex items-center justify-between px-6 pt-6 pb-5 border-b border-neutral-800">
              <h2 className="text-sm font-medium text-neutral-100">Attendance</h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="text-neutral-500 hover:text-neutral-200 transition-colors duration-200"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </div>

            <div className="px-6 py-6 flex-1 overflow-y-auto">
              {/* User identity */}
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#1B1B1B] border border-neutral-800 flex items-center justify-center text-sm font-medium text-neutral-300">
                  {getInitials(user.name)}
                </div>
                <div>
                  <p id="drawer-user-name" className="text-sm font-medium text-neutral-100">
                    {user.name}
                  </p>
                  <p className="text-xs text-neutral-500 mt-0.5">
                    {user.employeeId} &middot; {user.department}
                  </p>
                </div>
              </div>

              {/* Contact details */}
              <div className="space-y-2.5 mb-7 pb-7 border-b border-neutral-800">
                {user.email && (
                  <div className="flex items-center gap-2.5 text-sm text-neutral-400">
                    <Mail size={15} className="text-neutral-600 shrink-0" strokeWidth={1.75} />
                    <span className="truncate">{user.email}</span>
                  </div>
                )}
                {user.phone && (
                  <div className="flex items-center gap-2.5 text-sm text-neutral-400">
                    <Phone size={15} className="text-neutral-600 shrink-0" strokeWidth={1.75} />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>

              {/* Status selection */}
              <p className="text-xs text-neutral-500 mb-3">Mark attendance</p>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => setStatus("Present")}
                  className={`
                    h-11 rounded-xl text-sm font-medium border transition-all duration-200
                    ${
                      status === "Present"
                        ? "bg-[#0F1E19] border-[#1D3A31] text-[#9FE1CB]"
                        : "bg-transparent border-neutral-800 text-neutral-500 hover:border-neutral-700"
                    }
                  `}
                >
                  Present
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("Absent")}
                  className={`
                    h-11 rounded-xl text-sm font-medium border transition-all duration-200
                    ${
                      status === "Absent"
                        ? "bg-[#211511] border-[#3A2318] text-[#F0997B]"
                        : "bg-transparent border-neutral-800 text-neutral-500 hover:border-neutral-700"
                    }
                  `}
                >
                  Absent
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-5 border-t border-neutral-800">
              <button
                type="button"
                onClick={handleSave}
                disabled={!hasChanges}
                className="
                  w-full h-11 rounded-full text-sm font-medium
                  bg-neutral-100 text-neutral-900
                  transition-all duration-200
                  hover:bg-white
                  disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-100
                "
              >
                Save changes
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}