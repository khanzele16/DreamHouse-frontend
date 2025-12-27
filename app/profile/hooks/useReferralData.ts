import { useState, useEffect } from "react";
import config from "@/app/shared/config/axios";

interface Referral {
  name?: string;
  phone_number?: string;
  created_at: string;
}

export function useReferralData(activeSection: string, isAuth: boolean) {
  const [referralLink, setReferralLink] = useState<string>("");
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [copied, setCopied] = useState(false);
  const [loadingReferral, setLoadingReferral] = useState(false);

  useEffect(() => {
    if (activeSection === "referral" && isAuth) {
      fetchReferralData();
    }
  }, [activeSection, isAuth]);

  const fetchReferralData = async () => {
    setLoadingReferral(true);
    try {
      const [linkResponse, referralsResponse] = await Promise.all([
        config.get("/users/referral-link/"),
        config.get("/users/referrals/"),
      ]);
      setReferralLink(linkResponse.data.referral_link || "");
      setReferrals(referralsResponse.data || []);
    } catch (error) {
      console.error("Ошибка при загрузке реферальных данных:", error);
    } finally {
      setLoadingReferral(false);
    }
  };

  const handleCopyLink = () => {
    if (referralLink) {
      navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return {
    referralLink,
    referrals,
    copied,
    loadingReferral,
    handleCopyLink,
  };
}
