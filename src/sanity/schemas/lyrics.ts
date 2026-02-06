import { defineField, defineType } from "sanity";

export default defineType({
  name: "lyrics",
  title: "Texty písní",
  type: "document",
  fields: [
    defineField({ name: "songTitle", title: "Název písně", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "songTitle" } }),
    defineField({ name: "album", title: "Album", type: "string" }),
    defineField({ name: "year", title: "Rok", type: "number" }),
    defineField({
      name: "featuredArtists",
      title: "Featured Artists",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "lyricsText",
      title: "Text písně (řádky)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "spotifyTrackId", title: "Spotify Track ID", type: "string" }),
  ],
});
