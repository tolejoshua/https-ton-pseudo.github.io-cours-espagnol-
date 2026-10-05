// robots.txt généré avec l'URL du site (variable SITE_URL).
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).toString();
  // Site de prévisualisation : on bloque tous les robots
  if (process.env.NOINDEX === 'true') {
    return new Response('User-agent: *\nDisallow: /\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  return new Response(`User-agent: *\nAllow: /\nDisallow: /merci/\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
