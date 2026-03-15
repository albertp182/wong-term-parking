import { announcements } from "@/data/wedding";
import { Announcement } from "@/lib/types";
import { format } from "date-fns";
import { Megaphone } from "lucide-react";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function PriorityBadge({ priority }: { priority: Announcement["priority"] }) {
  if (priority === "urgent") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        Urgent
      </span>
    );
  }

  if (priority === "important") {
    return (
      <span
        className="inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white"
        style={{ background: "var(--coral)" }}
      >
        Important
      </span>
    );
  }

  return null;
}

export default function AnnouncementsPage() {
  const sorted = [...announcements].sort(
    (a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--cream)" }}
    >
      {/* ─── Header ─── */}
      <header className="px-5 pb-6 pt-14 text-center">
        <div className="mx-auto max-w-lg">
          <div
            className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl"
            style={{ backgroundColor: "var(--cream-dark)" }}
          >
            <Megaphone
              size={22}
              strokeWidth={1.75}
              style={{ color: "var(--gold-dark)" }}
            />
          </div>
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "var(--charcoal)" }}
          >
            Updates
          </h1>
          <p
            className="mt-1.5 text-sm"
            style={{ color: "var(--charcoal)", opacity: 0.5 }}
          >
            Stay in the loop
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

      {/* ─── Announcements Feed ─── */}
      <section className="px-5 pb-28">
        <div className="mx-auto flex max-w-lg flex-col gap-4">
          {sorted.length === 0 ? (
            /* ─── Empty State ─── */
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-[var(--cream-dark)] px-6 py-16 text-center">
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ backgroundColor: "var(--cream-dark)" }}
              >
                <Megaphone
                  size={24}
                  strokeWidth={1.5}
                  style={{ color: "var(--gold-dark)" }}
                />
              </div>
              <p
                className="text-sm font-medium leading-relaxed"
                style={{ color: "var(--charcoal)", opacity: 0.5 }}
              >
                No updates yet — check back closer to the big day!
              </p>
            </div>
          ) : (
            sorted.map((announcement) => (
              <article
                key={announcement.id}
                className="overflow-hidden rounded-2xl border border-[var(--cream-dark)] bg-white shadow-sm"
              >
                <div className="flex">
                  {/* Accent bar — gold for normal, coral for important, red for urgent */}
                  <div
                    className="w-1 flex-shrink-0"
                    style={{
                      background:
                        announcement.priority === "urgent"
                          ? "#dc2626"
                          : announcement.priority === "important"
                            ? "var(--coral)"
                            : "var(--gold)",
                    }}
                  />

                  <div className="flex flex-1 flex-col gap-3 px-5 py-4">
                    {/* Top row: badge + timestamp */}
                    <div className="flex items-center gap-2">
                      <PriorityBadge priority={announcement.priority} />
                      <span
                        className="text-[11px] font-medium"
                        style={{ color: "var(--charcoal)", opacity: 0.4 }}
                      >
                        {format(new Date(announcement.timestamp), "MMMM d, yyyy")}
                      </span>
                    </div>

                    {/* Title */}
                    <h2
                      className="text-[15px] font-semibold leading-snug"
                      style={{ color: "var(--charcoal)" }}
                    >
                      {announcement.title}
                    </h2>

                    {/* Body */}
                    <p
                      className="text-[13px] leading-relaxed"
                      style={{ color: "var(--charcoal)", opacity: 0.65 }}
                    >
                      {announcement.body}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2.5 pt-1">
                      <div
                        className="flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ background: "var(--gold-dark)" }}
                      >
                        {getInitials(announcement.author)}
                      </div>
                      <span
                        className="text-xs font-medium"
                        style={{ color: "var(--charcoal)", opacity: 0.5 }}
                      >
                        {announcement.author}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
