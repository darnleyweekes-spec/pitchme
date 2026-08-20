"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getSupabaseClient } from "@/lib/supabase-browser";

type Profile = {
  user_id: string;
  public_id: string;
  slug: string | null;
  name: string;
  title: string;
  location: string;
  headline: string;
  is_public: boolean;
  open_to_offers: boolean;
};

type PitchStatus = "pending" | "interested" | "maybe" | "passed";

type Pitch = {
  id: string;
  sender_email: string | null;
  company_name: string;
  job_title: string;
  message: string;
  status: PitchStatus;
  created_at: string;
};

const profileFields = "user_id,public_id,slug,name,title,location,headline,is_public,open_to_offers";

export default function CandidateDashboardPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pitches, setPitches] = useState<Pitch[]>([]);

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      try {
        const supabase = getSupabaseClient();
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) throw sessionError;
        if (!sessionData.session) {
          window.location.replace("/login");
          return;
        }

        const user = sessionData.session.user;
        if (!cancelled) setEmail(user.email ?? "");

        let { data: profileData, error: profileError } = await supabase
          .from("candidate_profiles")
          .select(profileFields)
          .eq("user_id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profileData) {
          const metadata = user.user_metadata ?? {};
          const defaultName = metadata.full_name || metadata.name || user.email?.split("@")[0] || "New candidate";
          const created = await supabase
            .from("candidate_profiles")
            .insert({
              user_id: user.id,
              name: defaultName,
              title: "",
              location: "",
              headline: "",
              is_public: false,
              open_to_offers: true,
            })
            .select(profileFields)
            .single();

          if (created.error) throw created.error;
          profileData = created.data;
        }

        const { data: pitchData, error: pitchError } = await supabase
          .from("pitches")
          .select("id,sender_email,company_name,job_title,message,status,created_at")
          .eq("recipient_user_id", user.id)
          .order("created_at", { ascending: false });

        if (pitchError) throw pitchError;

        if (!cancelled) {
          setProfile(profileData as Profile);
          setPitches((pitchData ?? []) as Pitch[]);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load your dashboard.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDashboard();
    return () => {
      cancelled = true;
    };
  }, []);

  function updateProfile(patch: Partial<Profile>) {
    if (!profile) return;
    setProfile({ ...profile, ...patch });
    setSaveMessage(null);
  }

  async function saveProfile() {
    if (!profile) return;

    if (profile.is_public && (!profile.name.trim() || !profile.title.trim() || !profile.headline.trim())) {
      setError("Add your name, current title, and headline before publishing your profile.");
      return;
    }

    setSaving(true);
    setSaveMessage(null);
    setError(null);

    try {
      const supabase = getSupabaseClient();
      const { data: savedProfile, error: updateError } = await supabase
        .from("candidate_profiles")
        .update({
          name: profile.name.trim(),
          title: profile.title.trim(),
          location: profile.location.trim(),
          headline: profile.headline.trim(),
          is_public: profile.is_public,
          open_to_offers: profile.open_to_offers,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", profile.user_id)
        .select(profileFields)
        .single();

      if (updateError) throw updateError;
      setProfile(savedProfile as Profile);
      setSaveMessage(savedProfile.is_public ? "Profile saved and public." : "Profile saved privately.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save your profile.");
    } finally {
      setSaving(false);
    }
  }

  async function updatePitchStatus(id: string, status: PitchStatus) {
    const previous = pitches;
    setPitches((current) => current.map((pitch) => (pitch.id === id ? { ...pitch, status } : pitch)));

    try {
      const supabase = getSupabaseClient();
      const { error: updateError } = await supabase
        .from("pitches")
        .update({ status })
        .eq("id", id);

      if (updateError) throw updateError;
    } catch (err) {
      setPitches(previous);
      setError(err instanceof Error ? err.message : "Unable to update this pitch.");
    }
  }

  if (loading) {
    return (
      <Container className="py-20">
        <p className="text-sm text-ink-soft">Loading your dashboard…</p>
      </Container>
    );
  }

  if (!profile) {
    return (
      <Container className="py-20">
        <div className="max-w-xl rounded-lg border border-line bg-surface p-6">
          <h1 className="font-display text-2xl font-medium">Dashboard unavailable</h1>
          <p className="mt-3 text-sm text-ink-soft">{error ?? "We could not load your candidate profile."}</p>
          <Button href="/login" className="mt-5">Return to login</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-10 sm:py-14">
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">Candidate dashboard</p>
        <h1 className="font-display text-3xl font-medium leading-[1.15] sm:text-4xl">Your PitchMe account</h1>
        <p className="mt-3 text-sm text-ink-soft">Signed in with Google as {email}</p>
      </div>

      {error && (
        <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">{error}</div>
      )}

      <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <section className="rounded-xl border border-line bg-surface p-6">
          <div className="mb-5">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Your profile</p>
            <h2 className="mt-2 font-display text-2xl font-medium">Candidate profile</h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">Your profile stays private until you explicitly choose to publish it.</p>
          </div>

          <div className="space-y-4">
            <Field label="Name" value={profile.name} onChange={(name) => updateProfile({ name })} />
            <Field label="Current title" value={profile.title} onChange={(title) => updateProfile({ title })} placeholder="Senior Product Designer" />
            <Field label="Location" value={profile.location} onChange={(location) => updateProfile({ location })} placeholder="Vancouver, WA" />
            <label className="block">
              <span className="mb-1.5 block text-sm font-medium text-ink">Headline</span>
              <textarea
                value={profile.headline}
                onChange={(event) => updateProfile({ headline: event.target.value })}
                rows={4}
                placeholder="What should employers know about the work you do best?"
                className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition focus:border-ink"
              />
            </label>

            <div className="space-y-3 rounded-lg border border-line bg-paper p-4">
              <Toggle
                checked={profile.is_public}
                onChange={(is_public) => updateProfile({ is_public })}
                label="Show my profile in Browse Talent"
                description="Only your name, title, location, headline, and offer status become public. Your email and account ID are not exposed."
              />
              <Toggle
                checked={profile.open_to_offers}
                onChange={(open_to_offers) => updateProfile({ open_to_offers })}
                label="Open to offers"
                description="When enabled and your profile is public, signed-in users can send opportunities to your private dashboard."
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:flex-wrap">
            <Button type="button" onClick={saveProfile} disabled={saving} className="w-full sm:w-auto">
              {saving ? "Saving…" : "Save profile"}
            </Button>
            {profile.is_public && (
              <Button href={`/talent/profile?id=${encodeURIComponent(profile.public_id)}`} variant="secondary" className="w-full sm:w-auto">View public profile</Button>
            )}
            {saveMessage && <p className="text-sm font-medium text-ink">{saveMessage}</p>}
          </div>
        </section>

        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Incoming opportunities</p>
              <h2 className="mt-2 font-display text-2xl font-medium">Your pitches</h2>
            </div>
            <span className="text-sm text-muted">{pitches.length} total</span>
          </div>

          {pitches.length === 0 ? (
            <div className="rounded-xl border border-dashed border-line bg-surface p-10 text-center">
              <p className="font-medium text-ink">No pitches yet.</p>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-soft">Publish your profile and keep Open to offers enabled if you want signed-in employers or recruiters to send opportunities.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pitches.map((pitch) => (
                <article key={pitch.id} className="rounded-xl border border-line bg-surface p-6">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-accent">{pitch.company_name}</p>
                      <h3 className="mt-1 font-display text-xl font-medium text-ink">{pitch.job_title}</h3>
                      {pitch.sender_email && (
                        <p className="mt-1 text-xs text-muted">Google-verified sender account: {pitch.sender_email}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted">{new Date(pitch.created_at).toLocaleDateString()}</span>
                  </div>
                  {pitch.message && <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-soft">{pitch.message}</p>}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {(["interested", "maybe", "passed"] as PitchStatus[]).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => updatePitchStatus(pitch.id, status)}
                        className={`rounded-md border px-3.5 py-2 text-sm font-medium transition-colors ${
                          pitch.status === status
                            ? "border-ink bg-ink text-paper"
                            : "border-line text-ink-soft hover:border-ink hover:text-ink"
                        }`}
                      >
                        {status === "passed" ? "Pass" : status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-line bg-paper px-3 py-2.5 text-sm text-ink outline-none transition focus:border-ink"
      />
    </label>
  );
}

function Toggle({ checked, onChange, label, description }: { checked: boolean; onChange: (checked: boolean) => void; label: string; description: string }) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-4 w-4 accent-current" />
      <span>
        <span className="block text-sm font-medium text-ink">{label}</span>
        <span className="mt-1 block text-xs leading-relaxed text-muted">{description}</span>
      </span>
    </label>
  );
}
