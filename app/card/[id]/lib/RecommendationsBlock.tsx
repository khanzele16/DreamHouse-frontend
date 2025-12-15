import type { ICard } from "@/app/types/models";

export function RecommendationsBlock({ items }: { items: ICard[] }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-[family-name:var(--font-stetica-bold)] mb-6" style={{ color: "var(--text-primary)" }}>Подборка для вас</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, n) => (
          <div 
            key={n} 
            className="rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-lg hover:scale-[1.02]"
            style={{ 
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              transition: "all 0.3s ease"
            }}
          >
            <div className="aspect-video bg-gradient-to-br from-gray-200 to-gray-300 rounded-t-2xl" style={{ backgroundColor: "var(--bg-secondary)" }}></div>
            <div className="p-4 flex flex-col gap-2">
              <div className="text-lg font-[family-name:var(--font-stetica-bold)]" style={{ color: "var(--text-primary)" }}>{item.price} ₽ / {item.area} м²</div>
              <div className="text-base font-medium" style={{ color: "var(--text-primary)" }}>{item.title}</div>
              <div className="text-sm" style={{ color: "var(--text-secondary)" }}>{item.address}</div>
              <button 
                className="mt-2 w-full py-2.5 rounded-xl font-[family-name:var(--font-stetica-bold)] text-sm transition-all hover:opacity-90"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "white",
                  transition: "all 0.3s ease"
                }}
              >
                Подробнее
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
