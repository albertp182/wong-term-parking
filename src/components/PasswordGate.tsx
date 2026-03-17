"use client";

import { useState, useEffect } from "react";
import { Lock, ArrowRight } from "lucide-react";

const SITE_PASSWORD = "cloudypuff";
const STORAGE_KEY = "wtp-authenticated";

export default function PasswordGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem(STORAGE_KEY) === "true") {
      setAuthenticated(true);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.toLowerCase().trim() === SITE_PASSWORD) {
      localStorage.setItem(STORAGE_KEY, "true");
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  }

  // Don't flash the gate on load
  if (!mounted) {
    return null;
  }

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(165deg, var(--charcoal) 0%, #1a2e0d 45%, var(--forest) 100%)",
      }}
    >
      {/* Decorative dots */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 25%, var(--gold) 1px, transparent 1px), radial-gradient(circle at 75% 75%, var(--gold) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-8">
        {/* Lock icon */}
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: "rgba(201, 168, 76, 0.15)" }}
        >
          <Lock size={28} style={{ color: "var(--gold)" }} />
        </div>

        {/* Title */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Wong Term Parking{" "}
            <span role="img" aria-label="parking">
              🅿️
            </span>
          </h1>
          <p className="text-sm text-white/50">
            Enter the password to access the wedding site
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <div className="relative">
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter password"
              autoFocus
              className={`w-full rounded-xl border bg-white/10 px-4 py-3.5 text-center text-base text-white placeholder-white/30 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 ${
                error
                  ? "border-[var(--coral)] focus:ring-[var(--coral)]/40"
                  : "border-white/10 focus:border-[var(--gold)] focus:ring-[var(--gold)]/40"
              }`}
            />
          </div>

          {error && (
            <p className="text-center text-sm" style={{ color: "var(--coral)" }}>
              That&apos;s not it — try again!
            </p>
          )}

          <button
            type="submit"
            disabled={!password.trim()}
            className="flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition-all disabled:opacity-30"
            style={{ background: "var(--gold-dark)" }}
          >
            Enter
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Hint */}
        <p className="text-xs text-white/25">
          Check your invitation for the password
        </p>
      </div>
    </div>
  );
}
