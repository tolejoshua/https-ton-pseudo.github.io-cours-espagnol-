# Site du cabinet de diagnostic immobilier (Paris 11e)

Site vitrine statique, rapide et optimisé pour le référencement local.

- **Stack** : [Astro 7](https://astro.build) + Tailwind CSS 4, sans base de données.
- **Formulaires** : Netlify Forms (devis, rendez-vous, contact), avec un piège anti-robots et le filtrage anti-spam de Netlify.
- **Hébergement conseillé** : Netlify (les formulaires en dépendent).
- **Performances mesurées** : Lighthouse mobile 100/100 en performance, accessibilité, bonnes pratiques et SEO, sur les pages testées.

> Les informations à compléter sont listées dans **[A-CONFIRMER.md](./A-CONFIRMER.md)**.
> Elles apparaissent sur le site sous forme de repères jaunes « [À confirmer : …] ».

## Documentation

| Fichier | Contenu |
|---|---|
| [GUIDE-EDITION.md](./GUIDE-EDITION.md) | Modifier les textes, les prix, ajouter des avis, publier un article |
| [A-CONFIRMER.md](./A-CONFIRMER.md) | Informations manquantes et points réglementaires à faire valider |
| [CHECKLIST-SEO-LOCAL.md](./CHECKLIST-SEO-LOCAL.md) | Actions hors site : Google Business Profile, annuaires, avis |

## Arborescence

```
src/
  config/site.ts        ← fiche d'identité du cabinet (nom, téléphone, certification…)
  config/tarifs.ts      ← grille tarifaire (prix d'exemple à remplacer)
  content/diagnostics/  ← une page par diagnostic (Markdown)
  content/blog/         ← articles du blog (Markdown)
  content/zones/        ← pages zones desservies (Markdown)
  content/avis.json     ← avis clients réels (vide au départ)
  pages/                ← pages du site (accueil, tarifs, devis…)
  components/           ← éléments réutilisables (en-tête, FAQ, avis…)
  lib/simulator.ts      ← règles du simulateur « Quels diagnostics ? »
public/                 ← favicon, image de partage
scripts/                ← génération des images de partage
```

## Travailler en local

Prérequis : Node.js 22.12 ou plus récent.

```bash
npm install
npm run dev       # site de développement sur http://localhost:4321
npm run build     # génère le site final dans dist/
npm run preview   # prévisualise le site final
npm run check     # vérifie le code (types, erreurs)
npm run images    # régénère l'image de partage si le nom du cabinet change
```

## Mise en ligne sur Netlify (pas à pas)

### 1. Créer le site

1. Créez un compte gratuit sur [netlify.com](https://www.netlify.com) (connexion avec GitHub).
2. **Add new site → Import an existing project → GitHub**, puis choisissez ce dépôt.
3. Réglages de build :
   - **Base directory** : `diagnostic-paris11` (le site est dans ce sous-dossier) ;
   - **Build command** : `npm run build` ;
   - **Publish directory** : `diagnostic-paris11/dist`.
4. **Deploy**. Le site est en ligne en une minute environ sur une adresse `xxx.netlify.app`.

Ensuite, chaque modification enregistrée sur GitHub (branche de production) redéploie automatiquement le site.

### 2. Activer les formulaires et la réception par e-mail

1. Dans Netlify : **Forms → Enable form detection**, puis redéployez une fois (**Deploys → Trigger deploy**).
2. Les trois formulaires `devis`, `rendez-vous` et `contact` apparaissent dans **Forms**.
3. **Site configuration → Notifications → Emails and webhooks → Form submission notifications → Add notification → Email notification** : indiquez l'adresse du cabinet, pour tous les formulaires.
4. Faites un essai depuis le site en ligne et vérifiez la réception (pensez aux courriers indésirables).

> Les limites de l'offre gratuite (nombre d'envois par mois) varient selon l'offre Netlify : vérifiez-les dans **Forms → Usage**.

### 3. Brancher le nom de domaine

1. Achetez le domaine (OVHcloud, Gandi, etc.) si ce n'est pas fait.
2. Netlify : **Domain management → Add a domain**, saisissez `www.votre-domaine.fr`.
3. Chez le registraire, configurez les DNS comme Netlify l'indique :
   - un enregistrement **CNAME** `www` → `votre-site.netlify.app` ;
   - pour le domaine nu (`votre-domaine.fr`), l'enregistrement **A** indiqué par Netlify (ou déléguez les DNS à Netlify, plus simple).
4. Le certificat HTTPS est créé automatiquement (quelques minutes à quelques heures).
5. **Important pour le SEO** : dans **Site configuration → Environment variables**, ajoutez `SITE_URL` = `https://www.votre-domaine.fr`, puis redéployez. Cette valeur sert aux balises canoniques, au sitemap et au robots.txt.
6. Renseignez aussi `domain` dans `src/config/site.ts`.

### 4. Déclarer le site à Google

1. [Google Search Console](https://search.google.com/search-console) : ajoutez le domaine, vérifiez-le (enregistrement DNS TXT).
2. **Sitemaps** : soumettez `https://www.votre-domaine.fr/sitemap-index.xml`.
3. Suivez l'indexation des pages pendant les premières semaines.

### Et Vercel ?

Le site fonctionne aussi sur Vercel (Astro est détecté automatiquement), **mais pas les formulaires**, qui dépendent de Netlify Forms. Il faudrait alors les brancher sur un service comme Formspree ou Web3Forms. Netlify reste donc le choix recommandé.

## Prise de rendez-vous en ligne (option)

Par défaut, la page `/rendez-vous/` propose un formulaire de demande de créneau, que le cabinet confirme.

Pour un agenda en ligne avec confirmation et rappels automatiques par e-mail :
1. Créez un compte [Cal.com](https://cal.com), un type de rendez-vous « Diagnostic immobilier », et connectez votre agenda.
2. Activez les rappels par e-mail dans **Workflows** (vérifiez qu'ils sont inclus dans votre offre).
3. Dans `src/config/site.ts`, renseignez `calcomLink: 'votre-identifiant/diagnostic'`.

L'agenda ne se charge qu'au clic du visiteur, pour préserver la vitesse et la vie privée.

## Système de design

Inspiré de la maquette de référence fournie (agence immobilière haut de gamme) :

- **Typographie** : Inter Tight pour tout le texte ; mots d'accent en **Instrument Serif italique** via `<em>` dans les titres (`Nos <em>diagnostics</em>`). Chiffres clés en Inter Tight fine italique.
- **Couleurs** : blanc, noir `#121212`, gris doux `#f4f4f2`, un seul accent brun chaud `#33251d` (jetons dans `src/styles/global.css`).
- **Signatures** : cadre photo arrondi en haut de chaque page avec **onglets blancs découpés** (marque, menu, devis) — composant `PageFrame` ; **barre de recherche en pilule** sur l'accueil, branchée sur le simulateur ; cartes photo en escalier ; encarts bruns texte + photo ; cartes diagnostics avec étiquettes noires.
- **Photos** : `src/assets/photos/`, issues de Pexels (licence Pexels : usage commercial gratuit, attribution non obligatoire). À remplacer progressivement par de vraies photos du cabinet. Elles sont converties automatiquement en AVIF/WebP à la construction.

## Choix techniques

- **Aucun cookie** : pas de bandeau à afficher. Polices hébergées localement, pas de Google Fonts ni de Google Maps intégré.
- **Statistiques** (option) : renseignez `plausibleDomain` pour Plausible Analytics, un outil sans cookie (payant).
- **SEO** : balises title/description uniques, canoniques, Open Graph, sitemap, robots.txt, données structurées JSON-LD (`ProfessionalService`, `Service`, `FAQPage`, `Article`, `BreadcrumbList`). Aucune note ni aucun avis n'est déclaré dans les données structurées.
- **Typographie française** : espaces fines insécables ajoutées automatiquement avant `: ; ? !` à la construction (`src/lib/french-typography.mjs`).
- **Accessibilité** : contrastes WCAG AA vérifiés en mode clair et sombre, navigation au clavier, lien d'évitement, formulaires avec messages d'erreur liés aux champs, animations désactivées si l'utilisateur préfère réduire les mouvements.
