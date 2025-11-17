"use client";

import { CardItemPreview } from "../components/CardItemPreview";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../shared/redux/hooks";
import { fetchFavoriteCards } from "../shared/redux/slices/cards";
import { useRouter } from "next/navigation";
import type { ICard } from "../types/models";

export default function Favorite() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cards, loading, error } = useAppSelector((state) => state.cards);
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Проверяем авторизацию
    if (!isAuth) {
      router.push("/login");
      return;
    }

    dispatch(fetchFavoriteCards());
  }, [dispatch, isAuth, router]);

  if (!isAuth) {
    return null;
  }

  return (
    <div
      className="flex flex-col justify-start content-center items-center font-[family-name:var(--font-stetica-regular)]"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="w-full max-w-[1300px] flex flex-col content-center gap-y-6 sm:gap-y-[25px] px-4 sm:px-6 lg:px-8 pt-6 pb-6 flex-grow">
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-[family-name:var(--font-stetica-bold)]"
          style={{
            color: "var(--text-primary)",
            transition: "color 0.3s ease",
          }}
        >
          Избранное
        </h1>

        {loading && (
          <div
            className="text-center py-10"
            style={{
              color: "var(--text-secondary)",
              transition: "color 0.3s ease",
            }}
          >
            Загрузка избранных карточек...
          </div>
        )}

        {error && (
          <div className="text-center py-10 text-[#FF4444]">{error}</div>
        )}

        {!loading && !error && cards?.length === 0 && (
          <div
            className="text-center py-10"
            style={{
              color: "var(--text-secondary)",
              transition: "color 0.3s ease",
            }}
          >
            У вас пока нет избранных карточек
          </div>
        )}

        {!loading && !error && cards?.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-[30px] w-full">
            {cards.map((card: ICard) => (
              <CardItemPreview key={card.id} card={card} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
