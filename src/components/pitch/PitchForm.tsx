"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Send, CircleCheck } from "lucide-react";
import type { Candidate, Pitch, WorkStyle } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { PitchCard } from "@/components/pitch/PitchCard";
import { DynamicListField } from "@/components/pitch/DynamicListField";
import { cn } from "@/lib/utils";

const workStyleOptions: { value: WorkStyle; label: string }[] = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
];

const fieldClasses =
  "w-full rounded-md border border-line bg-surface px-3 py-2.5 text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none";
const labelClasses = "block text-sm font-medium text-ink";

interface FormState {
  candidateId: string;
  companyName: string;
  companyBlurb: string;
  jobTitle: string;
  compMin: string;
  compMax: string;
  compPeriod: "year" | "hour";
  workStyle: WorkStyle;
  responsibilities: string[];
  whySelected: string;
  whyJoin: string;
  interviewStages: string[];
  aiInterviews: "yes" | "no" | "";
  hiringTimeline: string;
  benefits: string[];
  equity: string;
}

const initialState = (candidateId: string): FormState => ({
  candidateId,
  companyName: "",
  companyBlurb: "",
  jobTitle: "",
  compMin: "",
  compMax: "",
  compPeriod: "year",
  workStyle: "remote",
  responsibilities: [],
  whySelected: "",
  whyJoin: "",
  interviewStages: [],
  aiInterviews: "",
  hiringTimeline: "",
  benefits: [],
  equity: "",
});

export function PitchForm({ candidates }: { candidates: Candidate[] }) {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("candidate") ?? "";

  const [form, setForm] = useState<FormState>(() =>
    initialState(candidates.some((c) => c.id === preselected) ? preselected : ""),
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Pitch | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.candidateId) next.candidateId = "Choose a candidate to pitch.";
    if (!form.companyName.trim()) next.companyName = "Company name is required.";
    if (!form.jobTitle.trim()) next.jobTitle = "Job title is required.";
    if (!form.compMin || !form.compMax) next.compensation = "Enter a salary or rate range.";
    if (form.compMin && form.compMax && Number(form.compMin) > Number(form.compMax))
      next.compensation = "Minimum can't be greater than maximum.";
    if (form.responsibilities.length === 0)
      next.responsibilities = "Add at least one responsibility.";
    if (!form.whySelected.trim()) next.whySelected = "Tell them why you selected them.";
    if (!form.whyJoin.trim()) next.whyJoin = "Tell them why they should join.";
    if (form.interviewStages.length === 0)
      next.interviewStages = "Add at least one interview stage.";
    if (!form.aiInterviews) next.aiInterviews = "Let candidates know if AI is used.";
    if (!form.hiringTimeline.trim()) next.hiringTimeline = "Expected timeline is required.";
    if (form.benefits.length === 0) next.benefits = "Add at least one benefit.";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    const pitch: Pitch = {
      id: "preview",
      candidateId: form.candidateId,
      companyName: form.companyName,
      companyBlurb: form.companyBlurb || "Company details not provided.",
      jobTitle: form.jobTitle,
      compMin: Number(form.compMin),
      compMax: Number(form.compMax),
      compPeriod: form.compPeriod,
      workStyle: form.workStyle,
      responsibilities: form.responsibilities,
      whySelected: form.whySelected,
      whyJoin: form.whyJoin,
      interviewStages: form.interviewStages,
      aiInterviews: form.aiInterviews === "yes",
      hiringTimeline: form.hiringTimeline,
      benefits: form.benefits,
      equity: form.equity || undefined,
      status: "pending",
      sentAt: new Date().toISOString().slice(0, 10),
    };

    setSubmitted(pitch);
  }

  if (submitted) {
    const candidate = candidates.find((c) => c.id === submitted.candidateId);
    return (
      <div>
        <div className="flex items-start gap-3 rounded-lg border border-positive/30 bg-positive-soft p-5">
          <CircleCheck size={20} className="mt-0.5 shrink-0 text-positive" aria-hidden />
          <div>
            <p className="font-medium text-ink">
              Pitch ready to send{candidate ? ` to ${candidate.name}` : ""}.
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              This is a preview of exactly what they&apos;ll see in their dashboard.
            </p>
          </div>
        </div>

        <div className="mt-6">
          <PitchCard pitch={submitted} accent={candidate?.accent ?? "navy"} />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setSubmitted(null);
              setForm(initialState(""));
              setErrors({});
            }}
          >
            Send another pitch
          </Button>
          {candidate && (
            <Button href={`/talent/${candidate.id}`} variant="ghost">
              View {candidate.name}&apos;s profile
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-10" noValidate>
      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
          Candidate
        </legend>
        <div>
          <label htmlFor="candidateId" className={labelClasses}>
            Who are you pitching?
          </label>
          <select
            id="candidateId"
            value={form.candidateId}
            onChange={(e) => update("candidateId", e.target.value)}
            className={cn(fieldClasses, "mt-1.5")}
          >
            <option value="">Select a candidate…</option>
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} — {candidate.title}
              </option>
            ))}
          </select>
          <FieldError message={errors.candidateId} />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
          Your company
        </legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="companyName" className={labelClasses}>
              Company name
            </label>
            <input
              id="companyName"
              type="text"
              value={form.companyName}
              onChange={(e) => update("companyName", e.target.value)}
              placeholder="Acme, Inc."
              className={cn(fieldClasses, "mt-1.5")}
            />
            <FieldError message={errors.companyName} />
          </div>
          <div>
            <label htmlFor="companyBlurb" className={labelClasses}>
              One-line company description
            </label>
            <input
              id="companyBlurb"
              type="text"
              value={form.companyBlurb}
              onChange={(e) => update("companyBlurb", e.target.value)}
              placeholder="Series B fintech, 80 employees"
              className={cn(fieldClasses, "mt-1.5")}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
          The role
        </legend>

        <div>
          <label htmlFor="jobTitle" className={labelClasses}>
            Job title
          </label>
          <input
            id="jobTitle"
            type="text"
            value={form.jobTitle}
            onChange={(e) => update("jobTitle", e.target.value)}
            placeholder="Senior Product Designer"
            className={cn(fieldClasses, "mt-1.5")}
          />
          <FieldError message={errors.jobTitle} />
        </div>

        <div>
          <span className={labelClasses}>Salary / rate</span>
          <div className="mt-1.5 grid grid-cols-2 gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={form.compMin}
              onChange={(e) => update("compMin", e.target.value)}
              placeholder="Min"
              aria-label="Minimum compensation"
              className={fieldClasses}
            />
            <input
              type="number"
              inputMode="numeric"
              min={0}
              value={form.compMax}
              onChange={(e) => update("compMax", e.target.value)}
              placeholder="Max"
              aria-label="Maximum compensation"
              className={fieldClasses}
            />
            <select
              value={form.compPeriod}
              onChange={(e) => update("compPeriod", e.target.value as "year" | "hour")}
              aria-label="Compensation period"
              className={cn(fieldClasses, "col-span-2 sm:col-span-1")}
            >
              <option value="year">per year</option>
              <option value="hour">per hour</option>
            </select>
          </div>
          <FieldError message={errors.compensation} />
        </div>

        <div>
          <span className={labelClasses}>Work style</span>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {workStyleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => update("workStyle", option.value)}
                aria-pressed={form.workStyle === option.value}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                  form.workStyle === option.value
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:border-ink",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <DynamicListField
          label="Main responsibilities"
          hint="Press Enter or Add after each one."
          items={form.responsibilities}
          onChange={(items) => update("responsibilities", items)}
          placeholder="Own the roadmap for…"
        />
        <FieldError message={errors.responsibilities} />
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
          The pitch
        </legend>

        <div>
          <label htmlFor="whySelected" className={labelClasses}>
            Why did you select this candidate?
          </label>
          <textarea
            id="whySelected"
            rows={3}
            value={form.whySelected}
            onChange={(e) => update("whySelected", e.target.value)}
            placeholder="Be specific — reference their actual work or experience."
            className={cn(fieldClasses, "mt-1.5 resize-y")}
          />
          <FieldError message={errors.whySelected} />
        </div>

        <div>
          <label htmlFor="whyJoin" className={labelClasses}>
            Why should they work for you?
          </label>
          <textarea
            id="whyJoin"
            rows={3}
            value={form.whyJoin}
            onChange={(e) => update("whyJoin", e.target.value)}
            placeholder="What makes this role and team worth their time?"
            className={cn(fieldClasses, "mt-1.5 resize-y")}
          />
          <FieldError message={errors.whyJoin} />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
          Process
        </legend>

        <DynamicListField
          label="Interview stages"
          hint="List each stage in order."
          items={form.interviewStages}
          onChange={(items) => update("interviewStages", items)}
          placeholder="Recruiter screen"
        />
        <FieldError message={errors.interviewStages} />

        <div>
          <span className={labelClasses}>Are AI interviews used in your process?</span>
          <div className="mt-1.5 flex gap-2">
            {(["no", "yes"] as const).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => update("aiInterviews", value)}
                aria-pressed={form.aiInterviews === value}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium capitalize transition-colors",
                  form.aiInterviews === value
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-ink-soft hover:border-ink",
                )}
              >
                {value}
              </button>
            ))}
          </div>
          <FieldError message={errors.aiInterviews} />
        </div>

        <div>
          <label htmlFor="hiringTimeline" className={labelClasses}>
            Expected hiring timeline
          </label>
          <input
            id="hiringTimeline"
            type="text"
            value={form.hiringTimeline}
            onChange={(e) => update("hiringTimeline", e.target.value)}
            placeholder="e.g. 3–4 weeks"
            className={cn(fieldClasses, "mt-1.5")}
          />
          <FieldError message={errors.hiringTimeline} />
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-sm font-semibold uppercase tracking-[0.06em] text-muted">
          Compensation details
        </legend>

        <DynamicListField
          label="Benefits"
          items={form.benefits}
          onChange={(items) => update("benefits", items)}
          placeholder="Full health/dental/vision"
        />
        <FieldError message={errors.benefits} />

        <div>
          <label htmlFor="equity" className={labelClasses}>
            Equity <span className="font-normal text-muted">(optional)</span>
          </label>
          <input
            id="equity"
            type="text"
            value={form.equity}
            onChange={(e) => update("equity", e.target.value)}
            placeholder="e.g. 0.1%–0.3%"
            className={cn(fieldClasses, "mt-1.5")}
          />
        </div>
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center">
        <Button type="submit" size="lg">
          <Send size={17} />
          Review pitch
        </Button>
        <p className="text-xs text-muted">
          You&apos;ll see exactly what the candidate sees before anything sends.
        </p>
      </div>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs font-medium text-accent">{message}</p>;
}
