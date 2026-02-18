const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const SPOTIFY_ARTIST_ID = process.env.SPOTIFY_ARTIST_ID || "6k8OoNQSBSKmyvzpZvIVmR";

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string | null> {
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) return null;

  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) return null;

  const data = await res.json();
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };

  return cachedToken.token;
}

export type SpotifyArtist = {
  id: string;
  name: string;
  followers: { total: number };
  popularity: number;
  images: Array<{ url: string; width: number; height: number }>;
  genres: string[];
};

export type SpotifyAlbum = {
  id: string;
  name: string;
  release_date: string;
  album_type: string;
  total_tracks: number;
  images: Array<{ url: string; width: number; height: number }>;
  external_urls: { spotify: string };
};

export async function fetchArtistData(): Promise<SpotifyArtist | null> {
  const token = await getAccessToken();
  if (!token) return null;

  const res = await fetch(`https://api.spotify.com/v1/artists/${SPOTIFY_ARTIST_ID}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) return null;
  return res.json();
}

export async function fetchArtistAlbums(): Promise<SpotifyAlbum[]> {
  const token = await getAccessToken();
  if (!token) return [];

  const res = await fetch(
    `https://api.spotify.com/v1/artists/${SPOTIFY_ARTIST_ID}/albums?include_groups=album,single&market=CZ&limit=50`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data.items || [];
}
