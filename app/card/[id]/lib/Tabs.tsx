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
    <div className="flex gap-2 mb-6 overflow-x-auto pb-2" role="tablist">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={active === tab.key}
          className="px-5 py-2.5 rounded-full font-[family-name:var(--font-stetica-bold)] text-sm transition-all whitespace-nowrap"
          onClick={() => onChange(tab.key)}
          style={{
            backgroundColor: active === tab.key ? "var(--accent-primary)" : "var(--bg-secondary)",
            color: active === tab.key ? "white" : "var(--text-secondary)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            if (active !== tab.key) {
              e.currentTarget.style.backgroundColor = "var(--border-color)";
            }
          }}
          onMouseLeave={(e) => {
            if (active !== tab.key) {
              e.currentTarget.style.backgroundColor = "var(--bg-secondary)";
            }
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
