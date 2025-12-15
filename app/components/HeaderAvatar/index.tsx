"use client";

import Link from "next/link";
import { ChevronDown, CircleUser, User, Heart, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { logout, fetchUser } from "@/app/shared/redux/slices/auth";

const MenuIcon = ({ Icon }: { Icon: React.ElementType }) => {
  return (
    <Icon
      size={17}
      strokeWidth={2}
      style={{ color: "var(--accent-primary)", transition: "color 0.3s ease" }}
    />
  );
};

const menuItems = [
  {
    name: "Профиль",
    url: "/profile",
    icon: User,
  },
  {
    name: "Избранное",
    url: "/favorite",
    icon: Heart,
  },
];

type HeaderAvatarProps = {
  variant?: "mobile" | "desktop";
};

export const HeaderAvatar = ({ variant = "desktop" }: HeaderAvatarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuth, initialized } = useAppSelector((state) => state.auth);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuth && !user && initialized) {
      dispatch(fetchUser());
    }
  }, [dispatch, isAuth, user, initialized]);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    router.push("/");
  };

  const getDisplayName = () => {
    if (!user?.name) {
      return { firstName: "Пользователь", lastName: "" };
    }
    const nameParts = user.name.trim().split(" ");
    return {
      firstName: nameParts[0] || "Пользователь",
      lastName: nameParts[1] || "",
    };
  };

  const { firstName, lastName } = getDisplayName();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  if (!isAuth) {
    if (variant === "mobile") {
      return (
        <Link
          href="/login"
          className="flex items-center gap-x-2 rounded-md px-2 sm:px-3 py-2 transition-colors flex-shrink-0"
          style={{
            border: "1px solid var(--border-color)",
            color: "var(--text-primary)",
            transition: "border-color 0.3s ease, color 0.3s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "var(--accent-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "var(--border-color)")
          }
        >
          <CircleUser
            strokeWidth={1.25}
            style={{
              color: "var(--accent-primary)",
              transition: "color 0.3s ease",
            }}
          />
        </Link>
      );
    }

    return (
      <Link
        href="/login"
        className="flex items-center gap-x-2 rounded-md px-3 py-2 transition-colors"
        style={{
          border: "1px solid var(--border-color)",
          color: "var(--text-primary)",
          transition: "border-color 0.3s ease, color 0.3s ease",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "var(--accent-primary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "var(--border-color)")
        }
      >
        <CircleUser
          strokeWidth={1.25}
          style={{
            color: "var(--accent-primary)",
            transition: "color 0.3s ease",
          }}
        />
        <span className="max-[950px]:hidden">Войти</span>
      </Link>
    );
  }

  if (variant === "mobile") {
    return (
      <div className="relative flex-shrink-0" ref={menuRef}>
        <div
          className="flex flex-row gap-x-[6px] sm:gap-x-[10px] rounded-md px-2 sm:px-3 py-2 cursor-pointer transition-colors"
          style={{
            border: "1px solid var(--border-color)",
            transition: "border-color 0.3s ease",
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "var(--accent-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "var(--border-color)")
          }
        >
          <CircleUser
            strokeWidth={1.25}
            style={{
              color: "var(--accent-primary)",
              transition: "color 0.3s ease",
            }}
          />
          <ChevronDown
            strokeWidth={1.25}
            style={{
              color: "var(--text-secondary)",
              transition: "color 0.3s ease",
            }}
          />
        </div>
        {isMenuOpen && (
          <div
            className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg py-2 z-50"
            onClick={() => {
              setIsMenuOpen(false);
            }}
            style={{
              backgroundColor: "var(--card-bg)",
              transition: "background-color 0.3s ease, border-color 0.3s ease",
            }}
          >
            {menuItems.map((item) => (
              <Link
                href={item.url}
                key={item.name}
                className="w-full text-left px-4 py-2 hover:opacity-80 transition-opacity text-sm cursor-pointer flex items-center gap-x-3"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <MenuIcon Icon={item.icon} />
                <span
                  style={{
                    color: "var(--text-primary)",
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.name}
                </span>
              </Link>
            ))}
            <div
              className="my-2"
              style={{
                borderTop: "1px solid var(--border-color)",
                transition: "border-color 0.3s ease",
              }}
            ></div>
            <button
              className="w-full text-left px-4 py-2 hover:opacity-80 transition-opacity text-sm cursor-pointer flex items-center gap-x-3"
              onClick={handleLogout}
            >
              <LogOut size={17} color="#FF4444" strokeWidth={2} />
              <span className="text-[#FF4444]">Выйти</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        className="flex flex-row gap-x-2 rounded-md px-3 py-2 cursor-pointer transition-colors items-center"
        style={{
          border: "1px solid var(--border-color)",
          transition: "border-color 0.3s ease",
        }}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        onMouseEnter={(e) =>
          (e.currentTarget.style.borderColor = "var(--accent-primary)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.borderColor = "var(--border-color)")
        }
      >
        <CircleUser
          strokeWidth={1.25}
          style={{
            color: "var(--accent-primary)",
            transition: "color 0.3s ease",
          }}
        />
        <p
          className="max-[950px]:hidden flex flex-row items-center gap-x-[5px]"
          style={{
            color: "var(--text-primary)",
            transition: "color 0.3s ease",
          }}
        >
          {lastName && (
            <span className="max-[1150px]:hidden block">{lastName}</span>
          )}
          <span>{firstName}</span>
        </p>
        <ChevronDown
          strokeWidth={1.25}
          style={{
            color: "var(--text-secondary)",
            transition: "color 0.3s ease",
          }}
        />
      </button>

      {isMenuOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-48 rounded-lg shadow-lg py-2 z-50"
          style={{
            backgroundColor: "var(--card-bg)",
            transition: "background-color 0.3s ease, border-color 0.3s ease",
          }}
        >
          {menuItems.map((item) => (
            <Link
              href={item.url}
              key={item.name}
              onClick={() => {
                setIsMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:opacity-80 transition-opacity text-sm cursor-pointer flex items-center gap-x-3"
            >
              <MenuIcon Icon={item.icon} />
              <span
                style={{
                  color: "var(--text-primary)",
                  transition: "color 0.3s ease",
                }}
              >
                {item.name}
              </span>
            </Link>
          ))}
          <div
            className="my-2"
            style={{
              borderTop: "1px solid var(--border-color)",
              transition: "border-color 0.3s ease",
            }}
          ></div>
          <button
            className="w-full text-left px-4 py-2 hover:opacity-80 transition-colors text-sm cursor-pointer flex items-center gap-x-3"
            onClick={handleLogout}
          >
            <LogOut size={17} color="#FF4444" strokeWidth={2} />
            <span className="text-[#FF4444]">Выйти</span>
          </button>
        </div>
      )}
    </div>
  );
};
