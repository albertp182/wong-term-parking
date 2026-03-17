"use client";

import { useState, useCallback } from "react";
import {
  Sparkles,
  MapPin,
  Lightbulb,
  ChevronLeft,
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
// SVG region paths (simplified but recognizable Bali shape)
// viewBox = "0 0 600 420"
//
// Main island body spans roughly x:30..540, y:60..260
// Bukit peninsula hangs south from ~x:240..420, y:260..390
// The narrow isthmus connects around x:280..380, y:245..275
// ---------------------------------------------------------------------------

interface MapRegion {
  id: RegionId;
  label: string;
  // SVG path d
  path: string;
  // label anchor position
  lx: number;
  ly: number;
  // dot center
  dx: number;
  dy: number;
}

const mapRegions: MapRegion[] = [
  {
    id: "seminyak-canggu",
    label: "Seminyak / Canggu",
    path: "M 80,130 C 100,105 150,85 200,80 L 250,90 L 270,130 L 270,200 L 250,240 L 210,255 L 160,250 L 120,220 L 85,180 Z",
    lx: 165,
    ly: 158,
    dx: 175,
    dy: 175,
  },
  {
    id: "ubud",
    label: "Ubud",
    path: "M 250,90 L 340,75 L 410,80 L 430,110 L 420,170 L 380,210 L 330,230 L 280,240 L 270,200 L 270,130 Z",
    lx: 340,
    ly: 145,
    dx: 340,
    dy: 155,
  },
  {
    id: "sanur",
    label: "Sanur",
    path: "M 410,80 L 470,90 L 520,120 L 530,170 L 500,220 L 440,250 L 380,260 L 330,250 L 330,230 L 380,210 L 420,170 L 430,110 Z",
    lx: 455,
    ly: 165,
    dx: 460,
    dy: 175,
  },
  {
    id: "jimbaran",
    label: "Jimbaran",
    path: "M 250,240 L 280,240 L 330,250 L 340,270 L 330,310 L 300,330 L 270,320 L 250,290 Z",
    lx: 278,
    ly: 282,
    dx: 290,
    dy: 290,
  },
  {
    id: "uluwatu",
    label: "Uluwatu",
    path: "M 270,320 L 300,330 L 310,360 L 300,390 L 270,400 L 245,385 L 240,350 Z",
    lx: 265,
    ly: 363,
    dx: 275,
    dy: 370,
  },
  {
    id: "nusa-dua",
    label: "Nusa Dua",
    path: "M 300,330 L 330,310 L 370,300 L 390,320 L 380,370 L 350,395 L 310,395 L 300,390 L 310,360 Z",
    lx: 345,
    ly: 352,
    dx: 345,
    dy: 355,
  },
];

// Key landmark markers (always visible gold stars)
const landmarks = [
  { label: "DPS", emoji: "\u2708\uFE0F", x: 310, y: 260 },
  {
    label: "Khayangan Estate",
    emoji: "\uD83D\uDC92",
    x: 260,
    y: 388,
  },
  {
    label: "Swiss-Belhotel",
    emoji: "\uD83C\uDFE8",
    x: 238,
    y: 340,
  },
];

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
      {/* Interactive SVG Map                                               */}
      {/* ---------------------------------------------------------------- */}
      <div className="px-3 pt-2">
        <div className="relative rounded-2xl overflow-hidden border border-[var(--cream-dark)] shadow-sm">
          <svg
            viewBox="0 0 600 440"
            className="w-full h-auto"
            style={{ background: "rgba(61,133,198,0.10)" }}
          >
            {/* Definitions: glow filter for stars, region hover glow */}
            <defs>
              <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="label-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.15" />
              </filter>
              {/* Ocean water pattern - subtle waves */}
              <pattern id="water" patternUnits="userSpaceOnUse" width="40" height="40">
                <path
                  d="M0 20 Q10 15 20 20 Q30 25 40 20"
                  fill="none"
                  stroke="rgba(61,133,198,0.08)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>

            {/* Ocean background fill */}
            <rect width="600" height="440" fill="rgba(61,133,198,0.07)" />
            <rect width="600" height="440" fill="url(#water)" />

            {/* Main island silhouette (behind clickable regions, for the green landmass feel) */}
            <path
              d={`
                M 60,150
                C 70,115 120,80 200,75
                L 260,82
                L 340,70
                L 420,75
                L 480,88
                L 535,120
                L 545,175
                L 510,225
                L 450,255
                L 395,265
                L 395,305
                L 395,330
                L 385,375
                L 355,400
                L 310,400
                L 295,395
                L 265,405
                L 235,390
                L 230,345
                L 245,285
                L 240,250
                L 200,260
                L 150,255
                L 110,225
                L 75,185
                Z
              `}
              fill="var(--forest)"
              fillOpacity="0.09"
              stroke="var(--forest)"
              strokeOpacity="0.15"
              strokeWidth="1.5"
            />

            {/* Clickable region areas */}
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
                        ? "var(--cream)"
                        : "var(--cream-dark)"
                    }
                    fillOpacity={isSelected ? 0.55 : isHovered ? 0.7 : 0.45}
                    stroke={
                      isSelected ? "var(--gold-dark)" : "var(--forest)"
                    }
                    strokeWidth={isSelected ? 2.5 : 1}
                    strokeOpacity={isSelected ? 0.9 : 0.25}
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
                  {/* Region center dot */}
                  <circle
                    cx={region.dx}
                    cy={region.dy}
                    r={isSelected ? 5 : 3.5}
                    fill={isSelected ? "var(--gold-dark)" : "var(--charcoal)"}
                    fillOpacity={isSelected ? 1 : 0.45}
                    className="pointer-events-none transition-all duration-200"
                  />
                  {/* Region label */}
                  <text
                    x={region.lx}
                    y={region.ly}
                    textAnchor="middle"
                    fontSize={region.id === "seminyak-canggu" ? 11 : 12}
                    fontWeight={isSelected ? 700 : 500}
                    fill={
                      isSelected ? "var(--gold-dark)" : "var(--charcoal)"
                    }
                    fillOpacity={isSelected ? 1 : 0.7}
                    filter="url(#label-shadow)"
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
                {/* Star shape */}
                <polygon
                  points={starPoints(lm.x, lm.y, 8, 4)}
                  fill="var(--gold)"
                  stroke="var(--gold-dark)"
                  strokeWidth="0.8"
                />
                {/* Label */}
                <text
                  x={lm.x}
                  y={lm.y - 13}
                  textAnchor="middle"
                  fontSize={9.5}
                  fontWeight={600}
                  fill="var(--gold-dark)"
                  filter="url(#label-shadow)"
                  className="select-none"
                  style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
                >
                  {lm.label} {lm.emoji}
                </text>
              </g>
            ))}

            {/* Compass rose (decorative, top-right) */}
            <g transform="translate(555, 40)" opacity="0.3">
              <circle cx="0" cy="0" r="16" fill="none" stroke="var(--charcoal)" strokeWidth="0.8" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="var(--charcoal)" strokeWidth="0.8" />
              <line x1="-14" y1="0" x2="14" y2="0" stroke="var(--charcoal)" strokeWidth="0.8" />
              <text x="0" y="-18" textAnchor="middle" fontSize="8" fill="var(--charcoal)" fontWeight="600" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>N</text>
            </g>

            {/* "Indian Ocean" label */}
            <text
              x="110"
              y="380"
              fontSize="12"
              fill="var(--ocean)"
              fillOpacity="0.3"
              fontStyle="italic"
              fontWeight="300"
              className="select-none"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            >
              Indian Ocean
            </text>

            {/* "Bali Sea" label (top) */}
            <text
              x="280"
              y="45"
              fontSize="12"
              textAnchor="middle"
              fill="var(--ocean)"
              fillOpacity="0.3"
              fontStyle="italic"
              fontWeight="300"
              className="select-none"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            >
              Bali Sea
            </text>
          </svg>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Region Detail Panel                                               */}
      {/* ---------------------------------------------------------------- */}
      <div
        className={`transition-all duration-400 ease-out overflow-hidden ${
          activeRegion ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {activeRegion && (
          <div className="px-4 pt-5">
            {/* Panel header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setSelectedRegion(null)}
                className="inline-flex items-center gap-1 text-sm font-medium text-[var(--gold-dark)] active:opacity-70 transition-opacity"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
                Back to map
              </button>
              <button
                onClick={() => setSelectedRegion(null)}
                className="p-1.5 rounded-full bg-[var(--cream-dark)] text-[var(--charcoal)]/60 active:opacity-70 transition-opacity"
                aria-label="Close panel"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Region title */}
            <div className="flex items-center gap-2 mb-4">
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

            {/* Recommendation cards */}
            <div className="space-y-3">
              {activeRegion.recs.map((rec) => (
                <article
                  key={rec.name}
                  className="rounded-2xl bg-white shadow-sm border border-[var(--cream-dark)] overflow-hidden"
                >
                  <div className="flex">
                    {/* Color-coded left border */}
                    <div
                      className="w-1.5 shrink-0"
                      style={{
                        backgroundColor: categoryBorderColor[rec.category],
                      }}
                    />
                    <div className="p-4 flex-1 min-w-0">
                      {/* Name + price */}
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base font-bold text-[var(--charcoal)] leading-tight">
                          {rec.name}
                        </h3>
                        <span className="shrink-0 text-sm font-semibold text-[var(--gold-dark)]">
                          {rec.price}
                        </span>
                      </div>

                      {/* Category badge */}
                      <div className="mt-1.5">
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryBadgeClass[rec.category]}`}
                        >
                          {rec.category}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--charcoal)]/75">
                        {rec.description}
                      </p>

                      {/* Tip */}
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
        )}
      </div>

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
