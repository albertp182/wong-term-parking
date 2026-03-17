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
// Map overlay regions — positioned over the zoomed reference map image
// viewBox 0 0 1000 1000 mapped to the visible cropped area of bali-map.png
// The image is zoomed ~190% and centered on southern Bali
// ---------------------------------------------------------------------------

interface MapRegion {
  id: RegionId;
  label: string;
  path: string;
  lx: number;
  ly: number;
}

const mapRegions: MapRegion[] = [
  {
    id: "seminyak-canggu",
    label: "Seminyak / Canggu",
    path: "M 200,560 L 310,530 L 410,550 L 450,630 L 455,720 L 430,770 L 340,790 L 250,770 L 200,700 L 190,630 Z",
    lx: 320,
    ly: 680,
  },
  {
    id: "ubud",
    label: "Ubud",
    path: "M 310,320 L 430,290 L 560,310 L 580,420 L 540,510 L 455,555 L 370,545 L 310,470 Z",
    lx: 445,
    ly: 430,
  },
  {
    id: "sanur",
    label: "Sanur",
    path: "M 540,510 L 580,420 L 680,400 L 740,470 L 730,590 L 680,710 L 580,750 L 500,720 L 470,640 L 490,555 Z",
    lx: 620,
    ly: 580,
  },
  {
    id: "jimbaran",
    label: "Jimbaran",
    path: "M 370,790 L 440,770 L 500,790 L 520,830 L 510,875 L 465,885 L 410,875 L 370,840 Z",
    lx: 440,
    ly: 835,
  },
  {
    id: "uluwatu",
    label: "Uluwatu",
    path: "M 330,855 L 410,845 L 430,875 L 425,930 L 400,970 L 355,978 L 320,955 L 310,905 Z",
    lx: 370,
    ly: 920,
  },
  {
    id: "nusa-dua",
    label: "Nusa Dua",
    path: "M 430,875 L 465,855 L 530,840 L 570,875 L 565,935 L 520,972 L 455,972 L 425,940 Z",
    lx: 500,
    ly: 920,
  },
];

const landmarks = [
  { label: "DPS", emoji: "\u2708\uFE0F", x: 490, y: 700 },
  { label: "Khayangan Estate", emoji: "\uD83D\uDC92", x: 365, y: 960 },
  { label: "Swiss-Belhotel", emoji: "\uD83C\uDFE8", x: 380, y: 880 },
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
  const [selectedRegion, setSelectedRegion] = useState<RegionId | null>(
    null
  );
  const [hoveredRegion, setHoveredRegion] = useState<RegionId | null>(
    null
  );

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
      {/* Interactive Map — real image with region overlays                  */}
      {/* ---------------------------------------------------------------- */}
      <div className="px-3 pt-2">
        <div
          className="relative rounded-2xl overflow-hidden border border-[var(--cream-dark)] shadow-md"
          style={{ aspectRatio: "5 / 4" }}
        >
          {/* Zoomed map image — cropped to show southern Bali */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url(/bali-map.png)",
              backgroundSize: "190%",
              backgroundPosition: "40% 76%",
              backgroundRepeat: "no-repeat",
            }}
          />
          <svg
            viewBox="0 0 1000 1000"
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1 }}
          >
            <defs>
              <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Clickable region overlays */}
            {mapRegions.map((region) => {
              const isSelected = selectedRegion === region.id;
              const isHovered = hoveredRegion === region.id;
              return (
                <g key={region.id}>
                  <path
                    d={region.path}
                    fill={
                      isSelected
                        ? "var(--gold)"
                        : isHovered
                        ? "var(--gold-light)"
                        : "white"
                    }
                    fillOpacity={isSelected ? 0.4 : isHovered ? 0.25 : 0.08}
                    stroke={
                      isSelected
                        ? "var(--gold-dark)"
                        : isHovered
                        ? "var(--gold)"
                        : "var(--charcoal)"
                    }
                    strokeWidth={isSelected ? 3 : isHovered ? 2.5 : 1.5}
                    strokeOpacity={isSelected ? 0.9 : isHovered ? 0.6 : 0.3}
                    strokeDasharray={isSelected || isHovered ? "none" : "8 5"}
                    className="cursor-pointer transition-all duration-200"
                    onClick={() => handleRegionTap(region.id)}
                    onMouseEnter={() => setHoveredRegion(region.id)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    role="button"
                    aria-label={`View recommendations for ${region.label}`}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleRegionTap(region.id);
                      }
                    }}
                  />
                  {/* Region label with white background for readability */}
                  <rect
                    x={region.lx - (region.id === "seminyak-canggu" ? 80 : 45)}
                    y={region.ly - 16}
                    width={region.id === "seminyak-canggu" ? 160 : 90}
                    height={22}
                    rx={6}
                    fill="white"
                    fillOpacity={isSelected ? 0.95 : 0.8}
                    className="pointer-events-none"
                  />
                  <text
                    x={region.lx}
                    y={region.ly}
                    textAnchor="middle"
                    fontSize={region.id === "seminyak-canggu" ? 20 : 22}
                    fontWeight={isSelected ? 800 : 700}
                    fill={isSelected ? "var(--gold-dark)" : "var(--charcoal)"}
                    className="pointer-events-none select-none"
                    style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                  >
                    {region.label}
                  </text>
                </g>
              );
            })}

            {/* Gold star landmarks */}
            {landmarks.map((lm) => (
              <g key={lm.label} filter="url(#star-glow)">
                <polygon
                  points={starPoints(lm.x, lm.y, 14, 6)}
                  fill="var(--gold)"
                  stroke="var(--gold-dark)"
                  strokeWidth="1.2"
                />
                <rect
                  x={lm.x - (lm.label.length * 5 + 12)}
                  y={lm.y - 34}
                  width={lm.label.length * 10 + 24}
                  height={20}
                  rx={5}
                  fill="white"
                  fillOpacity="0.85"
                />
                <text
                  x={lm.x}
                  y={lm.y - 19}
                  textAnchor="middle"
                  fontSize={16}
                  fontWeight={700}
                  fill="var(--gold-dark)"
                  className="select-none"
                  style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                >
                  {lm.label} {lm.emoji}
                </text>
              </g>
            ))}
          </svg>
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

// ---------------------------------------------------------------------------
// Helper: generate 5-pointed star polygon points string
// ---------------------------------------------------------------------------
function starPoints(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number
): string {
  const points: string[] = [];
  for (let i = 0; i < 5; i++) {
    // outer point
    const outerAngle = (Math.PI / 2) * -1 + (2 * Math.PI * i) / 5;
    points.push(
      `${cx + outerR * Math.cos(outerAngle)},${cy + outerR * Math.sin(outerAngle)}`
    );
    // inner point
    const innerAngle = outerAngle + Math.PI / 5;
    points.push(
      `${cx + innerR * Math.cos(innerAngle)},${cy + innerR * Math.sin(innerAngle)}`
    );
  }
  return points.join(" ");
}
