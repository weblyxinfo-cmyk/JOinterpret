"use client";

import { useState, useEffect } from "react";

const statusColors: Record<string, string> = {
  PAID: "bg-green-500/20 text-green-400 border-green-500/30",
  USED: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  CANCELLED: "bg-red-500/20 text-red-400 border-red-500/30",
  REFUNDED: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
};

const statusLabels: Record<string, string> = {
  PAID: "Zaplaceno",
  USED: "Použito",
  CANCELLED: "Zrušeno",
  REFUNDED: "Vráceno",
};

type VipOrder = {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  concertId: string | null;
  persons: number;
  status: string;
  qrCode: string | null;
  createdAt: string;
};

export default function AdminVipPage() {
  const [orders, setOrders] = useState<VipOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetch("/api/vip")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "ALL" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-black">VIP Objednávky</h1>
        <div className="font-mono text-[0.7rem] text-gray">
          Celkem: {orders.length}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {["ALL", "PAID", "USED", "CANCELLED", "REFUNDED"].map((s) => (
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
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#111] border border-[#222]">
        <div className="grid grid-cols-[1fr_1fr_80px_100px_100px_80px] gap-4 px-6 py-3 border-b border-[#222] font-mono text-[0.6rem] uppercase tracking-wider text-gray">
          <span>Jméno</span>
          <span>Typ</span>
          <span>Osoby</span>
          <span>Status</span>
          <span>Datum</span>
          <span>QR</span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-gray text-sm">
            Načítám...
          </div>
        ) : filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray text-sm">
            {orders.length === 0
              ? "Žádné VIP objednávky."
              : "Žádné výsledky pro tento filtr."}
          </div>
        ) : (
          filtered.map((o) => (
            <div
              key={o.id}
              className="grid grid-cols-[1fr_1fr_80px_100px_100px_80px] gap-4 px-6 py-4 border-b border-[#222] hover:bg-white/[0.02] items-center"
            >
              <div>
                <div className="text-sm font-medium">{o.name}</div>
                <div className="text-[0.7rem] text-gray">{o.email}</div>
              </div>
              <span className="text-sm">
                {o.type === "MEET_GREET" ? "Meet & Greet" : "Backstage Pass"}
              </span>
              <span className="text-sm text-center">{o.persons}</span>
              <span
                className={`text-[0.6rem] font-mono uppercase tracking-wider px-2 py-1 border inline-block text-center ${
                  statusColors[o.status] || ""
                }`}
              >
                {statusLabels[o.status]}
              </span>
              <span className="text-[0.7rem] text-gray">
                {new Date(o.createdAt).toLocaleDateString("cs-CZ")}
              </span>
              <span className="text-[0.65rem] font-mono text-gray truncate">
                {o.qrCode ? o.qrCode.slice(0, 8) + "..." : "—"}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
