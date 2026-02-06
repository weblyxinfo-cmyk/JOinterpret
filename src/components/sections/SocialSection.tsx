"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

const socials = [
  {
    label: "INSTAGRAM",
    bg: "linear-gradient(135deg, #405DE6, #833AB4, #E1306C)",
    textColor: "text-white",
    span: "col-span-2 row-span-2",
  },
  {
    label: "TIKTOK",
    bg: "#111",
    textColor: "text-white",
  },
  {
    label: "YOUTUBE",
    bg: "#C6A336",
    textColor: "text-black",
  },
  {
    label: "SPOTIFY",
    bg: "#1DB954",
    textColor: "text-white",
  },
  {
    label: "PODCAST",
    bg: "#E8E0D2",
    textColor: "text-black",
  },
];

export default function SocialSection() {
  return (
    <section className="bg-cream py-[100px] px-6 md:px-12">
      <ScrollReveal>
        <div className="mb-12">
          <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gray mb-3">
            {"// SOCIÁLNÍ SÍTĚ"}
          </div>
          <h2 className="font-heading text-[clamp(2rem,3.5vw,3rem)] font-black tracking-[-0.03em] leading-none">
            SLEDUJ MĚ <span className="text-gold">VŠUDE</span>
          </h2>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {socials.map((social, i) => (
            <div
              key={i}
              className={`aspect-square border border-[#ddd] flex items-center justify-center cursor-pointer transition-all duration-500 relative overflow-hidden hover:border-gold hover:scale-[0.97] ${
                i === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              style={{
                background:
                  typeof social.bg === "string" && social.bg.includes("gradient")
                    ? social.bg
                    : social.bg,
              }}
            >
              <span
                className={`font-heading text-[0.7rem] font-bold uppercase tracking-[0.08em] transition-colors ${social.textColor} hover:text-gold`}
              >
                {social.label}
              </span>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
