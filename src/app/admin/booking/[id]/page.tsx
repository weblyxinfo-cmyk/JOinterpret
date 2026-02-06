"use client";

import { useState } from "react";
import Link from "next/link";

const statusOptions = [
  { value: "NEW", label: "Nový" },
  { value: "NEGOTIATING", label: "V jednání" },
  { value: "CONFIRMED", label: "Potvrzený" },
  { value: "COMPLETED", label: "Dokončený" },
  { value: "REJECTED", label: "Zamítnutý" },
];

export default function BookingDetail() {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("NEW");

  // TODO: fetch booking detail by id
  // const { id } = useParams()
  // useEffect(() => { fetch(`/api/booking/${id}`).then(...) }, [id])

  return (
    <div>
      <Link
        href="/admin/booking"
        className="text-gray text-sm hover:text-gold transition-colors mb-6 inline-block"
      >
        &larr; Zpět na seznam
      </Link>

      <h1 className="font-heading text-3xl font-black mb-8">
        Detail Booking Requestu
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          {/* Info */}
          <div className="bg-[#111] border border-[#222] p-6">
            <h2 className="font-heading text-lg font-bold mb-4">Informace</h2>
            <p className="text-gray text-sm">
              Po připojení databáze zde uvidíte detail booking requestu.
            </p>
          </div>

          {/* Notes */}
          <div className="bg-[#111] border border-[#222] p-6">
            <h2 className="font-heading text-lg font-bold mb-4">Poznámky</h2>
            <div className="flex gap-2">
              <input
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Přidat poznámku..."
                className="flex-1 bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors"
              />
              <button className="bg-gold text-black px-6 py-3 font-heading text-[0.7rem] font-bold uppercase">
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
            <button className="w-full bg-gold text-black py-3 font-heading text-[0.7rem] font-bold uppercase">
              Uložit status
            </button>
          </div>

          <div className="bg-[#111] border border-[#222] p-6">
            <h3 className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-3">
              Platba
            </h3>
            <button className="w-full border border-[#333] text-white py-3 font-heading text-[0.7rem] font-bold uppercase hover:border-gold transition-colors">
              Generovat platební link
            </button>
          </div>

          <div className="bg-[#111] border border-[#222] p-6">
            <h3 className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-3">
              Reference
            </h3>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="accent-gold w-4 h-4" />
              <span className="text-sm">Přidat do referencí</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
