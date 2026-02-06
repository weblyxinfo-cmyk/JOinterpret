"use client";

import { useState } from "react";
import Link from "next/link";

const statusColors: Record<string, string> = {
  NEW: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  NEGOTIATING: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  CONFIRMED: "bg-green-500/20 text-green-400 border-green-500/30",
  COMPLETED: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  REJECTED: "bg-red-500/20 text-red-400 border-red-500/30",
};

const statusLabels: Record<string, string> = {
  NEW: "Nový",
  NEGOTIATING: "V jednání",
  CONFIRMED: "Potvrzený",
  COMPLETED: "Dokončený",
  REJECTED: "Zamítnutý",
};

const typeLabels: Record<string, string> = {
  CLUB: "Klub / Koncert",
  FESTIVAL: "Festival",
  PRIVATE: "Soukromá akce",
  CORPORATE: "Firemní event",
};

type Booking = {
  id: string;
  type: string;
  name: string;
  email: string;
  eventDate: string;
  location: string | null;
  status: string;
  createdAt: string;
};

export default function BookingAdmin() {
  const [filter, setFilter] = useState("ALL");
  const [bookings] = useState<Booking[]>([]);

  // TODO: fetch from API on mount
  // useEffect(() => { fetch('/api/booking').then(...) }, [])

  const filtered =
    filter === "ALL" ? bookings : bookings.filter((b) => b.status === filter);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-black">Booking Requesty</h1>
        <div className="font-mono text-[0.7rem] text-gray">
          Celkem: {bookings.length}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["ALL", "NEW", "NEGOTIATING", "CONFIRMED", "COMPLETED", "REJECTED"].map(
          (s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2 text-[0.7rem] font-mono uppercase tracking-wider border transition-colors ${
                filter === s
                  ? "bg-gold text-black border-gold"
                  : "border-[#333] text-gray hover:border-gold"
              }`}
            >
              {s === "ALL" ? "Vše" : statusLabels[s]}
            </button>
          )
        )}
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-[#222]">
        <div className="grid grid-cols-[1fr_1fr_1fr_120px_100px_80px] gap-4 px-6 py-3 border-b border-[#222] font-mono text-[0.6rem] uppercase tracking-wider text-gray">
          <span>Jméno</span>
          <span>Typ</span>
          <span>Datum akce</span>
          <span>Status</span>
          <span>Přijato</span>
          <span>Detail</span>
        </div>

        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray text-sm">
            {bookings.length === 0
              ? "Žádné booking requesty. Po připojení databáze se zde zobrazí."
              : "Žádné výsledky pro tento filtr."}
          </div>
        ) : (
          filtered.map((b) => (
            <div
              key={b.id}
              className="grid grid-cols-[1fr_1fr_1fr_120px_100px_80px] gap-4 px-6 py-4 border-b border-[#222] hover:bg-white/[0.02] items-center"
            >
              <div>
                <div className="text-sm font-medium">{b.name}</div>
                <div className="text-[0.7rem] text-gray">{b.email}</div>
              </div>
              <span className="text-sm">{typeLabels[b.type] || b.type}</span>
              <span className="text-sm">
                {new Date(b.eventDate).toLocaleDateString("cs-CZ")}
              </span>
              <span
                className={`text-[0.6rem] font-mono uppercase tracking-wider px-2 py-1 border inline-block text-center ${
                  statusColors[b.status] || ""
                }`}
              >
                {statusLabels[b.status]}
              </span>
              <span className="text-[0.7rem] text-gray">
                {new Date(b.createdAt).toLocaleDateString("cs-CZ")}
              </span>
              <Link
                href={`/admin/booking/${b.id}`}
                className="text-gold text-[0.7rem] font-mono hover:underline"
              >
                Detail &rarr;
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
