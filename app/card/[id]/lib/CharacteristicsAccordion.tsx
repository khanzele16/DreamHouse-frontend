import { useState } from "react";

export interface CharacteristicItem {
  label: string;
  value: string | number | null | undefined;
}

export function CharacteristicsAccordion({
  left,
  right,
  open = true,
}: {
  left: CharacteristicItem[];
  right: CharacteristicItem[];
  open?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <details open={isOpen} className="mb-4 overflow-hidden rounded-lg" style={{ backgroundColor: "rgba(var(--accent-secondary-rgb))", transition: "all 0.3s ease" }}>
      <summary
        className="flex items-center justify-between px-6 py-4 cursor-pointer select-none font-[family-name:var(--font-stetica-bold)] text-lg"
        onClick={(e) => {
          e.preventDefault();
          setIsOpen((v) => !v);
        }}
        aria-expanded={isOpen}
        style={{ color: "var(--text-primary)", transition: "color 0.3s ease" }}
      >
        Основные характеристики 
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          className="transition-transform duration-300"
          style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </summary>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 px-6 pb-6 pt-2">
        {left.map((item, i) => (
          <div key={i} className="flex justify-between items-center flex-row gap-1">
            <div className="text-base font-[family-name:var(--font-stetica-medium)]" style={{ color: "var(--text-secondary)" }}>{item.label}</div>
            <div className="text-base font-[family-name:var(--font-stetica-medium)]" style={{ color: "var(--text-secondary)" }}>{item.value ?? "Не указано"}</div>
          </div>
        ))}
        {right.map((item, i) => (
          <div key={i} className="flex justify-between items-center flex-row gap-1">
            <div className="text-base font-[family-name:var(--font-stetica-medium)]" style={{ color: "var(--text-secondary)" }}>{item.label}</div>
            <div className="text-base font-[family-name:var(--font-stetica-medium)]" style={{ color: "var(--text-secondary)" }}>{item.value ?? "Не указано"}</div>
          </div>
        ))}
      </div>
    </details>
  );
}
