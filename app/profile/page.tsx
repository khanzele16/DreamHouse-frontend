"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { logout, fetchUser } from "@/app/shared/redux/slices/auth";
import ProtectedRoute from "@/app/components/ProtectedRoute";

function ProfileContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((state) => state.auth);

  const [profile, setProfile] = useState({
    name: "",
    phone_number: "",
    password: "••••••••",
  });
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  // Загружаем данные пользователя при монтировании
  useEffect(() => {
    if (isAuth && !user) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuth, user]);

  // Обновляем состояние профиля когда получаем данные пользователя
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        phone_number: user.phone_number || "",
        password: "••••••••",
      });
      // Если есть avatar, устанавливаем его
      if (user.avatar) {
        setAvatarDataUrl(user.avatar);
      }
    }
  }, [user]);

  function triggerFile() {
    fileInputRef.current?.click();
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarDataUrl(String(reader.result));
      setMessage("Аватар обновлён.");
      setTimeout(() => setMessage(null), 3000);
    };
    reader.readAsDataURL(file);
  }

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
      className="max-w-[700px] mx-auto w-full px-4 py-8 lg:py-12 font-[family-name:var(--font-stetica-regular)]"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        className="shadow-md rounded-2xl overflow-hidden p-6 sm:p-8"
        style={{
          backgroundColor: "var(--card-bg)",
          transition: "background-color 0.3s ease",
        }}
      >
        {/* Аватар */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative mb-4">
            <div
              className="w-[120px] h-[120px] rounded-full overflow-hidden flex items-center justify-center text-4xl font-[family-name:var(--font-stetica-bold)]"
              style={{
                boxShadow: "0 0 0 4px var(--accent-primary)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--accent-primary)",
                transition: "all 0.3s ease",
              }}
              aria-hidden
            >
              {avatarDataUrl ? (
                <img 
                  src={avatarDataUrl} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={triggerFile}
              className="absolute bottom-0 right-0 rounded-full p-2 shadow-md hover:scale-105 transition-transform"
              style={{
                backgroundColor: "var(--card-bg)",
                border: "2px solid var(--accent-primary)",
                transition: "all 0.3s ease",
              }}
              aria-label="Загрузить аватар"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 5v14M5 12h14"
                  stroke="var(--accent-primary)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
          </div>
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
              Имя профиля
            </label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2"
              style={{
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                transition: "all 0.3s ease",
              }}
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
              value={profile.phone_number}
              onChange={(e) =>
                setProfile({ ...profile, phone_number: e.target.value })
              }
              className="w-full rounded-xl px-4 py-3 focus:outline-none focus:ring-2"
              style={{
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                transition: "all 0.3s ease",
              }}
              placeholder="+7 (999) 999-99-99"
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
                type={showPassword ? "text" : "password"}
                value={profile.password}
                readOnly
                className="w-full rounded-xl px-4 py-3 pr-12 focus:outline-none"
                style={{
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                  transition: "all 0.3s ease",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: "var(--text-secondary)" }}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleChangePassword}
            className="w-full text-white py-3 rounded-full font-[family-name:var(--font-stetica-bold)] transition-colors cursor-pointer"
            style={{ backgroundColor: "var(--accent-primary)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--accent-secondary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--accent-primary)")
            }
          >
            Сменить пароль
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-full font-[family-name:var(--font-stetica-bold)] transition-colors cursor-pointer"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-primary)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Выйти
          </button>

          <button
            onClick={handleDeleteAccount}
            className="w-full py-3 text-sm hover:underline cursor-pointer"
            style={{ color: "#FF4444" }}
          >
            Удалить аккаунт
          </button>
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
