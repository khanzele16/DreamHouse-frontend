"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/app/shared/redux/hooks";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuth, loading, initialized } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (initialized && !isAuth && !loading) {
      router.push("/login");
    }
  }, [isAuth, loading, initialized, router]);

  if (!initialized || loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="text-center" style={{ color: "var(--text-secondary)" }}>
          Загрузка...
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return null;
  }

  return <>{children}</>;
}
