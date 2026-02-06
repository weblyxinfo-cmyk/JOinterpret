import { defineField, defineType } from "sanity";

export default defineType({
  name: "quiz",
  title: "Quiz",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Název quizu", type: "string" }),
    defineField({
      name: "questions",
      title: "Otázky",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "questionText", title: "Otázka", type: "string" }),
            defineField({
              name: "answers",
              title: "Odpovědi",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "text", title: "Text", type: "string" }),
                    defineField({ name: "scores", title: "Skóre (JSON)", type: "text" }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "results",
      title: "Výsledky",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "songTitle", title: "Písnička", type: "string" }),
            defineField({ name: "description", title: "Popis", type: "text" }),
            defineField({ name: "shareImage", title: "Share Image", type: "image" }),
            defineField({ name: "spotifyLink", title: "Spotify Link", type: "url" }),
          ],
        },
      ],
    }),
  ],
});
