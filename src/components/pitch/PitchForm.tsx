"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CircleCheck, Send } from "lucide-react";
import type { PublicCandidateProfile, WorkStyle } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { getSupabaseClient } from "@/lib/supabase-browser";

const fieldClasses =
  "w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none";
const labelClasses = "block text-sm font-medium text-ink";

const workStyleOptions: { value: WorkStyle; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

type FormState = {
  candidateId: string;
  companyName: string;
  contactEmail: string;
  jobTitle: string;
  compensation: string;
  workStyle: WorkStyle;
  whySelected: string;
  whyJoin: string;
  interviewProcess: string;
  hiringTimeline: string;
  benefits: string;
};

const initialForm: FormState = {
  candidateId: "",
  companyName: "",
  contactEmail: "",
  jobTitle: "",
  compensation: "",
  workStyle: "remote",
  whySelected: "",
  whyJoin: "",
  interviewProcess: "",
  hiringTimeline: "",
  benefits: "",
};

export function PitchForm() {
  const searchParams = useSearchParams();
  const requestedCandidate = searchParams.get("candidate") ?? "";
  const [candidates, setCandidates] = useState<PublicCandidateProfile[]>([]);
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(true);
  const [signedIn, setSignedIn] = useState(false);
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadError, setLoadError] = useState<string | null>(null);
  const [sentTo, setSentTo] = useState<PublicCandidateProfile | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadCandidatesAndSession() {
      try {
        const supabase = getSupabaseClient();
        const [candidateResult, sessionResult] = await Promise.all([
          supabase
            .from("public_candidate_profiles")
            .select("public_id,name,title,location,headline,open_to_offers")
            .eq("open_to_offers", true)
            .order("name", { ascending: true }),
          supabase.auth.getSession(),
        ]);

        if (candidateResult.error) throw candidateResult.error;
        if (sessionResult.error) throw sessionResult.error;

        const available = (candidateResult.data ?? []) as PublicCandidateProfile[];
        if (!cancelled) {
          setCandidates(available);
          setSignedIn(Boolean(sessionResult.data.session));
          if (available.some((candidate) => candidate.public_id === requestedCandidate)) {
            setForm((current) => ({ ...current, candidateId: requestedCandidate }));
          }
        }
      } catch (err) {
        if (!cancelled) {
          setLoadError(err instanceof Error ? err.message : "Unable to load available candidates.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadCandidatesAndSession();
    return () => {
      cancelled = true;
    };
  }, [requestedCandidate]);

  const selectedCandidate = useMemo(
    () => candidates.find((candidate) => candidate.public_id === form.candidateId) ?? null,
    [candidates, form.candidateId],
  );

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  }

  function validate() {
    const next: Record<string, string> = {};
    if (!selectedCandidate) next.candidateId = "Choose an available candidate.";
    if (form.companyName.trim().length < 2) next.companyName = "Company name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.contactEmail.trim())) next.contactEmail = "Enter a valid contact email.";
    if (form.jobTitle.trim().length < 2) next.jobTitle = "Job title is required.";
    if (!form.compensation.trim()) next.compensation = "Compensation or rate is required.";
    if (form.whySelected.trim().length < 10) next.whySelected = "Be specific about why you selected this candidate.";
    if (form.whyJoin.trim().length < 10) next.whyJoin = "Explain why this opportunity is worth their time.";
    if (!form.interviewProcess.trim()) next.interviewProcess = "Describe the interview process.";
    if (!form.hiringTimeline.trim()) next.hiringTimeline = "Add an expected hiring timeline.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!signedIn) {
      setLoadError("Sign in with Google before sending a role pitch.");
      return;
    }
    if (!validate() || !selectedCandidate) return;

    setSending(true);
    setLoadError(null);

    const message = [
      `Contact: ${form.contactEmail.trim()}`,
      `Compensation: ${form.compensation.trim()}`,
      `Work style: ${workStyleOptions.find((option) => option.value === form.workStyle)?.label ?? form.workStyle}`,
      "",
      `Why we selected you:\n${form.whySelected.trim()}`,
      "",
      `Why consider this role:\n${form.whyJoin.trim()}`,
      "",
      `Interview process:\n${form.interviewProcess.trim()}`,
      `Hiring timeline: ${form.hiringTimeline.trim()}`,
      form.benefits.trim() ? `Benefits / extras: ${form.benefits.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.rpc("send_pitch", {
        p_public_id: selectedCandidate.public_id,
        p_company_name: form.companyName.trim(),
        p_job_title: form.jobTitle.trim(),
        p_message: message,
      });

      if (error) throw error;
      setSentTo(selectedCandidate);
    } catch (err) {
      setLoadError(err instanceof Error ? err.message : "Unable to send this pitch.");
    } finally {
      setSending(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-ink-soft">Loading available candidates…</p>;
  }

  if (sentTo) {
    return (
      <div className="rounded-xl border border-positive/30 bg-positive-soft p-6">
        <div className="flex items-start gap-3">
          <CircleCheck size={21} className="mt-0.5 shrink-0 text-positive" aria-hidden />
          <div>
            <h2 className="font-display text-2xl font-medium text-ink">Pitch sent to {sentTo.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              The opportunity is now in the candidate&apos;s private dashboard. Only real, opted-in candidates can receive pitches through this form.
            </p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button
            type="button"
            onClick={() => {
              setSentTo(null);
              setForm(initialForm);
              setErrors({});
            }}
          >
            Send another pitch
          </Button>
          <Button href="/talent" variant="secondary">Browse talent</Button>
        </div>
      </div>
    );
  }

  if (loadError && candidates.length === 0) {
    return <div className="rounded-lg border border-red-200 bg-red-50 p-5 text-sm text-red-800">{loadError}</div>;
  }

  if (candidates.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-line p-8 text-center">
        <p className="font-medium text-ink">No candidates are accepting pitches yet.</p>
        <p className="mt-2 text-sm text-muted">Public demo profiles are not used as live recipients.</p>
        <Button href="/talent" variant="secondary" className="mt-5">Browse public profiles</Button>
      </div>
    );
  }

  if (!signedIn) {
    const next = requestedCandidate
      ? `/pitch/new?candidate=${encodeURIComponent(requestedCandidate)}`
      : "/pitch/new";
    return (
      <div className="rounded-xl border border-line bg-surface p-7">
        <h2 className="font-display text-2xl font-medium text-ink">Sign in before contacting a candidate</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Google sign-in is required to send a live role pitch. This reduces anonymous spam and gives candidates a more accountable contact flow.
        </p>
        <Button href={`/login?next=${encodeURIComponent(next)}`} className="mt-5">Continue with Google</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {loadError && <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800">{loadError}</div>}

      <div>
        <label htmlFor="candidateId" className={labelClasses}>Who are you pitching?</label>
        <select
          id="candidateId"
          value={form.candidateId}
          onChange={(event) => update("candidateId", event.target.value)}
          className={`${fieldClasses} mt-1.5`}
        >
          <option value="">Select a real candidate…</option>
          {candidates.map((candidate) => (
            <option key={candidate.public_id} value={candidate.public_id}>
              {candidate.name} — {candidate.title}
            </option>
          ))}
        </select>
        <FieldError message={errors.candidateId} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Company name" value={form.companyName} onChange={(value) => update("companyName", value)} placeholder="Your company" error={errors.companyName} />
        <TextField label="Contact email" type="email" value={form.contactEmail} onChange={(value) => update("contactEmail", value)} placeholder="you@company.com" error={errors.contactEmail} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Role" value={form.jobTitle} onChange={(value) => update("jobTitle", value)} placeholder="Senior Product Designer" error={errors.jobTitle} />
        <TextField label="Compensation / rate" value={form.compensation} onChange={(value) => update("compensation", value)} placeholder="$150k–$175k + equity" error={errors.compensation} />
      </div>

      <div>
        <span className={labelClasses}>Work style</span>
        <div className="mt-2 flex flex-wrap gap-2">
          {workStyleOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => update("workStyle", option.value)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                form.workStyle === option.value ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <TextareaField label="Why did you select this candidate?" value={form.whySelected} onChange={(value) => update("whySelected", value)} placeholder="Reference something specific from their public profile." error={errors.whySelected} />
      <TextareaField label="Why should they consider this role?" value={form.whyJoin} onChange={(value) => update("whyJoin", value)} placeholder="What makes the work, team, or upside worth their time?" error={errors.whyJoin} />
      <TextareaField label="Interview process" value={form.interviewProcess} onChange={(value) => update("interviewProcess", value)} placeholder="Example: 30-minute intro, technical conversation, team interview. No take-home." error={errors.interviewProcess} />

      <div className="grid gap-5 sm:grid-cols-2">
        <TextField label="Hiring timeline" value={form.hiringTimeline} onChange={(value) => update("hiringTimeline", value)} placeholder="2–3 weeks" error={errors.hiringTimeline} />
        <TextField label="Benefits / extras" value={form.benefits} onChange={(value) => update("benefits", value)} placeholder="Health, equity, learning budget" />
      </div>

      <div className="border-t border-line pt-6">
        <Button type="submit" size="lg" disabled={sending}>
          <Send size={17} />
          {sending ? "Sending…" : "Send pitch"}
        </Button>
        <p className="mt-3 text-xs leading-relaxed text-muted">
          This sends a real opportunity to the selected candidate. Do not include sensitive personal data or misleading claims.
        </p>
      </div>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs font-medium text-red-700">{message}</p>;
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className={labelClasses}>{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`${fieldClasses} mt-1.5`}
      />
      <FieldError message={error} />
    </label>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <span className={labelClasses}>{label}</span>
      <textarea
        rows={4}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`${fieldClasses} mt-1.5 resize-y`}
      />
      <FieldError message={error} />
    </label>
  );
}
