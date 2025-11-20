"use client";

import React from "react";
import Link from "next/link";
import { IDeveloperDetail } from "@/app/types/models";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { subscribeToDeveloper, unsubscribeFromDeveloper } from "@/app/shared/redux/slices/developers";

interface DeveloperCardProps {
  developer: IDeveloperDetail;
}

export function DeveloperCard({ developer }: DeveloperCardProps) {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  const handleSubscriptionToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuth) {
      alert("Необходима авторизация");
      return;
    }

    if (developer.is_subscribed) {
      await dispatch(unsubscribeFromDeveloper(developer.id));
    } else {
      await dispatch(subscribeToDeveloper(developer.id));
    }
  };

  return (
    <Link href={`/developers/${developer.id}`}>
      <div
        className="rounded-2xl p-6 transition-all duration-300 hover:shadow-lg cursor-pointer"
        style={{
          backgroundColor: "var(--card-bg)",
          border: "1px solid var(--border-color)",
          transition: "all 0.3s ease",
        }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* Логотип застройщика */}
          <div
            className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "2px solid var(--accent-primary)",
            }}
          >
            {developer.logo ? (
              <img
                src={developer.logo}
                alt={developer.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className="text-3xl font-[family-name:var(--font-stetica-bold)]"
                style={{ color: "var(--accent-primary)" }}
              >
                {developer.name.charAt(0)}
              </span>
            )}
          </div>

          {/* Название */}
          <h3
            className="text-xl font-[family-name:var(--font-stetica-bold)] text-center"
            style={{ color: "var(--text-primary)" }}
          >
            {developer.name}
          </h3>

          {/* Количество объектов */}
          <div className="flex items-center gap-2">
            <svg
              className="w-5 h-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke="var(--text-secondary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22V12H15V22"
                stroke="var(--text-secondary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              {developer.cards?.length || 0} объектов
            </span>
          </div>

          {/* Кнопка подписки */}
          <button
            onClick={handleSubscriptionToggle}
            className={`w-full py-2 px-4 rounded-lg font-[family-name:var(--font-stetica-bold)] transition-all duration-300 ${
              developer.is_subscribed
                ? "hover:opacity-80"
                : "hover:opacity-90"
            }`}
            style={{
              backgroundColor: developer.is_subscribed
                ? "var(--bg-secondary)"
                : "var(--accent-primary)",
              color: developer.is_subscribed
                ? "var(--text-primary)"
                : "#FFFFFF",
              border: developer.is_subscribed
                ? "1px solid var(--border-color)"
                : "none",
            }}
          >
            {developer.is_subscribed ? (
              <span className="flex items-center justify-center gap-2">
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
                Вы подписаны
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 5V19M5 12H19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Подписаться
              </span>
            )}
          </button>
        </div>
      </div>
    </Link>
  );
}
