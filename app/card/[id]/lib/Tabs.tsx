export function Tabs({
  active,
  onChange,
  tabs,
}: {
  active: string;
  onChange: (tab: string) => void;
  tabs: { key: string; label: string }[];
}) {
  return (
<div
  className="tabs-scroll flex gap-3 mb-4 overflow-x-auto pb-2"
  role="tablist"
>
  {tabs.map((tab) => (
    <button
      key={tab.key}
      role="tab"
      aria-selected={active === tab.key}
      className="cursor-pointer px-5 py-1.5 rounded-lg font-[family-name:var(--font-stetica-regular)] text-base transition-all whitespace-nowrap"
      onClick={() => onChange(tab.key)}
      style={{
        backgroundColor: "transparent",
        border:
          active === tab.key
            ? "1.5px solid var(--accent-primary)"
            : "1.5px solid var(--border-color)",
        color: "var(--text-primary)",
      }}
    >
      {tab.label}
    </button>
  ))}
</div>

  );
}
