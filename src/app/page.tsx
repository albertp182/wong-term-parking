"use client";

import Link from "next/link";
import CountdownTimer from "@/components/CountdownTimer";
import { announcements, COUPLE_NAMES, WEDDING_DATE } from "@/data/wedding";
import {
  CalendarDays,
  ClipboardCheck,
  Megaphone,
  MapPin,
  ArrowRight,
} from "lucide-react";

const quickLinks = [
  {
    href: "/itinerary",
    label: "Itinerary",
    description: "4 days of events",
    icon: CalendarDays,
  },
  {
    href: "/rsvp",
    label: "Event RSVP",
    description: "RSVP for activities",
    icon: ClipboardCheck,
  },
  {
    href: "/announcements",
    label: "Announcements",
    description: "Latest updates",
    icon: Megaphone,
  },
  {
    href: "/travel",
    label: "Travel Guide",
    description: "Getting to Bali",
    icon: MapPin,
  },
];

function formatDate(dateString: string): string {
  return new Date(dateString + "T12:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatAnnouncementDate(timestamp: string): string {
  return new Date(timestamp).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default function Home() {
  const latestAnnouncement = [...announcements].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )[0];

  return (
    <div className="flex flex-col">
      {/* ─── Hero Section ─── */}
      <section
        className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center"
        style={{
          background:
            "linear-gradient(165deg, var(--charcoal) 0%, #1a2e0d 45%, var(--forest) 100%)",
        }}
      >
        {/* Decorative elements */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, var(--gold) 1px, transparent 1px), radial-gradient(circle at 75% 75%, var(--gold) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, var(--gold-dark) 0%, transparent 70%)",
          }}
        />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, var(--ocean) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex max-w-md flex-col items-center gap-6">
          {/* Small pre-title */}
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--gold-light)" }}
          >
            You&rsquo;re invited
          </p>

          {/* Main title */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl">
              Wong Term
              <br />
              Parking{" "}
              <span className="inline-block" role="img" aria-label="parking">
                🅿️
              </span>
            </h1>
            <div
              className="mt-2 h-px w-24"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--gold), transparent)",
              }}
            />
          </div>

          {/* Subtitle */}
          <p className="text-lg font-light tracking-wide text-white/80 sm:text-xl">
            {COUPLE_NAMES}&rsquo;s Bali Wedding
          </p>

          {/* Date */}
          <p
            className="text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--gold)" }}
          >
            {formatDate(WEDDING_DATE)}
          </p>

          {/* Countdown */}
          <div className="mt-4 w-full">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm">
              <CountdownTimer />
            </div>
          </div>

          {/* Location */}
          <div className="mt-2 flex items-center gap-2 text-white/50">
            <MapPin size={14} strokeWidth={1.5} />
            <span className="text-xs font-medium uppercase tracking-widest">
              Bali, Indonesia
            </span>
          </div>

          {/* Scroll indicator */}
          <div className="mt-8 animate-bounce">
            <div className="h-8 w-5 rounded-full border-2 border-white/20 p-1">
              <div className="mx-auto h-2 w-1 rounded-full bg-white/40" />
            </div>
          </div>
        </div>
      </section>

      {/* ─── Quick Links Grid ─── */}
      <section className="px-5 py-12" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-lg">
          <h2
            className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--charcoal)" }}
          >
            Everything You Need
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex flex-col items-center gap-2.5 rounded-2xl border border-[var(--cream-dark)] bg-white px-4 py-5 text-center shadow-sm transition-all duration-200 hover:border-[var(--gold-light)] hover:shadow-md active:scale-[0.98]"
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200 group-hover:bg-[var(--gold)]/10"
                    style={{ backgroundColor: "var(--cream-dark)" }}
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.75}
                      style={{ color: "var(--gold-dark)" }}
                    />
                  </div>
                  <div>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--charcoal)" }}
                    >
                      {link.label}
                    </p>
                    <p
                      className="mt-0.5 text-[11px]"
                      style={{ color: "var(--charcoal)", opacity: 0.5 }}
                    >
                      {link.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Latest Announcement ─── */}
      {latestAnnouncement && (
        <section className="px-5 pb-12" style={{ background: "var(--cream)" }}>
          <div className="mx-auto max-w-lg">
            <h2
              className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: "var(--charcoal)" }}
            >
              Latest Update
            </h2>

            <Link
              href="/announcements"
              className="group block rounded-2xl border border-[var(--cream-dark)] bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="flex overflow-hidden rounded-2xl">
                {/* Gold accent bar */}
                <div
                  className="w-1 flex-shrink-0"
                  style={{ background: "var(--gold)" }}
                />

                <div className="flex flex-1 flex-col gap-2 px-5 py-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {latestAnnouncement.priority === "important" && (
                          <span
                            className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
                            style={{ background: "var(--coral)" }}
                          >
                            Important
                          </span>
                        )}
                        <span
                          className="text-[11px] font-medium"
                          style={{
                            color: "var(--charcoal)",
                            opacity: 0.4,
                          }}
                        >
                          {formatAnnouncementDate(
                            latestAnnouncement.timestamp
                          )}
                        </span>
                      </div>
                      <h3
                        className="mt-1.5 text-sm font-semibold leading-snug"
                        style={{ color: "var(--charcoal)" }}
                      >
                        {latestAnnouncement.title}
                      </h3>
                    </div>
                    <ArrowRight
                      size={16}
                      className="mt-1 flex-shrink-0 opacity-30 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-60"
                      style={{ color: "var(--charcoal)" }}
                    />
                  </div>
                  <p
                    className="line-clamp-2 text-[13px] leading-relaxed"
                    style={{ color: "var(--charcoal)", opacity: 0.6 }}
                  >
                    {latestAnnouncement.body}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ─── Footer ─── */}
      <section className="px-5 pb-28 pt-8" style={{ background: "var(--cream)" }}>
        <div className="mx-auto max-w-lg text-center">
          <div
            className="mx-auto mb-3 h-px w-16"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold-light), transparent)",
            }}
          />
          <p
            className="text-xs tracking-wide"
            style={{ color: "var(--charcoal)", opacity: 0.35 }}
          >
            Made with love for our favorite people
          </p>
        </div>
      </section>
    </div>
  );
}
