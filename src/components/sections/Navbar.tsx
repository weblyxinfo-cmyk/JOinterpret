"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] flex justify-between items-center px-6 md:px-12 py-5 transition-all duration-300 ${
        scrolled
          ? "bg-black/95 backdrop-blur-xl"
          : "mix-blend-difference bg-transparent"
      }`}
    >
      <Link href="/" className="font-heading font-black text-[0.85rem] text-white tracking-tight">
        J. OLÁH
      </Link>

      {/* Desktop nav */}
      <div className="hidden lg:flex gap-7 items-center">
        {[
          { href: "#about", label: "O mně" },
          { href: "#music", label: "Hudba" },
          { href: "#concerts", label: "Koncerty" },
          { href: "#vip", label: "VIP" },
          { href: "#lyrics", label: "Texty" },
          { href: "#mma", label: "MMA" },
          { href: "#epk", label: "EPK" },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-mono text-[0.7rem] text-white uppercase tracking-[0.08em] hover:opacity-50 transition-opacity"
          >
            {link.label}
          </a>
        ))}
        <span className="font-mono text-[0.7rem] text-white uppercase tracking-[0.08em] opacity-40 cursor-pointer">
          CZ/EN
        </span>
        <a
          href="#booking"
          className="bg-white text-black px-6 py-2.5 font-mono text-[0.7rem] font-bold uppercase tracking-[0.08em] mix-blend-normal hover:bg-gold transition-colors"
        >
          BOOKING
        </a>
      </div>

      {/* Mobile menu button */}
      <button
        className="lg:hidden text-white z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="flex flex-col gap-1.5">
          <span
            className={`block w-6 h-[1.5px] bg-white transition-all ${
              menuOpen ? "rotate-45 translate-y-[4.5px]" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-white transition-all ${
              menuOpen ? "-rotate-45 -translate-y-[1.5px]" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center gap-6 lg:hidden">
          {[
            { href: "#about", label: "O mně" },
            { href: "#music", label: "Hudba" },
            { href: "#concerts", label: "Koncerty" },
            { href: "#vip", label: "VIP" },
            { href: "#lyrics", label: "Texty" },
            { href: "#mma", label: "MMA" },
            { href: "#epk", label: "EPK" },
            { href: "#booking", label: "Booking" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-heading text-2xl text-white uppercase tracking-tight hover:text-gold transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
