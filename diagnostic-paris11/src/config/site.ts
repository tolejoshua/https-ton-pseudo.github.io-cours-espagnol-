/**
 * ============================================================================
 *  FICHE D'IDENTITÉ DU CABINET : le fichier à modifier en priorité
 * ============================================================================
 *  Toutes les informations de l'entreprise sont centralisées ici.
 *  Une valeur `null` affiche automatiquement un repère jaune
 *  « À CONFIRMER » sur le site, et n'est jamais envoyée à Google
 *  dans les données structurées. Remplacez-les par les vraies valeurs.
 * ============================================================================
 */

export const site = {
  /** Nom commercial affiché partout (en-tête, titres, données Google). */
  name: 'Cabinet Toledano',
  /** Complément affiché sous le logo. */
  descriptor: 'Diagnostics immobiliers · Paris 11e',
  /** Phrase d'accroche courte (pied de page, partage). */
  baseline: 'Diagnostics immobiliers certifiés à Paris et en petite couronne. Rapport sous 24 h.',

  /** Nom de domaine final, sans slash. Sert aussi à l'adresse e-mail. */
  domain: null as string | null, // ex. 'toledano-diagnostics.fr'

  contact: {
    /** Téléphone au format lisible et au format international (lien tel:). */
    phoneDisplay: '06 98 37 50 00',
    phoneE164: '+33698375000',
    /** Passer à false pour masquer le numéro sur tout le site. */
    showPhone: true,
    /**
     * Adresse e-mail publique (mentions légales). Nous recommandons une
     * adresse au nom de domaine, ex. contact@toledano-diagnostics.fr.
     * Les demandes du site arrivent par les formulaires (Netlify Forms).
     */
    email: null as string | null,
  },

  address: {
    street: '54 avenue Philippe Auguste',
    postalCode: '75011',
    city: 'Paris',
    region: 'Île-de-France',
    country: 'FR',
    /** Coordonnées GPS exactes (Google Maps > clic droit sur l'adresse). */
    geo: null as { lat: number; lng: number } | null,
    /** Le local reçoit-il du public ? Sinon, masquer l'adresse sur Google Business Profile. */
    receivesPublic: null as boolean | null,
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=54+avenue+Philippe+Auguste+75011+Paris',
  },

  /**
   * Horaires. Format : jours schema.org (Mo, Tu, We, Th, Fr, Sa, Su) + heures.
   * Laisser `null` tant qu'ils ne sont pas confirmés.
   */
  hours: null as { days: string[]; label: string; opens: string; closes: string }[] | null,
  // Exemple :
  // hours: [
  //   { days: ['Mo','Tu','We','Th','Fr'], label: 'Lundi au vendredi', opens: '08:30', closes: '19:00' },
  //   { days: ['Sa'], label: 'Samedi', opens: '09:00', closes: '13:00' },
  // ],

  /** Engagements de délai (fournis par le cabinet). */
  delays: {
    appointment: 'sous une semaine environ',
    report: 'sous 24 h',
  },

  /** Certification des compétences du diagnostiqueur (obligatoire). */
  certification: {
    body: null as string | null, // ex. 'Bureau Veritas Certification'
    number: null as string | null, // ex. '1234567'
    /** Lien vers l'annuaire officiel des diagnostiqueurs certifiés (ministère). */
    directoryUrl: 'https://diagnostiqueurs.din.developpement-durable.gouv.fr/index.action',
  },

  /** Assurance responsabilité civile professionnelle (obligatoire). */
  insurance: {
    insurer: null as string | null,
    policyNumber: null as string | null,
  },

  /** Informations légales (mentions légales, CGV). */
  legal: {
    companyName: null as string | null, // raison sociale
    legalForm: null as string | null, // SARL, SAS, EI…
    capital: null as string | null,
    siret: null as string | null,
    rcs: null as string | null, // ex. 'RCS Paris 123 456 789'
    vat: null as string | null,
    director: null as string | null, // directeur de la publication
    mediator: null as { name: string; url: string } | null, // médiateur de la consommation
    host: {
      name: 'Netlify, Inc.',
      address: '512 2nd Street, Suite 200, San Francisco, CA 94107, États-Unis',
      url: 'https://www.netlify.com',
    },
  },

  /** Profil Google Business Profile (lien « Voir tous les avis »). */
  googleBusinessUrl: null as string | null,
  /** Lien direct « Laisser un avis » (Google Business Profile > Demander des avis). */
  googleReviewUrl: null as string | null,

  /**
   * Prise de rendez-vous en ligne. Renseigner l'identifiant Cal.com
   * (ex. 'cabinet-toledano/diagnostic') pour afficher l'agenda en ligne.
   * Laisser `null` : la page affiche un formulaire de demande de créneau.
   */
  calcomLink: null as string | null,

  /** Statistiques sans cookies (Plausible). Ex. 'toledano-diagnostics.fr'. */
  plausibleDomain: null as string | null,

  /** Zone d'intervention. */
  areaServed: ['Paris', 'Hauts-de-Seine', 'Seine-Saint-Denis', 'Val-de-Marne'],
} as const;

export const phoneHref = `tel:${site.contact.phoneE164}`;

/** Navigation principale (une seule ligne sur ordinateur). */
export const mainNav = [
  { href: '/diagnostics/', label: 'Diagnostics' },
  { href: '/tarifs/', label: 'Tarifs' },
  { href: '/quels-diagnostics/', label: 'Simulateur' },
  { href: '/zones/', label: 'Zones' },
  { href: '/blog/', label: 'Conseils' },
  { href: '/a-propos/', label: 'Le cabinet' },
];
