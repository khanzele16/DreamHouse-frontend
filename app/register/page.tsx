"use client";

import Link from "next/link";
import { IRegisterForm } from "@/app/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<IRegisterForm> = (data) => console.log(data);

  return (
    <div className="flex py-10 lg:p-0 lg:min-h-screen bg-[#FFF] relative font-[family-name:var(--font-stetica-bold)]">
      <div className="flex flex-1 justify-center lg:content-center lg:justify-start items-center bg-white px-6 sm:px-12 md:px-16 lg:pl-18 lg:pr-20">
        <div className="max-w-4xl w-full lg:w-[800px]">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 rounded-full bg-[#3366CC] flex items-center justify-center text-white">
              DH
            </div>
            <h2 className="text-black text-2xl">Dream House</h2>
          </div>
          <h4 className="text-[30px] text-[#3366CC] mb-6">Регистрация</h4>
          <form
            onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="space-y-5">
              <label className="block">
                <span className="text-[20px] text-gray-700">Имя</span>
                <input
                  {...register("name", {
                    maxLength: 20,
                    required: "Это поле является обязательным",
                  })}
                  placeholder="Введите ваше имя"
                  className="font-[family-name:var(--font-stetica-regular)] mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3366CC]"
                />
              </label>
              <label className="block">
                <span className="text-[20px] text-gray-700">
                  Номер телефона
                </span>
                <input
                  {...register("phone", {
                    required: "Это поле является обязательным",
                  })}
                  placeholder="Введите номер телефона"
                  className="font-[family-name:var(--font-stetica-regular)] mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3366CC]"
                  inputMode="tel"
                  autoComplete="tel"
                />
              </label>
              <label className="block">
                <span className="text-[20px] text-gray-700">
                  Электронная почта
                </span>
                <input
                  {...register("email", {
                    required: "Это поле является обязательным",
                  })}
                  placeholder="Введите электронную почту"
                  className="font-[family-name:var(--font-stetica-regular)] mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3366CC]"
                  type="email"
                  autoComplete="email"
                />
              </label>
            </div>
            <div className="space-y-5">
              <label className="block">
                <span className="text-[20px] text-gray-700">Пароль</span>
                <input
                  {...register("password", {
                    required: "Это поле является обязательным",
                  })}
                  placeholder="Введите пароль"
                  className="font-[family-name:var(--font-stetica-regular)] mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3366CC]"
                  type="password"
                  autoComplete="new-password"
                />
              </label>
              <label className="block">
                <span className="text-[20px] text-gray-700">
                  Повторите пароль
                </span>
                <input
                  {...register("confirmPassword", {
                    required: "Это поле является обязательным",
                  })}
                  placeholder="Повторите пароль"
                  className="font-[family-name:var(--font-stetica-regular)] mt-2 block w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3366CC]"
                  type="password"
                  autoComplete="new-password"
                />
              </label>
            </div>
            <div className="flex flex-col mt-6 lg:col-span-1 gap-y-3">
              <button
                type="submit"
                className="w-full text-[20px] rounded-full py-3 bg-[#3366CC] text-white hover:opacity-95 transition cursor-pointer"
              >
                Зарегистрироваться
              </button>
              <p className="lg:col-span-2 text-center text-[#3366CC] cursor-pointer font-[family-name:var(--font-stetica-regular)]">
                <Link href="/login">Уже есть аккаунт? Войти</Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <svg
        viewBox="0 0 339 707"
        fill="none"
        aria-hidden
        className="hidden lg:block absolute top-0 right-0 h-full w-[20%] xl:w-[30%] 2xl:w-[50%] transition-all duration-300 pointer-events-none z-1"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M347.5 0H0L222.296 707H347.5V0Z" fill="#3366CC" />
        <path d="M62.6109 201L0 0H116L62.6109 201Z" fill="#FFC860" />
      </svg>
    </div>
  );
}
