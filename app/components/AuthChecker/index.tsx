"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { authMe } from "@/app/shared/redux/slices/auth";

export const AuthChecker = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Проверяем авторизацию только если есть токен и пользователь не авторизован
    const token = localStorage.getItem("access_token");
    if (token && !isAuth) {
      dispatch(authMe());
    }
  }, [dispatch, isAuth]);

  return null;
};
