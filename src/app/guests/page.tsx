"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";

type RsvpStatus = "attending" | "pending" | "declined";

interface Guest {
  name: string;
  rsvp: RsvpStatus;
  hotel?: string;
}

const guests: Guest[] = [
  { name: "Priya Patel", rsvp: "attending", hotel: "COMO Uma Canggu" },
  { name: "Danny Nguyen", rsvp: "attending", hotel: "The Mulia" },
  { name: "Sasha Kowalski", rsvp: "pending", hotel: "Alila Seminyak" },
  { name: "Marcus Chen", rsvp: "attending", hotel: "COMO Uma Canggu" },
  { name: "Lila Fernandez", rsvp: "attending", hotel: "The Mulia" },
  { name: "Tomoko Hayashi", rsvp: "declined" },
  { name: "Raj Agarwal", rsvp: "pending" },
  { name: "Bea Johansson", rsvp: "attending", hotel: "Alila Seminyak" },
  { name: "Oscar Reyes", rsvp: "attending", hotel: "COMO Uma Canggu" },
  { name: "Freya Okonkwo", rsvp: "pending", hotel: "The Mulia" },
  { name: "Ezra Goldstein", rsvp: "attending", hotel: "Alila Seminyak" },
  { name: "Mei-Lin Zhao", rsvp: "declined" },
];

const avatarPalette = [
  "#f0c6c6", // blush
  "#c6e0f0", // sky
  "#c6f0d3", // mint
  "#f0e0c6", // peach
  "#d6c6f0", // lavender
  "#f0c6e0", // rose
  "#c6f0ec", // aqua
  "#e8f0c6", // lime
  "#f0d6c6", // apricot
  "#c6d0f0", // periwinkle
];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  return avatarPalette[hashName(name) % avatarPalette.length];
}

const statusConfig: Record<
  RsvpStatus,
  { label: string; bg: string; text: string }
> = {
  attending: {
    label: "Attending",
    bg: "bg-[var(--forest)]/10",
    text: "text-[var(--forest)]",
  },
  pending: {
    label: "Pending",
    bg: "bg-[var(--gold)]/15",
    text: "text-[var(--gold-dark)]",
  },
  declined: {
    label: "Declined",
    bg: "bg-[var(--charcoal)]/8",
    text: "text-[var(--charcoal)]/40",
  },
};

export default function GuestsPage() {
  const [search, setSearch] = useState("");

  const stats = useMemo(() => {
    const attending = guests.filter((g) => g.rsvp === "attending").length;
    const pending = guests.filter((g) => g.rsvp === "pending").length;
    const declined = guests.filter((g) => g.rsvp === "declined").length;
    return { attending, pending, declined };
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return guests;
    const q = search.toLowerCase();
    return guests.filter((g) => g.name.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <h1 className="text-2xl font-bold text-[var(--charcoal)]">
          Guest Directory
        </h1>
        <p className="mt-1 text-sm text-[var(--charcoal)]/50">
          Who&rsquo;s coming to Bali?
        </p>
      </div>

      {/* Stats bar */}
      <div className="flex gap-3 px-5 py-4">
        <div className="flex-1 rounded-xl bg-[var(--forest)]/10 px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-[var(--forest)]">
            {stats.attending}
          </p>
          <p className="text-[11px] font-medium text-[var(--forest)]/70">
            Attending
          </p>
        </div>
        <div className="flex-1 rounded-xl bg-[var(--gold)]/15 px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-[var(--gold-dark)]">
            {stats.pending}
          </p>
          <p className="text-[11px] font-medium text-[var(--gold-dark)]/70">
            Pending
          </p>
        </div>
        <div className="flex-1 rounded-xl bg-[var(--charcoal)]/8 px-3 py-2.5 text-center">
          <p className="text-lg font-bold text-[var(--charcoal)]/40">
            {stats.declined}
          </p>
          <p className="text-[11px] font-medium text-[var(--charcoal)]/30">
            Declined
          </p>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-5 pb-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--charcoal)]/30"
          />
          <input
            type="text"
            placeholder="Search guests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[var(--cream-dark)] bg-white py-2.5 pl-10 pr-4 text-sm text-[var(--charcoal)] placeholder-[var(--charcoal)]/30 outline-none transition-shadow focus:ring-2 focus:ring-[var(--gold)]/40 focus:border-[var(--gold)]"
          />
        </div>
      </div>

      {/* Guest list */}
      <div className="px-5 pb-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--cream-dark)]">
              <Search size={20} className="text-[var(--charcoal)]/25" />
            </div>
            <p className="text-sm font-medium text-[var(--charcoal)]/40">
              No guests match your search
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {filtered.map((guest) => {
              const initials = getInitials(guest.name);
              const avatarBg = getAvatarColor(guest.name);
              const status = statusConfig[guest.rsvp];

              return (
                <div
                  key={guest.name}
                  className="flex items-center gap-3 rounded-xl border border-[var(--cream-dark)] bg-white p-3 transition-shadow hover:shadow-sm"
                >
                  {/* Avatar */}
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[var(--charcoal)]/70"
                    style={{ backgroundColor: avatarBg }}
                  >
                    {initials}
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-semibold text-[var(--charcoal)]">
                        {guest.name}
                      </p>
                      <span
                        className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.bg} ${status.text}`}
                      >
                        {status.label}
                      </span>
                    </div>
                    {guest.hotel && (
                      <p className="mt-0.5 truncate text-xs text-[var(--charcoal)]/40">
                        {guest.hotel}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
