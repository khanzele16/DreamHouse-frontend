"use client";

import { useState } from "react";
import Image from "next/image";
import type { ICard } from "@/app/types/models";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import {
  subscribeToDeveloper,
  unsubscribeFromDeveloper,
} from "@/app/shared/redux/slices/developers";

interface AsidePanelProps {
  card: ICard;
  formattedPrice: string;
}

export function AsidePanel({ card, formattedPrice }: AsidePanelProps) {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { developers } = useAppSelector((state) => state.developers);

  const developer = developers.find((dev) => dev.id === card.developer.id);
  const [isSubscribed, setIsSubscribed] = useState(
    developer?.is_subscribed || false
  );
  const [isLoading, setIsLoading] = useState(false);

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
            onClick={handleSubscriptionToggle}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg cursor-pointer transition-all"
            style={{
              backgroundColor: isSubscribed
                ? "var(--accent-primary)"
                : "var(--card-bg)",
              border: "1px solid var(--border-color)",
              color: isSubscribed ? "white" : "var(--text-primary)",
              opacity: isLoading ? 0.6 : 1,
              cursor: isLoading ? "not-allowed" : "pointer",
            }}
          >
            {isLoading ? "..." : isSubscribed ? "Отписаться" : "Подписаться"}
          </button>
        </div>
      </div>
    </aside>
  );
}
