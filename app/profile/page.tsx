"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { logout, fetchUser } from "@/app/shared/redux/slices/auth";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import Image from "next/image";

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
        password: "••••••••",
      });
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
