"use client";

import { useEffect } from 'react';
import { useAppDispatch } from '@/app/shared/redux/hooks';
import { authMe } from '@/app/shared/redux/slices/auth';

export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(authMe());
    }
  }, [dispatch]);

  return <>{children}</>;
}