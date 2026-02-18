"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Song = {
  id: string;
  title: string;
  isActive: boolean;
  sortOrder: number;
};

export default function AdminSetlistSongsPage() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchSongs = () => {
    fetch("/api/setlist/songs")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setSongs(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const addSong = async () => {
    if (!newTitle.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/setlist/songs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      if (res.ok) {
        setNewTitle("");
        fetchSongs();
      }
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const toggleActive = async (song: Song) => {
    try {
      await fetch("/api/setlist/songs", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: song.id, isActive: !song.isActive }),
      });
      setSongs((prev) =>
        prev.map((s) => (s.id === song.id ? { ...s, isActive: !s.isActive } : s))
      );
    } catch (e) {
      console.error(e);
    }
  };

  const deleteSong = async (id: string) => {
    if (!confirm("Opravdu smazat tuto píseň?")) return;
    try {
      await fetch("/api/setlist/songs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setSongs((prev) => prev.filter((s) => s.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-black">Správa písní</h1>
        <Link
          href="/admin/setlist"
          className="text-gold text-[0.7rem] font-mono hover:underline"
        >
          Hlasování &rarr;
        </Link>
      </div>

      {/* Add new song */}
      <div className="bg-[#111] border border-[#222] p-6 mb-6">
        <h2 className="font-heading text-lg font-bold mb-4">Přidat píseň</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Název písně..."
            onKeyDown={(e) => e.key === "Enter" && addSong()}
            className="flex-1 bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
          />
          <button
            onClick={addSong}
            disabled={saving || !newTitle.trim()}
            className="bg-gold text-black px-6 py-3 font-heading text-[0.7rem] font-bold uppercase disabled:opacity-50"
          >
            Přidat
          </button>
        </div>
      </div>

      {/* Songs list */}
      <div className="bg-[#111] border border-[#222]">
        <div className="grid grid-cols-[1fr_80px_80px_60px] gap-4 px-6 py-3 border-b border-[#222] font-mono text-[0.6rem] uppercase tracking-wider text-gray">
          <span>Píseň</span>
          <span>Pořadí</span>
          <span>Aktivní</span>
          <span></span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-gray text-sm">Načítám...</div>
        ) : songs.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray text-sm">
            Žádné písně. Přidejte první píseň výše.
          </div>
        ) : (
          songs.map((song) => (
            <div
              key={song.id}
              className="grid grid-cols-[1fr_80px_80px_60px] gap-4 px-6 py-4 border-b border-[#222] hover:bg-white/[0.02] items-center"
            >
              <span className="text-sm font-medium">{song.title}</span>
              <span className="text-[0.7rem] text-gray text-center">
                {song.sortOrder}
              </span>
              <button
                onClick={() => toggleActive(song)}
                className={`text-[0.6rem] font-mono uppercase tracking-wider px-2 py-1 border text-center ${
                  song.isActive
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-red-500/20 text-red-400 border-red-500/30"
                }`}
              >
                {song.isActive ? "Ano" : "Ne"}
              </button>
              <button
                onClick={() => deleteSong(song.id)}
                className="text-red-400 text-[0.65rem] font-mono hover:text-red-300"
              >
                Smazat
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
