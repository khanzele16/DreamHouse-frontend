import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function ProfileHeader() {
  const router = useRouter();

  return (
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
  );
}
