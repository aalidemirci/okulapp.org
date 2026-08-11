import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Her public GitHub reposu için src/content/projects/<repo-adi>.md dosyası.
// Metadata git'te durur; build sırasında API çağrısı yapılmaz.
const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    repoUrl: z.string().url(),
    language: z.string().optional(),
    topics: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    /** Projenin okulapp.org içindeki veya harici tanıtım sitesi (opsiyonel). */
    siteUrl: z.string().optional(),
    /** Ana sayfa vitrin kartının şerit rengi; projenin kendi renk kümesinden. */
    accent: z.string().optional(),
    /** Vitrin kartında görünen kısa durum etiketi (ör. "Sürüm 0.3.1", "Beta"). */
    badge: z.string().optional(),
  }),
});

export const collections = { projects };
