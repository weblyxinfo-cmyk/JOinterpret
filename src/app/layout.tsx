import type { Metadata } from "next";
import { Unbounded, DM_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  subsets: ["latin", "latin-ext"],
  variable: "--font-unbounded",
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-space-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "JAROSLAV OLÁH — Official",
  description:
    "Jaroslav Oláh – český R&B zpěvák, rapper a fighter. Booking, koncerty, VIP experience.",
  keywords: [
    "Jaroslav Oláh",
    "rapper",
    "R&B",
    "české hip-hop",
    "Blakkwood Records",
    "booking",
  ],
  openGraph: {
    title: "JAROSLAV OLÁH — Official",
    description:
      "R&B, rap a nekompromisní energie. Od SuperStar přes milionové přehrání až do MMA klece.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className="scroll-smooth">
      <body
        className={`${unbounded.variable} ${dmSans.variable} ${spaceMono.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
