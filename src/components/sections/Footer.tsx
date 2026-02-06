export default function Footer() {
  return (
    <footer className="bg-black text-white py-[60px] px-6 md:px-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
        {/* Brand */}
        <div>
          <div className="font-heading text-[1.6rem] font-black tracking-[-0.03em] mb-3">
            JAROSLAV <span className="text-gold">OLÁH</span>
          </div>
          <p className="text-[0.85rem] text-gray leading-[1.6] max-w-[280px]">
            Zpěvák, rapper, fighter. Hudba co rezonuje, energie co se
            nezapomíná.
          </p>
        </div>

        {/* Navigace */}
        <div>
          <h5 className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray mb-5">
            Navigace
          </h5>
          {["O mně", "Hudba", "Koncerty", "VIP", "Texty"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/ /g, "")}`}
              className="block text-gray-light text-[0.85rem] mb-2.5 hover:text-gold transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Pro profesionály */}
        <div>
          <h5 className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray mb-5">
            Pro profesionály
          </h5>
          <a
            href="#booking"
            className="block text-gray-light text-[0.85rem] mb-2.5 hover:text-gold transition-colors"
          >
            Booking
          </a>
          <a
            href="#epk"
            className="block text-gray-light text-[0.85rem] mb-2.5 hover:text-gold transition-colors"
          >
            Press Kit
          </a>
          <a
            href="#"
            className="block text-gray-light text-[0.85rem] mb-2.5 hover:text-gold transition-colors"
          >
            Reference
          </a>
          <a
            href="#"
            className="block text-gray-light text-[0.85rem] mb-2.5 hover:text-gold transition-colors"
          >
            Management
          </a>
        </div>

        {/* Kontakt */}
        <div>
          <h5 className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray mb-5">
            Kontakt
          </h5>
          <a
            href="mailto:booking@jaroslavolah.cz"
            className="block text-gray-light text-[0.85rem] mb-2.5 hover:text-gold transition-colors"
          >
            booking@jaroslavolah.cz
          </a>
          <a
            href="mailto:management@jaroslavolah.cz"
            className="block text-gray-light text-[0.85rem] mb-2.5 hover:text-gold transition-colors"
          >
            management@jaroslavolah.cz
          </a>
          <a
            href="#"
            className="block text-gray-light text-[0.85rem] mb-2.5 hover:text-gold transition-colors"
          >
            Instagram
          </a>
          <a
            href="#"
            className="block text-gray-light text-[0.85rem] mb-2.5 hover:text-gold transition-colors"
          >
            TikTok
          </a>
        </div>
      </div>

      <div className="border-t border-[#222] pt-6 flex flex-col md:flex-row justify-between text-[0.7rem] text-gray gap-2">
        <span>&copy; 2025 Jaroslav Oláh. Všechna práva vyhrazena.</span>
        <span>
          Web vytvořil{" "}
          <a
            href="https://weblyx.cz"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            Weblyx.cz
          </a>
        </span>
      </div>
    </footer>
  );
}
