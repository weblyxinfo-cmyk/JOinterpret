import { defineField, defineType } from "sanity";

export default defineType({
  name: "artist",
  title: "Artist",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Jméno", type: "string" }),
    defineField({ name: "bio", title: "Bio (CZ)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "bioEn", title: "Bio (EN)", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "shortBio", title: "Krátké bio (CZ)", type: "text" }),
    defineField({ name: "shortBioEn", title: "Krátké bio (EN)", type: "text" }),
    defineField({
      name: "tags",
      title: "Tagy",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "photo", title: "Hlavní fotka", type: "image", options: { hotspot: true } }),
    defineField({
      name: "pressPhotos",
      title: "Press fotky",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
  ],
});
