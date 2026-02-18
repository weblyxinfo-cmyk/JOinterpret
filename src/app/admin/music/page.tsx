"use client";

import { useState, useEffect } from "react";

type Album = {
  id: string;
  spotifyId: string | null;
  title: string;
  year: string;
  type: string;
  coverUrl: string | null;
  spotifyUrl: string | null;
  sortOrder: number;
  isVisible: boolean;
};

const emptyForm = {
  title: "",
  year: "",
  type: "ALBUM",
  coverUrl: "",
  spotifyUrl: "",
};

export default function AdminMusicPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const fetchAlbums = () => {
    fetch("/api/music")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setAlbums(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.year) return;
    setSaving(true);

    try {
      if (editing) {
        const res = await fetch("/api/music", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editing, ...form }),
        });
        if (res.ok) {
          fetchAlbums();
          resetForm();
        }
      } else {
        const res = await fetch("/api/music", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          fetchAlbums();
          resetForm();
        }
      }
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const deleteAlbum = async (id: string) => {
    if (!confirm("Opravdu smazat toto album?")) return;
    try {
      await fetch("/api/music", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setAlbums((prev) => prev.filter((a) => a.id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const toggleVisibility = async (album: Album) => {
    try {
      const res = await fetch("/api/music", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: album.id, isVisible: !album.isVisible }),
      });
      if (res.ok) {
        setAlbums((prev) =>
          prev.map((a) => (a.id === album.id ? { ...a, isVisible: !a.isVisible } : a))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startEdit = (album: Album) => {
    setForm({
      title: album.title,
      year: album.year,
      type: album.type,
      coverUrl: album.coverUrl || "",
      spotifyUrl: album.spotifyUrl || "",
    });
    setEditing(album.id);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  };

  const syncFromSpotify = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/stats/spotify?type=albums");
      const data = await res.json();
      if (Array.isArray(data)) {
        for (const album of data) {
          await fetch("/api/music", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: album.name,
              year: album.releaseDate?.split("-")[0] || "",
              type: album.albumType?.toUpperCase() || "ALBUM",
              coverUrl: album.cover,
              spotifyUrl: album.spotifyUrl,
              spotifyId: album.id,
            }),
          });
        }
        fetchAlbums();
      }
    } catch (e) {
      console.error(e);
    }
    setSyncing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-black">Diskografie</h1>
        <div className="flex gap-3">
          <button
            onClick={syncFromSpotify}
            disabled={syncing}
            className="border border-[#1DB954] text-[#1DB954] px-6 py-3 font-heading text-[0.7rem] font-bold uppercase disabled:opacity-50 hover:bg-[#1DB954]/10 transition-colors"
          >
            {syncing ? "Synchronizuji..." : "Sync ze Spotify"}
          </button>
          <button
            onClick={() => {
              resetForm();
              setShowForm(!showForm);
            }}
            className="bg-gold text-black px-6 py-3 font-heading text-[0.7rem] font-bold uppercase"
          >
            {showForm ? "Zavřít" : "Přidat ručně"}
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#111] border border-[#222] p-6 mb-6">
          <h2 className="font-heading text-lg font-bold mb-4">
            {editing ? "Upravit album" : "Nové album"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                Název *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                Rok *
              </label>
              <input
                type="text"
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                placeholder="2025"
              />
            </div>
            <div>
              <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                Typ
              </label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              >
                <option value="ALBUM">Album</option>
                <option value="EP">EP</option>
                <option value="SINGLE">Single</option>
                <option value="ALBUM · LIVE">Album (Live)</option>
              </select>
            </div>
            <div>
              <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                Cover URL
              </label>
              <input
                type="text"
                value={form.coverUrl}
                onChange={(e) => setForm({ ...form, coverUrl: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                placeholder="https://i.scdn.co/..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                Spotify URL
              </label>
              <input
                type="text"
                value={form.spotifyUrl}
                onChange={(e) => setForm({ ...form, spotifyUrl: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                placeholder="https://open.spotify.com/..."
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={saving || !form.title || !form.year}
              className="bg-gold text-black px-6 py-3 font-heading text-[0.7rem] font-bold uppercase disabled:opacity-50"
            >
              {saving ? "Ukládám..." : editing ? "Uložit změny" : "Vytvořit"}
            </button>
            {editing && (
              <button
                onClick={resetForm}
                className="border border-[#333] text-gray px-6 py-3 text-[0.7rem] font-mono uppercase hover:border-gold hover:text-white transition-colors"
              >
                Zrušit
              </button>
            )}
          </div>
        </div>
      )}

      {/* Album list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-3 text-center text-gray text-sm py-12">Načítám...</div>
        ) : albums.length === 0 ? (
          <div className="col-span-3 text-center text-gray text-sm py-12">
            Žádná alba. Přidejte první nebo synchronizujte ze Spotify.
          </div>
        ) : (
          albums.map((album) => (
            <div
              key={album.id}
              className={`bg-[#111] border border-[#222] overflow-hidden ${
                !album.isVisible ? "opacity-50" : ""
              }`}
            >
              {album.coverUrl && (
                <div
                  className="aspect-square bg-cover bg-center"
                  style={{ backgroundImage: `url('${album.coverUrl}')` }}
                />
              )}
              <div className="p-4">
                <div className="font-mono text-[0.65rem] text-gray tracking-wider">
                  {album.year} · {album.type}
                </div>
                <h3 className="font-heading text-lg font-bold mt-1">{album.title}</h3>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => startEdit(album)}
                    className="text-gold text-[0.65rem] font-mono hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleVisibility(album)}
                    className="text-gray text-[0.65rem] font-mono hover:text-white"
                  >
                    {album.isVisible ? "Skrýt" : "Zobrazit"}
                  </button>
                  <button
                    onClick={() => deleteAlbum(album.id)}
                    className="text-red-400 text-[0.65rem] font-mono hover:text-red-300"
                  >
                    Smazat
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
