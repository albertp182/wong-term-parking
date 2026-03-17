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

// ---------------------------------------------------------------------------
// Geographically accurate Bali map coordinates
// Traced from real Bali coastline, viewBox 0 0 600 460
//
// Key geography:
// - West tip (Gilimanuk) narrow point facing Java
// - North coast is relatively straight (Singaraja, Lovina)
// - Northeast bulge (Amed, Tulamben - volcano coast)
// - East coast curves south (Padang Bai, Candidasa)
// - Narrow isthmus connects main island to Bukit peninsula
// - Bukit peninsula hangs south with Uluwatu at SW tip, Nusa Dua at SE
// - Airport (DPS) sits on the isthmus
// ---------------------------------------------------------------------------

const mapRegions: MapRegion[] = [
  {
    id: "seminyak-canggu",
    label: "Seminyak / Canggu",
    // Southwest coastal strip: Tanah Lot area down through Canggu, Seminyak to Kuta
    path: "M 105,185 L 155,155 L 210,140 L 260,145 L 270,175 L 265,210 L 255,235 L 235,250 L 205,255 L 170,250 L 140,235 L 115,215 Z",
    lx: 190,
    ly: 200,
    dx: 195,
    dy: 210,
  },
  {
    id: "ubud",
    label: "Ubud",
    // Central highlands: the cultural heart, inland from both coasts
    path: "M 210,140 L 260,110 L 310,90 L 370,85 L 400,95 L 400,135 L 385,175 L 355,205 L 310,220 L 270,225 L 265,210 L 270,175 L 260,145 Z",
    lx: 320,
    ly: 155,
    dx: 325,
    dy: 160,
  },
  {
    id: "sanur",
    label: "Sanur",
    // East-central coast: Sanur beach area down to the isthmus
    path: "M 400,95 L 445,105 L 490,130 L 520,165 L 510,205 L 480,240 L 440,265 L 400,278 L 370,280 L 355,265 L 355,205 L 385,175 L 400,135 Z",
    lx: 440,
    ly: 190,
    dx: 445,
    dy: 195,
  },
  {
    id: "jimbaran",
    label: "Jimbaran",
    // West side of Bukit: Jimbaran Bay, west coast of the peninsula
    path: "M 310,270 L 340,265 L 370,280 L 365,305 L 355,330 L 340,345 L 320,340 L 310,320 L 305,295 Z",
    lx: 330,
    ly: 305,
    dx: 335,
    dy: 310,
  },
  {
    id: "uluwatu",
    label: "Uluwatu",
    // Southwest tip of Bukit: Uluwatu cliffs and temple
    path: "M 305,295 L 310,320 L 320,340 L 340,345 L 340,370 L 330,395 L 310,410 L 290,405 L 278,390 L 278,365 L 285,340 Z",
    lx: 305,
    ly: 378,
    dx: 310,
    dy: 375,
  },
  {
    id: "nusa-dua",
    label: "Nusa Dua",
    // East side of Bukit: Nusa Dua resort area, Benoa
    path: "M 340,345 L 355,330 L 365,305 L 380,300 L 400,310 L 405,340 L 395,375 L 375,400 L 345,410 L 330,395 L 340,370 Z",
    lx: 373,
    ly: 358,
    dx: 375,
    dy: 355,
  },
];

// Key landmark markers (always visible gold stars)
const landmarks = [
  // Airport on the isthmus between main island and Bukit
  { label: "DPS", emoji: "\u2708\uFE0F", x: 360, y: 282 },
  // Khayangan Estate in southern Uluwatu
  {
    label: "Khayangan Estate",
    emoji: "\uD83D\uDC92",
    x: 300,
    y: 398,
  },
  // Swiss-Belhotel Pecatu on west side of Bukit
  {
    label: "Swiss-Belhotel",
    emoji: "\uD83C\uDFE8",
    x: 290,
    y: 350,
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
            viewBox="0 0 600 460"
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
            <rect width="600" height="460" fill="rgba(61,133,198,0.07)" />
            <rect width="600" height="460" fill="url(#water)" />

            {/* Main island silhouette — traced from real Bali coastline */}
            {/* Clockwise from Gilimanuk (west tip) */}
            <path
              d={`
                M 42,180
                C 50,170 60,158 75,148
                Q 95,130 120,118
                Q 150,105 185,95
                Q 220,86 260,82
                Q 300,78 340,80
                Q 375,82 410,90
                Q 445,100 475,118
                Q 505,138 525,165
                Q 535,185 530,210
                Q 520,235 500,252
                Q 475,270 450,278
                Q 420,288 400,290
                L 405,310
                Q 410,335 405,360
                Q 398,385 380,405
                Q 360,418 340,415
                L 330,400
                Q 310,415 290,410
                Q 275,400 272,380
                Q 270,355 280,335
                L 295,300
                L 300,280
                Q 280,272 260,262
                Q 235,255 210,255
                Q 180,255 155,248
                Q 130,238 112,222
                Q 90,205 72,188
                Q 55,175 42,180
                Z
              `}
              fill="var(--forest)"
              fillOpacity="0.09"
              stroke="var(--forest)"
              strokeOpacity="0.18"
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
              x="120"
              y="440"
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
              x="300"
              y="50"
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
