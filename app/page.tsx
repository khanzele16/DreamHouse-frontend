"use client";

import { CardItemPreview } from "@/app/components/CardItemPreview";
import { Suspense, useEffect } from "react";
import { CatalogList } from "@/app/components/CatalogList";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { fetchCards } from "@/app/shared/redux/slices/cards";

const ListCatalog = [
  { name: "Частные дома", query: "private-houses" },
  { name: "Квартиры", query: "apartments" },
  { name: "Коммерческая недвижимость", query: "commercial-estate" },
  { name: "Участки", query: "lands" },
  { name: "Коттеджи", query: "cottages" },
];

export default function Home() {
  const dispatch = useAppDispatch();
  const { cards, loading, error } = useAppSelector((state) => state.cards);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <div
      className="flex flex-col min-h-screen justify-start content-center items-center font-[family-name:var(--font-stetica-regular)]"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="w-full max-w-[1300px] flex flex-col content-center gap-y-6 sm:gap-y-[25px] px-4 sm:px-6 lg:px-8 pt-2 pb-6 flex-grow">
        <Suspense>
          <CatalogList List={ListCatalog} />
        </Suspense>

        {loading && (
          <div className="text-center py-10 text-[#999999]">
            Загрузка карточек...
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-[#FF4444]">{error}</div>
        )}

        {!loading && !error && cards?.length === 0 && (
          <div className="text-center py-10 text-[#999999]">
            Карточки не найдены
          </div>
        )}

        {!loading && !error && cards?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-[30px] w-full">
            {cards.map((card) => (
              <CardItemPreview key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
