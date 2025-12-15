"use client";

import Image from "next/image";
import { useState } from "react";
import type { ICard } from "@/app/types/models";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import {
  subscribeToDeveloper,
  unsubscribeFromDeveloper,
} from "@/app/shared/redux/slices/developers";
import { CallRequestModal } from "@/app/components/CallRequestModal";
import Link from "next/link";

interface AsidePanelProps {
  card: ICard;
  formattedPrice: string;
}

export function AsidePanel({ card, formattedPrice }: AsidePanelProps) {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  const [isSubscribed, setIsSubscribed] = useState(
    card.developer.is_subscribed || false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubscriptionToggle = async () => {
    if (!isAuth) {
      alert("Войдите в систему, чтобы подписаться на застройщика");
      return;
    }

    setIsLoading(true);
    try {
      if (isSubscribed) {
        await dispatch(unsubscribeFromDeveloper(card.developer.id)).unwrap();
        setIsSubscribed(false);
      } else {
        await dispatch(subscribeToDeveloper(card.developer.id)).unwrap();
        setIsSubscribed(true);
      }
    } catch (error) {
      console.error("Ошибка при изменении подписки:", error);
      alert("Не удалось изменить подписку. Попробуйте позже.");
    } finally {
      setIsLoading(false);
    }
  };
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
            <span
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              / {card.area} м²
            </span>
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full py-3 rounded-lg text-white font-medium transition-colors cursor-pointer"
            style={{ backgroundColor: "var(--accent-primary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--accent-secondary)")
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
          className="mt-2 p-4 rounded-lg flex flex-col gap-3"
          style={{
            backgroundColor: "var(--bg-secondary)",
            transition: "background-color 0.3s ease",
          }}
        >
          <Link
            className="cursor-pointer"
            href={`/developers/${card.developer.id}`}
          >
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src={card.developer.logo}
                  alt={card.developer.name}
                  fill
                  sizes="48px"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="font-medium truncate"
                  style={{ color: "var(--text-primary)" }}
                >
                  {card.developer.name}
                </p>
                <p
                  className="text-sm truncate"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {card.owner}
                </p>
              </div>
            </div>
          </Link>
          <button
            onClick={handleSubscriptionToggle}
            disabled={isLoading}
            className={`w-full py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
              isLoading
                ? "opacity-60 cursor-not-allowed"
                : "hover:opacity-90 active:scale-[0.98]"
            }`}
            style={{
              backgroundColor: "transparent",
              border: isSubscribed
                ? "1px solid var(--border-color)"
                : "2px solid var(--accent-primary)",
              color: isSubscribed
                ? "var(--text-secondary)"
                : "var(--accent-primary)",
            }}
          >
            {isLoading ? (
              <span>Загрузка...</span>
            ) : isSubscribed ? (
              <>
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 6L9 17L4 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Вы подписаны</span>
              </>
            ) : (
              <span>Подписаться</span>
            )}
          </button>
        </div>
      </div>

      <CallRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        apartmentTitle={card.title}
        cardId={card.id}
      />
    </aside>
  );
}
