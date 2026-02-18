"use client";

import { useState, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

type SocialLinkData = {
  id: string;
  platform: string;
  url: string | null;
  followerCount: string | null;
  isVisible: boolean;
};

const platformStyles: Record<string, { bg: string; textColor: string }> = {
  instagram: { bg: "linear-gradient(135deg, #405DE6, #833AB4, #E1306C)", textColor: "text-white" },
  tiktok: { bg: "#111", textColor: "text-white" },
  youtube: { bg: "#C6A336", textColor: "text-black" },
  spotify: { bg: "#1DB954", textColor: "text-white" },
  podcast: { bg: "#E8E0D2", textColor: "text-black" },
};

const fallbackSocials: { platform: string; label: string; url: string | null; followerCount: string | null }[] = [
  { platform: "instagram", label: "INSTAGRAM", url: null, followerCount: null },
  { platform: "tiktok", label: "TIKTOK", url: null, followerCount: null },
  { platform: "youtube", label: "YOUTUBE", url: null, followerCount: null },
  { platform: "spotify", label: "SPOTIFY", url: null, followerCount: null },
  { platform: "podcast", label: "PODCAST", url: null, followerCount: null },
];

export default function SocialSection() {
  const [socials, setSocials] = useState(fallbackSocials);

  useEffect(() => {
    fetch("/api/social")
      .then((r) => r.json())
      .then((data: SocialLinkData[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSocials(
            data.map((d) => ({
              platform: d.platform,
              label: d.platform.toUpperCase(),
              url: d.url,
              followerCount: d.followerCount,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="bg-cream py-16 md:py-[100px] px-6 md:px-12">
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
          {socials.map((social, i) => {
            const styles = platformStyles[social.platform] || { bg: "#E8E0D2", textColor: "text-black" };
            const Tag = social.url ? "a" : "div";
            const linkProps = social.url
              ? { href: social.url, target: "_blank" as const, rel: "noopener noreferrer" }
              : {};

            return (
              <Tag
                key={i}
                {...linkProps}
                className={`aspect-square border border-[#ddd] flex flex-col items-center justify-center cursor-pointer transition-all duration-500 relative overflow-hidden hover:border-gold hover:scale-[0.97] ${
                  i === 0 ? "md:col-span-2 md:row-span-2" : ""
                }`}
                style={{
                  background: styles.bg,
                }}
              >
                <span
                  className={`font-heading text-[0.7rem] font-bold uppercase tracking-[0.08em] transition-colors ${styles.textColor} hover:text-gold`}
                >
                  {social.label}
                </span>
                {social.followerCount && (
                  <span className={`font-mono text-[0.55rem] mt-1 opacity-70 ${styles.textColor}`}>
                    {social.followerCount}
                  </span>
                )}
              </Tag>
            );
          })}
        </div>
      </ScrollReveal>
    </section>
  );
}
