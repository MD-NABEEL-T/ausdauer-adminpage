import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  name: "",
  employeeId: "",
  department: "",
  email: "",
  phone: "",
};

export default function AddRegistrationModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isOpen) setForm(emptyForm);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const isValid = form.name.trim() && form.employeeId.trim() && form.department.trim();

  const handleSave = () => {
    if (!isValid) return;
    onSave(form);
  };

  const fields = [
    { key: "name", label: "Full name", placeholder: "Priya Sharma" },
    { key: "employeeId", label: "Employee ID", placeholder: "EMP-1045" },
    { key: "department", label: "Department", placeholder: "Engineering" },
    { key: "email", label: "Email", placeholder: "priya.sharma@company.com", type: "email" },
    { key: "phone", label: "Phone", placeholder: "+91 98765 43210", type: "tel" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-registration-title"
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md rounded-2xl border border-neutral-800 bg-[#111111]
          light:border-neutral-200 light:bg-white light:shadow-xl
          p-6 shadow-2xl
        "
      >
        <div className="flex items-center justify-between mb-5">
          <h2 id="add-registration-title" className="text-base font-medium text-neutral-100 light:text-neutral-900">
            Add registration
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-neutral-500 hover:text-neutral-200 light:hover:text-neutral-700 transition-colors duration-200"
          >
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <div className="space-y-3.5">
          {fields.map(({ key, label, placeholder, type = "text" }) => (
            <div key={key}>
              <label htmlFor={key} className="block text-xs text-neutral-500 mb-1.5">
                {label}
              </label>
              <input
                id={key}
                type={type}
                value={form[key]}
                onChange={update(key)}
                placeholder={placeholder}
                className="
                  w-full h-10 rounded-xl border border-neutral-800 bg-[#0c0c0c]
                  light:border-neutral-200 light:bg-neutral-50
                  px-3.5 text-sm text-neutral-100 light:text-neutral-900
                  placeholder:text-neutral-600 light:placeholder:text-neutral-400
                  outline-none transition-colors duration-200
                  focus:border-neutral-600 light:focus:border-neutral-400
                "
              />
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={!isValid}
          className="
            mt-6 w-full h-11 rounded-full text-sm font-medium
            bg-neutral-100 text-neutral-900
            light:bg-neutral-900 light:text-white
            transition-all duration-200
            hover:bg-white light:hover:bg-neutral-800
            disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-neutral-100 light:disabled:hover:bg-neutral-900
          "
        >
          Save registration
        </button>
      </div>
    </div>
  );
}