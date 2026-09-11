"use client";

import { useEffect } from "react";

export const CAMPAIGN_ATTRIBUTION_KEY = "pitchme:campaign-attribution";

export type CampaignAttributionData = {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  landing_url: string | null;
  referrer: string | null;
};

export function CampaignAttribution() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasCampaignParams = ["utm_source", "utm_medium", "utm_campaign", "utm_content"].some((key) => params.has(key));

    if (!hasCampaignParams) return;

    const attribution: CampaignAttributionData = {
      utm_source: params.get("utm_source"),
      utm_medium: params.get("utm_medium"),
      utm_campaign: params.get("utm_campaign"),
      utm_content: params.get("utm_content"),
      landing_url: window.location.href,
      referrer: document.referrer || null,
    };

    sessionStorage.setItem(CAMPAIGN_ATTRIBUTION_KEY, JSON.stringify(attribution));
  }, []);

  return null;
}

export function readCampaignAttribution(): CampaignAttributionData | null {
  if (typeof window === "undefined") return null;

  const raw = sessionStorage.getItem(CAMPAIGN_ATTRIBUTION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CampaignAttributionData;
  } catch {
    return null;
  }
}
