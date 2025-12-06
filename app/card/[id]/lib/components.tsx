export function RatingBlock({
  rating,
  count,
}: {
  rating: string | number;
  count: number;
}) {
  return (
    <div className="flex flex-col items-start lg:items-end gap-2">
      <div className="flex flex-col items-center gap-1 mt-2 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.4127 0L14.1068 8.2918H22.8253L15.7719 13.4164L18.4661 21.7082L11.4127 16.5836L4.35924 21.7082L7.0534 13.4164L-1.90735e-05 8.2918H8.71849L11.4127 0Z"
              fill="#F5BD68"
            />
          </svg>
          <p
            className="text-lg sm:text-2xl font-[family-name:var(--font-stetica-bold)]"
            style={{ color: "#F5BD68", lineHeight: 1 }}
          >
            {rating}
          </p>
        </div>
        <p
          className="text-base"
          style={{
            color: "var(--text-secondary)",
            transition: "color 0.3s ease",
          }}
        >
          ({count} оценок)
        </p>
      </div>
    </div>
  );
}

export function CharacteristicCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div
      className="p-4 rounded-lg shadow-inner"
      style={{
        backgroundColor: "var(--bg-secondary)",
        transition: "background-color 0.3s ease",
      }}
    >
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        {label}
      </p>
      <p
        className="text-xl font-medium"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </p>
    </div>
  );
}

export function LocationIcon() {
  return (
    <svg
      className="w-5 h-5"
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
  );
}

export function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 mb-6 transition-colors cursor-pointer hover:opacity-80"
      style={{ color: "var(--accent-primary)" }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5 15L7.5 10L12.5 5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Назад
    </button>
  );
}

export function DetailItem({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div>
      <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
        {label}
      </p>
      <p>{value}</p>
    </div>
  );
}

export function DetailsSection({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: string | number }>;
}) {
  return (
    <div
      className="mt-6 rounded-2xl shadow-md p-5"
      style={{
        backgroundColor: "var(--card-bg)",
        transition: "background-color 0.3s ease",
      }}
    >
      <h4
        className="text-xl font-[family-name:var(--font-stetica-bold)] mb-3"
        style={{
          color: "var(--text-primary)",
          transition: "color 0.3s ease",
        }}
      >
        {title}
      </h4>
      <div
        className="grid grid-cols-2 gap-3 text-sm"
        style={{
          color: "var(--text-primary)",
          transition: "color 0.3s ease",
        }}
      >
        {items.map((item, idx) => (
          <DetailItem key={idx} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}
