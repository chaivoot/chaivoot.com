// Content schema — one source of truth for what a post must contain.
// Astro will type-check every .md file against this.
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:   z.string(),
    date:    z.date(),
    pillar:  z.enum(['amway', 'longevity', 'dogs']),
    format:  z.enum(['note', 'article']),
    excerpt: z.string().optional(),
    tags:    z.array(z.string()).optional(),
    read:    z.number().int().positive().optional(),
    draft:   z.boolean().default(false),
  }),
});

export const collections = { blog };
