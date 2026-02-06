"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const statusOptions = [
  { value: "NEW", label: "Nový" },
  { value: "NEGOTIATING", label: "V jednání" },
  { value: "CONFIRMED", label: "Potvrzený" },
  { value: "COMPLETED", label: "Dokončený" },
  { value: "REJECTED", label: "Zamítnutý" },
];

const typeLabels: Record<string, string> = {
  CLUB: "Klub / Koncert",
  FESTIVAL: "Festival",
  PRIVATE: "Soukromá akce",
  CORPORATE: "Firemní event",
};

type BookingNote = {
  id: string;
  content: string;
  author: string;
  createdAt: string;
};

type BookingDetail = {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  eventDate: string;
  location: string | null;
  budget: string | null;
  description: string | null;
  status: string;
  stripePaymentLink: string | null;
  isPaid: boolean;
  addToReferences: boolean;
  notes: BookingNote[];
  createdAt: string;
};

export default function BookingDetailPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("NEW");
  const [addToReferences, setAddToReferences] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/booking/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setBooking(data);
          setStatus(data.status);
          setAddToReferences(data.addToReferences);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const updateStatus = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/booking/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data && !data.error) {
        setBooking((prev) => (prev ? { ...prev, status: data.status } : prev));
      }
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const addNote = async () => {
    if (!note.trim()) return;
    setSaving(true);
    try {
      await fetch(`/api/booking/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note: { content: note, author: "Admin" } }),
      });
      // Re-fetch to get updated notes
      const res = await fetch(`/api/booking/${id}`);
      const data = await res.json();
      if (data && !data.error) {
        setBooking(data);
      }
      setNote("");
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  const toggleReferences = async () => {
    const newVal = !addToReferences;
    setAddToReferences(newVal);
    await fetch(`/api/booking/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ addToReferences: newVal }),
    });
  };

  if (loading) {
    return (
      <div className="text-gray text-sm">Načítám...</div>
    );
  }

  if (!booking) {
    return (
      <div>
        <Link
          href="/admin/booking"
          className="text-gray text-sm hover:text-gold transition-colors mb-6 inline-block"
        >
          &larr; Zpět na seznam
        </Link>
        <p className="text-red-400">Booking nenalezen.</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/booking"
        className="text-gray text-sm hover:text-gold transition-colors mb-6 inline-block"
      >
        &larr; Zpět na seznam
      </Link>

      <h1 className="font-heading text-3xl font-black mb-8">
        {booking.name}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          {/* Info */}
          <div className="bg-[#111] border border-[#222] p-6">
            <h2 className="font-heading text-lg font-bold mb-4">Informace</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">Typ</span>
                {typeLabels[booking.type] || booking.type}
              </div>
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">Email</span>
                {booking.email}
              </div>
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">Telefon</span>
                {booking.phone || "—"}
              </div>
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">Datum akce</span>
                {new Date(booking.eventDate).toLocaleDateString("cs-CZ")}
              </div>
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">Místo</span>
                {booking.location || "—"}
              </div>
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">Rozpočet</span>
                {booking.budget || "—"}
              </div>
            </div>
            {booking.description && (
              <div className="mt-4 pt-4 border-t border-[#222]">
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">Popis</span>
                <p className="text-sm">{booking.description}</p>
              </div>
            )}
          </div>

          {/* Notes */}
          <div className="bg-[#111] border border-[#222] p-6">
            <h2 className="font-heading text-lg font-bold mb-4">Poznámky</h2>

            {booking.notes.length > 0 && (
              <div className="space-y-3 mb-4">
                {booking.notes.map((n) => (
                  <div key={n.id} className="bg-[#0a0a0a] border border-[#222] p-4">
                    <p className="text-sm">{n.content}</p>
                    <div className="flex justify-between mt-2 text-[0.65rem] text-gray font-mono">
                      <span>{n.author}</span>
                      <span>{new Date(n.createdAt).toLocaleString("cs-CZ")}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Přidat poznámku..."
                onKeyDown={(e) => e.key === "Enter" && addNote()}
                className="flex-1 bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              />
              <button
                onClick={addNote}
                disabled={saving || !note.trim()}
                className="bg-gold text-black px-6 py-3 font-heading text-[0.7rem] font-bold uppercase disabled:opacity-50"
              >
                Přidat
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar actions */}
        <div className="space-y-4">
          <div className="bg-[#111] border border-[#222] p-6">
            <h3 className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-3">
              Status
            </h3>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors mb-3"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              onClick={updateStatus}
              disabled={saving}
              className="w-full bg-gold text-black py-3 font-heading text-[0.7rem] font-bold uppercase disabled:opacity-50"
            >
              {saving ? "Ukládám..." : "Uložit status"}
            </button>
          </div>

          <div className="bg-[#111] border border-[#222] p-6">
            <h3 className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-3">
              Platba
            </h3>
            <div className="text-sm text-gray mb-2">
              {booking.isPaid ? (
                <span className="text-green-400">Zaplaceno</span>
              ) : (
                <span className="text-yellow-400">Nezaplaceno</span>
              )}
            </div>
            {booking.stripePaymentLink && (
              <a
                href={booking.stripePaymentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[0.7rem] text-gold hover:underline"
              >
                Platební link &rarr;
              </a>
            )}
          </div>

          <div className="bg-[#111] border border-[#222] p-6">
            <h3 className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-3">
              Reference
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={addToReferences}
                onChange={toggleReferences}
                className="accent-gold w-4 h-4"
              />
              <span className="text-sm">Přidat do referencí</span>
            </label>
          </div>

          <div className="bg-[#111] border border-[#222] p-6">
            <h3 className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-3">
              Info
            </h3>
            <div className="text-[0.7rem] text-gray space-y-1">
              <p>Vytvořeno: {new Date(booking.createdAt).toLocaleString("cs-CZ")}</p>
              <p>ID: {booking.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
