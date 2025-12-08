"use client";

import Image from "next/image";
import Link from "next/link";
import { ICard } from "@/app/types/models";
import { useAppDispatch, useAppSelector } from "@/app/shared/redux/hooks";
import { toggleFavorite } from "@/app/shared/redux/slices/cards";
import { ReactElement } from "react";

interface CardItemPreviewProps {
  card: ICard;
}

export const CellComponent: React.FC<CardItemPreviewProps> = ({ card }) => {
  return <CardItemPreview card={card} />;
};

function CardItemPreview({ card }: CardItemPreviewProps): ReactElement {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  const formattedPrice = new Intl.NumberFormat("ru-RU").format(
    parseFloat(card.price)
  );
  const mainImage =
    card.images?.[0]?.image && card.images[0].image.trim() !== ""
      ? card.images[0].image
      : "/placeholder.jpg";

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuth) {
      alert("Войдите в систему, чтобы добавить в избранное");
      return;
    }
    
    dispatch(
      toggleFavorite({ id: card.id, is_favorite: card.is_favorite || false })
    );
  };

  return (
    <div
      className="font-[family-name:var(--font-stetica-bold)] w-full rounded-2xl shadow-md overflow-hidden hover:shadow-lg flex flex-col h-full relative"
      style={{
        backgroundColor: "var(--card-bg)",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
      }}
    >
      <button
        className="cursor-pointer absolute top-2 right-2 sm:top-3 sm:right-3 lg:top-4 lg:right-4 p-1.5 sm:p-2 rounded-full bg-black/30 hover:bg-black/50 transition-all duration-200 backdrop-blur-sm z-20"
        onClick={handleFavoriteClick}
        aria-label={
          card.is_favorite ? "Удалить из избранного" : "Добавить в избранное"
        }
      >
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7"
          viewBox="0 0 30 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 4.1201L14.2465 4.84248C14.3441 4.94332 14.4612 5.02353 14.5906 5.07831C14.7201 5.1331 14.8593 5.16133 15 5.16133C15.1407 5.16133 15.2799 5.1331 15.4094 5.07831C15.5388 5.02353 15.6559 4.94332 15.7535 4.84248L15 4.1201ZM11.4084 21.9324C9.29302 20.2723 6.98093 18.6511 5.14605 16.5951C3.34884 14.578 2.09302 12.2261 2.09302 9.17262H0C0 12.8762 1.54884 15.7019 3.58186 17.9788C5.57721 20.2154 8.12232 22.0074 10.1121 23.5689L11.4084 21.9324ZM2.09302 9.17262C2.09302 6.18584 3.78837 3.67972 6.10326 2.62532C8.35256 1.60148 11.3749 1.87237 14.2465 4.84248L15.7535 3.3991C12.3488 -0.125297 8.39163 -0.707372 5.23256 0.73045C2.14326 2.13771 0 5.40511 0 9.17262H2.09302ZM10.1121 23.5689C10.8279 24.1301 11.5953 24.7275 12.3726 25.1804C13.1498 25.6333 14.0372 26 15 26V23.9162C14.5674 23.9162 14.0595 23.7495 13.4288 23.3814C12.7967 23.0146 12.1423 22.5089 11.4084 21.9324L10.1121 23.5689ZM19.8879 23.5689C21.8777 22.0061 24.4228 20.2168 26.4181 17.9788C28.4512 15.7005 30 12.8762 30 9.17262H27.907C27.907 12.2261 26.6512 14.578 24.854 16.5951C23.0191 18.6511 20.707 20.2723 18.5916 21.9324L19.8879 23.5689ZM30 9.17262C30 5.40511 27.8581 2.13771 24.7674 0.73045C21.6084 -0.707372 17.654 -0.125297 14.2465 3.39771L15.7535 4.84248C18.6251 1.87376 21.6474 1.60148 23.8967 2.62532C26.2116 3.67972 27.907 6.18445 27.907 9.17262H30ZM18.5916 21.9324C17.8577 22.5089 17.2033 23.0146 16.5712 23.3814C15.9391 23.7481 15.4326 23.9162 15 23.9162V26C15.9628 26 16.8502 25.6319 17.6274 25.1804C18.406 24.7275 19.1721 24.1301 19.8879 23.5689L18.5916 21.9324Z"
            fill={card.is_favorite ? "#FF4444" : "white"}
            style={{ transition: "fill 0.3s ease" }}
          />
        </svg>
      </button>

      <Link href={`/card/${card.id}`} className="block flex flex-col h-full">
        <div className="relative w-full aspect-[16/10] sm:aspect-[5/3]">
          <Image
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
            className="object-cover"
            src={mainImage}
            alt={card.title}
          />
        </div>

        <div className="w-full flex flex-col gap-y-1 sm:gap-y-[5px] px-4 sm:px-5 lg:px-[25px] py-3 sm:py-4 lg:py-[15px] flex-grow">
          <div className="w-full flex flex-row justify-between items-center gap-x-2 sm:gap-x-3">
            <p
              className="text-lg sm:text-xl lg:text-[25px] leading-tight"
              style={{
                color: "var(--accent-primary)",
                transition: "color 0.3s ease",
              }}
            >
              {formattedPrice} ₽
              <span
                className="text-sm sm:text-base lg:text-[20px]"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.3s ease",
                }}
              >
                / {card.area} м²
              </span>
            </p>
            <div className="flex flex-row items-center gap-x-2 sm:gap-x-3 flex-shrink-0">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (typeof window !== "undefined") {
                    window.location.href = `tel:${card.owner}`;
                  }
                }}
                aria-label="Позвонить"
                className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-full flex items-center justify-center cursor-pointer"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current"
                  style={{ color: "var(--accent-primary)" }}
                >
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2A19.86 19.86 0 0 1 3 5.18 2 2 0 0 1 5 3h3a2 2 0 0 1 2 1.72c.12.99.44 1.95.94 2.78a2 2 0 0 1-.45 2.11L9.91 11.09a16 16 0 0 0 6 6l1.38-1.38a2 2 0 0 1 2.11-.45c.83.5 1.79.82 2.78.94A2 2 0 0 1 22 16.92z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
            </div>
          </div>

          <p
            className="text-lg sm:text-xl lg:text-[25px] line-clamp-1 leading-tight"
            style={{
              color: "var(--text-primary)",
              transition: "color 0.3s ease",
            }}
          >
            {card.title}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-x-2 mt-auto pt-2">
            <div className="flex flex-row items-center gap-x-1 sm:gap-x-[4px] flex-1 min-w-0">
              <svg
                className="w-[14px] h-[14px] sm:w-[16px] sm:h-[16px] lg:w-[18px] lg:h-[18px] flex-shrink-0"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 2.0625C9.19852 2.0625 7.47082 2.77814 6.19698 4.05198C4.92314 5.32582 4.2075 7.05352 4.2075 8.855V9.35C4.4825 13.0717 7.57167 16.0646 11 19.9375C14.5796 15.895 17.7925 12.8333 17.7925 8.855C17.7925 7.05352 17.0769 5.32582 15.803 4.05198C14.5292 2.77814 12.8015 2.0625 11 2.0625ZM11 5.59167C11.6465 5.59167 12.2785 5.78344 12.816 6.14273C13.3535 6.50202 13.7724 7.01267 14.0196 7.61007C14.2668 8.20747 14.3313 8.86477 14.2048 9.49881C14.0783 10.1328 13.7666 10.7151 13.3091 11.172C12.8517 11.6288 12.2689 11.9397 11.6347 12.0653C11.0005 12.1908 10.3433 12.1255 9.74625 11.8774C9.14919 11.6294 8.63913 11.2098 8.2806 10.6718C7.92207 10.1338 7.73118 9.50153 7.73209 8.855C7.7333 7.98909 8.07814 7.15906 8.69086 6.5472C9.30358 5.93533 10.1341 5.59167 11 5.59167Z"
                  stroke="var(--text-primary)"
                  strokeOpacity="0.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className="text-xs sm:text-sm lg:text-base font-[family-name:var(--font-stetica-regular)] line-clamp-1"
                style={{
                  color: "var(--text-secondary)",
                  opacity: 0.7,
                  transition: "color 0.3s ease",
                }}
              >
                {card.address}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
