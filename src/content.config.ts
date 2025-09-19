import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import config from "@/site.config";

export const BLOG_PATH = "src/data/posts";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: `./${BLOG_PATH}` }),
  schema: ({ image }) =>
    z.object({
      author: z.string().default(config.author),
      title: z.string(),
      description: z.string(),
      featured: z.boolean().optional(),
      isDraft: z.boolean().optional(),
      tags: z.array(z.string()).default(["others"]),
      coverImage: z
        .strictObject({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      editable: z.boolean().optional(),
      publishedAt: z.date(),
      modifiedAt: z.date().optional().nullable(),
    }),
});

export const collections = { blog };
