/**
 * ============================================================================
 *  GRILLE TARIFAIRE
 * ============================================================================
 *  ⚠ TOUS LES PRIX CI-DESSOUS SONT DES EXEMPLES FICTIFS.
 *  Tant que `isExample` vaut true, chaque prix est affiché avec la mention
 *  « exemple » et un avertissement visible en haut de la page Tarifs.
 *
 *  Pour publier vos vrais prix :
 *    1. remplacez les montants (en euros TTC) ;
 *    2. passez `isExample` à false.
 * ============================================================================
 */

export const pricing = {
  isExample: true,
  currency: '€ TTC',

  /** Colonnes du tableau : typologies de biens. */
  propertyTypes: [
    { id: 'studio', label: 'Studio / T1', hint: 'jusqu’à 30 m²' },
    { id: 't2', label: 'T2', hint: '30 à 50 m²' },
    { id: 't3', label: 'T3', hint: '50 à 70 m²' },
    { id: 't4', label: 'T4', hint: '70 à 90 m²' },
    { id: 't5', label: 'T5 et plus', hint: 'plus de 90 m²' },
    { id: 'maison', label: 'Maison', hint: 'selon surface' },
  ],

  /** Packs : prix par typologie (mêmes identifiants que ci-dessus). */
  packs: [
    {
      id: 'vente',
      name: 'Pack vente',
      description:
        'Les diagnostics exigés pour vendre, déterminés selon l’année de construction et l’âge des installations.',
      includes: ['DPE', 'État des risques (ERP)', 'Loi Carrez', 'Termites', 'Électricité et gaz si plus de 15 ans', 'Plomb et amiante selon l’année'],
      prices: { studio: 250, t2: 290, t3: 330, t4: 370, t5: 420, maison: 490 },
    },
    {
      id: 'location',
      name: 'Pack location',
      description:
        'Le dossier à annexer au bail, avec la surface habitable (loi Boutin) pour une location vide.',
      includes: ['DPE', 'État des risques (ERP)', 'Surface habitable (Boutin)', 'Électricité et gaz si plus de 15 ans', 'Plomb selon l’année'],
      prices: { studio: 190, t2: 220, t3: 250, t4: 280, t5: 320, maison: 380 },
    },
  ],

  /** Diagnostics à l'unité : prix « à partir de ». Clés = identifiants des pages diagnostics. */
  single: {
    dpe: 120,
    amiante: 100,
    plomb: 110,
    electricite: 100,
    gaz: 100,
    termites: 90,
    'loi-carrez-boutin': 70,
    erp: 25,
  } as Record<string, number>,

  notes: [
    'Les éventuels frais de déplacement sont indiqués sur le devis, avant toute intervention.',
    'Un seul rendez-vous pour l’ensemble des diagnostics de votre bien.',
    'Le devis définitif dépend de la surface, de l’année du permis de construire et des installations.',
  ],
};

export function formatPrice(value: number) {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(value) + ' €';
}
