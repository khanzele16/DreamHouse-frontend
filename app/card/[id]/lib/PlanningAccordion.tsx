import { useState } from "react";

export function PlanningAccordion() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <details
      open={isOpen}
      className="mb-4 overflow-hidden rounded-lg"
      style={{
        backgroundColor: "rgba(var(--accent-secondary-rgb))",
        transition: "all 0.3s ease",
      }}
    >
      <summary
        className="flex items-center justify-between px-6 py-4 cursor-pointer select-none font-[family-name:var(--font-stetica-bold)] text-lg"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((v) => !v);
        }}
        aria-expanded={isOpen}
        style={{ color: "var(--text-primary)", transition: "color 0.3s ease" }}
      >
        Планирование
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </summary>
      <div className="px-6 pb-6 pt-2">
        <p
          className="text-center py-4 text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          Планирование не указано
        </p>
      </div>
    </details>
  );
}
