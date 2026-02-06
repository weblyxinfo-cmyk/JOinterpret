"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-5xl mb-6">!</div>
        <h1 className="font-heading text-2xl font-black mb-4">
          Něco se pokazilo
        </h1>
        <p className="text-gray text-sm mb-8">
          {error.message || "Nastala neočekávaná chyba. Zkuste to prosím znovu."}
        </p>
        <button
          onClick={reset}
          className="bg-gold text-black px-8 py-4 font-heading text-[0.75rem] font-bold uppercase tracking-[0.05em] hover:bg-gold-dark transition-all"
        >
          ZKUSIT ZNOVU
        </button>
      </div>
    </div>
  );
}
