"use client";

import { useState, useCallback } from "react";
import {
  Sparkles,
  MapPin,
  Lightbulb,
  X,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type RegionId =
  | "seminyak-canggu"
  | "ubud"
  | "uluwatu"
  | "jimbaran"
  | "nusa-dua"
  | "sanur";

type RecCategory =
  | "Restaurant"
  | "Bars & Nightlife"
  | "Activity"
  | "Wellness";

interface Recommendation {
  name: string;
  description: string;
  price: string;
  category: RecCategory;
  tip: string;
}

interface Region {
  id: RegionId;
  label: string;
  recs: Recommendation[];
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const regions: Region[] = [
  {
    id: "seminyak-canggu",
    label: "Seminyak / Canggu",
    recs: [
      {
        name: "Potato Head Beach Club",
        description:
          "Iconic beach club. Great music, pool, and cocktails.",
        price: "$$$",
        category: "Bars & Nightlife",
        tip: "Arrive by 3pm to get a good lounger",
      },
      {
        name: "La Lucciola",
        description:
          "Italian beachfront dining with killer sunset views.",
        price: "$$$",
        category: "Restaurant",
        tip: "Reserve a terrace table for sunset",
      },
      {
        name: "Old Man's",
        description: "Chill surf bar with live music and cheap drinks.",
        price: "$",
        category: "Bars & Nightlife",
        tip: "Wednesday is the big night",
      },
      {
        name: "Mamasan",
        description: "Pan-Asian in a gorgeous colonial building.",
        price: "$$$",
        category: "Restaurant",
        tip: "Don't skip the dim sum",
      },
      {
        name: "Echo Beach",
        description:
          "Great surf break, amazing sunset spot. Rent a board or just watch.",
        price: "$",
        category: "Activity",
        tip: "Grab a Bintang from the warungs on the cliff",
      },
    ],
  },
  {
    id: "ubud",
    label: "Ubud",
    recs: [
      {
        name: "Locavore",
        description:
          "Modern Indonesian tasting menu. One of Asia's best.",
        price: "$$$$",
        category: "Restaurant",
        tip: "Book at least 2 weeks ahead",
      },
      {
        name: "Warung Babi Guling Ibu Oka",
        description: "Famous suckling pig. Bourdain's favorite.",
        price: "$",
        category: "Restaurant",
        tip: "Go before noon, it sells out",
      },
      {
        name: "Naughty Nuri's",
        description: "Best ribs in Bali. Legendary martinis.",
        price: "$$",
        category: "Restaurant",
        tip: "The martinis are dangerously strong",
      },
      {
        name: "Tegallalang Rice Terraces",
        description: "Iconic terraced paddies. Instagram gold.",
        price: "$",
        category: "Activity",
        tip: "Go early morning to avoid crowds",
      },
      {
        name: "COMO Shambhala Estate",
        description: "World-class wellness retreat in the jungle.",
        price: "$$$$",
        category: "Wellness",
        tip: "Even a day pass is life-changing",
      },
    ],
  },
  {
    id: "uluwatu",
    label: "Uluwatu",
    recs: [
      {
        name: "Single Fin",
        description:
          "Clifftop bar overlooking Uluwatu surf break. Sunday sessions are legendary.",
        price: "$$",
        category: "Bars & Nightlife",
        tip: "Sunday sunset session is unmissable",
      },
      {
        name: "Uluwatu Temple & Kecak Dance",
        description:
          "Clifftop temple with fire dance at sunset. Magical.",
        price: "$",
        category: "Activity",
        tip: "Watch your sunglasses — monkeys steal everything",
      },
      {
        name: "El Kabron",
        description:
          "Spanish beach club on the cliffs. Incredible views and paella.",
        price: "$$$$",
        category: "Restaurant",
        tip: "Book a daybed for the full experience",
      },
      {
        name: "Suluban Beach",
        description:
          "Hidden beach through a cave. Crystal clear water for swimming.",
        price: "Free",
        category: "Activity",
        tip: "Wear shoes for the rocky path down",
      },
    ],
  },
  {
    id: "jimbaran",
    label: "Jimbaran",
    recs: [
      {
        name: "Jimbaran Bay Seafood",
        description:
          "Fresh seafood BBQ right on the beach at sunset. A must-do.",
        price: "$$",
        category: "Restaurant",
        tip: "Any of the beachfront warungs are good — pick by the vibe",
      },
      {
        name: "Rock Bar at AYANA",
        description:
          "Bar built into the cliffside. Insane sunset views.",
        price: "$$$$",
        category: "Bars & Nightlife",
        tip: "Go at 5pm for sunset, leave before it gets packed",
      },
      {
        name: "Spa at AYANA",
        description: "Stunning ocean-view spa built into the rocks.",
        price: "$$$",
        category: "Wellness",
        tip: "Book the aquatonic pool session",
      },
    ],
  },
  {
    id: "nusa-dua",
    label: "Nusa Dua",
    recs: [
      {
        name: "Nusa Dua Beach",
        description:
          "Calm, crystal-clear water. Perfect for a chill beach day.",
        price: "Free",
        category: "Activity",
        tip: "Less crowded than Kuta but just as beautiful",
      },
      {
        name: "Bali National Golf Club",
        description:
          "18-hole course with ocean views. Surprisingly affordable.",
        price: "$$$",
        category: "Activity",
        tip: "Book a morning tee time to beat the heat",
      },
      {
        name: "Bumbu Bali",
        description:
          "Learn to cook authentic Balinese food. Fun half-day class.",
        price: "$$",
        category: "Activity",
        tip: "You eat everything you cook — come hungry",
      },
    ],
  },
  {
    id: "sanur",
    label: "Sanur",
    recs: [
      {
        name: "Nusa Penida Fast Boats",
        description:
          "Catch the boat to Nusa Penida for manta rays and that famous cliff.",
        price: "$$",
        category: "Activity",
        tip: "Book a fast boat from the Sanur harbor, takes 30 min",
      },
      {
        name: "Massimo",
        description:
          "Best Italian in Bali, run by an actual Italian. Fresh gelato.",
        price: "$$",
        category: "Restaurant",
        tip: "The seafood linguine is incredible",
      },
      {
        name: "Sanur Night Market",
        description:
          "Local night market with street food, satay, and vibes.",
        price: "$",
        category: "Restaurant",
        tip: "Go hungry and try everything",
      },
      {
        name: "Sunrise Beach Walk",
        description:
          "Sanur faces east — it's THE sunrise spot in Bali.",
        price: "Free",
        category: "Activity",
        tip: "Be there by 6am with coffee",
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Clickable hotspots — positioned over the region name text in the cartoon map
// Coordinates are % from top-left of the image
// ---------------------------------------------------------------------------

// Positions measured from cropped bali-map.png (2816x1336) as percentages
const hotspots: { id: RegionId; label: string; x: number; y: number; w: number; h: number }[] = [
  { id: "ubud",            label: "Ubud",      x: 46.2, y: 21.3, w: 8.5,  h: 6.7 },
  { id: "seminyak-canggu", label: "Canggu",    x: 25.9, y: 34.8, w: 12.1, h: 6.7 },
  { id: "seminyak-canggu", label: "Seminyak",  x: 26.3, y: 44.5, w: 15.6, h: 6.7 },
  { id: "jimbaran",        label: "Jimbaran",  x: 24.9, y: 55.8, w: 15.6, h: 6.7 },
  { id: "sanur",           label: "Sanur",     x: 51.0, y: 54.3, w: 10.3, h: 6.7 },
  { id: "uluwatu",         label: "Uluwatu",   x: 24.7, y: 67.0, w: 13.8, h: 6.7 },
  { id: "nusa-dua",        label: "Nusa Dua",  x: 40.8, y: 67.0, w: 15.6, h: 6.7 },
];

// ---------------------------------------------------------------------------
// Category styling helpers
// ---------------------------------------------------------------------------

const categoryBorderColor: Record<RecCategory, string> = {
  Restaurant: "var(--coral)",
  "Bars & Nightlife": "var(--ocean)",
  Activity: "var(--forest)",
  Wellness: "var(--gold)",
};

const categoryBadgeClass: Record<RecCategory, string> = {
  Restaurant: "bg-[var(--coral)]/15 text-[var(--coral)]",
  "Bars & Nightlife": "bg-[var(--ocean)]/15 text-[var(--ocean)]",
  Activity: "bg-[var(--forest)]/15 text-[var(--forest)]",
  Wellness: "bg-[var(--gold-dark)]/15 text-[var(--gold-dark)]",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function RecommendationsPage() {
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(null);

  const handleRegionTap = useCallback((id: RegionId) => {
    setSelectedRegion((prev) => (prev === id ? null : id));
  }, []);

  const activeRegion = regions.find((r) => r.id === selectedRegion);

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Header */}
      <header className="px-6 pt-14 pb-2 text-center">
        <div className="inline-flex items-center gap-2 justify-center">
          <Sparkles
            size={24}
            className="text-[var(--gold)]"
            strokeWidth={2}
          />
          <h1 className="text-3xl font-bold tracking-tight text-[var(--charcoal)]">
            Explore Bali
          </h1>
          <Sparkles
            size={24}
            className="text-[var(--gold)]"
            strokeWidth={2}
          />
        </div>
        <p className="mt-2 text-sm text-[var(--charcoal)]/60">
          Tap a region to see our picks
        </p>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Cartoon map with clickable region hotspots over the text labels   */}
      {/* ---------------------------------------------------------------- */}
      <div className="px-3 pt-2">
        <div className="relative rounded-2xl overflow-hidden border border-[var(--cream-dark)] shadow-md">
          {/* Full cartoon map image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/bali-map.png"
            alt="Fun cartoon map of Bali showing regions"
            className="w-full h-auto block"
          />

          {/* Invisible clickable hotspots over the region name text */}
          {hotspots.map((spot, i) => (
            <button
              key={`${spot.id}-${i}`}
              onClick={() => handleRegionTap(spot.id)}
              className={`absolute cursor-pointer rounded-lg transition-all duration-200 ${
                selectedRegion === spot.id
                  ? "bg-[var(--gold)]/30 ring-2 ring-[var(--gold-dark)]"
                  : "hover:bg-[var(--gold)]/15"
              }`}
              style={{
                left: `${spot.x}%`,
                top: `${spot.y}%`,
                width: `${spot.w}%`,
                height: `${spot.h}%`,
              }}
              aria-label={`View recommendations for ${spot.label}`}
            />
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Region Detail — slides up as overlay on top of the map            */}
      {/* ---------------------------------------------------------------- */}
      {activeRegion && (
        <div
          className="fixed inset-0 z-50 flex flex-col"
          onClick={() => setSelectedRegion(null)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40" />

          {/* Bottom sheet */}
          <div
            className="relative mt-auto max-h-[80vh] flex flex-col rounded-t-3xl bg-[var(--cream)] shadow-2xl animate-in slide-in-from-bottom duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="h-1 w-10 rounded-full bg-[var(--charcoal)]/20" />
            </div>

            {/* Panel header */}
            <div className="flex items-center justify-between px-5 pb-3">
              <div className="flex items-center gap-2">
                <MapPin
                  size={18}
                  className="text-[var(--gold-dark)]"
                  strokeWidth={2.5}
                />
                <h2 className="text-xl font-bold text-[var(--charcoal)]">
                  {activeRegion.label}
                </h2>
                <span className="text-sm text-[var(--charcoal)]/50">
                  {activeRegion.recs.length} picks
                </span>
              </div>
              <button
                onClick={() => setSelectedRegion(null)}
                className="p-1.5 rounded-full bg-[var(--cream-dark)] text-[var(--charcoal)]/60 active:opacity-70 transition-opacity"
                aria-label="Close panel"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Scrollable recommendation cards */}
            <div className="overflow-y-auto px-4 pb-8 space-y-3">
              {activeRegion.recs.map((rec) => (
                <article
                  key={rec.name}
                  className="rounded-2xl bg-white shadow-sm border border-[var(--cream-dark)] overflow-hidden"
                >
                  <div className="flex">
                    <div
                      className="w-1.5 shrink-0"
                      style={{
                        backgroundColor: categoryBorderColor[rec.category],
                      }}
                    />
                    <div className="p-4 flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-[var(--charcoal)] leading-tight">
                          {rec.name}
                        </h3>
                        <span className="shrink-0 text-sm font-semibold text-[var(--gold-dark)]">
                          {rec.price}
                        </span>
                      </div>

                      <div className="mt-1.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryBadgeClass[rec.category]}`}
                        >
                          {rec.category}
                        </span>
                      </div>

                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--charcoal)]/75">
                        {rec.description}
                      </p>

                      <div className="mt-2.5 flex items-start gap-2 rounded-lg bg-[var(--cream)] px-3 py-2.5">
                        <Lightbulb
                          size={14}
                          className="mt-0.5 shrink-0 text-[var(--gold)]"
                          strokeWidth={2.5}
                        />
                        <p className="text-[13px] italic leading-snug text-[var(--charcoal)]/65">
                          {rec.tip}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* When no region is selected, show a subtle nudge */}
      {!activeRegion && (
        <div className="px-4 pt-6 pb-4 text-center">
          <p className="text-sm text-[var(--charcoal)]/40">
            Tap any region on the map to explore our favorites
          </p>
        </div>
      )}

      {/* Bottom padding to clear nav */}
      <div className="pb-32" />
    </div>
  );
}

