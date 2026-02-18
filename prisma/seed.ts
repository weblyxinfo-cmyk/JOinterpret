import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Admin user
  const email = process.env.ADMIN_EMAIL || "admin@jaroslavolah.cz";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: {
      email,
      passwordHash,
      name: "Jaroslav Oláh Management",
    },
  });
  console.log(`Admin user created/updated: ${email}`);

  // Setlist songs
  const songs = [
    "Nemůžu zapomenout",
    "Hlavolam ft. Refew",
    "Šípková Růženka",
    "Kriminál",
    "Zmatená ft. Daniel Cina",
    "Vlny ft. Jakub Děkan",
    "Táta ft. Lola Oláh",
    "Lovestory",
  ];

  for (let i = 0; i < songs.length; i++) {
    await prisma.setlistSong.upsert({
      where: { title: songs[i] },
      update: {},
      create: { title: songs[i], sortOrder: i, isActive: true },
    });
  }
  console.log(`Seeded ${songs.length} setlist songs`);

  // Social links
  const socials = [
    { platform: "instagram", url: "https://instagram.com/jaroslavolah", followerCount: "50K+" },
    { platform: "tiktok", url: "https://tiktok.com/@jaroslavolah", followerCount: null },
    { platform: "youtube", url: "https://youtube.com/@jaroslavolah", followerCount: null },
    { platform: "spotify", url: "https://open.spotify.com/artist/6k8OoNQSBSKmyvzpZvIVmR", followerCount: "91K+" },
    { platform: "podcast", url: null, followerCount: null },
  ];

  for (const s of socials) {
    await prisma.socialLink.upsert({
      where: { platform: s.platform },
      update: {},
      create: { platform: s.platform, url: s.url, followerCount: s.followerCount, isVisible: true },
    });
  }
  console.log(`Seeded ${socials.length} social links`);

  // Albums
  const albums = [
    { spotifyId: "lifestory-2025", title: "Lifestory", year: "2025", type: "ALBUM", coverUrl: "https://i.scdn.co/image/ab67616d0000b2737d81758deee97dc0c84c82b9", spotifyUrl: "https://open.spotify.com/artist/6k8OoNQSBSKmyvzpZvIVmR", sortOrder: 0 },
    { spotifyId: "secret-concert-2024", title: "Secret Concert", year: "2024", type: "ALBUM · LIVE", coverUrl: "https://i.scdn.co/image/ab67616d0000b273d967facc13d581272cd1b520", spotifyUrl: "https://open.spotify.com/artist/6k8OoNQSBSKmyvzpZvIVmR", sortOrder: 1 },
    { spotifyId: "lovestory-2023", title: "Lovestory", year: "2023", type: "ALBUM", coverUrl: "https://i.scdn.co/image/ab67616d0000b273964ff5910e5959c8207b39f1", spotifyUrl: "https://open.spotify.com/artist/6k8OoNQSBSKmyvzpZvIVmR", sortOrder: 2 },
    { spotifyId: "nemuzu-zapomenout-2021", title: "Nemůžu zapomenout", year: "2021", type: "EP", coverUrl: "https://i.scdn.co/image/ab67616d0000b273d832ecf10c12d1e1623dcc28", spotifyUrl: "https://open.spotify.com/artist/6k8OoNQSBSKmyvzpZvIVmR", sortOrder: 3 },
  ];

  for (const a of albums) {
    await prisma.albumOverride.upsert({
      where: { spotifyId: a.spotifyId },
      update: {},
      create: { ...a, isVisible: true },
    });
  }
  console.log(`Seeded ${albums.length} albums`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
