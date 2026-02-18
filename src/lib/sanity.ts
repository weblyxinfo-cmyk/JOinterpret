import { createClient } from "next-sanity";
import { createImageUrlBuilder } from "@sanity/image-url";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

// Write client for admin mutations (concerts CRUD etc.)
export const sanityWriteClient = process.env.SANITY_WRITE_TOKEN
  ? createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your-project-id",
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      apiVersion: "2024-01-01",
      useCdn: false,
      token: process.env.SANITY_WRITE_TOKEN,
    })
  : null;

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: { asset?: { _ref?: string } }) {
  return builder.image(source);
}
