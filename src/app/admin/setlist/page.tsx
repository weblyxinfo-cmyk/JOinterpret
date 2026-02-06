"use client";

import { useState, useEffect } from "react";

type SongVote = {
  song: string;
  votes: number;
};

export default function AdminSetlistPage() {
  const [results, setResults] = useState<SongVote[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/setlist")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setResults(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const maxVotes = Math.max(...results.map((r) => r.votes), 1);
  const totalVotes = results.reduce((sum, r) => sum + r.votes, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-heading text-3xl font-black">Setlist Hlasování</h1>
        <div className="font-mono text-[0.7rem] text-gray">
          Celkem hlasů: {totalVotes}
        </div>
      </div>

      <div className="bg-[#111] border border-[#222] p-6">
        {loading ? (
          <p className="text-gray text-sm">Načítám...</p>
        ) : results.length === 0 ? (
          <p className="text-gray text-sm">Žádné hlasy zatím.</p>
        ) : (
          <div className="space-y-4">
            {results.map((item, i) => (
              <div key={item.song}>
                <div className="flex justify-between items-center mb-1.5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[0.6rem] text-gray w-6">
                      #{i + 1}
                    </span>
                    <span className="font-heading text-[0.9rem] font-medium">
                      {item.song}
                    </span>
                  </div>
                  <span className="font-mono text-[0.7rem] text-gold">
                    {item.votes} hlasů
                  </span>
                </div>
                <div className="h-2 bg-[#222] overflow-hidden">
                  <div
                    className="h-full bg-gold transition-all duration-500"
                    style={{
                      width: `${(item.votes / maxVotes) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
