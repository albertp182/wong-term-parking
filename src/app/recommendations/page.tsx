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
// Geographically accurate Bali map — traced from reference map
// viewBox 0 0 800 540
//
// Bali is ~153km E-W, ~112km N-S (with Bukit). The island is much wider
// than it is tall. Key shape features from the reference map:
//   - Narrow west tip (Gilimanuk) pointing NW toward Java
//   - North coast is long, gently concave (dips south near mountains)
//   - Northeast extends far east (Karangasem, Mount Agung)
//   - East coast (Lombok Strait) drops south then curves SW
//   - South coast runs to narrow isthmus at DPS airport
//   - Bukit peninsula hangs south — small relative to main island
//   - Canggu/Seminyak/Kuta are SW coast of MAIN island, above isthmus
//   - Sanur is SE coast of main island, east of isthmus
// ---------------------------------------------------------------------------

interface MapRegion {
  id: RegionId;
  label: string;
  path: string;
  lx: number;
  ly: number;
  dx: number;
  dy: number;
}

const mapRegions: MapRegion[] = [
  {
    id: "seminyak-canggu",
    label: "Seminyak / Canggu",
    // SW coast of main island: from Tanah Lot coast through Canggu, Seminyak, Kuta
    path: "M 155,250 L 205,220 L 270,200 L 340,205 L 380,235 L 390,280 L 395,330 L 385,365 L 365,380 L 345,370 L 320,365 L 290,370 L 255,368 L 215,358 L 180,340 L 155,310 Z",
    lx: 275,
    ly: 300,
    dx: 290,
    dy: 305,
  },
  {
    id: "ubud",
    label: "Ubud",
    // Central highlands, the cultural heart
    path: "M 270,200 L 340,160 L 420,135 L 500,132 L 520,165 L 500,210 L 465,245 L 420,265 L 380,270 L 380,235 L 340,205 Z",
    lx: 410,
    ly: 200,
    dx: 415,
    dy: 205,
  },
  {
    id: "sanur",
    label: "Sanur",
    // SE coast: from Gianyar coast through Sanur to the isthmus
    path: "M 500,132 L 560,140 L 625,170 L 680,220 L 700,275 L 680,325 L 640,365 L 590,390 L 535,402 L 490,408 L 470,410 L 455,400 L 460,385 L 440,370 L 420,360 L 420,300 L 420,265 L 465,245 L 500,210 L 520,165 Z",
    lx: 565,
    ly: 280,
    dx: 570,
    dy: 285,
  },
  {
    id: "jimbaran",
    label: "Jimbaran",
    // West Bukit: Jimbaran Bay coast
    path: "M 385,365 L 395,330 L 420,300 L 420,360 L 440,370 L 455,380 L 455,410 L 445,425 L 430,435 L 412,432 L 400,425 L 390,412 Z",
    lx: 415,
    ly: 398,
    dx: 420,
    dy: 400,
  },
  {
    id: "uluwatu",
    label: "Uluwatu",
    // SW tip of Bukit peninsula
    path: "M 385,365 L 390,412 L 400,425 L 412,432 L 415,455 L 405,478 L 388,490 L 368,488 L 355,475 L 350,455 L 352,435 L 360,415 L 365,395 Z",
    lx: 380,
    ly: 460,
    dx: 382,
    dy: 455,
  },
  {
    id: "nusa-dua",
    label: "Nusa Dua",
    // East side of Bukit: resort area
    path: "M 412,432 L 430,435 L 445,425 L 455,410 L 470,410 L 485,420 L 488,445 L 480,470 L 462,488 L 440,495 L 420,490 L 405,478 L 415,455 Z",
    lx: 455,
    ly: 458,
    dx: 452,
    dy: 455,
  },
];

// Key landmark markers (always visible gold stars)
const landmarks = [
  // Airport on the isthmus between main island and Bukit
  { label: "DPS", emoji: "\u2708\uFE0F", x: 450, y: 388 },
  // Khayangan Estate in southern Uluwatu
  {
    label: "Khayangan Estate",
    emoji: "\uD83D\uDC92",
    x: 378,
    y: 482,
  },
  // Swiss-Belhotel Pecatu on west side of Bukit
  {
    label: "Swiss-Belhotel",
    emoji: "\uD83C\uDFE8",
    x: 365,
    y: 438,
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
            viewBox="0 0 800 540"
            className="w-full h-auto"
            style={{ background: "rgba(61,133,198,0.10)" }}
          >
            {/* Definitions */}
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
              <pattern id="water" patternUnits="userSpaceOnUse" width="40" height="40">
                <path d="M0 20 Q10 15 20 20 Q30 25 40 20" fill="none" stroke="rgba(61,133,198,0.08)" strokeWidth="1" />
              </pattern>
            </defs>

            {/* Ocean */}
            <rect width="800" height="540" fill="rgba(61,133,198,0.07)" />
            <rect width="800" height="540" fill="url(#water)" />

            {/* ─── Main island silhouette ─── */}
            {/* Traced from reference map — clockwise from Gilimanuk (west tip) */}
            {/* The island is wide E-W (~700 units) with the Bukit hanging south */}
            <path
              d={`
                M 38,260
                C 48,248 62,232 80,218
                C 100,202 128,185 158,170
                C 190,155 225,142 265,130
                C 310,118 360,110 410,108
                C 445,106 475,108 505,115
                C 535,122 560,132 585,148
                C 612,165 638,188 660,215
                C 678,238 692,262 700,288
                C 705,308 702,328 692,345
                C 678,365 658,382 635,395
                C 608,408 578,418 548,425
                C 520,430 498,432 480,434
                L 472,418
                L 490,445
                C 492,462 490,478 482,492
                C 472,505 458,512 442,515
                C 428,516 416,512 406,502
                C 398,493 392,482 388,470
                C 382,455 370,468 358,478
                C 348,486 338,490 328,488
                C 315,485 308,475 305,462
                C 302,448 305,432 312,418
                L 330,390
                L 348,370
                C 338,368 325,366 310,366
                C 288,368 265,370 242,368
                C 218,365 195,358 175,348
                C 152,335 132,318 115,298
                C 98,278 82,262 68,252
                C 55,244 45,242 38,260
                Z
              `}
              fill="var(--forest)"
              fillOpacity="0.10"
              stroke="var(--forest)"
              strokeOpacity="0.20"
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

            {/* Compass rose (top-right) */}
            <g transform="translate(748, 52)" opacity="0.3">
              <circle cx="0" cy="0" r="18" fill="none" stroke="var(--charcoal)" strokeWidth="0.8" />
              <line x1="0" y1="-16" x2="0" y2="16" stroke="var(--charcoal)" strokeWidth="0.8" />
              <line x1="-16" y1="0" x2="16" y2="0" stroke="var(--charcoal)" strokeWidth="0.8" />
              <text x="0" y="-22" textAnchor="middle" fontSize="9" fill="var(--charcoal)" fontWeight="600" style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}>N</text>
            </g>

            {/* "Java Sea" label (top-left) */}
            <text
              x="80"
              y="170"
              fontSize="13"
              fill="var(--ocean)"
              fillOpacity="0.25"
              fontStyle="italic"
              fontWeight="300"
              className="select-none"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            >
              Java Sea
            </text>

            {/* "Lombok Strait" label (right) */}
            <text
              x="732"
              y="310"
              fontSize="11"
              fill="var(--ocean)"
              fillOpacity="0.25"
              fontStyle="italic"
              fontWeight="300"
              className="select-none"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
              transform="rotate(75, 732, 310)"
            >
              Lombok Strait
            </text>

            {/* "Indian Ocean" label (bottom) */}
            <text
              x="160"
              y="510"
              fontSize="13"
              fill="var(--ocean)"
              fillOpacity="0.25"
              fontStyle="italic"
              fontWeight="300"
              className="select-none"
              style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
            >
              Indian Ocean
            </text>

            {/* "Bali Sea" label (top) */}
            <text
              x="400"
              y="72"
              fontSize="13"
              textAnchor="middle"
              fill="var(--ocean)"
              fillOpacity="0.25"
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
