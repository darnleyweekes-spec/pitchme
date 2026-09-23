"use client";

import { useEffect } from "react";

function safeNext(value: string | null) {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return null;
  return value;
}

export default function LegacySignInPage() {
  useEffect(() => {
    const next = safeNext(new URL(window.location.href).searchParams.get("next"));
    window.location.replace(next ? `/login?next=${encodeURIComponent(next)}` : "/login");
  }, []);

  return null;
}
