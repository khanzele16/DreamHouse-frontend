"use client";

import Link from "next/link";

export default function NotFound() {

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="max-w-2xl w-full text-center">
        {/* Logo */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <svg
            className="w-[52px] h-[84px] sm:w-[78px] sm:h-[126px] lg:w-[104px] lg:h-[168px]"
            viewBox="0 0 26 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.72147 4.15728C6.87857 6.09646 6.52801 6.48847 6.49797 6.64528C6.48294 6.74459 6.47293 9.67164 6.48795 13.1423L6.50798 19.4564L3.48822 16.3046C1.445 14.1615 0.443427 13.1475 0.368308 13.1475H0.26815L0.278166 20.6115L0.29319 28.0755L3.84879 31.7709C5.80187 33.8042 7.43444 35.4663 7.47951 35.4663C7.54962 35.4663 10.4993 32.4295 10.5944 32.257C10.6195 32.21 10.6195 32.1368 10.5894 32.0845C10.5594 32.0322 9.25231 30.6523 7.67983 29.0111L4.82533 26.037V23.2615L4.83034 20.4913L5.67667 21.3955L6.52801 22.2946V23.8104V25.3209L8.73649 27.626C10.1738 29.1313 10.965 29.9258 11.0151 29.9049C11.0752 29.8788 11.0852 27.9657 11.0752 15.8812C11.0602 3.43597 11.0501 1.88359 10.985 1.86791C10.94 1.86268 10.0035 2.80875 8.72147 4.15728Z"
              fill="var(--accent-primary)"
              style={{ transition: "fill 0.3s ease" }}
            />
            <path
              d="M12.7375 17.2193V32.5341L10.7093 34.6457C9.59255 35.8061 8.68111 36.7887 8.68111 36.8306C8.68111 36.9403 11.771 40.1287 11.8611 40.1078C11.9312 40.0921 13.664 38.3098 16.1329 35.7172L17.2947 34.4941V28.3891V22.2841L18.101 21.4531C18.5417 20.9983 18.9172 20.622 18.9373 20.622C18.9573 20.622 18.9723 23.3191 18.9723 26.6172C18.9723 30.9869 18.9874 32.6125 19.0274 32.6281C19.0925 32.649 23.4594 28.0964 23.5145 27.9501C23.5295 27.903 23.5495 24.5526 23.5495 20.5018C23.5546 13.4768 23.5495 13.1476 23.4644 13.1476C23.4143 13.1476 22.0822 14.4961 20.3345 16.3203L17.2897 19.4982L17.2997 12.996L17.3047 6.49373L16.884 6.05467C16.6587 5.81424 15.7523 4.87339 14.8709 3.95869C13.9945 3.04921 13.1982 2.21291 13.0981 2.10315C13.0029 1.99861 12.8827 1.90975 12.8276 1.90975C12.7425 1.90975 12.7375 2.39062 12.7375 17.2193Z"
              fill="var(--accent-primary)"
              style={{ transition: "fill 0.3s ease" }}
            />
          </svg>
        </div>

        {/* 404 Number with decorative elements */}
        <div className="relative mb-6 sm:mb-8">
          <h1
            className="text-8xl sm:text-9xl lg:text-[180px] font-bold tracking-tight"
            style={{
              color: "var(--accent-primary)",
              transition: "color 0.3s ease",
            }}
          >
            404
          </h1>
          
          {/* Decorative house icons */}
          <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-8 opacity-20">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke="var(--accent-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22V12H15V22"
                stroke="var(--accent-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          
          <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-8 opacity-20">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
                stroke="var(--accent-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22V12H15V22"
                stroke="var(--accent-primary)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6"
          style={{
            color: "var(--text-primary)",
            transition: "color 0.3s ease",
          }}
        >
          Страница не найдена
        </h2>

        {/* Description */}
        <p
          className="text-base sm:text-lg lg:text-xl mb-8 sm:mb-12 max-w-md mx-auto leading-relaxed"
          style={{
            color: "var(--text-secondary)",
            transition: "color 0.3s ease",
          }}
        >
          К сожалению, запрашиваемая страница не существует или была перемещена.
          Возможно, вы найдете то, что ищете, на главной странице.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform hover:shadow-lg"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "#FFFFFF",
            }}
          >
            Вернуться на главную
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="cursor-pointer w-full sm:w-auto px-8 py-3 sm:py-4 rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 border-2 hover:shadow-lg"
            style={{
              backgroundColor: "transparent",
              color: "var(--accent-primary)",
              borderColor: "var(--accent-primary)",
            }}
          >
            Назад
          </button>
        </div>

        {/* Additional info */}
        <div className="mt-12 sm:mt-16">
          <p
            className="text-sm sm:text-base"
            style={{
              color: "var(--text-secondary)",
              transition: "color 0.3s ease",
            }}
          >
            Если вы считаете, что это ошибка, пожалуйста,{" "}
            <Link
              href="/"
              className="underline hover:no-underline transition-all"
              style={{
                color: "var(--accent-primary)",
              }}
            >
              свяжитесь с нами
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
