"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Wine,
  Sun,
  Ship,
  Check,
  Minus,
  Plus,
  ArrowLeft,
  PartyPopper,
} from "lucide-react";

interface EventRsvp {
  attending: boolean;
  guests: number;
}

const events = [
  {
    id: "welcome-drinks",
    name: "Welcome Drinks",
    date: "Saturday, August 2",
    time: "7:00 PM",
    location: "Eaze Villas",
    description: "Kick off the celebrations with sundowners and good vibes.",
    icon: Wine,
    accentColor: "var(--coral)",
  },
  {
    id: "chill-day",
    name: "Chill Day",
    date: "Monday, August 4",
    time: "All Day",
    location: "Khayangan Estate",
    description: "Pool, sunshine, and zero responsibilities. Just how we like it.",
    icon: Sun,
    accentColor: "var(--gold)",
  },
  {
    id: "boat-day",
    name: "Boat Day",
    date: "Tuesday, August 5",
    time: "TBD",
    location: "Setting sail from Bali",
    description: "Ocean breeze, island views, and unforgettable memories.",
    icon: Ship,
    accentColor: "var(--ocean)",
  },
];

export default function RsvpPage() {
  const [name, setName] = useState("");
  const [rsvps, setRsvps] = useState<Record<string, EventRsvp>>({
    "welcome-drinks": { attending: false, guests: 1 },
    "chill-day": { attending: false, guests: 1 },
    "boat-day": { attending: false, guests: 1 },
  });
  const [submitted, setSubmitted] = useState(false);

  const toggleAttending = (eventId: string) => {
    setRsvps((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        attending: !prev[eventId].attending,
      },
    }));
  };

  const adjustGuests = (eventId: string, delta: number) => {
    setRsvps((prev) => ({
      ...prev,
      [eventId]: {
        ...prev[eventId],
        guests: Math.max(1, Math.min(10, prev[eventId].guests + delta)),
      },
    }));
  };

  const attendingEvents = events.filter((e) => rsvps[e.id].attending);
  const canSubmit = name.trim().length > 0 && attendingEvents.length > 0;

  const handleSubmit = () => {
    if (canSubmit) {
      setSubmitted(true);
    }
  };

  // ─── Success State ───
  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--cream)]">
        <div className="flex min-h-[80svh] flex-col items-center justify-center px-6 pb-32 text-center">
          {/* Success circle */}
          <div
            className="mb-6 flex h-20 w-20 items-center justify-center rounded-full"
            style={{ backgroundColor: "var(--forest)", opacity: 0.9 }}
          >
            <Check size={36} strokeWidth={3} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-[var(--charcoal)]">
            You&rsquo;re all set! 🅿️
          </h1>
          <p className="mt-3 text-sm text-[var(--charcoal)]/60">
            Thanks, {name}! We can&rsquo;t wait to see you there.
          </p>

          {/* Summary */}
          <div className="mt-8 w-full max-w-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--charcoal)]/50">
              You RSVP&rsquo;d to
            </p>
            <div className="space-y-2.5">
              {attendingEvents.map((event) => {
                const Icon = event.icon;
                const guestCount = rsvps[event.id].guests;
                return (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 rounded-xl border border-[var(--cream-dark)] bg-white px-4 py-3 shadow-sm"
                  >
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: event.accentColor, opacity: 0.15 }}
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.75}
                        style={{ color: event.accentColor }}
                      />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-semibold text-[var(--charcoal)]">
                        {event.name}
                      </p>
                      <p className="text-xs text-[var(--charcoal)]/50">
                        {event.date}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-[var(--charcoal)]/40">
                      {guestCount} {guestCount === 1 ? "guest" : "guests"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Confetti accent */}
          <div className="mt-8 flex items-center gap-2 text-[var(--gold)]">
            <PartyPopper size={18} strokeWidth={1.5} />
            <span className="text-xs font-medium tracking-wide">
              See you in Bali!
            </span>
            <PartyPopper size={18} strokeWidth={1.5} className="-scale-x-100" />
          </div>

          {/* Back to home */}
          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.97]"
            style={{ backgroundColor: "var(--gold)" }}
          >
            <ArrowLeft size={16} strokeWidth={2} />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // ─── Form State ───
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Header */}
      <header className="px-6 pt-14 pb-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--charcoal)]">
          Event RSVP
        </h1>
        <p className="mt-2 text-sm text-[var(--charcoal)]/60">
          Let us know which events you&rsquo;ll join!
        </p>
      </header>

      <div className="mx-auto max-w-lg px-5 pb-32">
        {/* Name input */}
        <div className="mt-6 mb-6">
          <label
            htmlFor="guest-name"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[var(--charcoal)]/60"
          >
            Your Name
          </label>
          <input
            id="guest-name"
            type="text"
            placeholder="e.g. Jane & John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-[var(--cream-dark)] bg-white px-4 py-3.5 text-sm font-medium text-[var(--charcoal)] shadow-sm outline-none transition-all placeholder:text-[var(--charcoal)]/30 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
          />
        </div>

        {/* Divider */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--gold)]/20" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--charcoal)]/30">
            Optional Events
          </span>
          <div className="h-px flex-1 bg-[var(--gold)]/20" />
        </div>

        {/* Event cards */}
        <div className="space-y-4">
          {events.map((event) => {
            const Icon = event.icon;
            const rsvp = rsvps[event.id];
            const isAttending = rsvp.attending;

            return (
              <div
                key={event.id}
                className="overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-all duration-300"
                style={{
                  borderColor: isAttending ? "var(--forest)" : "var(--cream-dark)",
                  boxShadow: isAttending
                    ? "0 0 0 1px var(--forest-light), 0 4px 12px rgba(45, 80, 22, 0.08)"
                    : undefined,
                }}
              >
                <div className="p-5">
                  {/* Top row: icon + info + toggle */}
                  <div className="flex items-start gap-4">
                    {/* Event icon */}
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${event.accentColor} 12%, transparent)`,
                      }}
                    >
                      <Icon
                        size={24}
                        strokeWidth={1.75}
                        style={{ color: event.accentColor }}
                      />
                    </div>

                    {/* Event details */}
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-[var(--charcoal)]">
                        {event.name}
                      </h3>
                      <p className="mt-0.5 text-xs font-medium text-[var(--gold-dark)]">
                        {event.date} &middot; {event.time}
                      </p>
                      <p className="text-xs text-[var(--charcoal)]/45">
                        {event.location}
                      </p>
                    </div>

                    {/* Toggle button */}
                    <button
                      type="button"
                      onClick={() => toggleAttending(event.id)}
                      className="relative mt-0.5 flex h-7 w-[52px] shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-300"
                      style={{
                        backgroundColor: isAttending
                          ? "var(--forest)"
                          : "var(--cream-dark)",
                      }}
                      aria-label={`Toggle attendance for ${event.name}`}
                    >
                      <span
                        className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300"
                        style={{
                          transform: isAttending
                            ? "translateX(24px)"
                            : "translateX(0)",
                        }}
                      >
                        {isAttending && (
                          <Check
                            size={12}
                            strokeWidth={3}
                            style={{ color: "var(--forest)" }}
                          />
                        )}
                      </span>
                    </button>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--charcoal)]/60">
                    {event.description}
                  </p>

                  {/* Guest count stepper — only shown when attending */}
                  {isAttending && (
                    <div
                      className="mt-4 flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300"
                      style={{ backgroundColor: "var(--cream)" }}
                    >
                      <span className="text-xs font-semibold text-[var(--charcoal)]/70">
                        Number of guests
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => adjustGuests(event.id, -1)}
                          disabled={rsvp.guests <= 1}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--cream-dark)] bg-white text-[var(--charcoal)] shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label="Decrease guest count"
                        >
                          <Minus size={14} strokeWidth={2} />
                        </button>
                        <span className="min-w-[1.5rem] text-center text-base font-bold text-[var(--charcoal)]">
                          {rsvp.guests}
                        </span>
                        <button
                          type="button"
                          onClick={() => adjustGuests(event.id, 1)}
                          disabled={rsvp.guests >= 10}
                          className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-[var(--cream-dark)] bg-white text-[var(--charcoal)] shadow-sm transition-all disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label="Increase guest count"
                        >
                          <Plus size={14} strokeWidth={2} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Attending indicator strip */}
                {isAttending && (
                  <div
                    className="flex items-center justify-center gap-1.5 py-2 text-[11px] font-semibold tracking-wide text-white"
                    style={{ backgroundColor: "var(--forest)" }}
                  >
                    <Check size={12} strokeWidth={3} />
                    I&rsquo;ll be there!
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className="mt-8 w-full cursor-pointer rounded-xl py-4 text-center text-sm font-bold tracking-wide text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          style={{ backgroundColor: "var(--gold)" }}
        >
          {attendingEvents.length === 0
            ? "Select at least one event"
            : `Confirm RSVP for ${attendingEvents.length} event${attendingEvents.length > 1 ? "s" : ""}`}
        </button>

        {/* Helper text */}
        {!name.trim() && (
          <p className="mt-3 text-center text-xs text-[var(--charcoal)]/40">
            Please enter your name above to continue
          </p>
        )}
      </div>
    </div>
  );
}
