"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { getSupabaseClient } from "@/lib/supabase-browser";

const links = [
  { href: "/talent", label: "Browse Talent" },
  { href: "/pitch/new", label: "Pitch a Role" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      const supabase = getSupabaseClient();
      supabase.auth.getSession().then(({ data }: any) => {
        setSignedIn(Boolean(data.session));
      });

      const { data } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
        setSignedIn(Boolean(session));
      });
      unsubscribe = () => data.subscription.unsubscribe();
    } catch {
      setSignedIn(false);
    }

    return () => unsubscribe?.();
  }, []);

  async function signOut() {
    try {
      const supabase = getSupabaseClient();
      await supabase.auth.signOut();
    } finally {
      setSignedIn(false);
      setOpen(false);
      window.location.assign("/");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          PitchMe
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium text-ink-soft transition-colors hover:text-ink",
                pathname === link.href && "text-ink",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {signedIn ? (
            <>
              <Link
                href="/dashboard/candidate"
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                Dashboard
              </Link>
              <Button type="button" size="md" onClick={signOut}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-medium text-ink-soft transition-colors hover:text-ink"
              >
                Log in
              </Link>
              <Button href="/login" size="md">
                Create My Profile
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </Container>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-ink-soft hover:bg-ink/5 hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-line pt-4">
              {signedIn ? (
                <>
                  <Link
                    href="/dashboard/candidate"
                    onClick={() => setOpen(false)}
                    className="px-2 py-2 text-sm font-medium text-ink-soft"
                  >
                    Dashboard
                  </Link>
                  <Button type="button" className="w-full" onClick={signOut}>
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="px-2 py-2 text-sm font-medium text-ink-soft"
                  >
                    Log in
                  </Link>
                  <Button href="/login" className="w-full" onClick={() => setOpen(false)}>
                    Create My Profile
                  </Button>
                </>
              )}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
