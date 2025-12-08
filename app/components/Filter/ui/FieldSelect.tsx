interface FieldSelectOption {
  value: string | number;
  label: string;
}

interface FieldSelectProps {
  label?: string;
  value?: string | number;
  onChange: (v: string) => void;
  options: FieldSelectOption[];
  placeholder?: string;
}

export function FieldSelect({
  label,
  value,
  onChange,
  options,
  placeholder = "",
}: FieldSelectProps) {
  return (
    <div className="space-y-2 mb-1">
      {label && (
        <label className="block text-sm font-[family-name:var(--font-stetica-bold)]">
          {label}
        </label>
      )}
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-lg"
        style={{
          backgroundColor: "var(--bg-secondary)",
          border: "1px solid var(--border-color)",
        }}
      >
        <option value="">{placeholder || "Все"}</option>
        {options.map((o) => (
          <option key={String(o.value)} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
