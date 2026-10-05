/**
 * Définition des collections de contenu (fichiers Markdown / JSON).
 * Chaque champ est validé au moment de la construction du site :
 * une faute de frappe dans un fichier provoque un message d'erreur clair.
 */
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob, file } from 'astro/loaders';

const faq = z.array(z.object({ q: z.string(), a: z.string() })).default([]);
const sources = z.array(z.object({ label: z.string(), url: z.url().optional() })).default([]);

/** Une page par diagnostic : src/content/diagnostics/*.md */
const diagnostics = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/diagnostics' }),
  schema: z.object({
    title: z.string(), // H1
    shortName: z.string(), // libellé court (menus, cartes)
    seoTitle: z.string(),
    description: z.string().max(170),
    order: z.number(),
    icon: z.string(), // nom d'icône Phosphor (ex. 'lightning')
    summary: z.string(),
    concerned: z.string(), // biens concernés
    sale: z.string(), // obligation et validité en vente
    rental: z.string(), // obligation et validité en location
    validityHeadline: z.string(), // chiffre clé affiché en grand (ex. '10 ans')
    faq,
    related: z.array(z.string()).default([]),
    sources,
  }),
});

/** Articles du blog : src/content/blog/*.md */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string().max(170),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    related: z.array(z.string()).default([]), // identifiants de diagnostics
    faq,
    sources,
  }),
});

/** Pages zones desservies : src/content/zones/*.md */
const zones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/zones' }),
  schema: z.object({
    title: z.string(), // H1
    seoTitle: z.string(),
    description: z.string().max(170),
    kind: z.enum(['quartier', 'paris', 'departement']),
    order: z.number(),
    label: z.string(), // nom court (ex. 'Bastille')
    places: z.array(z.string()).default([]), // rues, places, communes
    faq,
  }),
});

/**
 * Avis clients RÉELS uniquement : src/content/avis.json
 * Copier les avis publiés sur Google (texte, prénom, date) sans les modifier.
 */
const avis = defineCollection({
  loader: file('./src/content/avis.json'),
  schema: z.object({
    id: z.string(),
    author: z.string(), // prénom + initiale
    date: z.coerce.date(),
    rating: z.number().min(1).max(5),
    text: z.string(),
    source: z.string().default('Google'),
  }),
});

export const collections = { diagnostics, blog, zones, avis };
