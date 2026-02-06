import { defineField, defineType } from "sanity";

export default defineType({
  name: "reference",
  title: "Reference",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Název akce", type: "string" }),
    defineField({ name: "date", title: "Datum", type: "date" }),
    defineField({ name: "venue", title: "Venue", type: "string" }),
    defineField({ name: "city", title: "Město", type: "string" }),
    defineField({ name: "description", title: "Popis", type: "text" }),
    defineField({ name: "attendees", title: "Počet návštěvníků", type: "string" }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
  ],
});
