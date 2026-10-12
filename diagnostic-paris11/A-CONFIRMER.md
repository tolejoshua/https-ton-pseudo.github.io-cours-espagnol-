# À confirmer avant la mise en ligne

Chaque élément manquant s'affiche sur le site sous forme de repère jaune « [À confirmer : …] ». Les informations se renseignent dans `src/config/site.ts`, sauf indication contraire.

## Identité et contact

- [ ] **Nom commercial définitif.** Attention : sur Google Business Profile, le nom doit être le nom réel (enseigne, Kbis). Ajouter « Paris 11 » au nom sans que ce soit le vrai nom enfreint les règles de Google et peut entraîner une suspension de la fiche.
  Propositions : *Toledano Diagnostics* (« L'expertise certifiée de l'Est parisien »), *Maison Philippe Auguste – Diagnostics immobiliers* (« Votre bien, mesuré et certifié »), *Atelier du Diagnostic – Paris 11* (« Le diagnostic immobilier, établi avec précision »), ou garder *Cabinet Toledano*.
- [ ] **Franchise Ex'im** : si le cabinet est franchisé, vérifier dans le contrat de franchise que la création d'un site et d'une fiche Google indépendants est autorisée. Le site n'utilise ni le nom, ni le logo, ni les contenus Ex'im.
- [ ] Publication du numéro **06 98 37 50 00** (pour le masquer : `showPhone: false`).
- [ ] **E-mail public** : nous recommandons `contact@votre-domaine.fr` plutôt que l'adresse Hotmail (plus professionnel, moins de spam). Orthographe de `cabinetparis11@hotmail.com` à vérifier pour la réception des notifications Netlify.
- [ ] **Horaires** d'ouverture.
- [ ] Le local du 54 avenue Philippe Auguste **reçoit-il du public ?** Sinon, sur Google Business Profile, déclarer une zone desservie et masquer l'adresse.
- [ ] **Coordonnées GPS** exactes (`address.geo`).
- [ ] **Nom de domaine** (puis variable `SITE_URL` dans Netlify).
- [ ] **Lien de la fiche Google** et lien « laisser un avis » (`googleBusinessUrl`, `googleReviewUrl`).

## Réglementaire (obligatoire)

- [ ] **Organisme certificateur**, numéro de certificat et **domaines certifiés** (chaque diagnostic proposé doit être couvert).
- [ ] **Assureur RCP** et numéro de contrat.
- [ ] **Mentions légales** : raison sociale, forme juridique, capital, SIRET, RCS, TVA, directeur de la publication.
- [ ] **Médiateur de la consommation** : obligatoire dès lors que le cabinet travaille avec des particuliers.
- [ ] **CGV** : le texte fourni est un modèle, à faire valider par un juriste (modalités de paiement notamment).
- [ ] **Contrat de traitement Netlify (DPA)** : vérifier les garanties de transfert des données hors UE, mentionnées dans la politique de confidentialité.

## Offre

- [ ] **Liste exacte des diagnostics proposés.** Le site présente les 8 diagnostics de la demande initiale. L'audit énergétique n'est pas proposé (il est seulement mentionné comme une obligation pour la vente de maisons classées E, F ou G).
  Prestations possibles à ajouter si le cabinet les réalise : DPE collectif, dossier technique amiante (DTA), amiante avant travaux, plomb des parties communes, diagnostic technique global (DTG).
- [ ] **Tarifs réels** (`src/config/tarifs.ts`, puis `isExample: false`).
- [ ] Frais de déplacement en petite couronne : politique à préciser sur les devis.
- [ ] **Prise de rendez-vous** : garder le formulaire de demande de créneau, ou ouvrir un compte Cal.com.

## Contenus

- [ ] **Avis Google réels** à copier dans `src/content/avis.json`.
- [ ] **Photo réelle** du diagnostiqueur et quelques phrases sur son parcours (page « Le cabinet »).
- [ ] **Logo définitif** (le monogramme actuel est provisoire).

## Points réglementaires à faire relire par le diagnostiqueur

Le contenu a été rédigé à partir de recherches recoupées en octobre 2026. Les sites officiels (service-public.fr, Légifrance) n'étaient pas accessibles depuis l'environnement de développement : **le diagnostiqueur, expert du sujet, doit relire les pages diagnostics, le simulateur et les articles avant publication.** Points à vérifier en priorité :

1. **Termites à Paris** : le site indique que tout Paris est classé par l'arrêté préfectoral du 21 mars 2003 et que l'état doit dater de moins de 6 mois à la date de l'acte. Certaines sources évoquent un délai plus court à Paris (3 mois) : à confirmer.
2. **Termites en petite couronne** : le site ne liste volontairement aucune commune et indique « selon l'arrêté préfectoral, vérifié pour chaque adresse ».
3. **DPE 2026** : coefficient de l'électricité passé de 2,3 à 1,9 au 1er janvier 2026 ; attestation de mise à jour téléchargeable sur l'Observatoire DPE-Audit de l'ADEME.
4. **ERP** : nouvelle cartographie du retrait-gonflement des argiles, appliquée aux actes signés depuis le 1er juillet 2026.
5. **Références d'articles de loi** citées dans les encadrés « Références réglementaires » (notamment CCH L126-26, CSP R1334-14 et L1334-5, loi de 1965 art. 46, loi de 1989 art. 3 et 3-3, Code de l'environnement L125-5).
6. **Amiante en location pour une maison individuelle** : le simulateur affiche « À vérifier » ; préciser la règle si nécessaire.
7. **Durée de visite DPE** (« une à deux heures pour un appartement courant », page DPE) : à ajuster selon votre pratique.
