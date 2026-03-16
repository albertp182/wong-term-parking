"use client";

import { useState } from "react";
import {
  Sparkles,
  UtensilsCrossed,
  Wine,
  Compass,
  Map,
  Flower2,
  MapPin,
  Lightbulb,
} from "lucide-react";

type Category =
  | "Restaurants"
  | "Bars & Nightlife"
  | "Activities"
  | "Day Trips"
  | "Wellness & Spa";

interface Recommendation {
  name: string;
  category: Category;
  location: string;
  description: string;
  price: string;
  tip: string;
}

const recommendations: Recommendation[] = [
  // Restaurants
  {
    name: "Locavore",
    category: "Restaurants",
    location: "Ubud",
    description:
      "Modern Indonesian tasting menu. One of Asia's best restaurants.",
    price: "$$$$",
    tip: "Book at least 2 weeks ahead",
  },
  {
    name: "Warung Babi Guling Ibu Oka",
    category: "Restaurants",
    location: "Ubud",
    description: "Famous suckling pig. Anthony Bourdain loved it.",
    price: "$",
    tip: "Go before noon, it sells out",
  },
  {
    name: "La Lucciola",
    category: "Restaurants",
    location: "Seminyak",
    description: "Italian beachfront dining with killer sunset views.",
    price: "$$$",
    tip: "Reserve a terrace table for sunset",
  },
  {
    name: "Naughty Nuri's",
    category: "Restaurants",
    location: "Ubud",
    description: "Best ribs in Bali. Legendary martinis.",
    price: "$$",
    tip: "The martinis are dangerously strong",
  },
  {
    name: "Mamasan",
    category: "Restaurants",
    location: "Seminyak",
    description: "Pan-Asian in a gorgeous colonial building.",
    price: "$$$",
    tip: "Don't skip the dim sum",
  },

  // Bars & Nightlife
  {
    name: "Potato Head Beach Club",
    category: "Bars & Nightlife",
    location: "Seminyak",
    description: "Iconic beach club. Great music, pool, and cocktails.",
    price: "$$$",
    tip: "Arrive by 3pm to get a good lounger",
  },
  {
    name: "Rock Bar",
    category: "Bars & Nightlife",
    location: "Uluwatu",
    description: "Bar built into the cliffside. Insane sunset views.",
    price: "$$$$",
    tip: "Go at 5pm for the sunset, leave before it gets packed",
  },
  {
    name: "Old Man's",
    category: "Bars & Nightlife",
    location: "Canggu",
    description: "Chill surf bar with live music and cheap drinks.",
    price: "$",
    tip: "Wednesday is the big night",
  },
  {
    name: "Mirror Lounge",
    category: "Bars & Nightlife",
    location: "Seminyak",
    description: "Gothic cathedral-themed nightclub. Wild.",
    price: "$$$",
    tip: "Doesn't get going until midnight",
  },

  // Activities
  {
    name: "Surf Lesson at Kuta Beach",
    category: "Activities",
    location: "Kuta",
    description:
      "Even if you've never surfed, the instructors are amazing.",
    price: "$$",
    tip: "Morning sessions have the best waves",
  },
  {
    name: "Mount Batur Sunrise Trek",
    category: "Activities",
    location: "Kintamani",
    description:
      "Wake up at 2am, hike a volcano, watch the sunrise. Worth it.",
    price: "$$",
    tip: "Bring a jacket, it's cold at the top",
  },
  {
    name: "Tegallalang Rice Terraces",
    category: "Activities",
    location: "Ubud",
    description: "Iconic terraced rice paddies. Instagram gold.",
    price: "$",
    tip: "Go early morning to avoid crowds",
  },

  // Day Trips
  {
    name: "Nusa Penida Island",
    category: "Day Trips",
    location: "Off the southeast coast",
    description:
      "Crystal clear water, manta rays, and that famous cliff.",
    price: "$$",
    tip: "Book a fast boat from Sanur",
  },
  {
    name: "Uluwatu Temple & Kecak Dance",
    category: "Day Trips",
    location: "Uluwatu",
    description: "Clifftop temple with a fire dance at sunset. Magical.",
    price: "$",
    tip: "Watch your sunglasses — the monkeys steal everything",
  },

  // Wellness & Spa
  {
    name: "COMO Shambhala Estate",
    category: "Wellness & Spa",
    location: "Ubud",
    description: "World-class wellness retreat in the jungle.",
    price: "$$$$",
    tip: "Even a day pass is life-changing",
  },
  {
    name: "Spa at Maya Ubud",
    category: "Wellness & Spa",
    location: "Ubud",
    description: "Affordable luxury. Great couples massage.",
    price: "$$",
    tip: "Book the river valley treatment room",
  },
];

const categories = [
  { label: "All", icon: Sparkles },
  { label: "Restaurants", icon: UtensilsCrossed },
  { label: "Bars & Nightlife", icon: Wine },
  { label: "Activities", icon: Compass },
  { label: "Day Trips", icon: Map },
  { label: "Wellness & Spa", icon: Flower2 },
] as const;

const categoryColors: Record<Category, string> = {
  Restaurants: "var(--coral)",
  "Bars & Nightlife": "var(--ocean)",
  Activities: "var(--forest)",
  "Day Trips": "var(--gold)",
  "Wellness & Spa": "var(--forest-light)",
};

const categoryBadgeBg: Record<Category, string> = {
  Restaurants: "bg-[var(--coral)]/15 text-[var(--coral)]",
  "Bars & Nightlife": "bg-[var(--ocean)]/15 text-[var(--ocean)]",
  Activities: "bg-[var(--forest)]/15 text-[var(--forest)]",
  "Day Trips": "bg-[var(--gold-dark)]/15 text-[var(--gold-dark)]",
  "Wellness & Spa": "bg-[var(--forest-light)]/15 text-[var(--forest-light)]",
};

export default function RecommendationsPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filtered =
    activeFilter === "All"
      ? recommendations
      : recommendations.filter((r) => r.category === activeFilter);

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
            Our Bali Picks
          </h1>
          <Sparkles
            size={24}
            className="text-[var(--gold)]"
            strokeWidth={2}
          />
        </div>
        <p className="mt-2 text-sm text-[var(--charcoal)]/60">
          Tried, tested, and Albert-approved
        </p>
      </header>

      {/* Category filter tabs */}
      <div className="sticky top-0 z-20 bg-[var(--cream)]/95 backdrop-blur-sm">
        <div className="flex gap-2 overflow-x-auto no-scrollbar px-4 py-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeFilter === cat.label;
            return (
              <button
                key={cat.label}
                onClick={() => setActiveFilter(cat.label)}
                className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all shrink-0 ${
                  isActive
                    ? "bg-[var(--gold-dark)] text-white shadow-md"
                    : "bg-white text-[var(--charcoal)]/70 border border-[var(--cream-dark)] hover:border-[var(--gold)]/40"
                }`}
              >
                <Icon size={15} strokeWidth={isActive ? 2.5 : 1.5} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommendation cards */}
      <div className="px-4 pb-32 space-y-4">
        {filtered.map((rec) => (
          <article
            key={rec.name}
            className="rounded-2xl bg-white shadow-sm border border-[var(--cream-dark)] overflow-hidden"
          >
            {/* Color header strip */}
            <div
              className="h-2"
              style={{ backgroundColor: categoryColors[rec.category] }}
            />

            <div className="p-5">
              {/* Name and price */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-lg font-bold text-[var(--charcoal)] leading-tight">
                  {rec.name}
                </h3>
                <span className="shrink-0 text-sm font-semibold text-[var(--gold-dark)]">
                  {rec.price}
                </span>
              </div>

              {/* Category badge + location */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryBadgeBg[rec.category]}`}
                >
                  {rec.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--charcoal)]/50">
                  <MapPin size={11} />
                  {rec.location}
                </span>
              </div>

              {/* Description */}
              <p className="mt-3 text-sm leading-relaxed text-[var(--charcoal)]/75">
                {rec.description}
              </p>

              {/* Tip */}
              <div className="mt-3 flex items-start gap-2 rounded-lg bg-[var(--cream)] px-3 py-2.5">
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
          </article>
        ))}
      </div>

      {/* Bottom note */}
      <div className="fixed bottom-16 left-0 right-0 pointer-events-none">
        <p className="text-center text-xs text-[var(--charcoal)]/40 pb-2">
          Have questions? Text Albert!
        </p>
      </div>
    </div>
  );
}
