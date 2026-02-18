"use client";

import { useState, useEffect } from "react";

type Concert = {
  _id: string;
  title: string;
  date: string;
  venue: string;
  city: string;
  description?: string;
  ticketUrl?: string;
  status: string;
};

const emptyForm = {
  title: "",
  date: "",
  venue: "",
  city: "",
  description: "",
  ticketUrl: "",
  status: "confirmed",
};

export default function AdminConcertsPage() {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editing, setEditing] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchConcerts = () => {
    fetch("/api/admin/concerts")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setConcerts(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.date || !form.venue || !form.city) return;
    setSaving(true);

    try {
      if (editing) {
        const res = await fetch(`/api/admin/concerts/${editing}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          fetchConcerts();
          resetForm();
        }
      } else {
        const res = await fetch("/api/admin/concerts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        if (res.ok) {
          fetchConcerts();
          resetForm();
        }
      }
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const deleteConcert = async (id: string) => {
    if (!confirm("Opravdu smazat tento koncert?")) return;
    try {
      await fetch(`/api/admin/concerts/${id}`, { method: "DELETE" });
      setConcerts((prev) => prev.filter((c) => c._id !== id));
    } catch (e) {
      console.error(e);
    }
  };

  const startEdit = (concert: Concert) => {
    setForm({
      title: concert.title,
      date: concert.date?.split("T")[0] || "",
      venue: concert.venue,
      city: concert.city,
      description: concert.description || "",
      ticketUrl: concert.ticketUrl || "",
      status: concert.status || "confirmed",
    });
    setEditing(concert._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditing(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-black">Koncerty</h1>
        <button
          onClick={() => {
            resetForm();
            setShowForm(!showForm);
          }}
          className="bg-gold text-black px-6 py-3 font-heading text-[0.7rem] font-bold uppercase"
        >
          {showForm ? "Zavřít" : "Přidat koncert"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-[#111] border border-[#222] p-6 mb-6">
          <h2 className="font-heading text-lg font-bold mb-4">
            {editing ? "Upravit koncert" : "Nový koncert"}
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
                Datum *
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                Venue *
              </label>
              <input
                type="text"
                value={form.venue}
                onChange={(e) => setForm({ ...form, venue: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                Město *
              </label>
              <input
                type="text"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                Popis
              </label>
              <input
                type="text"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                Lístky URL
              </label>
              <input
                type="text"
                value={form.ticketUrl}
                onChange={(e) => setForm({ ...form, ticketUrl: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-[0.65rem] font-mono text-gray uppercase tracking-wider block mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              >
                <option value="confirmed">Potvrzeno</option>
                <option value="soldout">Vyprodáno</option>
                <option value="cancelled">Zrušeno</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={saving || !form.title || !form.date || !form.venue || !form.city}
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

      {/* List */}
      <div className="bg-[#111] border border-[#222]">
        <div className="grid grid-cols-[1fr_120px_120px_100px_80px_80px] gap-4 px-6 py-3 border-b border-[#222] font-mono text-[0.6rem] uppercase tracking-wider text-gray">
          <span>Koncert</span>
          <span>Venue</span>
          <span>Město</span>
          <span>Datum</span>
          <span>Status</span>
          <span></span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-gray text-sm">Načítám...</div>
        ) : concerts.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray text-sm">
            Žádné koncerty v Sanity. Přidejte první koncert.
          </div>
        ) : (
          concerts.map((c) => (
            <div
              key={c._id}
              className="grid grid-cols-[1fr_120px_120px_100px_80px_80px] gap-4 px-6 py-4 border-b border-[#222] hover:bg-white/[0.02] items-center"
            >
              <div>
                <div className="text-sm font-medium">{c.title}</div>
                {c.description && (
                  <div className="text-[0.7rem] text-gray">{c.description}</div>
                )}
              </div>
              <span className="text-sm">{c.venue}</span>
              <span className="text-sm">{c.city}</span>
              <span className="text-[0.7rem] text-gray">
                {c.date ? new Date(c.date).toLocaleDateString("cs-CZ") : "—"}
              </span>
              <span
                className={`text-[0.6rem] font-mono uppercase tracking-wider px-2 py-1 border text-center ${
                  c.status === "soldout"
                    ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                    : c.status === "cancelled"
                    ? "bg-red-500/20 text-red-400 border-red-500/30"
                    : "bg-green-500/20 text-green-400 border-green-500/30"
                }`}
              >
                {c.status === "soldout" ? "Vypr." : c.status === "cancelled" ? "Zruš." : "Potv."}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => startEdit(c)}
                  className="text-gold text-[0.65rem] font-mono hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteConcert(c._id)}
                  className="text-red-400 text-[0.65rem] font-mono hover:text-red-300"
                >
                  Smazat
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
