import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Blog / BTS",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Název", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "content", title: "Obsah", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "category",
      title: "Kategorie",
      type: "string",
      options: {
        list: [
          { title: "Blog", value: "blog" },
          { title: "Behind the Scenes", value: "bts" },
          { title: "MMA", value: "mma" },
        ],
      },
    }),
    defineField({ name: "publishedAt", title: "Publikováno", type: "datetime" }),
    defineField({ name: "youtubeEmbed", title: "YouTube Embed URL", type: "url" }),
  ],
  orderings: [
    { title: "Datum", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
});
