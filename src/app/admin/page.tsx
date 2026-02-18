"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type DashboardStats = {
  newBookings: number;
  vipOrders: number;
  subscribers: number;
  recentBookings: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    createdAt: string;
  }>;
  recentVip: Array<{
    id: string;
    name: string;
    type: string;
    status: string;
    createdAt: string;
  }>;
};

type SpotifyData = {
  followers?: number;
  popularity?: number;
};

type YouTubeData = {
  subscriberCount?: string;
  videoCount?: string;
  viewCount?: string;
};

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardStats>({
    newBookings: 0,
    vipOrders: 0,
    subscribers: 0,
    recentBookings: [],
    recentVip: [],
  });
  const [loading, setLoading] = useState(true);
  const [spotifyData, setSpotifyData] = useState<SpotifyData>({});
  const [youtubeData, setYoutubeData] = useState<YouTubeData>({});
  const [monthlyListeners, setMonthlyListeners] = useState("91K+");
  const [editingListeners, setEditingListeners] = useState(false);
  const [listenersInput, setListenersInput] = useState("91K+");

  useEffect(() => {
    // Fetch core stats
    Promise.all([
      fetch("/api/booking").then((r) => r.json()),
      fetch("/api/vip").then((r) => r.json()),
      fetch("/api/newsletter").then((r) => r.json()),
    ])
      .then(([bookings, vip, newsletter]) => {
        const bookingsArr = Array.isArray(bookings) ? bookings : [];
        const vipArr = Array.isArray(vip) ? vip : [];

        setData({
          newBookings: bookingsArr.filter((b: { status: string }) => b.status === "NEW").length,
          vipOrders: vipArr.length,
          subscribers: newsletter?.count ?? 0,
          recentBookings: bookingsArr.slice(0, 5),
          recentVip: vipArr.slice(0, 5),
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    // Fetch Spotify data
    fetch("/api/stats/spotify?type=artist")
      .then((r) => r.json())
      .then((d) => { if (d && !d.error) setSpotifyData(d); })
      .catch(() => {});

    // Fetch YouTube data
    fetch("/api/stats/youtube?type=stats")
      .then((r) => r.json())
      .then((d) => { if (d && !d.error) setYoutubeData(d); })
      .catch(() => {});

    // Fetch monthly listeners override
    fetch("/api/stats/spotify?type=monthlyListeners")
      .then((r) => r.json())
      .then((d) => {
        if (d?.value) {
          setMonthlyListeners(d.value);
          setListenersInput(d.value);
        }
      })
      .catch(() => {});
  }, []);

  const saveMonthlyListeners = async () => {
    try {
      await fetch("/api/stats/spotify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "monthlyListeners", value: listenersInput }),
      });
      setMonthlyListeners(listenersInput);
      setEditingListeners(false);
    } catch (e) {
      console.error(e);
    }
  };

  const formatNumber = (n: number | string | undefined) => {
    if (!n) return "—";
    const num = typeof n === "string" ? parseInt(n) : n;
    if (isNaN(num)) return String(n);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return String(num);
  };

  const stats = [
    { label: "Nové booking requesty", value: loading ? "..." : String(data.newBookings), icon: "📋" },
    { label: "VIP objednávky", value: loading ? "..." : String(data.vipOrders), icon: "⭐" },
    { label: "Newsletter subscribers", value: loading ? "..." : String(data.subscribers), icon: "📧" },
    { label: "Spotify followers", value: spotifyData.followers ? formatNumber(spotifyData.followers) : "—", icon: "🎵" },
    { label: "Monthly listeners", value: monthlyListeners, icon: "🎧" },
    { label: "YouTube subscribers", value: youtubeData.subscriberCount ? formatNumber(youtubeData.subscriberCount) : "—", icon: "📺" },
    { label: "YouTube videa", value: youtubeData.videoCount || "—", icon: "🎬" },
    { label: "YouTube views", value: youtubeData.viewCount ? formatNumber(youtubeData.viewCount) : "—", icon: "👁" },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-black mb-8">Dashboard</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#111] border border-[#222] p-6">
            <div className="text-2xl mb-3">{stat.icon}</div>
            <div className="font-heading text-2xl font-black text-gold">
              {stat.value}
            </div>
            <div className="text-[0.75rem] text-gray mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Monthly Listeners Override */}
      <div className="bg-[#111] border border-[#222] p-6 mb-12">
        <h2 className="font-heading text-lg font-bold mb-3">
          Monthly Listeners Override
        </h2>
        <p className="text-[0.75rem] text-gray mb-3">
          Spotify API neposkytuje monthly listeners. Zadejte hodnotu ručně (zobrazuje se na webu).
        </p>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={listenersInput}
            onChange={(e) => {
              setListenersInput(e.target.value);
              setEditingListeners(true);
            }}
            className="bg-[#0a0a0a] border border-[#333] text-white px-4 py-3 text-sm outline-none focus:border-gold transition-colors w-48"
            placeholder="91K+"
          />
          {editingListeners && (
            <button
              onClick={saveMonthlyListeners}
              className="bg-gold text-black px-6 py-3 font-heading text-[0.7rem] font-bold uppercase"
            >
              Uložit
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent bookings */}
        <div className="bg-[#111] border border-[#222] p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-lg font-bold">Poslední booking requesty</h2>
            <Link href="/admin/booking" className="text-gold text-[0.7rem] font-mono hover:underline">
              Vše &rarr;
            </Link>
          </div>
          {data.recentBookings.length === 0 ? (
            <p className="text-gray text-sm">Žádné booking requesty.</p>
          ) : (
            <div className="space-y-3">
              {data.recentBookings.map((b) => (
                <Link
                  key={b.id}
                  href={`/admin/booking/${b.id}`}
                  className="flex justify-between items-center py-2 border-b border-[#222] hover:text-gold transition-colors"
                >
                  <div>
                    <div className="text-sm font-medium">{b.name}</div>
                    <div className="text-[0.65rem] text-gray">{b.type}</div>
                  </div>
                  <span className="text-[0.6rem] font-mono text-gray">
                    {new Date(b.createdAt).toLocaleDateString("cs-CZ")}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Recent VIP */}
        <div className="bg-[#111] border border-[#222] p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-heading text-lg font-bold">Poslední VIP objednávky</h2>
            <Link href="/admin/vip" className="text-gold text-[0.7rem] font-mono hover:underline">
              Vše &rarr;
            </Link>
          </div>
          {data.recentVip.length === 0 ? (
            <p className="text-gray text-sm">Žádné VIP objednávky.</p>
          ) : (
            <div className="space-y-3">
              {data.recentVip.map((v) => (
                <div
                  key={v.id}
                  className="flex justify-between items-center py-2 border-b border-[#222]"
                >
                  <div>
                    <div className="text-sm font-medium">{v.name}</div>
                    <div className="text-[0.65rem] text-gray">
                      {v.type === "MEET_GREET" ? "Meet & Greet" : "Backstage Pass"}
                    </div>
                  </div>
                  <span className="text-[0.6rem] font-mono text-gray">
                    {new Date(v.createdAt).toLocaleDateString("cs-CZ")}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
