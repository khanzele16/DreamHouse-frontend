import Link from "next/link";
import { User, Heart } from "lucide-react";

interface ProfileSidebarProps {
  activeSection: string;
}

export function ProfileSidebar({ activeSection }: ProfileSidebarProps) {
  return (
    <div
      className="lg:w-80 lg:self-start lg:sticky lg:top-6"
      style={{
        backgroundColor: "rgba(var(--accent-secondary-rgb))",
        transition: "background-color 0.3s ease",
      }}
    >
      <nav className="space-y-0 font-[family-name:var(--font-stetica-bold)]">
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
          <svg
            width="24"
            height="24"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_3189_1236)">
              <path
                d="M14.5 2.91602V18.6243M14.5 2.91602L19.3333 7.74935M14.5 2.91602L9.66667 7.74935M4.83334 14.9993V24.666C4.83334 25.307 5.08795 25.9216 5.54116 26.3749C5.99437 26.8281 6.60906 27.0827 7.25 27.0827H21.75C22.3909 27.0827 23.0056 26.8281 23.4588 26.3749C23.9121 25.9216 24.1667 25.307 24.1667 24.666V14.9993"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_3189_1236">
                <rect width="29" height="29" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <span>Реферальная программа</span>
        </Link>
      </nav>
    </div>
  );
}
