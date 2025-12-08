interface FieldChipsOption {
  value: string;
  label: string;
}

interface FieldChipsProps {
  label?: string;
  options: FieldChipsOption[];
  value: string[];
  onToggle: (val: string) => void;
  multiSelect?: boolean;
}

export function FieldChips({
  label,
  options,
  value,
  onToggle,
  multiSelect = true,
}: FieldChipsProps) {
  const handleToggle = (optionValue: string) => {
    if (!multiSelect) {
      if (value.includes(optionValue)) {
        onToggle(optionValue);
      } else {
        value.forEach((v) => onToggle(v));
        onToggle(optionValue);
      }
    } else {
      onToggle(optionValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, optionValue: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleToggle(optionValue);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-[family-name:var(--font-stetica-bold)]">
          {label}
        </label>
      )}
      <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
        {options.map((o) => {
          const active = value.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              role="checkbox"
              aria-checked={active}
              onClick={() => handleToggle(o.value)}
              onKeyDown={(e) => handleKeyDown(e, o.value)}
              className={`px-4 py-2 rounded-full border transition-all ${
                active
                  ? "bg-[var(--accent-primary)] text-white border-transparent"
                  : "bg-[var(--bg-secondary)] hover:border-[var(--accent-primary)]"
              }`}
              style={
                !active ? { borderColor: "var(--border-color)" } : undefined
              }
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
