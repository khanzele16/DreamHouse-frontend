export function CardSkeleton() {
  return (
    <div
      className="font-[family-name:var(--font-stetica-bold)] w-full rounded-2xl shadow-sm overflow-hidden flex flex-col h-full animate-pulse"
      style={{
        backgroundColor: "var(--card-bg)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div
        className="relative w-full aspect-[16/9]"
        style={{
          backgroundColor: "var(--bg-secondary)",
        }}
      />

      <div className="w-full flex flex-col gap-y-1 sm:gap-y-[5px] px-4 sm:px-5 lg:px-[25px] py-3 sm:py-4 lg:py-[15px] flex-grow">
        <div className="w-full flex flex-row justify-between items-center gap-x-2 sm:gap-x-3 mb-2">
          <div
            className="h-6 sm:h-7 lg:h-8 w-2/3 rounded"
            style={{
              backgroundColor: "var(--bg-secondary)",
            }}
          />
        </div>

        <div
          className="h-5 sm:h-6 w-full rounded mb-1"
          style={{
            backgroundColor: "var(--bg-secondary)",
          }}
        />
        <div
          className="h-5 sm:h-6 w-4/5 rounded mb-2"
          style={{
            backgroundColor: "var(--bg-secondary)",
          }}
        />

        <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 sm:gap-y-2 mt-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-4 sm:h-5 w-16 sm:w-20 rounded"
              style={{
                backgroundColor: "var(--bg-secondary)",
              }}
            />
          ))}
        </div>

        <div className="mt-auto pt-3 sm:pt-4">
          <div
            className="h-4 sm:h-5 w-24 sm:w-28 rounded"
            style={{
              backgroundColor: "var(--bg-secondary)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
