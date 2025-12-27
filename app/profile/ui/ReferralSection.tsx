import { User, Copy, Check } from "lucide-react";

interface Referral {
  name?: string;
  phone_number?: string;
  created_at: string;
}

interface ReferralSectionProps {
  referralLink: string;
  referrals: Referral[];
  copied: boolean;
  loadingReferral: boolean;
  onCopyLink: () => void;
}

export function ReferralSection({
  referralLink,
  referrals,
  copied,
  loadingReferral,
  onCopyLink,
}: ReferralSectionProps) {
  return (
    <div
      className="rounded-2xl px-6 sm:px-8"
      style={{
        backgroundColor: "transparent",
        transition: "background-color 0.3s ease",
      }}
    >
      <h2
        className="text-2xl font-[family-name:var(--font-stetica-bold)] mb-1"
        style={{ color: "var(--text-primary)" }}
      >
        Реферальная программа
      </h2>
      <p className='mb-6 opacity-60'>Приведи друга и получи денежное вознаграждение в случае покупки!</p>
      {loadingReferral ? (
        <div className="flex justify-center py-8">
          <div
            className="w-8 h-8 border-4 rounded-full animate-spin"
            style={{
              borderColor: "var(--accent-primary)",
              borderTopColor: "transparent",
            }}
          />
        </div>
      ) : (
        <>
          <div className="mb-8">
            <label
              className="block text-lg font-[family-name:var(--font-stetica-regular)] mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Ваша реферальная ссылка
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                disabled
                className="flex-1 rounded-xl px-4 py-3 opacity-50"
                style={{
                  border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-primary)",
                }}
              />
              <button
                onClick={onCopyLink}
                className="px-4 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2"
                style={{
                  backgroundColor: copied
                    ? "var(--accent-primary)"
                    : "var(--bg-secondary)",
                  color: copied ? "#fff" : "var(--text-primary)",
                  border: "1px solid var(--border-color)",
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          <div>
            <h3
              className="text-lg font-[family-name:var(--font-stetica-bold)] mb-4"
              style={{ color: "var(--text-primary)" }}
            >
              Ваши рефералы ({referrals.length})
            </h3>

            {referrals.length === 0 ? (
              <div
                className="text-center py-8 rounded-xl"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  color: "var(--text-secondary)",
                }}
              >
                <p>У вас пока нет рефералов</p>
                <p className="text-sm mt-2">
                  Поделитесь своей ссылкой, чтобы пригласить друзей
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {referrals.map((referral, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-xl flex items-center justify-between"
                    style={{
                      backgroundColor: "var(--bg-secondary)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{
                          backgroundColor: "var(--accent-primary)",
                        }}
                      >
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p
                          className="font-medium"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {referral.name || "Пользователь"}
                        </p>
                        <p
                          className="text-sm"
                          style={{ color: "var(--text-secondary)" }}
                        >
                          {referral.phone_number}
                        </p>
                      </div>
                    </div>
                    <span
                      className="text-sm"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {new Date(referral.created_at).toLocaleDateString(
                        "ru-RU"
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
