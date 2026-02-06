"use client";

import { motion } from "framer-motion";

const tickerItems = [
  "NEMŮŽU ZAPOMENOUT",
  "HLAVOLAM FT. REFEW",
  "ŠÍPKOVÁ RŮŽENKA",
  "KRIMINÁL",
  "ZMATENÁ FT. DANIEL CINA",
  "LOVESTORY ALBUM",
];

export default function Hero() {
  return (
    <section className="min-h-screen bg-black text-white relative grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
      {/* Left */}
      <div className="flex flex-col justify-end p-6 md:p-12 pb-16 z-[2] pt-[120px] lg:pt-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-gold mb-6">
            Singer / Rapper / Fighter
          </div>
          <h1 className="font-heading text-[clamp(3rem,6vw,5.5rem)] font-black leading-[0.9] tracking-[-0.04em] mb-8">
            JAROSLAV
            <br />
            <span className="text-outline">OLÁ</span>
            <span className="text-gold">H</span>
          </h1>
          <p className="text-[1rem] text-gray-light max-w-[420px] leading-[1.7] font-light mb-10">
            R&B, rap a nekompromisní energie. Od SuperStar přes milionové
            přehrání až do MMA klece.
          </p>
          <div className="flex gap-3 flex-wrap">
            <a
              href="#booking"
              className="bg-gold text-black px-8 py-4 font-heading text-[0.75rem] font-bold uppercase tracking-[0.05em] hover:bg-gold-dark hover:-translate-y-0.5 transition-all inline-flex items-center gap-2"
            >
              Booking &rarr;
            </a>
            <a
              href="#music"
              className="border border-[#444] text-white px-8 py-4 font-heading text-[0.75rem] font-medium uppercase tracking-[0.05em] hover:border-white transition-all"
            >
              Poslechnout
            </a>
          </div>
        </motion.div>
      </div>

      {/* Right - Hero image */}
      <div className="relative overflow-hidden lg:static absolute inset-0 opacity-30 lg:opacity-100">
        <div
          className="w-full h-full bg-cover bg-center scale-105 hover:scale-100 transition-transform duration-[8s]"
          style={{
            backgroundImage: `linear-gradient(to bottom, transparent 60%, #111), url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&q=80')`,
          }}
        />
        {/* Spinning badge */}
        <div className="absolute top-8 right-8 w-[100px] h-[100px] border-2 border-gold rounded-full flex items-center justify-center font-mono text-[0.55rem] uppercase text-gold leading-[1.4] tracking-[0.1em] animate-spin z-[3] hidden md:flex text-center">
          250K+
          <br />
          MONTHLY
          <br />
          LISTENERS
        </div>
      </div>

      {/* Gold ticker */}
      <div className="absolute bottom-0 left-0 right-0 bg-gold text-black py-3 overflow-hidden z-[5]">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="flex items-center flex-shrink-0">
              <span className="font-heading text-[0.75rem] font-bold uppercase tracking-[0.05em] px-8">
                {item}
              </span>
              <span className="px-2 opacity-50">&#10022;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
