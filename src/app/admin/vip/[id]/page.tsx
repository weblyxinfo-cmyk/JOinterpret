"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

const statusOptions = [
  { value: "PAID", label: "Zaplaceno" },
  { value: "USED", label: "Použito" },
  { value: "CANCELLED", label: "Zrušeno" },
  { value: "REFUNDED", label: "Vráceno" },
];

type VipDetail = {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string | null;
  concertId: string | null;
  persons: number;
  stripePaymentId: string | null;
  status: string;
  qrCode: string | null;
  createdAt: string;
};

export default function VipDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState<VipDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("PAID");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/vip/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setOrder(data);
          setStatus(data.status);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const updateStatus = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/vip/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data && !data.error) {
        setOrder((prev) => (prev ? { ...prev, status: data.status } : prev));
      }
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="text-gray text-sm">Načítám...</div>;
  }

  if (!order) {
    return (
      <div>
        <Link
          href="/admin/vip"
          className="text-gray text-sm hover:text-gold transition-colors mb-6 inline-block"
        >
          &larr; Zpět na seznam
        </Link>
        <p className="text-red-400">VIP objednávka nenalezena.</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        href="/admin/vip"
        className="text-gray text-sm hover:text-gold transition-colors mb-6 inline-block"
      >
        &larr; Zpět na seznam
      </Link>

      <h1 className="font-heading text-3xl font-black mb-8">{order.name}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
        <div className="space-y-6">
          {/* Info */}
          <div className="bg-[#111] border border-[#222] p-6">
            <h2 className="font-heading text-lg font-bold mb-4">Informace</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">
                  Typ
                </span>
                {order.type === "MEET_GREET" ? "Meet & Greet" : "Backstage Pass"}
              </div>
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">
                  Email
                </span>
                {order.email}
              </div>
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">
                  Telefon
                </span>
                {order.phone || "—"}
              </div>
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">
                  Počet osob
                </span>
                {order.persons}
              </div>
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">
                  Koncert ID
                </span>
                {order.concertId || "—"}
              </div>
              <div>
                <span className="text-gray block text-[0.7rem] font-mono uppercase tracking-wider mb-1">
                  Stripe Payment
                </span>
                {order.stripePaymentId || "—"}
              </div>
            </div>
          </div>

          {/* QR Code */}
          {order.qrCode && (
            <div className="bg-[#111] border border-[#222] p-6">
              <h2 className="font-heading text-lg font-bold mb-4">QR Kód</h2>
              <div className="bg-white p-4 inline-block">
                <img src={order.qrCode} alt="QR Code" className="w-48 h-48" />
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
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
              Info
            </h3>
            <div className="text-[0.7rem] text-gray space-y-1">
              <p>Vytvořeno: {new Date(order.createdAt).toLocaleString("cs-CZ")}</p>
              <p>ID: {order.id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
