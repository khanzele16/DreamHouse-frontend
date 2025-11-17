import Image from "next/image";
import { DetailsSection } from "@/app/card/[id]/lib/components";
import {
  translateCity,
  translateElevator,
  translateParking,
  translateHouseType,
  translateCategory,
} from "@/app/card/[id]/lib";
import type { ICard } from "@/app/types/models";

interface AsidePanelProps {
  card: ICard;
  formattedPrice: string;
}

export function AsidePanel({ card, formattedPrice }: AsidePanelProps) {
  return (
    <aside className="lg:col-span-1">
      <div
        className="rounded-2xl p-5 shadow-md flex flex-col gap-4"
        style={{
          backgroundColor: "var(--card-bg)",
          transition: "background-color 0.3s ease",
        }}
      >
        <div>
          <p
            className="text-2xl font-bold"
            style={{
              color: "var(--accent-primary)",
              transition: "color 0.3s ease",
            }}
          >
            {formattedPrice} ₽{" "}
            <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
              / {card.area} м²
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            className="w-full py-3 rounded-lg text-white font-medium transition-colors cursor-pointer"
            style={{ backgroundColor: "var(--accent-primary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--accent-secondary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--accent-primary)")
            }
          >
            Оставить заявку
          </button>
          <a
            href={`tel:${card.owner}`}
            className="w-full flex justify-center content-center py-3 rounded-lg font-medium transition-colors cursor-pointer"
            style={{
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            Позвонить
          </a>
        </div>

        <div
          className="mt-2 p-3 rounded-lg flex items-center gap-3"
          style={{
            backgroundColor: "var(--bg-secondary)",
            transition: "background-color 0.3s ease",
          }}
        >
          <div className="flex-1 flex items-center flex-row">
            <Image
              src={card.developer.logo}
              alt={card.developer.name}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col ml-3">
              <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                {card.developer.name}
              </p>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                {card.owner}
              </p>
            </div>
          </div>
          <button
            className="px-4 py-2 rounded-lg cursor-pointer"
            style={{
              backgroundColor: "var(--card-bg)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
            }}
          >
            Подписаться
          </button>
        </div>
      </div>

      <DetailsSection
        title="Основные характеристики"
        items={[
          { label: "Город", value: translateCity(card.city) },
          { label: "Лифт", value: translateElevator(card.elevator) },
          { label: "Площадь", value: `${card.area} м²` },
          { label: "Парковка", value: translateParking(card.parking) },
          { label: "Тип дома", value: translateHouseType(card.house_type) },
          { label: "Ремонт", value: "С ремонтом" },
          { label: "Категория", value: translateCategory(card.category) },
          {
            label: "Балкон или лоджия",
            value: card.balcony ? "Балкон" : "Нет",
          },
        ]}
      />
    </aside>
  );
}
