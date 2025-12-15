"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchCardById, toggleFavorite } from "@/app/shared/redux/slices/cards";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import {
  formatPrice,
  translateCategory,
  translateCity,
  translateElevator,
  translateHouseType,
  translateParking,
} from "@/app/card/[id]/lib";
import { BackButton, LocationIcon } from "@/app/card/[id]/lib/components";
import { CardDetailSkeleton } from "@/app/components/CardDetailSkeleton";
import { QuestionsBlock } from "@/app/card/[id]/lib/QuestionsBlock";
import { Tabs } from "@/app/card/[id]/lib/Tabs";
import { CharacteristicsAccordion } from "@/app/card/[id]/lib/CharacteristicsAccordion";
import { LocationAccordion } from "@/app/card/[id]/lib/LocationAccordion";
import { DescriptionAccordion } from "@/app/card/[id]/lib/DescriptionAccordion";
import { FavoriteButton } from "@/app/card/[id]/lib/FavoriteButton";
import { ImageCarousel } from "./lib/ImageCarousel";
import { AsidePanel } from "./lib/AsidePanel";
import { ICard, IDocument } from "@/app/types/models";
import { CardItemPreview } from "@/app/components/CardItemPreview";

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
    return <CardDetailSkeleton />;
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
  const recommendations = currentCard.list_curations || currentCard.recommendations || [];

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
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 p-6 lg:p-8">
              <div>
                <h1
                  className="text-3xl lg:text-4xl font-semibold"
                  style={{
                    color: "var(--text-primary)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {currentCard.title}
                </h1>
                <div
                  className="flex items-center gap-2 mt-3"
                  style={{
                    color: "var(--text-secondary)",
                    transition: "color 0.3s ease",
                  }}
                >
                  <LocationIcon />
                  <p className="text-lg">{currentCard.address}</p>
                </div>
              </div>
            </div>
            <ImageCarousel
              images={currentCard.images}
              videos={currentCard.videos}
              title={currentCard.title}
            />
            <CardBottomSection card={currentCard} />
          </div>
        </div>
        <AsidePanel card={currentCard} formattedPrice={formattedPrice} />
      </div>
      {recommendations.length > 0 && (
        <div className="max-w-[1300px] mx-auto mt-8">
          <h2
            className="text-2xl font-[family-name:var(--font-stetica-bold)] mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Подборка для вас
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-[30px] w-full">
            {recommendations.map((item) => (
              <CardItemPreview key={item.id} card={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function CardBottomSection({ card }: { card: ICard }) {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const [tab, setTab] = useState("characteristics");
  const questions = card.questions || [];
  const left = [
    { label: "Город", value: translateCity(card.city) },
    {
      label: "Общая площадь",
      value: card.area ? `${card.area} м²` : "Не указано",
    },
    { label: "Тип дома", value: translateHouseType(card.house_type) },
    { label: "Категория", value: translateCategory(card.category) },
    { label: "Количество комнат", value: card.rooms ?? "Не указано" },
    { label: "Этажей в доме", value: card.floors_total ?? "Не указано" },
  ];
  const right = [
    { label: "Лифт", value: translateElevator(card.elevator) },
    { label: "Парковка", value: translateParking(card.parking) },
    { label: "Ремонт", value: card.renovation ?? "Не указано" },
    { label: "Балкон или лоджия", value: card.balcony ? "Балкон" : "Нет" },
    {
      label: "Высота потолков",
      value: card.ceiling_height ? `${card.ceiling_height} м` : "Не указано",
    },
  ];
  const documents = card.documents || [];
  const description = card.description;
  const { latitude, longitude, address } = card;
  const [isFavorite, setIsFavorite] = useState(Boolean(card.is_favorite));
  
  const handleToggleFavorite = async () => {
    if (!isAuth) {
      alert("Войдите в систему, чтобы добавить в избранное");
      return;
    }
    
    try {
      await dispatch(toggleFavorite({ id: card.id, is_favorite: isFavorite })).unwrap();
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Ошибка при добавлении в избранное:", error);
      alert("Не удалось изменить статус избранного");
    }
  };

  return (
    <div className="px-4 sm:px-6 pb-8 pt-4">
      <QuestionsBlock questions={questions} />
      <Tabs
        active={tab}
        onChange={setTab}
        tabs={[
          { key: "characteristics", label: "Характеристики" },
          { key: "documents", label: "Документы" },
          { key: "planning", label: "Планирование" },
        ]}
      />
      {tab === "characteristics" && (
        <CharacteristicsAccordion left={left} right={right} />
      )}
      {tab === "documents" && (
        <div
          className="mb-4 rounded-2xl shadow-sm px-4 py-3 pb-0"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border-color)",
          }}
        >
          {documents.length > 0 ? (
            <ul className="space-y-3">
              {documents.map((doc: IDocument, i: number) => (
                <li
                  key={i}
                  className="flex items-center justify-between pb-3"
                  style={{
                    borderBottom:
                      i < documents.length - 1
                        ? "1px solid var(--border-color)"
                        : "none",
                  }}
                >
                  <a
                    href={doc.file}
                    download
                    className="font-medium hover:underline"
                    style={{ color: "var(--accent-primary)" }}
                    aria-label={`Скачать ${doc.title}`}
                  >
                    {doc.title}
                  </a>
                  {doc.uploaded_at && (
                    <span
                      className="text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {new Date(doc.uploaded_at).toLocaleDateString()}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <span
              className="text-center block"
              style={{ color: "var(--text-secondary)" }}
            >
              Документы отсутствуют
            </span>
          )}
        </div>
      )}
      {tab === "planning" && (
        <div
          className="mb-4 rounded-2xl shadow-sm p-6 text-center"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border-color)",
            color: "var(--text-secondary)",
          }}
        >
          Планирование не указано
        </div>
      )}
      <LocationAccordion
        latitude={latitude}
        longitude={longitude}
        address={address}
      />
      <DescriptionAccordion description={description} />
      <div className="my-6">
        <FavoriteButton
          isFavorite={isFavorite}
          onToggle={handleToggleFavorite}
        />
      </div>
    </div>
  );
}
