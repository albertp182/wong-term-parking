"use client";

import { useState } from "react";
import { travelInfo } from "@/data/wedding";
import { TravelInfo } from "@/lib/types";
import {
  Plane,
  Hotel,
  Car,
  UtensilsCrossed,
  Compass,
  Lightbulb,
  MapPin,
  ExternalLink,
  Phone,
  Shield,
} from "lucide-react";

type CategoryFilter = "all" | TravelInfo["category"];

const categories: { value: CategoryFilter; label: string; icon: typeof Plane }[] = [
  { value: "all", label: "All", icon: Compass },
  { value: "airport", label: "Airport", icon: Plane },
  { value: "hotel", label: "Hotels", icon: Hotel },
  { value: "transport", label: "Transport", icon: Car },
  { value: "restaurant", label: "Restaurants", icon: UtensilsCrossed },
  { value: "activity", label: "Activities", icon: Compass },
  { value: "tip", label: "Tips", icon: Lightbulb },
];

function getCategoryIcon(category: TravelInfo["category"]) {
  switch (category) {
    case "airport":
      return Plane;
    case "hotel":
      return Hotel;
    case "transport":
      return Car;
    case "restaurant":
      return UtensilsCrossed;
    case "activity":
      return Compass;
    case "tip":
      return Lightbulb;
  }
}

function getCategoryLabel(category: TravelInfo["category"]) {
  switch (category) {
    case "airport":
      return "Airport";
    case "hotel":
      return "Hotel";
    case "transport":
      return "Transport";
    case "restaurant":
      return "Restaurant";
    case "activity":
      return "Activity";
    case "tip":
      return "Tip";
  }
}

export default function TravelPage() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");

  const filteredInfo =
    activeCategory === "all"
      ? travelInfo
      : travelInfo.filter((item) => item.category === activeCategory);

  return (
    <div className="flex flex-col" style={{ background: "var(--cream)" }}>
      {/* ─── Header ─── */}
      <section
        className="relative overflow-hidden px-6 pb-8 pt-14 text-center"
        style={{
          background:
            "linear-gradient(165deg, var(--charcoal) 0%, #1a2e0d 45%, var(--forest) 100%)",
        }}
      >
        {/* Decorative dots */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, var(--gold) 1px, transparent 1px), radial-gradient(circle at 75% 75%, var(--gold) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(circle, var(--ocean) 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: "var(--gold)" }}
          >
            Bali, Indonesia
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Travel Guide
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            Everything you need to know about getting to
            <br />
            and around Bali for the wedding
          </p>
        </div>
      </section>

      {/* ─── Category Filter ─── */}
      <section className="sticky top-0 z-20 border-b border-[var(--cream-dark)] bg-white/90 backdrop-blur-lg">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex flex-shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-sm"
                    : "text-[var(--charcoal)]/70 hover:bg-[var(--cream-dark)]"
                }`}
                style={
                  isActive
                    ? { backgroundColor: "var(--gold-dark)" }
                    : { backgroundColor: "var(--cream)" }
                }
              >
                <Icon size={14} strokeWidth={isActive ? 2.5 : 1.75} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* ─── Info Cards ─── */}
      <section className="px-5 py-6">
        <div className="mx-auto flex max-w-lg flex-col gap-4">
          {filteredInfo.length === 0 && (
            <div className="py-12 text-center">
              <p
                className="text-sm"
                style={{ color: "var(--charcoal)", opacity: 0.4 }}
              >
                No items in this category yet.
              </p>
            </div>
          )}

          {filteredInfo.map((item) => {
            const CategoryIcon = getCategoryIcon(item.category);
            return (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--cream-dark)] shadow-sm"
                style={{ backgroundColor: "var(--cream)" }}
              >
                <div className="px-5 py-4">
                  {/* Category label */}
                  <div className="mb-2 flex items-center gap-1.5">
                    <CategoryIcon
                      size={13}
                      strokeWidth={2}
                      style={{ color: "var(--gold-dark)" }}
                    />
                    <span
                      className="text-[11px] font-semibold uppercase tracking-wider"
                      style={{ color: "var(--gold-dark)" }}
                    >
                      {getCategoryLabel(item.category)}
                    </span>
                    {item.priceRange && (
                      <span
                        className="ml-auto rounded-full px-2 py-0.5 text-[11px] font-bold"
                        style={{
                          color: "var(--forest)",
                          backgroundColor: "var(--cream-dark)",
                        }}
                      >
                        {item.priceRange}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className="text-[15px] font-bold leading-snug"
                    style={{ color: "var(--charcoal)" }}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="mt-2 text-[13px] leading-relaxed"
                    style={{ color: "var(--charcoal)", opacity: 0.65 }}
                  >
                    {item.description}
                  </p>

                  {/* Metadata row */}
                  {(item.address || item.website) && (
                    <div className="mt-3 flex flex-col gap-2">
                      {item.address && (
                        <div className="flex items-start gap-1.5">
                          <MapPin
                            size={13}
                            strokeWidth={1.75}
                            className="mt-0.5 flex-shrink-0"
                            style={{ color: "var(--coral)" }}
                          />
                          <span
                            className="text-[12px] leading-snug"
                            style={{ color: "var(--charcoal)", opacity: 0.5 }}
                          >
                            {item.address}
                          </span>
                        </div>
                      )}
                      {item.website && (
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 transition-opacity hover:opacity-80"
                        >
                          <ExternalLink
                            size={13}
                            strokeWidth={1.75}
                            style={{ color: "var(--ocean)" }}
                          />
                          <span
                            className="text-[12px] font-medium underline underline-offset-2"
                            style={{ color: "var(--ocean)" }}
                          >
                            Visit website
                          </span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Emergency Contacts ─── */}
      <section className="px-5 pb-28 pt-2">
        <div className="mx-auto max-w-lg">
          <div
            className="rounded-2xl border-2 px-5 py-5"
            style={{
              borderColor: "var(--coral)",
              backgroundColor: "#fef5f2",
            }}
          >
            <div className="mb-3 flex items-center gap-2">
              <Shield
                size={18}
                strokeWidth={2}
                style={{ color: "var(--coral)" }}
              />
              <h3
                className="text-sm font-bold"
                style={{ color: "var(--charcoal)" }}
              >
                Emergency Contacts
              </h3>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <Phone
                  size={13}
                  strokeWidth={1.75}
                  style={{ color: "var(--coral)" }}
                />
                <span
                  className="text-[13px]"
                  style={{ color: "var(--charcoal)", opacity: 0.7 }}
                >
                  Indonesia Emergency:{" "}
                  <span className="font-bold" style={{ opacity: 1 }}>
                    112
                  </span>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone
                  size={13}
                  strokeWidth={1.75}
                  style={{ color: "var(--coral)" }}
                />
                <span
                  className="text-[13px]"
                  style={{ color: "var(--charcoal)", opacity: 0.7 }}
                >
                  Tourist Police:{" "}
                  <span className="font-bold" style={{ opacity: 1 }}>
                    (0361) 224111
                  </span>
                </span>
              </div>

              <div
                className="mt-1 h-px w-full"
                style={{ backgroundColor: "var(--coral)", opacity: 0.15 }}
              />

              <p
                className="text-[13px] leading-relaxed"
                style={{ color: "var(--charcoal)", opacity: 0.65 }}
              >
                If you need anything at all, text Albert:{" "}
                <a
                  href="tel:+1234567890"
                  className="font-bold underline underline-offset-2"
                  style={{ color: "var(--charcoal)", opacity: 1 }}
                >
                  (123) 456-7890
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
