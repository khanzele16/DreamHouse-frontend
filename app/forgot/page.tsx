"use client";

import { useState } from "react";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex items-stretch min-h-screen bg-[#FFF] relative font-[family-name:var(--font-stetica-bold)]">
      <div className="w-full lg:w-1/2 xl:w-1/2 2xl:w-[45%] bg-white flex flex-col justify-center h-screen px-6 sm:px-12 md:px-16 lg:px-24">
        <div className="max-w-lg w-full">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-full bg-[#3366CC] flex items-center justify-center text-white">
              DH
            </div>
            <h2 className="text-black text-2xl">Dream House</h2>
          </div>
          <h4 className="text-[30px] text-[#3366CC] mb-6">
            Вход в личный кабинет
          </h4>
          <form className="space-y-5">
            <label className="block">
              <span className="text-[20px] text-gray-700">
                Номер телефона
              </span>
              <input
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Введите номер телефона / почту"
                className="font-[family-name:var(--font-stetica-regular)] mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3366CC]"
                inputMode="text"
                autoComplete="username"
              />
            </label>
            <label className="block relative">
              <span className="text-[20px] text-gray-700">Пароль</span>
              <div className="relative mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Введите пароль"
                  className="font-[family-name:var(--font-stetica-regular)] block w-full rounded-lg border border-gray-200 px-4 py-3 pr-16 focus:outline-none focus:ring-2 focus:ring-[#3366CC]"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={
                    showPassword ? "Скрыть пароль" : "Показать пароль"
                  }
                  className="absolute inset-y-0 right-4 flex items-center text-sm font-medium z-1 text-gray-700 cursor-pointer"
                >
                  {showPassword ? "Скрыть" : "Показать"}
                </button>
              </div>
            </label>
            <div className="w-full flex flex-row justify-between font-[family-name:var(--font-stetica-regular)]">
              <div className="flex items-center gap-2">
                <input
                  id="remember-button"
                  type="checkbox"
                  className="cursor-pointer"
                />
                <label
                  htmlFor="remember-button"
                  className="text-[15px] cursor-pointer"
                >
                  Запомнить меня
                </label>
              </div>
              <p className="text-[#3366CC] cursor-pointer">Забыли пароль?</p>
            </div>
            <div className="w-full">
              <button
                type="submit"
                className="w-full text-[20px] rounded-full py-3 bg-[#3366CC] text-white hover:opacity-95 transition cursor-pointer"
              >
                Войти
              </button>
            </div>
            <p className="text-center text-[#3366CC] cursor-pointer font-[family-name:var(--font-stetica-regular)]">
              Нет аккаунта? Зарегистрироваться
            </p>
          </form>
        </div>
      </div>
      <svg
        viewBox="0 0 695 707"
        fill="none"
        aria-hidden
        className="hidden lg:block absolute top-0 right-0 h-full w-[55%] xl:w-[60%] 2xl:w-[70%] transition-all duration-300"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M695 0H0L222.296 707H695V0Z" fill="#3366CC" />
        <path d="M72.3264 232L0 0H134L72.3264 232Z" fill="#FFC860" />
      </svg>
    </div>
  );
}
