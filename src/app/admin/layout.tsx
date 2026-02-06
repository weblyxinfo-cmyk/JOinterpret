import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-body">
      {/* Admin sidebar */}
      <div className="flex">
        <aside className="w-64 min-h-screen bg-[#111] border-r border-[#222] p-6 flex flex-col gap-2 fixed">
          <Link
            href="/admin"
            className="font-heading text-lg font-black text-gold mb-8 block"
          >
            J. OLÁH ADMIN
          </Link>
          {[
            { href: "/admin", label: "Dashboard", icon: "📊" },
            { href: "/admin/booking", label: "Booking", icon: "📋" },
            { href: "/admin/vip", label: "VIP Objednávky", icon: "⭐" },
            { href: "/admin/setlist", label: "Setlist Hlasování", icon: "🎵" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 text-[0.85rem] text-gray-light hover:text-white hover:bg-white/5 transition-colors"
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ))}
          <div className="mt-auto pt-8">
            <Link
              href="/"
              className="text-[0.75rem] text-gray hover:text-gold transition-colors"
            >
              &larr; Zpět na web
            </Link>
          </div>
        </aside>

        <main className="ml-64 flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
