"use client";

import { useState } from "react";
import Link from "next/link";

const questions = [
  {
    text: "Jaký je tvůj páteční večer?",
    answers: [
      { text: "Klub s kamarády", song: 0 },
      { text: "Romantická večeře", song: 1 },
      { text: "Trénink v gymu", song: 2 },
      { text: "Netflix a klid", song: 3 },
    ],
  },
  {
    text: "Co tě nejvíc motivuje?",
    answers: [
      { text: "Láska", song: 1 },
      { text: "Peníze a úspěch", song: 4 },
      { text: "Rodina", song: 3 },
      { text: "Adrenalin", song: 2 },
    ],
  },
  {
    text: "Jaký styl hudby preferuješ?",
    answers: [
      { text: "Pomalé R&B balady", song: 1 },
      { text: "Tvrdý rap", song: 4 },
      { text: "Pop a catchy melodie", song: 0 },
      { text: "Motivační tracky", song: 2 },
    ],
  },
  {
    text: "Tvoje největší síla?",
    answers: [
      { text: "Empatie", song: 1 },
      { text: "Odvaha", song: 2 },
      { text: "Kreativita", song: 0 },
      { text: "Loajalita", song: 3 },
    ],
  },
  {
    text: "Kam bys letěl/a na dovolenou?",
    answers: [
      { text: "Londýn", song: 2 },
      { text: "Paříž", song: 1 },
      { text: "Miami", song: 4 },
      { text: "Někam do klidu", song: 3 },
    ],
  },
];

const results = [
  { title: "Hlavolam", desc: "Jsi jako hlavolam – fascinující, komplexní a nedáš se snadno rozluštit. Přitahuješ lidi svou energií!" },
  { title: "Nemůžu zapomenout", desc: "Jsi romantická duše. Cítíš věci hluboce a tvoje emoce jsou tvá největší síla." },
  { title: "Kriminál", desc: "Jsi fighter! Nevzdáváš se, i když je to těžké. Tvoje odhodlání inspiruje ostatní." },
  { title: "Táta", desc: "Rodina je pro tebe všechno. Jsi stabilní, spolehlivý/á a máš srdce ze zlata." },
  { title: "Šípková Růženka", desc: "Žiješ naplno a nebojíš se velkých snů. Jsi ambiciózní a víš co chceš!" },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<number[]>([0, 0, 0, 0, 0]);
  const [result, setResult] = useState<number | null>(null);

  const handleAnswer = (songIndex: number) => {
    const newScores = [...scores];
    newScores[songIndex]++;
    setScores(newScores);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      const maxScore = Math.max(...newScores);
      setResult(newScores.indexOf(maxScore));
    }
  };

  const restart = () => {
    setCurrent(0);
    setScores([0, 0, 0, 0, 0]);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="pt-24 pb-12 px-6 md:px-12 max-w-2xl mx-auto">
        <Link
          href="/"
          className="font-mono text-[0.7rem] text-gray hover:text-gold transition-colors mb-8 inline-block"
        >
          &larr; Zpět
        </Link>

        <h1 className="font-heading text-[clamp(1.8rem,4vw,3rem)] font-black tracking-[-0.04em] mb-2">
          Která Járova písnička <span className="text-gold">jsi?</span>
        </h1>
        <p className="text-gray mb-12">
          Odpověz na {questions.length} otázek a zjisti, která písnička
          vystihuje tvoji osobnost.
        </p>

        {result !== null ? (
          <div className="bg-white border border-[#ddd] p-8 md:p-12 text-center">
            <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-gold mb-4">
              Tvůj výsledek
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-black mb-4">
              {results[result].title}
            </h2>
            <p className="text-gray leading-relaxed mb-8 max-w-md mx-auto">
              {results[result].desc}
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <button
                onClick={restart}
                className="border border-[#ccc] px-6 py-3 font-heading text-[0.75rem] uppercase hover:border-black transition-colors"
              >
                Zkusit znovu
              </button>
              <button className="bg-gold text-black px-6 py-3 font-heading text-[0.75rem] font-bold uppercase hover:bg-gold-dark transition-colors">
                Sdílet výsledek
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Progress */}
            <div className="flex gap-1 mb-8">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 ${
                    i <= current ? "bg-gold" : "bg-[#ddd]"
                  }`}
                />
              ))}
            </div>

            <div className="font-mono text-[0.6rem] uppercase tracking-wider text-gray mb-4">
              Otázka {current + 1} / {questions.length}
            </div>

            <h2 className="font-heading text-2xl font-bold mb-8">
              {questions[current].text}
            </h2>

            <div className="grid gap-3">
              {questions[current].answers.map((answer, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(answer.song)}
                  className="text-left bg-white border border-[#ddd] p-5 px-6 font-body text-[0.95rem] hover:border-gold hover:pl-8 transition-all"
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
