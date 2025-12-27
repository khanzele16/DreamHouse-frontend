"use client";

import { useState, useEffect } from "react";
import { X, AlertTriangle, Eye, EyeOff } from "lucide-react";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (password: string) => void;
  isLoading?: boolean;
}

export default function DeleteAccountModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: DeleteAccountModalProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
      // Очистка состояния при закрытии модалки
      setPassword("");
      setError("");
      setShowPassword(false);
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password.trim()) {
      setError("Пожалуйста, введите пароль");
      return;
    }

    onConfirm(password);
  };

  const handleClose = () => {
    if (!isLoading) {
      setPassword("");
      setError("");
      setShowPassword(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 sm:p-8 relative animate-scale-in"
        style={{
          backgroundColor: "var(--bg-primary)",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          disabled={isLoading}
          className="absolute top-4 right-4 p-2 rounded-full transition-all hover:bg-opacity-10"
          style={{
            color: "var(--text-primary)",
            backgroundColor: "transparent",
            opacity: isLoading ? 0.5 : 1,
          }}
          aria-label="Закрыть"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            style={{
              backgroundColor: "rgba(255, 68, 68, 0.1)",
            }}
          >
            <AlertTriangle className="w-8 h-8 text-[#FF4444]" />
          </div>

          <h2
            className="text-2xl font-[family-name:var(--font-stetica-bold)] text-center mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            Удалить аккаунт?
          </h2>

          <p
            className="text-center text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            Это действие необратимо. Все ваши данные будут безвозвратно удалены.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              className="block text-sm font-[family-name:var(--font-stetica-bold)] mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Подтвердите пароль
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Введите ваш пароль"
                disabled={isLoading}
                autoFocus
                className="w-full rounded-xl px-4 py-3 pr-12"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  border: `1px solid ${error ? "#FF4444" : "var(--border-color)"}`,
                  color: "var(--text-primary)",
                  transition: "all 0.3s ease",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded transition-colors"
                style={{
                  color: "var(--text-secondary)",
                }}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {error && (
              <p className="text-sm mt-1 text-[#FF4444]">{error}</p>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 py-3 rounded-full font-[family-name:var(--font-stetica-bold)] transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-color)",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              Отмена
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 rounded-full font-[family-name:var(--font-stetica-bold)] transition-all relative"
              style={{
                backgroundColor: "#FF4444",
                color: "#fff",
                opacity: isLoading ? 0.7 : 1,
              }}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
                  />
                  Удаление...
                </span>
              ) : (
                "Удалить аккаунт"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
