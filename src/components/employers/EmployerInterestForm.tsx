"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getSupabaseClient } from "@/lib/supabase-browser";
import {
  readCampaignAttribution,
  type CampaignAttributionData,
} from "@/components/analytics/CampaignAttribution";

const emptyAttribution: CampaignAttributionData = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_content: null,
  landing_url: null,
  referrer: null,
};

function field(formData: FormData, name: string) {
  return String(formData.get(name) ?? "").trim();
}

export function EmployerInterestForm() {
  const [attribution, setAttribution] = useState<CampaignAttributionData>(emptyAttribution);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const currentHasCampaign = ["utm_source", "utm_medium", "utm_campaign", "utm_content"].some((key) => params.has(key));
    const stored = readCampaignAttribution();

    if (currentHasCampaign) {
      setAttribution({
        utm_source: params.get("utm_source"),
        utm_medium: params.get("utm_medium"),
        utm_campaign: params.get("utm_campaign"),
        utm_content: params.get("utm_content"),
        landing_url: window.location.href,
        referrer: document.referrer || null,
      });
      return;
    }

    if (stored) setAttribution(stored);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    if (field(formData, "website")) {
      setSuccess(true);
      form.reset();
      return;
    }

    setLoading(true);

    try {
      const supabase = getSupabaseClient();
      const { error: insertError } = await supabase.from("employer_interest").insert({
        company_name: field(formData, "company_name"),
        contact_name: field(formData, "contact_name"),
        email: field(formData, "email"),
        roles_hiring: field(formData, "roles_hiring"),
        hires_next_90_days: field(formData, "hires_next_90_days"),
        work_style: field(formData, "work_style"),
        utm_source: attribution.utm_source,
        utm_medium: attribution.utm_medium,
        utm_campaign: attribution.utm_campaign,
        utm_content: attribution.utm_content,
        landing_url: attribution.landing_url ?? window.location.href,
        referrer: attribution.referrer ?? (document.referrer || null),
      });

      if (insertError) throw insertError;

      form.reset();
      setSuccess(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-positive/30 bg-surface p-6 sm:p-8" role="status">
        <CheckCircle2 size={28} className="text-positive" aria-hidden />
        <h3 className="mt-4 font-display text-2xl font-medium text-ink">Request received.</h3>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">
          Your company is in the founding-employer queue. PitchMe will use the contact details you submitted to follow up about fit and onboarding.
        </p>
        <Button type="button" variant="secondary" className="mt-6" onClick={() => setSuccess(false)}>
          Submit another company
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-line bg-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Company" name="company_name" autoComplete="organization" />
        <Field label="Hiring contact" name="contact_name" autoComplete="name" />
        <Field label="Work email" name="email" type="email" autoComplete="email" />
        <label className="block">
          <span className="text-sm font-medium text-ink">Expected hires in the next 90 days</span>
          <select
            name="hires_next_90_days"
            required
            defaultValue=""
            className="mt-2 w-full rounded-md border border-line bg-paper px-3.5 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
          >
            <option value="" disabled>Select one</option>
            <option value="1-2">1–2</option>
            <option value="3-5">3–5</option>
            <option value="6-10">6–10</option>
            <option value="11+">11+</option>
            <option value="planning">Still planning</option>
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-ink">Roles you are hiring for</span>
        <textarea
          name="roles_hiring"
          required
          rows={4}
          placeholder="Example: Senior backend engineer, product designer, customer success lead"
          className="mt-2 w-full resize-y rounded-md border border-line bg-paper px-3.5 py-3 text-sm text-ink outline-none transition placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </label>

      <label className="mt-5 block">
        <span className="text-sm font-medium text-ink">Work style</span>
        <select
          name="work_style"
          required
          defaultValue=""
          className="mt-2 w-full rounded-md border border-line bg-paper px-3.5 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        >
          <option value="" disabled>Select one</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="onsite">On-site</option>
          <option value="mixed">Multiple / depends on role</option>
        </select>
      </label>

      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {error && (
        <div className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
          {error}
        </div>
      )}

      <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={loading}>
        {loading ? "Submitting…" : "Request Founding Access"}
        {!loading && <ArrowRight size={18} />}
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        $299/month if accepted into the founding pilot. Submission does not start billing. Your details are used only to evaluate and contact you about PitchMe employer access.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      <input
        name={name}
        type={type}
        required
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-md border border-line bg-paper px-3.5 py-3 text-sm text-ink outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </label>
  );
}
