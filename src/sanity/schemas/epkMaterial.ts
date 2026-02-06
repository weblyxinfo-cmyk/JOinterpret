import { defineField, defineType } from "sanity";

export default defineType({
  name: "epkMaterial",
  title: "EPK Materiály",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Název", type: "string" }),
    defineField({
      name: "type",
      title: "Typ",
      type: "string",
      options: {
        list: [
          { title: "Fotka", value: "photo" },
          { title: "Dokument", value: "document" },
          { title: "Logo", value: "logo" },
          { title: "Stats", value: "stats" },
        ],
      },
    }),
    defineField({ name: "file", title: "Soubor", type: "file" }),
    defineField({ name: "description", title: "Popis", type: "text" }),
  ],
});
