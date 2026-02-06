import { defineField, defineType } from "sanity";

export default defineType({
  name: "mmaStats",
  title: "MMA Stats",
  type: "document",
  fields: [
    defineField({ name: "boxingMatches", title: "Box zápasů", type: "number" }),
    defineField({ name: "mmaMatches", title: "MMA zápasů", type: "number" }),
    defineField({ name: "yearsInUK", title: "Let v UK", type: "number" }),
    defineField({ name: "trainingCamps", title: "Tréninkové kempy", type: "number" }),
    defineField({
      name: "videos",
      title: "Videa",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Název", type: "string" }),
            defineField({ name: "youtubeUrl", title: "YouTube URL", type: "url" }),
            defineField({ name: "description", title: "Popis", type: "text" }),
          ],
        },
      ],
    }),
  ],
});
