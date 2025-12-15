"use client";

import { Suspense } from "react";
import FiltersPanel from "@/app/components/Filter";
import { VirtualizedCardList } from "@/app/components/VirtualizedCardList";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { useFiltersFromUrl } from "@/app/shared/hooks/useFiltersFromUrl";
import { resetPagination } from "@/app/shared/redux/slices/cards";
import { useEffect } from "react";

function HomeContent() {
  const dispatch = useAppDispatch();
  const { error } = useAppSelector((state) => state.cards);
  const { filters, updateFilters } = useFiltersFromUrl();

  useEffect(() => {
    dispatch(resetPagination());
  }, [dispatch, filters]);

  return (
    <>
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

      {error && (
        <div
          className="text-center py-4 px-6 rounded-lg"
          style={{
            backgroundColor: "var(--card-bg)",
            color: "#FF4444",
            border: "1px solid #FF4444",
          }}
        >
          {error === "Network Error"
            ? "Ошибка сети. Проверьте подключение к интернету."
            : `Ошибка: ${error}`}
        </div>
      )}

      <VirtualizedCardList filters={filters} />
    </>
  );
}

export default function Home() {
  return (
    <div
      className="flex flex-col min-h-screen justify-start content-center items-center font-[family-name:var(--font-stetica-regular)]"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="w-full max-w-[1300px] flex flex-col content-center gap-y-6 sm:gap-y-[25px] px-4 sm:px-6 lg:px-8 pt-2 pb-6 flex-grow">
        <Suspense
          fallback={
            <div
              className="text-center py-10"
              style={{ color: "var(--text-secondary)" }}
            >
              Загрузка...
            </div>
          }
        >
          <HomeContent />
        </Suspense>
      </div>
    </div>
  );
}
