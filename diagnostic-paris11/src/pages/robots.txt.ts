// robots.txt généré avec l'URL du site (variable SITE_URL).
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL('sitemap-index.xml', site).toString();
  return new Response(`User-agent: *\nAllow: /\nDisallow: /merci/\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
