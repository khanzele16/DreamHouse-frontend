"use client";

import ProtectedRoute from "@/app/components/ProtectedRoute";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, User, Heart, Share2, Copy, Check } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { logout, fetchUser } from "@/app/shared/redux/slices/auth";
import config from "@/app/shared/config/axios";

interface Referral {
  name?: string;
  phone_number?: string;
  created_at: string;
}

function ProfileContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const { user, isAuth } = useAppSelector((state) => state.auth);
  const activeSection = searchParams.get("section") || "account";

  const [profile, setProfile] = useState({
    name: "",
    phone_number: "",
    password: "••••••••",
  });
  const [message, setMessage] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string>("");
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);
  const [loadingReferral, setLoadingReferral] = useState(false);

  useEffect(() => {
    if (isAuth && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuth, user]);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        phone_number: user.phone_number || "",
        password: "•••••••••••••",
      });
    }
  }, [user]);

  useEffect(() => {
    if (activeSection === "referral" && isAuth) {
      fetchReferralData();
    }
  }, [activeSection, isAuth]);

  const fetchReferralData = async () => {
    setLoadingReferral(true);
    try {
      const [linkResponse, referralsResponse] = await Promise.all([
        config.get("/users/referral-link/"),
        config.get("/users/referrals/"),
      ]);
      setReferralLink(linkResponse.data.referral_link || "");
      setReferrals(referralsResponse.data || []);
    } catch (error) {
      console.error("Ошибка при загрузке реферальных данных:", error);
    } finally {
      setLoadingReferral(false);
    }
  };

  const handleCopyLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  function handleChangePassword() {
    setMessage("Ссылка для смены пароля отправлена на вашу почту.");
    setTimeout(() => setMessage(null), 3500);
  }

  function handleLogout() {
    dispatch(logout());
    router.push("/");
  }

  function handleDeleteAccount() {
    if (
      confirm(
        "Вы действительно хотите удалить аккаунт? Это действие необратимо."
      )
    ) {
      setMessage("Аккаунт будет удален.");
      setTimeout(() => router.push("/"), 2000);
    }
  }

  return (
    <div
      className="min-h-screen font-[family-name:var(--font-stetica-regular)]"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 mb-6 transition-colors cursor-pointer hover:opacity-80"
          style={{ color: "var(--accent-primary)" }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-[family-name:var(--font-stetica-bold)]">
            Назад
          </span>
        </button>

        <div className="flex flex-col lg:flex-row gap-6 lg:items-start">
          <div
            className="lg:w-80 lg:self-start lg:sticky lg:top-6 rounded-2xl px-4 py-2"
            style={{
              backgroundColor: "rgba(var(--accent-secondary-rgb), 0.5)",
              transition: "background-color 0.3s ease",
            }}
          >
            <nav className="space-y-0">
              <Link
                href="/profile?section=account"
                className="w-full flex items-center gap-4 px-6 py-5 transition-colors cursor-pointer text-base"
                style={{
                  color:
                    activeSection === "account"
                      ? "var(--accent-primary)"
                      : "var(--text-primary)",
                  borderBottom: "1px solid rgba(var(--text-primary-rgb), 0.1)",
                }}
              >
                <User className="w-6 h-6" />
                <span>Мой аккаунт</span>
              </Link>

              <Link
                href="/favorite"
                className="w-full flex items-center gap-4 px-6 py-5 transition-colors cursor-pointer text-base"
                style={{
                  color: "var(--text-primary)",
                  borderBottom: "1px solid rgba(var(--text-primary-rgb), 0.1)",
                }}
              >
                <Heart className="w-6 h-6" />
                <span>Избранное</span>
              </Link>

              <Link
                href="/profile?section=referral"
                className="w-full flex items-center gap-4 px-6 py-5 transition-colors cursor-pointer text-base"
                style={{
                  color:
                    activeSection === "referral"
                      ? "var(--accent-primary)"
                      : "var(--text-primary)",
                }}
              >
                <Share2 className="w-6 h-6" />
                <span>Реферальная программа</span>
              </Link>
            </nav>
          </div>

          <div className="flex-1">
            {activeSection === "account" && (
              <div
                className="rounded-2xl p-6 sm:p-8"
                style={{
                  backgroundColor: "transparent",
                  transition: "background-color 0.3s ease",
                }}
              >
                <div className="flex flex-col mb-8">
                  <div
                    className="w-24 h-24 rounded-full mb-3 flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      border: "3px solid var(--accent-primary)",
                    }}
                  >
                    <User
                      className="w-12 h-12"
                      style={{ color: "var(--accent-primary)" }}
                    />
                  </div>
                  <button
                    className="text-sm transition-opacity cursor-pointer hover:opacity-80 text-left"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    Сменить фото
                  </button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-[family-name:var(--font-stetica-bold)] mb-2"
                      style={{
                        color: "var(--text-primary)",
                        transition: "color 0.3s ease",
                      }}
                    >
                      Имя
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) =>
                        setProfile({ ...profile, name: e.target.value })
                      }
                      className="rounded-xl px-4 py-3 focus:outline-none focus:ring-2"
                      style={{
                        border: "1px solid var(--border-color)",
                        backgroundColor: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        transition: "all 0.3s ease",
                        width: "500px",
                        maxWidth: "100%",
                      }}
                      placeholder="Магомед Ибрагимов"
                    />
                  </div>

                <div>
                  <label
                    className="block text-sm font-[family-name:var(--font-stetica-bold)] mb-2"
                    style={{
                      color: "var(--text-primary)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Номер телефона
                  </label>
                  <input
                    type="tel"
                    inputMode="tel"
                    value={profile.phone_number}
                    onChange={(e) => {
                      const numbers = e.target.value.replace(/\D/g, "");
                      let formatted = numbers;
                      
                      if (formatted.startsWith("8")) {
                        formatted = "7" + formatted.slice(1);
                      }
                      if (!formatted.startsWith("7") && formatted.length > 0) {
                        formatted = "7" + formatted;
                      }
                      
                      formatted = formatted.slice(0, 11);
                      
                      let result = "";
                      if (formatted.length === 0) result = "";
                      else if (formatted.length === 1) result = `+${formatted}`;
                      else if (formatted.length <= 4) result = `+${formatted[0]} (${formatted.slice(1)}`;
                      else if (formatted.length <= 7) {
                        result = `+${formatted[0]} (${formatted.slice(1, 4)}) ${formatted.slice(4)}`;
                      } else if (formatted.length <= 9) {
                        result = `+${formatted[0]} (${formatted.slice(1, 4)}) ${formatted.slice(4, 7)}-${formatted.slice(7)}`;
                      } else {
                        result = `+${formatted[0]} (${formatted.slice(1, 4)}) ${formatted.slice(4, 7)}-${formatted.slice(7, 9)}-${formatted.slice(9, 11)}`;
                      }
                      
                      setProfile({ ...profile, phone_number: result });
                    }}
                    className="rounded-xl px-4 py-3 focus:outline-none focus:ring-2"
                    style={{
                      border: "2px solid var(--accent-primary)",
                      backgroundColor: "var(--bg-secondary)",
                      color: "var(--text-primary)",
                      transition: "all 0.3s ease",
                      width: "500px",
                      maxWidth: "100%",
                    }}
                    placeholder="+7 (___) ___-__-__"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-[family-name:var(--font-stetica-bold)] mb-2"
                    style={{
                      color: "var(--text-primary)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    Пароль
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={profile.password}
                      readOnly
                      className="rounded-xl px-4 py-3 pr-12 focus:outline-none"
                      style={{
                        border: "1px solid var(--border-color)",
                        backgroundColor: "var(--bg-secondary)",
                        color: "var(--text-primary)",
                        transition: "all 0.3s ease",
                        width: "500px",
                        maxWidth: "100%",
                      }}
                    />
                  </div>
                  <button
                    onClick={handleChangePassword}
                    className="mt-2 text-sm transition-opacity cursor-pointer hover:opacity-80"
                    style={{ color: "var(--accent-primary)" }}
                  >
                    Сменить пароль
                  </button>
                </div>

                <div className="flex flex-col space-y-4">
                  <button
                    onClick={handleLogout}
                    className="py-3 rounded-full font-[family-name:var(--font-stetica-bold)] transition-all cursor-pointer hover:bg-[rgba(255,68,68,0.05)]"
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid #FF4444",
                      color: "#FF4444",
                      width: "400px",
                      maxWidth: "100%",
                    }}
                  >
                    Выйти
                  </button>

                  <button
                    onClick={handleDeleteAccount}
                    className="py-1 text-sm hover:underline cursor-pointer text-center"
                    style={{ color: "var(--text-secondary)", width: "400px", maxWidth: "100%" }}
                  >
                    Удалить аккаунт
                  </button>
                </div>
              </div>

              {message && (
                <div
                  className="mt-6 rounded-xl px-4 py-3 text-sm"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    color: "var(--text-primary)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {message}
                </div>
              )}
            </div>
            )}

            {activeSection === "referral" && (
              <div
                className="rounded-2xl p-6 sm:p-8"
                style={{
                  backgroundColor: "transparent",
                  transition: "background-color 0.3s ease",
                }}
              >
                <h2
                  className="text-2xl font-[family-name:var(--font-stetica-bold)] mb-6"
                  style={{ color: "var(--text-primary)" }}
                >
                  Реферальная программа
                </h2>

                {loadingReferral ? (
                  <div className="flex justify-center py-8">
                    <div
                      className="w-8 h-8 border-4 rounded-full animate-spin"
                      style={{
                        borderColor: "var(--accent-primary)",
                        borderTopColor: "transparent",
                      }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <label
                        className="block text-lg font-[family-name:var(--font-stetica-bold)] mb-2"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Ваша реферальная ссылка
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={referralLink}
                          readOnly
                          className="flex-1 rounded-xl px-4 py-3"
                          style={{
                            border: "1px solid var(--border-color)",
                            backgroundColor: "var(--bg-secondary)",
                            color: "var(--text-primary)",
                          }}
                        />
                        <button
                          onClick={handleCopyLink}
                          className="px-4 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                          style={{
                            backgroundColor: copied
                              ? "var(--accent-primary)"
                              : "var(--bg-secondary)",
                            color: copied ? "#fff" : "var(--text-primary)",
                            border: "1px solid var(--border-color)",
                          }}
                        >
                          {copied ? (
                            <>
                              <Check className="w-5 h-5" />
                              <span className="hidden sm:inline">Скопировано</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-5 h-5" />
                              <span className="hidden sm:inline">Копировать</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div>
                      <h3
                        className="text-lg font-[family-name:var(--font-stetica-bold)] mb-4"
                        style={{ color: "var(--text-primary)" }}
                      >
                        Ваши рефералы ({referrals.length})
                      </h3>

                      {referrals.length === 0 ? (
                        <div
                          className="text-center py-8 rounded-xl"
                          style={{
                            backgroundColor: "var(--bg-secondary)",
                            color: "var(--text-secondary)",
                          }}
                        >
                          <p>У вас пока нет рефералов</p>
                          <p className="text-sm mt-2">
                            Поделитесь своей ссылкой, чтобы пригласить друзей
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {referrals.map((referral, index) => (
                            <div
                              key={index}
                              className="p-4 rounded-xl flex items-center justify-between"
                              style={{
                                backgroundColor: "var(--bg-secondary)",
                                border: "1px solid var(--border-color)",
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center"
                                  style={{
                                    backgroundColor: "var(--accent-primary)",
                                  }}
                                >
                                  <User className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                  <p
                                    className="font-medium"
                                    style={{ color: "var(--text-primary)" }}
                                  >
                                    {referral.name || "Пользователь"}
                                  </p>
                                  <p
                                    className="text-sm"
                                    style={{ color: "var(--text-secondary)" }}
                                  >
                                    {referral.phone_number}
                                  </p>
                                </div>
                              </div>
                              <span
                                className="text-sm"
                                style={{ color: "var(--text-secondary)" }}
                              >
                                {new Date(referral.created_at).toLocaleDateString("ru-RU")}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Profile() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
