"use client";

import { useState, useEffect } from "react";

type SocialLink = {
  id: string;
  platform: string;
  url: string | null;
  followerCount: string | null;
  isVisible: boolean;
};

const platformLabels: Record<string, string> = {
  instagram: "Instagram",
  tiktok: "TikTok",
  youtube: "YouTube",
  spotify: "Spotify",
  podcast: "Podcast",
};

export default function AdminSocialPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<
    Record<string, { url: string; followerCount: string }>
  >({});

  const fetchLinks = () => {
    fetch("/api/social")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setLinks(data);
          const values: Record<string, { url: string; followerCount: string }> = {};
          for (const link of data) {
            values[link.id] = {
              url: link.url || "",
              followerCount: link.followerCount || "",
            };
          }
          setEditValues(values);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const saveLink = async (link: SocialLink) => {
    setSaving(link.id);
    const vals = editValues[link.id];
    try {
      const res = await fetch("/api/social", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: link.id,
          url: vals.url || null,
          followerCount: vals.followerCount || null,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLinks((prev) => prev.map((l) => (l.id === link.id ? updated : l)));
      }
    } catch (e) {
      console.error(e);
    }
    setSaving(null);
  };

  const toggleVisibility = async (link: SocialLink) => {
    try {
      const res = await fetch("/api/social", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: link.id, isVisible: !link.isVisible }),
      });
      if (res.ok) {
        setLinks((prev) =>
          prev.map((l) => (l.id === link.id ? { ...l, isVisible: !l.isVisible } : l))
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <h1 className="font-heading text-3xl font-black mb-8">Sociální sítě</h1>

      {loading ? (
        <div className="text-gray text-sm">Načítám...</div>
      ) : links.length === 0 ? (
        <div className="bg-[#111] border border-[#222] p-12 text-center text-gray text-sm">
          Žádné sociální sítě. Spusťte seed pro vytvoření výchozích záznamů.
        </div>
      ) : (
        <div className="space-y-4">
          {links.map((link) => (
            <div key={link.id} className="bg-[#111] border border-[#222] p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-heading text-lg font-bold">
                  {platformLabels[link.platform] || link.platform}
                </h2>
                <button
                  onClick={() => toggleVisibility(link)}
                  className={`text-[0.6rem] font-mono uppercase tracking-wider px-3 py-1 border ${
                    link.isVisible
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-red-500/20 text-red-400 border-red-500/30"
                  }`}
                >
                  {link.isVisible ? "Viditelné" : "Skryté"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_200px_auto] gap-3 items-end">
                <div>
                  <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                    URL
                  </label>
                  <input
                    type="text"
                    value={editValues[link.id]?.url || ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        [link.id]: { ...prev[link.id], url: e.target.value },
                      }))
                    }
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                    Followers
                  </label>
                  <input
                    type="text"
                    value={editValues[link.id]?.followerCount || ""}
                    onChange={(e) =>
                      setEditValues((prev) => ({
                        ...prev,
                        [link.id]: { ...prev[link.id], followerCount: e.target.value },
                      }))
                    }
                    className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                    placeholder="50K+"
                  />
                </div>
                <button
                  onClick={() => saveLink(link)}
                  disabled={saving === link.id}
                  className="bg-gold text-black px-6 py-3 font-heading text-[0.7rem] font-bold uppercase disabled:opacity-50"
                >
                  {saving === link.id ? "..." : "Uložit"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
