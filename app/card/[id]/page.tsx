"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchCardById } from "@/app/shared/redux/slices/cards";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { formatPrice } from "@/app/card/[id]/lib";
import { BackButton } from "@/app/card/[id]/lib/components";
import { ImageCarousel } from "./lib/ImageCarousel";
import { CardInfo } from "./lib/CardInfo";
import { AsidePanel } from "./lib/AsidePanel";
import { MapWidget } from "./lib/MapWidget";

export default function CardDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentCard, loading, error } = useAppSelector(
    (state) => state.cards
  );

  useEffect(() => {
    const id = Number(params.id);
    if (id) {
      dispatch(fetchCardById(id));
    }
  }, [params.id, dispatch]);

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
          Загрузка...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <p className="text-xl text-red-600">{error}</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2 rounded-lg transition-colors cursor-pointer"
          style={{ backgroundColor: "var(--accent-primary)", color: "white" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--accent-secondary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--accent-primary)")
          }
        >
          Вернуться на главную
        </button>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <p className="text-xl" style={{ color: "var(--text-secondary)" }}>
          Карточка не найдена
        </p>
      </div>
    );
  }

  const formattedPrice = formatPrice(currentCard.price);

  return (
    <div
      className="min-h-screen p-6"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="max-w-[1300px] mx-auto">
        <BackButton onClick={() => router.back()} />
      </div>

      <div className="max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div
            className="rounded-2xl overflow-hidden shadow-md"
            style={{
              backgroundColor: "var(--card-bg)",
              transition: "background-color 0.3s ease",
            }}
          >
            <ImageCarousel images={currentCard.images} title={currentCard.title} />
            <CardInfo card={currentCard} />
          </div>

          {/* <MapWidget
            latitude={currentCard.latitude}
            longitude={currentCard.longitude}
            title={currentCard.title}
            address={currentCard.address}
          /> */}
        </div>

        <AsidePanel card={currentCard} formattedPrice={formattedPrice} />
      </div>
    </div>
  );
}
