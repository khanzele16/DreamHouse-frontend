"use client";

import FiltersPanel from "@/app/components/Filter";
import { CellComponent } from "@/app/components/CardItemPreview";
import { useEffect } from "react";
// import { CatalogList } from "@/app/components/CatalogList";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { fetchCards } from "@/app/shared/redux/slices/cards";
import { useFiltersFromUrl } from "@/app/shared/hooks/useFiltersFromUrl";

export default function Home() {
  const dispatch = useAppDispatch();
  const { cards, loading, error } = useAppSelector((state) => state.cards);
  const { filters, updateFilters } = useFiltersFromUrl();

  useEffect(() => {
    dispatch(fetchCards(filters));
  }, [dispatch, filters]);

  return (
    <div
      className="flex flex-col min-h-screen justify-start content-center items-center font-[family-name:var(--font-stetica-regular)]"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="w-full max-w-[1300px] flex flex-col content-center gap-y-6 sm:gap-y-[25px] px-4 sm:px-6 lg:px-8 pt-2 pb-6 flex-grow">
        <div className="flex items-center gap-3">
          <div className="flex-1">
          </div>
          <div className="flex-shrink-0">
            <FiltersPanel
              onApplyFilters={updateFilters}
              currentFilters={filters}
            />
          </div>
        </div>

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
              <CellComponent key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
