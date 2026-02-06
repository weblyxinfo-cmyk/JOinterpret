import { defineField, defineType } from "sanity";

export default defineType({
  name: "vipPackage",
  title: "VIP Balíček",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Název", type: "string" }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "type",
      title: "Typ",
      type: "string",
      options: {
        list: [
          { title: "Meet & Greet", value: "meet_greet" },
          { title: "Backstage Pass", value: "backstage" },
        ],
      },
    }),
    defineField({ name: "description", title: "Popis", type: "text" }),
    defineField({ name: "price", title: "Cena (Kč)", type: "number" }),
    defineField({
      name: "includes",
      title: "Co zahrnuje",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "galleryImages",
      title: "Galerie",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "isAvailable", title: "Dostupný", type: "boolean", initialValue: true }),
  ],
});
