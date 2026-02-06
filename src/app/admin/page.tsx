export default function AdminDashboard() {
  const stats = [
    { label: "Nové booking requesty", value: "—", icon: "📋" },
    { label: "VIP objednávky", value: "—", icon: "⭐" },
    { label: "Newsletter subscribers", value: "—", icon: "📧" },
    { label: "Spotify listeners", value: "250K+", icon: "🎵" },
  ];

  return (
    <div>
      <h1 className="font-heading text-3xl font-black mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#111] border border-[#222] p-6">
            <div className="text-2xl mb-3">{stat.icon}</div>
            <div className="font-heading text-2xl font-black text-gold">
              {stat.value}
            </div>
            <div className="text-[0.75rem] text-gray mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="bg-[#111] border border-[#222] p-6">
        <h2 className="font-heading text-lg font-bold mb-4">
          Poslední aktivita
        </h2>
        <p className="text-gray text-sm">
          Po připojení databáze zde uvidíte poslední booking requesty a VIP
          objednávky.
        </p>
      </div>
    </div>
  );
}
