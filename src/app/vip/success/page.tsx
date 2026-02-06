import Link from "next/link";

export default function VipSuccess() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="bg-white border border-[#ddd] p-12 md:p-16 text-center max-w-lg">
        <div className="text-5xl mb-6">&#10003;</div>
        <h1 className="font-heading text-3xl font-black mb-4">
          Platba <span className="text-gold">úspěšná!</span>
        </h1>
        <p className="text-gray leading-relaxed mb-8">
          Děkujeme za objednávku VIP Experience. Na váš email jsme poslali
          potvrzení s QR kódem a instrukcemi.
        </p>
        <Link
          href="/"
          className="bg-gold text-black px-8 py-4 font-heading text-[0.75rem] font-bold uppercase tracking-[0.05em] hover:bg-gold-dark transition-all inline-block"
        >
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  );
}
