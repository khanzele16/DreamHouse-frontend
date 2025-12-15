export function CardDetailSkeleton() {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--bg-primary)",
        transition: "background-color 0.3s ease",
      }}
    >
      <div className="max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 animate-pulse">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Carousel Skeleton */}
            <div
              className="w-full aspect-[16/9] rounded-2xl"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            />

            {/* Title and Price Skeleton */}
            <div
              className="p-6 rounded-2xl space-y-4"
              style={{ backgroundColor: "var(--card-bg)" }}
            >
              <div
                className="h-8 w-3/4 rounded"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              />
              <div
                className="h-10 w-1/2 rounded"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              />
            </div>

            {/* Accordions Skeleton */}
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-6 rounded-2xl"
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <div
                  className="h-6 w-1/3 rounded"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                />
              </div>
            ))}
          </div>

          {/* Aside Panel Skeleton */}
          <div className="lg:w-[400px] space-y-6">
            <div
              className="p-6 rounded-2xl space-y-4"
              style={{ backgroundColor: "var(--card-bg)" }}
            >
              <div
                className="h-12 w-full rounded-lg"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              />
              <div
                className="h-12 w-full rounded-lg"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              />
              <div
                className="h-16 w-full rounded-lg"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
