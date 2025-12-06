import {
  RatingBlock,
  CharacteristicCard,
  LocationIcon,
} from "@/app/card/[id]/lib/components";
import {
  translateBuildingMaterial,
  translateCategory,
  translateHouseType,
} from "@/app/card/[id]/lib";
import type { ICard } from "@/app/types/models";

interface CardInfoProps {
  card: ICard;
}

export function CardInfo({ card }: CardInfoProps) {
  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div>
          <h1
            className="text-3xl lg:text-4xl font-semibold"
            style={{
              color: "var(--text-primary)",
              transition: "color 0.3s ease",
            }}
          >
            {card.title}
          </h1>
          <div
            className="flex items-center gap-2 mt-3"
            style={{
              color: "var(--text-secondary)",
              transition: "color 0.3s ease",
            }}
          >
            <LocationIcon />
            <p className="text-lg">{card.address}</p>
          </div>
        </div>
      </div>

      <div
        className="pt-6 mt-6"
        style={{
          borderTop: "1px solid var(--border-color)",
          transition: "border-color 0.3s ease",
        }}
      >
        <h2
          className="text-2xl mb-4 font-semibold"
          style={{
            color: "var(--text-primary)",
            transition: "color 0.3s ease",
          }}
        >
          Описание
        </h2>
        <p
          className="leading-relaxed"
          style={{
            color: "var(--text-primary)",
            transition: "color 0.3s ease",
          }}
        >
          {card.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <CharacteristicCard label="Комнат" value={card.rooms} />
          <CharacteristicCard
            label="Тип дома"
            value={translateHouseType(card.house_type)}
          />
          <CharacteristicCard
            label="Материал"
            value={translateBuildingMaterial(card.building_material)}
          />
          <CharacteristicCard
            label="Категория"
            value={translateCategory(card.category)}
          />
          <CharacteristicCard
            label="Этажей в доме"
            value={card.floors_total}
          />
          <CharacteristicCard
            label="Высота потолков"
            value={card.ceiling_height}
          />
        </div>
      </div>
    </div>
  );
}
