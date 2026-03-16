"use client";

import { useState } from "react";
import { Music, Plus, Flame } from "lucide-react";

type Category =
  | "Reception Vibes"
  | "After Party Banger"
  | "Guilty Pleasure"
  | "First Dance Worthy";

interface SongRequest {
  id: string;
  title: string;
  artist: string;
  submittedBy: string;
  category?: Category;
  upvotes: number;
  upvotedByMe: boolean;
}

const categories: { label: Category; color: string }[] = [
  { label: "Reception Vibes", color: "var(--gold)" },
  { label: "After Party Banger", color: "var(--coral)" },
  { label: "Guilty Pleasure", color: "var(--ocean)" },
  { label: "First Dance Worthy", color: "var(--forest)" },
];

const initialSongs: SongRequest[] = [
  {
    id: "pre-1",
    title: "At Last",
    artist: "Etta James",
    submittedBy: "The Wedding Planner",
    category: "First Dance Worthy",
    upvotes: 15,
    upvotedByMe: false,
  },
  {
    id: "pre-2",
    title: "September",
    artist: "Earth, Wind & Fire",
    submittedBy: "DJ Albert",
    category: "Reception Vibes",
    upvotes: 12,
    upvotedByMe: false,
  },
  {
    id: "pre-3",
    title: "Dancing Queen",
    artist: "ABBA",
    submittedBy: "Aunty Disco",
    category: "Reception Vibes",
    upvotes: 10,
    upvotedByMe: false,
  },
  {
    id: "pre-4",
    title: "Mr. Brightside",
    artist: "The Killers",
    submittedBy: "The Groomsmen",
    category: "After Party Banger",
    upvotes: 8,
    upvotedByMe: false,
  },
  {
    id: "pre-5",
    title: "Bohemian Rhapsody",
    artist: "Queen",
    submittedBy: "Karaoke King",
    category: "After Party Banger",
    upvotes: 7,
    upvotedByMe: false,
  },
  {
    id: "pre-6",
    title: "I Wanna Dance with Somebody",
    artist: "Whitney Houston",
    submittedBy: "The Bridesmaids",
    category: "Reception Vibes",
    upvotes: 9,
    upvotedByMe: false,
  },
  {
    id: "pre-7",
    title: "Wannabe",
    artist: "Spice Girls",
    submittedBy: "90s Kid",
    category: "Guilty Pleasure",
    upvotes: 6,
    upvotedByMe: false,
  },
  {
    id: "pre-8",
    title: "Superstition",
    artist: "Stevie Wonder",
    submittedBy: "Uncle Groove",
    category: "Reception Vibes",
    upvotes: 11,
    upvotedByMe: false,
  },
  {
    id: "pre-9",
    title: "Levitating",
    artist: "Dua Lipa",
    submittedBy: "DJ Albert",
    category: "After Party Banger",
    upvotes: 5,
    upvotedByMe: false,
  },
  {
    id: "pre-10",
    title: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    submittedBy: "The Romantics",
    category: "First Dance Worthy",
    upvotes: 13,
    upvotedByMe: false,
  },
];

function getCategoryColor(category: Category): string {
  return categories.find((c) => c.label === category)?.color ?? "var(--gold)";
}

export default function PlaylistPage() {
  const [songs, setSongs] = useState<SongRequest[]>(initialSongs);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  const canSubmit =
    name.trim().length > 0 &&
    title.trim().length > 0 &&
    artist.trim().length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    const newSong: SongRequest = {
      id: `song-${Date.now()}`,
      title: title.trim(),
      artist: artist.trim(),
      submittedBy: name.trim(),
      category: selectedCategory,
      upvotes: 0,
      upvotedByMe: false,
    };

    setSongs((prev) => [newSong, ...prev]);
    setTitle("");
    setArtist("");
    setSelectedCategory(undefined);
    // Keep the name so they can add more songs
  };

  const toggleUpvote = (songId: string) => {
    setSongs((prev) =>
      prev.map((song) =>
        song.id === songId
          ? {
              ...song,
              upvotes: song.upvotedByMe
                ? song.upvotes - 1
                : song.upvotes + 1,
              upvotedByMe: !song.upvotedByMe,
            }
          : song,
      ),
    );
  };

  const sortedSongs = [...songs].sort((a, b) => b.upvotes - a.upvotes);
  const totalSongs = songs.length;

  return (
    <div className="min-h-screen bg-[var(--cream)]">
      {/* Header */}
      <header className="px-6 pt-14 pb-2 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Music
            size={28}
            strokeWidth={2}
            style={{ color: "var(--gold)" }}
          />
          <h1 className="text-3xl font-bold tracking-tight text-[var(--charcoal)]">
            Playlist
          </h1>
        </div>
        <p className="text-sm text-[var(--charcoal)]/60">
          Help us build the ultimate party playlist!
        </p>
      </header>

      <div className="mx-auto max-w-lg px-5 pb-32">
        {/* Request Form Card */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-2xl border border-[var(--cream-dark)] bg-white p-5 shadow-sm"
        >
          <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.15em] text-[var(--charcoal)]/60">
            Request a Song
          </h2>

          {/* Your Name */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-[var(--cream-dark)] bg-[var(--cream)] px-4 py-3 text-sm font-medium text-[var(--charcoal)] outline-none transition-all placeholder:text-[var(--charcoal)]/30 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
            />
          </div>

          {/* Song Title */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Song Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-[var(--cream-dark)] bg-[var(--cream)] px-4 py-3 text-sm font-medium text-[var(--charcoal)] outline-none transition-all placeholder:text-[var(--charcoal)]/30 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
            />
          </div>

          {/* Artist */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Artist"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              className="w-full rounded-xl border border-[var(--cream-dark)] bg-[var(--cream)] px-4 py-3 text-sm font-medium text-[var(--charcoal)] outline-none transition-all placeholder:text-[var(--charcoal)]/30 focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20"
            />
          </div>

          {/* Category pills */}
          <div className="mb-4">
            <p className="mb-2 text-xs font-semibold text-[var(--charcoal)]/40">
              Category (optional)
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.label;
                return (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() =>
                      setSelectedCategory(
                        isSelected ? undefined : cat.label,
                      )
                    }
                    className="cursor-pointer rounded-full px-3 py-1.5 text-xs font-semibold transition-all duration-200 active:scale-95"
                    style={{
                      backgroundColor: isSelected
                        ? cat.color
                        : "var(--cream)",
                      color: isSelected ? "#fff" : "var(--charcoal)",
                      border: isSelected
                        ? `1.5px solid ${cat.color}`
                        : "1.5px solid var(--cream-dark)",
                    }}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold tracking-wide text-white shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
            style={{ backgroundColor: "var(--gold)" }}
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Song
          </button>
        </form>

        {/* Stats bar */}
        <div className="mt-8 mb-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--gold)]/20" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--charcoal)]/40">
            {totalSongs} song{totalSongs !== 1 ? "s" : ""} requested
          </span>
          <div className="h-px flex-1 bg-[var(--gold)]/20" />
        </div>

        {/* Song request feed */}
        <div className="space-y-3">
          {sortedSongs.map((song) => (
            <div
              key={song.id}
              className="flex items-center gap-3 rounded-2xl border border-[var(--cream-dark)] bg-white px-4 py-4 shadow-sm transition-all duration-200"
            >
              {/* Song info */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-[var(--charcoal)]">
                  {song.title}
                </p>
                <p className="truncate text-xs font-medium text-[var(--charcoal)]/50">
                  {song.artist}
                </p>
                <div className="mt-1.5 flex flex-wrap items-center gap-2">
                  {song.category && (
                    <span
                      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                      style={{
                        backgroundColor: getCategoryColor(song.category),
                      }}
                    >
                      {song.category}
                    </span>
                  )}
                  <span className="text-[10px] text-[var(--charcoal)]/35">
                    by {song.submittedBy}
                  </span>
                </div>
              </div>

              {/* Upvote button */}
              <button
                type="button"
                onClick={() => toggleUpvote(song.id)}
                className="flex shrink-0 cursor-pointer flex-col items-center gap-0.5 rounded-xl px-3 py-2 transition-all duration-200 active:scale-110"
                style={{
                  backgroundColor: song.upvotedByMe
                    ? "rgba(224, 122, 95, 0.1)"
                    : "var(--cream)",
                }}
                aria-label={`Upvote ${song.title}`}
              >
                <Flame
                  size={20}
                  strokeWidth={song.upvotedByMe ? 2.5 : 1.5}
                  fill={song.upvotedByMe ? "var(--coral)" : "none"}
                  style={{
                    color: song.upvotedByMe
                      ? "var(--coral)"
                      : "var(--charcoal)",
                    opacity: song.upvotedByMe ? 1 : 0.35,
                    transition: "all 0.2s ease",
                  }}
                />
                <span
                  className="text-[11px] font-bold transition-colors duration-200"
                  style={{
                    color: song.upvotedByMe
                      ? "var(--coral)"
                      : "var(--charcoal)",
                    opacity: song.upvotedByMe ? 1 : 0.5,
                  }}
                >
                  {song.upvotes}
                </span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
