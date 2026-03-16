"use client";

import { useState } from "react";
import { Camera, X, ChevronLeft, ChevronRight } from "lucide-react";

const days = [
  { id: "all", label: "All" },
  { id: "aug2", label: "Aug 2 — Welcome" },
  { id: "aug3", label: "Aug 3 — Wedding Day" },
  { id: "aug4", label: "Aug 4 — Chill Day" },
  { id: "aug5", label: "Aug 5 — Boat Day" },
];

const placeholders = [
  {
    id: 1,
    caption: "Coming soon...",
    day: "all",
    gradient: "linear-gradient(135deg, var(--cream-dark) 0%, var(--gold-light) 100%)",
    tall: true,
  },
  {
    id: 2,
    caption: "Aug 2 — Welcome Drinks",
    day: "aug2",
    gradient: "linear-gradient(135deg, var(--gold-light) 0%, var(--cream) 60%, var(--forest-light) 100%)",
    tall: false,
  },
  {
    id: 3,
    caption: "Aug 3 — The Ceremony",
    day: "aug3",
    gradient: "linear-gradient(135deg, var(--cream) 0%, var(--gold) 100%)",
    tall: false,
  },
  {
    id: 4,
    caption: "Aug 3 — First Dance",
    day: "aug3",
    gradient: "linear-gradient(150deg, var(--gold-dark) 0%, var(--gold-light) 50%, var(--cream-dark) 100%)",
    tall: true,
  },
  {
    id: 5,
    caption: "Aug 3 — Sunset Views",
    day: "aug3",
    gradient: "linear-gradient(135deg, var(--coral) 0%, var(--gold-light) 50%, var(--cream) 100%)",
    tall: true,
  },
  {
    id: 6,
    caption: "Aug 4 — Pool Day",
    day: "aug4",
    gradient: "linear-gradient(135deg, var(--ocean) 0%, var(--cream) 60%, var(--gold-light) 100%)",
    tall: false,
  },
  {
    id: 7,
    caption: "Aug 5 — On the Water",
    day: "aug5",
    gradient: "linear-gradient(135deg, var(--ocean) 0%, var(--forest-light) 50%, var(--cream-dark) 100%)",
    tall: false,
  },
  {
    id: 8,
    caption: "The Whole Crew",
    day: "all",
    gradient: "linear-gradient(135deg, var(--forest-light) 0%, var(--gold-light) 50%, var(--cream) 100%)",
    tall: true,
  },
];

export default function PhotosPage() {
  const [activeDay, setActiveDay] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered =
    activeDay === "all"
      ? placeholders
      : placeholders.filter(
          (p) => p.day === activeDay || p.day === "all"
        );

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filtered.length);
    }
  };

  const goPrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + filtered.length) % filtered.length
      );
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--cream)" }}>
      {/* ─── Header ─── */}
      <header className="px-5 pb-4 pt-14 text-center">
        <div className="mx-auto max-w-lg">
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "var(--cream-dark)" }}
          >
            <Camera
              size={22}
              strokeWidth={1.75}
              style={{ color: "var(--gold-dark)" }}
            />
          </div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--charcoal)" }}
          >
            Photos
          </h1>
          <p
            className="mt-1.5 text-sm"
            style={{ color: "var(--charcoal)", opacity: 0.5 }}
          >
            Moments from our Bali adventure
          </p>
          <div
            className="mx-auto mt-5 h-px w-16"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--gold-light), transparent)",
            }}
          />
        </div>
      </header>

      {/* ─── Day Filter Tabs ─── */}
      <div className="px-4 pb-5">
        <div className="no-scrollbar mx-auto flex max-w-lg gap-2 overflow-x-auto">
          {days.map((day) => {
            const isActive = activeDay === day.id;
            return (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                className="shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap"
                style={{
                  backgroundColor: isActive
                    ? "var(--gold-dark)"
                    : "var(--cream-dark)",
                  color: isActive ? "#fff" : "var(--charcoal)",
                  opacity: isActive ? 1 : 0.7,
                }}
              >
                {day.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ─── Photo Grid (Masonry-ish 2-column) ─── */}
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-lg columns-2 gap-3 space-y-3">
          {filtered.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group block w-full break-inside-avoid overflow-hidden rounded-2xl border border-[var(--cream-dark)] shadow-sm transition-transform active:scale-[0.97]"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  background: photo.gradient,
                  height: photo.tall ? "220px" : "160px",
                }}
              >
                <Camera
                  size={32}
                  strokeWidth={1.25}
                  className="opacity-20 transition-opacity group-hover:opacity-30"
                  style={{ color: "var(--charcoal)" }}
                />
              </div>
              <div
                className="px-3 py-2.5"
                style={{ backgroundColor: "white" }}
              >
                <p
                  className="text-[11px] font-medium leading-tight"
                  style={{ color: "var(--charcoal)", opacity: 0.55 }}
                >
                  {photo.caption}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ─── Footer Note ─── */}
      <div className="px-5 pb-32 text-center">
        <p
          className="text-xs"
          style={{ color: "var(--charcoal)", opacity: 0.4 }}
        >
          Photos will be uploaded throughout the weekend! Check back often.
        </p>
      </div>

      {/* ─── Lightbox / Modal ─── */}
      {lightboxIndex !== null && filtered[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.85)" }}
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-12 right-5 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close"
          >
            <X size={20} className="text-white" />
          </button>

          {/* Navigation - Previous */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-3 top-1/2 z-[110] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Previous photo"
            >
              <ChevronLeft size={20} className="text-white" />
            </button>
          )}

          {/* Navigation - Next */}
          {filtered.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-3 top-1/2 z-[110] flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Next photo"
            >
              <ChevronRight size={20} className="text-white" />
            </button>
          )}

          {/* Enlarged card */}
          <div
            className="mx-6 w-full max-w-sm overflow-hidden rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-center"
              style={{
                background: filtered[lightboxIndex].gradient,
                height: "380px",
              }}
            >
              <Camera
                size={56}
                strokeWidth={1}
                className="opacity-20"
                style={{ color: "var(--charcoal)" }}
              />
            </div>
            <div className="bg-white px-5 py-4">
              <p
                className="text-sm font-medium"
                style={{ color: "var(--charcoal)" }}
              >
                {filtered[lightboxIndex].caption}
              </p>
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--charcoal)", opacity: 0.4 }}
              >
                {lightboxIndex + 1} of {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
