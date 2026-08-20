"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, MapPin, Send } from "lucide-react";
import type { PublicCandidateProfile } from "@/lib/types";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getSupabaseClient } from "@/lib/supabase-browser";

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function TalentProfile() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") ?? "";
  const [profile, setProfile] = useState<PublicCandidateProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadProfile() {
      if (!uuidPattern.test(id)) {
        setError("This candidate profile link is invalid.");
        setLoading(false);
        return;
      }

      try {
        const supabase = getSupabaseClient();
        const { data, error: loadError } = await supabase
          .from("public_candidate_profiles")
          .select("public_id,name,title,location,headline,open_to_offers")
          .eq("public_id", id)
          .maybeSingle();

        if (loadError) throw loadError;
        if (!data) throw new Error("This candidate is not currently listed publicly.");
        if (!cancelled) setProfile(data as PublicCandidateProfile);
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Unable to load this candidate profile.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadProfile();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <p className="text-sm text-ink-soft">Loading candidate profile…</p>;
  }

  if (!profile) {
    return (
      <div className="max-w-xl rounded-xl border border-line bg-surface p-6">
        <p className="font-medium text-ink">Profile unavailable</p>
        <p className="mt-2 text-sm text-ink-soft">{error ?? "This profile is not available."}</p>
        <Button href="/talent" variant="secondary" className="mt-5">
          <ArrowLeft size={15} />
          Back to Browse Talent
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button href="/talent" variant="ghost" className="px-0">
        <ArrowLeft size={15} />
        Back to Browse Talent
      </Button>

      <div className="mt-6 rounded-xl border border-line bg-surface p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex gap-5">
            <Avatar name={profile.name} accent="navy" size="lg" />
            <div>
              <h1 className="font-display text-3xl font-medium">{profile.name}</h1>
              <p className="mt-1 text-base text-ink-soft">{profile.title}</p>
              {profile.location && (
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
                  <MapPin size={14} aria-hidden />
                  {profile.location}
                </p>
              )}
              <div className="mt-3">
                {profile.open_to_offers ? (
                  <Badge tone="positive">Open to offers</Badge>
                ) : (
                  <Badge tone="neutral">Not accepting pitches right now</Badge>
                )}
              </div>
            </div>
          </div>

          {profile.open_to_offers && (
            <Button href={`/pitch/new?candidate=${encodeURIComponent(profile.public_id)}`} size="lg">
              <Send size={17} />
              Pitch this candidate
            </Button>
          )}
        </div>

        <section className="mt-8 border-t border-line pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Candidate headline</p>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-ink-soft">{profile.headline}</p>
        </section>

        <p className="mt-8 text-xs leading-relaxed text-muted">
          This public profile contains only information the candidate entered in PitchMe and explicitly chose to publish.
        </p>
      </div>
    </div>
  );
}
