import { schedule } from "@/data/wedding";
import { WeddingEvent } from "@/lib/types";
import { MapPin, Clock, Shirt } from "lucide-react";

const categoryBorderColor: Record<WeddingEvent["category"], string> = {
  ceremony: "var(--gold)",
  reception: "var(--gold-light)",
  activity: "var(--forest)",
  meal: "var(--coral)",
  transportation: "var(--ocean)",
  "free-time": "var(--cream-dark)",
};

const categoryLabel: Record<WeddingEvent["category"], string> = {
  ceremony: "Ceremony",
  reception: "Reception",
  activity: "Activity",
  meal: "Meal",
  transportation: "Transportation",
  "free-time": "Free Time",
};

export default function ItineraryPage() {
  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Header */}
      <header className="px-6 pt-14 pb-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-[var(--charcoal)]">
          Schedule
        </h1>
        <p className="mt-2 text-sm text-[var(--charcoal)]/60">
          Your day-by-day guide
        </p>
      </header>

      {/* Day sections */}
      <div className="px-4 pb-12 space-y-2">
        {schedule.map((day) => (
          <section key={day.date}>
            {/* Sticky day header */}
            <div className="sticky top-0 z-10 -mx-4 px-4 py-3 bg-[var(--cream)]/95 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[var(--gold)]/30" />
                <h2 className="text-sm font-semibold uppercase tracking-widest text-[var(--gold-dark)] whitespace-nowrap">
                  {day.label}
                </h2>
                <div className="h-px flex-1 bg-[var(--gold)]/30" />
              </div>
              <p className="mt-1 text-center text-xs text-[var(--charcoal)]/40">
                {formatDate(day.date)}
              </p>
            </div>

            {/* Timeline + event cards */}
            <div className="relative ml-4 mt-2 pb-4">
              {/* Vertical timeline connector */}
              <div
                className="absolute left-0 top-2 bottom-2 w-px"
                style={{ backgroundColor: "var(--cream-dark)" }}
              />

              <div className="space-y-4">
                {day.events.map((event, eventIndex) => (
                  <div key={event.id} className="relative pl-7">
                    {/* Timeline dot */}
                    <div
                      className="absolute left-0 top-5 -translate-x-1/2 h-3 w-3 rounded-full border-2 border-white shadow-sm"
                      style={{
                        backgroundColor: categoryBorderColor[event.category],
                      }}
                    />

                    {/* Event card */}
                    <div
                      className="rounded-xl bg-white p-4 shadow-sm border border-[var(--cream-dark)]"
                      style={{
                        borderLeftWidth: "4px",
                        borderLeftColor: categoryBorderColor[event.category],
                      }}
                    >
                      {/* Time */}
                      <div className="flex items-center gap-1.5 text-xs text-[var(--charcoal)]/50">
                        <Clock size={12} />
                        <span>
                          {event.startTime}
                          {event.endTime ? ` \u2013 ${event.endTime}` : ""}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mt-1.5 text-base font-semibold text-[var(--charcoal)]">
                        {event.title}
                      </h3>

                      {/* Location */}
                      <div className="mt-1 flex items-start gap-1.5 text-xs text-[var(--gold-dark)]">
                        <MapPin size={12} className="mt-0.5 shrink-0" />
                        <span>{event.location}</span>
                      </div>

                      {/* Description */}
                      <p className="mt-2 text-sm leading-relaxed text-[var(--charcoal)]/70">
                        {event.description}
                      </p>

                      {/* Badges row */}
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        {/* Dress code badge */}
                        {event.dressCode && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--cream-dark)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--charcoal)]/70">
                            <Shirt size={10} />
                            {event.dressCode}
                          </span>
                        )}

                        {/* Category badge */}
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium text-white/90"
                          style={{
                            backgroundColor: categoryBorderColor[event.category],
                          }}
                        >
                          {categoryLabel[event.category]}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/** Format "2026-08-13" into "Wednesday, August 13, 2026" */
function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
