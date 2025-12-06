"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { 
  fetchDeveloperById, 
  subscribeToDeveloper, 
  unsubscribeFromDeveloper,
  clearCurrentDeveloper 
} from "@/app/shared/redux/slices/developers";
import Image from "next/image";

export default function DeveloperDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { currentDeveloper, loading, error } = useAppSelector((state) => state.developers);
  const { isAuth } = useAppSelector((state) => state.auth);

  const developerId = Number(params.id);

  useEffect(() => {
    if (developerId) {
      dispatch(fetchDeveloperById(developerId));
    }

    return () => {
      dispatch(clearCurrentDeveloper());
    };
  }, [dispatch, developerId]);

  const handleSubscriptionToggle = async () => {
    if (!isAuth) {
      alert("Необходима авторизация");
      router.push("/login");
      return;
    }

    if (currentDeveloper) {
      if (currentDeveloper.is_subscribed) {
        await dispatch(unsubscribeFromDeveloper(currentDeveloper.id));
      } else {
        await dispatch(subscribeToDeveloper(currentDeveloper.id));
      }
    }
  };

  if (loading) {
    return (
      <div
        className="flex flex-col min-h-screen justify-center items-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="text-center py-10 text-[#999999]">
          Загрузка застройщика...
        </div>
      </div>
    );
  }

  if (error || !currentDeveloper) {
    return (
      <div
        className="flex flex-col min-h-screen justify-center items-center"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="text-center py-10 text-[#FF4444]">
          {error || "Застройщик не найден"}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col min-h-screen justify-start content-center items-center font-[family-name:var(--font-stetica-regular)]"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="w-full max-w-[1300px] flex flex-col content-center gap-y-6 sm:gap-y-[25px] px-4 sm:px-6 lg:px-8 pt-6 pb-6 flex-grow">
        <div
          className="rounded-2xl p-6 sm:p-8"
          style={{
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border-color)",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div
              className="w-32 h-32 rounded-full overflow-hidden flex items-center justify-center flex-shrink-0"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "3px solid var(--accent-primary)",
              }}
            >
              {currentDeveloper.logo ? (
                <Image
                  src={currentDeveloper.logo}
                  alt={currentDeveloper.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span
                  className="text-5xl font-[family-name:var(--font-stetica-bold)]"
                  style={{ color: "var(--accent-primary)" }}
                >
                  {currentDeveloper.name.charAt(0)}
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col gap-4 text-center sm:text-left">
              <h1
                className="text-3xl sm:text-4xl font-[family-name:var(--font-stetica-bold)]"
                style={{ color: "var(--text-primary)" }}
              >
                {currentDeveloper.name}
              </h1>

              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
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
                  </svg>
                  <span style={{ color: "var(--text-secondary)" }}>
                    {currentDeveloper.cards?.length || 0} объектов
                  </span>
                </div>
              </div>

              <button
                onClick={handleSubscriptionToggle}
                className={`w-full sm:w-auto px-6 py-3 rounded-lg font-[family-name:var(--font-stetica-bold)] transition-all duration-300 ${
                  currentDeveloper.is_subscribed
                    ? "hover:opacity-80"
                    : "hover:opacity-90"
                }`}
                style={{
                  backgroundColor: currentDeveloper.is_subscribed
                    ? "var(--bg-secondary)"
                    : "var(--accent-primary)",
                  color: currentDeveloper.is_subscribed
                    ? "var(--text-primary)"
                    : "#FFFFFF",
                  border: currentDeveloper.is_subscribed
                    ? "1px solid var(--border-color)"
                    : "none",
                }}
              >
                {currentDeveloper.is_subscribed ? (
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
        </div>

        <h2
          className="text-2xl sm:text-3xl font-[family-name:var(--font-stetica-bold)]"
          style={{ color: "var(--text-primary)" }}
        >
          Объекты застройщика
        </h2>

        {/* {currentDeveloper.cards && currentDeveloper.cards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-[30px] w-full">
            {currentDeveloper.cards.map((card) => (
              <CardItemPreview key={card.id} card={card} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-10 rounded-2xl"
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--text-secondary)",
            }}
          >
            У этого застройщика пока нет объектов
          </div>
        )} */}
      </div>
    </div>
  );
}
