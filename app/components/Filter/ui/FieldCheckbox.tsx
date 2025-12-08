export function FieldCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked?: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 rounded"
      />
      <span className="text-sm font-[family-name:var(--font-stetica-bold)]">
        {label}
      </span>
    </label>
  );
}
