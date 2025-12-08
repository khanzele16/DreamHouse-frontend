"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchCardById } from "@/app/shared/redux/slices/cards";
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
import { QuestionsBlock } from "@/app/card/[id]/lib/QuestionsBlock";
import { Tabs } from "@/app/card/[id]/lib/Tabs";
import { CharacteristicsAccordion } from "@/app/card/[id]/lib/CharacteristicsAccordion";
import { LocationAccordion } from "@/app/card/[id]/lib/LocationAccordion";
import { DescriptionAccordion } from "@/app/card/[id]/lib/DescriptionAccordion";
import { FavoriteButton } from "@/app/card/[id]/lib/FavoriteButton";
import { RecommendationsBlock } from "@/app/card/[id]/lib/RecommendationsBlock";
import { ImageCarousel } from "./lib/ImageCarousel";
import { AsidePanel } from "./lib/AsidePanel";
import { ICard, IDocument } from "@/app/types/models";

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
              title={currentCard.title}
            />
            <CardInfoSection card={currentCard} />
            <CardBottomSection card={currentCard} />
          </div>
        </div>
        <AsidePanel card={currentCard} formattedPrice={formattedPrice} />
      </div>
    </div>
  );
}

function CardInfoSection({ card }: { card: ICard }) {
  const questionsCount = card.questions?.length || 0;

  return (
    <div className="px-4 sm:px-6 py-6">
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 2.4375C10.9109 2.4375 8.86879 3.05698 7.13179 4.2176C5.3948 5.37822 4.04098 7.02786 3.24153 8.95791C2.44208 10.8879 2.2329 13.0117 2.64046 15.0606C3.04802 17.1096 4.054 18.9916 5.53119 20.4688C7.00838 21.946 8.89044 22.952 10.9394 23.3595C12.9883 23.7671 15.1121 23.5579 17.0421 22.7585C18.9721 21.959 20.6218 20.6052 21.7824 18.8682C22.943 17.1312 23.5625 15.0891 23.5625 13C23.5595 10.1996 22.4458 7.51466 20.4656 5.53445C18.4853 3.55424 15.8004 2.44046 13 2.4375ZM13 19.5C12.759 19.5 12.5233 19.4285 12.3229 19.2946C12.1225 19.1607 11.9663 18.9703 11.874 18.7476C11.7818 18.5249 11.7576 18.2799 11.8047 18.0435C11.8517 17.8071 11.9678 17.5899 12.1382 17.4195C12.3087 17.249 12.5258 17.1329 12.7622 17.0859C12.9987 17.0389 13.2437 17.063 13.4664 17.1553C13.6891 17.2475 13.8794 17.4037 14.0134 17.6041C14.1473 17.8046 14.2188 18.0402 14.2188 18.2812C14.2188 18.6045 14.0903 18.9145 13.8618 19.143C13.6332 19.3716 13.3232 19.5 13 19.5ZM13.8125 14.5519V14.625C13.8125 14.8405 13.7269 15.0472 13.5745 15.1995C13.4222 15.3519 13.2155 15.4375 13 15.4375C12.7845 15.4375 12.5779 15.3519 12.4255 15.1995C12.2731 15.0472 12.1875 14.8405 12.1875 14.625V13.8125C12.1875 13.597 12.2731 13.3903 12.4255 13.238C12.5779 13.0856 12.7845 13 13 13C14.3437 13 15.4375 12.0859 15.4375 10.9687C15.4375 9.85156 14.3437 8.9375 13 8.9375C11.6563 8.9375 10.5625 9.85156 10.5625 10.9687V11.375C10.5625 11.5905 10.4769 11.7971 10.3245 11.9495C10.1722 12.1019 9.96549 12.1875 9.75 12.1875C9.53452 12.1875 9.32785 12.1019 9.17548 11.9495C9.02311 11.7971 8.9375 11.5905 8.9375 11.375V10.9687C8.9375 8.95273 10.7595 7.3125 13 7.3125C15.2405 7.3125 17.0625 8.95273 17.0625 10.9687C17.0625 12.7339 15.665 14.2116 13.8125 14.5519Z"
          fill="#3366CC"
        />
      </svg>
      {questionsCount > 0 && (
        <div
          className="flex items-center justify-center gap-3 mb-6 px-4 py-3 rounded-xl"
          style={{
            backgroundColor: "var(--bg-secondary)",
            color: "var(--text-primary)",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span
            className="text-base font-[family-name:var(--font-stetica-bold)]"
            style={{ color: "var(--text-primary)" }}
          >
            {questionsCount} {questionsCount === 1 ? "вопрос" : "вопросов"}
          </span>
        </div>
      )}

      <hr
        className="border-0 h-px"
        style={{
          backgroundColor: "var(--border-color)",
          transition: "background-color 0.3s ease",
        }}
      />
    </div>
  );
}

function CardBottomSection({ card }: { card: ICard }) {
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
  
  const handleToggleFavorite = () => {
    if (!isAuth) {
      alert("Войдите в систему, чтобы добавить в избранное");
      return;
    }
    setIsFavorite((v) => !v);
  };
  
  const recommendations = card.recommendations || [];

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
          className="mb-4 rounded-2xl shadow-sm p-6"
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
      <RecommendationsBlock items={recommendations} />
    </div>
  );
}
