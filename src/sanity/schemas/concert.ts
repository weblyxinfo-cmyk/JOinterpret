import { defineField, defineType } from "sanity";

export default defineType({
  name: "concert",
  title: "Koncert",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Název", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "date", title: "Datum", type: "datetime" }),
    defineField({ name: "venue", title: "Venue", type: "string" }),
    defineField({ name: "city", title: "Město", type: "string" }),
    defineField({ name: "description", title: "Popis", type: "text" }),
    defineField({ name: "ticketUrl", title: "URL na lístky", type: "url" }),
    defineField({
      name: "lineup",
      title: "Lineup",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Potvrzeno", value: "confirmed" },
          { title: "Vyprodáno", value: "soldout" },
          { title: "Zrušeno", value: "cancelled" },
        ],
      },
    }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
  ],
  orderings: [{ title: "Datum", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
});
