/**
 * Données structurées JSON-LD (schema.org) lues par Google.
 * Règle d'or : aucune valeur à confirmer (null) n'est publiée,
 * et aucune note ni aucun avis n'est inventé.
 */
import { site } from '@/config/site';

export function absoluteUrl(path: string, base: URL | string) {
  return new URL(path, base).toString();
}

/** Entreprise locale : ProfessionalService (sous-type de LocalBusiness). */
export function businessSchema(siteUrl: string) {
  const id = `${siteUrl}#cabinet`;
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': id,
    name: site.name,
    description: site.baseline,
    url: siteUrl,
    image: absoluteUrl('/og-default.png', siteUrl),
    logo: absoluteUrl('/favicon.svg', siteUrl),
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: [
      { '@type': 'City', name: 'Paris' },
      { '@type': 'AdministrativeArea', name: 'Hauts-de-Seine' },
      { '@type': 'AdministrativeArea', name: 'Seine-Saint-Denis' },
      { '@type': 'AdministrativeArea', name: 'Val-de-Marne' },
    ],
    knowsAbout: [
      'Diagnostic de performance énergétique (DPE)',
      'Diagnostic amiante',
      'Constat de risque d’exposition au plomb (CREP)',
      'Diagnostic électricité',
      'Diagnostic gaz',
      'État relatif à la présence de termites',
      'Mesurage loi Carrez et loi Boutin',
      'État des risques et pollutions (ERP)',
    ],
  };
  if (site.contact.showPhone) data.telephone = site.contact.phoneE164;
  if (site.contact.email) data.email = site.contact.email;
  if (site.address.geo) {
    data.geo = { '@type': 'GeoCoordinates', latitude: site.address.geo.lat, longitude: site.address.geo.lng };
  }
  if (site.hours) {
    data.openingHoursSpecification = site.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => `https://schema.org/${dayName(d)}`),
      opens: h.opens,
      closes: h.closes,
    }));
  }
  if (site.googleBusinessUrl) data.sameAs = [site.googleBusinessUrl];
  return data;
}

function dayName(d: string) {
  return (
    { Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday' } as Record<string, string>
  )[d];
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; url: string; siteUrl: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url,
    serviceType: 'Diagnostic immobilier',
    provider: { '@id': `${opts.siteUrl}#cabinet` },
    areaServed: ['Paris', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne'],
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  url: string;
  date: Date;
  updated?: Date;
  siteUrl: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: opts.url,
    datePublished: opts.date.toISOString(),
    dateModified: (opts.updated ?? opts.date).toISOString(),
    image: absoluteUrl('/og-default.png', opts.siteUrl),
    author: { '@type': 'Organization', name: site.name, url: opts.siteUrl },
    publisher: { '@id': `${opts.siteUrl}#cabinet` },
    inLanguage: 'fr-FR',
  };
}
