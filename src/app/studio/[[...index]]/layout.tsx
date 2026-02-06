export const metadata = {
  title: "Sanity Studio – Jaroslav Oláh",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
