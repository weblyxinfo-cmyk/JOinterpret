"use client";

import { Suspense, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Nesprávný email nebo heslo.");
      setLoading(false);
    } else {
      router.push(callbackUrl);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3">
          {error}
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="admin@jaroslavolah.cz"
          className="bg-[#111] border border-[#333] text-white p-3.5 px-4 text-[0.9rem] outline-none focus:border-gold transition-colors"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-gray">
          Heslo
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="••••••••"
          className="bg-[#111] border border-[#333] text-white p-3.5 px-4 text-[0.9rem] outline-none focus:border-gold transition-colors"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gold text-black py-4 font-heading text-[0.75rem] font-bold uppercase tracking-[0.05em] hover:bg-gold-dark transition-all disabled:opacity-50"
      >
        {loading ? "PŘIHLAŠUJI..." : "PŘIHLÁSIT SE"}
      </button>
    </form>
  );
}

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-black text-gold mb-2">
            J. OLÁH ADMIN
          </h1>
          <p className="text-gray text-sm">Přihlaste se do administrace</p>
        </div>

        <Suspense fallback={<div className="text-gray text-sm text-center">Načítám...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
