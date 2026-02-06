"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider, useSession, signOut } from "next-auth/react";

function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/booking", label: "Booking", icon: "📋" },
    { href: "/admin/vip", label: "VIP Objednávky", icon: "⭐" },
    { href: "/admin/setlist", label: "Setlist Hlasování", icon: "🎵" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#111] border-r border-[#222] p-6 flex flex-col gap-2 fixed">
      <Link
        href="/admin"
        className="font-heading text-lg font-black text-gold mb-8 block"
      >
        J. OLÁH ADMIN
      </Link>

      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center gap-3 px-4 py-3 text-[0.85rem] transition-colors ${
            pathname === item.href
              ? "text-white bg-white/5"
              : "text-gray-light hover:text-white hover:bg-white/5"
          }`}
        >
          <span>{item.icon}</span>
          {item.label}
        </Link>
      ))}

      <div className="mt-auto pt-8 space-y-3">
        {session?.user && (
          <div className="text-[0.7rem] text-gray px-4">
            {session.user.email}
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="w-full text-left px-4 py-2 text-[0.75rem] text-red-400 hover:text-red-300 transition-colors"
        >
          Odhlásit se
        </button>
        <Link
          href="/"
          className="block px-4 text-[0.75rem] text-gray hover:text-gold transition-colors"
        >
          &larr; Zpět na web
        </Link>
      </div>
    </aside>
  );
}

function AdminContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  // Login stránka bez sidebaru
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white font-body">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-body">
      <div className="flex">
        <AdminSidebar />
        <main className="ml-64 flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminContent>{children}</AdminContent>
    </SessionProvider>
  );
}
