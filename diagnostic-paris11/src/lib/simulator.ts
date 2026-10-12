/**
 * Règles du simulateur « Quels diagnostics pour mon bien ? »
 *
 * Sources (vérifiées en octobre 2026, à faire relire par le diagnostiqueur) :
 *  - CCH art. L126-26 (dossier de diagnostic technique en vente)
 *  - Loi n° 89-462 du 6 juillet 1989, art. 3 et 3-3 (bail)
 *  - Arrêté préfectoral du 21 mars 2003 : tout Paris en zone termites
 *  - Calendrier DPE location : G 2025, F 2028, E 2034 (métropole)
 *
 * Le résultat est indicatif : il est rappelé sur la page que le devis
 * confirme la liste exacte.
 */

export type Answers = {
  operation: 'vente' | 'location';
  bien: 'appartement' | 'maison';
  construction: 'avant1949' | 'avant1997' | 'apres1997' | 'inconnu';
  electricite: 'plus15' | 'moins15' | 'inconnu';
  gaz: 'aucun' | 'plus15' | 'moins15' | 'inconnu';
  localisation: 'paris' | 'petite-couronne';
  bail?: 'vide' | 'meuble';
};

export type Result = {
  id: string; // identifiant de la page diagnostic
  name: string;
  status: 'obligatoire' | 'a-verifier' | 'a-disposition';
  validity: string;
  reason: string;
};

export function computeDiagnostics(a: Answers): Result[] {
  const sale = a.operation === 'vente';
  const r: Result[] = [];

  r.push({
    id: 'dpe',
    name: 'DPE',
    status: 'obligatoire',
    validity: '10 ans',
    reason: sale
      ? 'Obligatoire pour toute vente de logement ; la classe figure dans l’annonce.'
      : 'Obligatoire pour toute location ; un logement classé G ne peut plus être loué pour un nouveau bail.',
  });

  r.push({
    id: 'erp',
    name: 'État des risques (ERP)',
    status: 'obligatoire',
    validity: '6 mois',
    reason: 'Obligatoire pour tout bien, à remettre dès la première visite.',
  });

  // Plomb : immeubles construits avant le 1er janvier 1949
  if (a.construction === 'avant1949' || a.construction === 'inconnu') {
    r.push({
      id: 'plomb',
      name: 'Plomb (CREP)',
      status: a.construction === 'inconnu' ? 'a-verifier' : 'obligatoire',
      validity: sale ? '1 an si plomb détecté, illimitée sinon' : '6 ans si plomb détecté, illimitée sinon',
      reason: 'Requis pour les immeubles construits avant le 1er janvier 1949.',
    });
  }

  // Amiante : permis de construire avant le 1er juillet 1997
  if (a.construction !== 'apres1997') {
    r.push({
      id: 'amiante',
      name: sale ? 'Amiante' : 'Amiante (DAPP)',
      status:
        a.construction === 'inconnu' ? 'a-verifier' : sale ? 'obligatoire' : a.bien === 'appartement' ? 'a-disposition' : 'a-verifier',
      validity: sale ? 'Illimitée si absence d’amiante' : 'À tenir à disposition du locataire',
      reason: sale
        ? 'Requis si le permis de construire est antérieur au 1er juillet 1997.'
        : a.bien === 'appartement'
          ? 'Dossier amiante des parties privatives, à tenir à disposition du locataire (permis avant juillet 1997).'
          : 'Repérage amiante à prévoir si le permis est antérieur à juillet 1997 ; nous vous précisons les obligations pour une maison.',
    });
  }

  if (a.electricite !== 'moins15') {
    r.push({
      id: 'electricite',
      name: 'Électricité',
      status: a.electricite === 'inconnu' ? 'a-verifier' : 'obligatoire',
      validity: sale ? '3 ans' : '6 ans',
      reason: 'Requis si l’installation intérieure a plus de 15 ans (sans justificatif, elle est considérée comme ancienne).',
    });
  }

  if (a.gaz === 'plus15' || a.gaz === 'inconnu') {
    r.push({
      id: 'gaz',
      name: 'Gaz',
      status: a.gaz === 'inconnu' ? 'a-verifier' : 'obligatoire',
      validity: sale ? '3 ans' : '6 ans',
      reason: 'Requis si l’installation intérieure de gaz a plus de 15 ans.',
    });
  }

  if (sale) {
    r.push({
      id: 'termites',
      name: 'Termites',
      status: a.localisation === 'paris' ? 'obligatoire' : 'a-verifier',
      validity: '6 mois',
      reason:
        a.localisation === 'paris'
          ? 'Tout Paris est en zone de surveillance des termites (arrêté du 21 mars 2003).'
          : 'Dépend de l’arrêté préfectoral applicable à votre commune : nous le vérifions.',
    });
    if (a.bien === 'appartement') {
      r.push({
        id: 'loi-carrez-boutin',
        name: 'Mesurage loi Carrez',
        status: 'obligatoire',
        validity: 'Sans limite si pas de travaux',
        reason: 'Surface privative obligatoire pour la vente d’un lot de copropriété.',
      });
    }
  } else if (a.bail !== 'meuble') {
    r.push({
      id: 'loi-carrez-boutin',
      name: 'Surface habitable (loi Boutin)',
      status: 'obligatoire',
      validity: 'Sans limite si pas de travaux',
      reason: 'À indiquer dans le bail d’une location vide à usage de résidence principale.',
    });
  }

  return r;
}
