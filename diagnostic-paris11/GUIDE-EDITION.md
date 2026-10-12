# Guide d'édition : modifier le site sans être développeur

Tout se fait **depuis le site GitHub**, dans le navigateur. Chaque modification enregistrée (« commit ») est mise en ligne automatiquement par Netlify en une à deux minutes.

**Méthode générale :**
1. Ouvrez le dépôt sur github.com, puis le fichier à modifier.
2. Cliquez sur l'icône crayon (**Edit this file**).
3. Modifiez le texte, puis **Commit changes** (ajoutez une courte description).
4. Si une faute de format bloque la mise en ligne, Netlify affiche l'erreur dans **Deploys** et l'ancienne version reste en ligne : rien ne casse.

---

## 1. Les informations du cabinet

Fichier : `diagnostic-paris11/src/config/site.ts`

Nom, téléphone, adresse, horaires, certification, assurance, mentions légales, lien Google… Chaque valeur `null` affiche un repère jaune « À confirmer » sur le site.

Exemple, pour renseigner la certification :

```ts
certification: {
  body: 'Nom de l’organisme',      // au lieu de null
  number: '123456',
  ...
},
```

Attention aux apostrophes : dans ce fichier, utilisez l'apostrophe typographique `’` dans les textes, ou entourez le texte de guillemets doubles `"…"`.

Horaires (remplacer `hours: null as …` par) :

```ts
hours: [
  { days: ['Mo','Tu','We','Th','Fr'], label: 'Lundi au vendredi', opens: '08:30', closes: '19:00' },
  { days: ['Sa'], label: 'Samedi', opens: '09:00', closes: '12:30' },
],
```

## 2. Les prix

Fichier : `diagnostic-paris11/src/config/tarifs.ts`

1. Remplacez les montants (en euros TTC).
2. Passez `isExample: true` à `isExample: false` : la mention « exemple » et l'avertissement disparaissent.

## 3. Ajouter des avis clients (réels uniquement)

Fichier : `diagnostic-paris11/src/content/avis.json`

Copiez les avis tels qu'ils sont publiés sur votre fiche Google, sans les modifier, avec le prénom et l'initiale du nom :

```json
[
  {
    "id": "avis-1",
    "author": "Camille D.",
    "date": "2026-09-12",
    "rating": 5,
    "text": "Texte exact de l’avis publié sur Google.",
    "source": "Google"
  },
  {
    "id": "avis-2",
    "author": "Karim B.",
    "date": "2026-08-30",
    "rating": 5,
    "text": "…",
    "source": "Google"
  }
]
```

Chaque `id` doit être unique. Les six avis les plus récents s'affichent sur l'accueil.

## 4. Publier un article de blog

1. Dans GitHub, ouvrez le dossier `diagnostic-paris11/src/content/blog/`.
2. **Add file → Create new file**.
3. Nommez le fichier avec l'adresse souhaitée, en minuscules et avec des tirets : `audit-energetique-maison.md` donnera `/blog/audit-energetique-maison/`.
4. Collez ce modèle et remplissez-le :

```markdown
---
title: "Titre de l’article (affiché en grand)"
seoTitle: "Titre pour Google, 60 caractères maximum"
description: "Résumé pour Google, entre 120 et 160 caractères."
date: 2026-11-15
tags: [DPE]
related: [dpe, erp]
faq:
  - q: "Une question fréquente ?"
    a: "La réponse, en deux ou trois phrases."
sources:
  - label: "Nom de la source officielle"
    url: https://www.exemple.gouv.fr/page
---

Paragraphe d’introduction.

## Premier intertitre

Texte… Un lien vers une page du site : [demander un devis](/devis/).

- une liste
- à puces

## Deuxième intertitre

Texte…
```

5. **Commit changes**. L'article apparaît sur `/blog/`, dans le sitemap, avec ses données structurées.

**Règles à respecter :**
- mettez entre guillemets `"…"` tout texte du haut du fichier (entre les `---`) qui contient deux-points `:` ;
- `related` : identifiants des diagnostics liés, parmi `dpe`, `amiante`, `plomb`, `electricite`, `gaz`, `termites`, `loi-carrez-boutin`, `erp` ;
- `description` : 170 caractères maximum, sinon la mise en ligne est refusée avec un message clair ;
- pour préparer un article sans le publier, ajoutez `draft: true`.

**Conseils SEO :** un sujet par article, une vraie question de client, des informations vérifiées et sourcées, un lien vers le diagnostic concerné et vers le devis. Un article utile par mois vaut mieux que dix articles creux.

## 5. Modifier une page diagnostic ou une page zone

- Diagnostics : `src/content/diagnostics/<nom>.md` (ex. `dpe.md`).
- Zones : `src/content/zones/<nom>.md`.

Le haut du fichier (entre les `---`) contient les informations structurées (titre, validité, FAQ…), le bas contient le texte de la page en Markdown (`##` pour un intertitre, `-` pour une liste, `**gras**`).

## 6. Les autres pages

Les textes de l'accueil, des tarifs, de la page « Le cabinet » et des pages légales sont dans `src/pages/*.astro`. Le texte y est lisible entre les balises ; modifiez uniquement le texte, sans toucher aux éléments entre `<` et `>` ni entre `{` et `}`.

## 7. Remplacer la photo et le logo

- **Photo du diagnostiqueur** (page « Le cabinet ») : demandez à un développeur de l'intégrer, ou ajoutez-la dans `src/assets/` et remplacez l'emplacement prévu dans `src/pages/a-propos.astro` (commentaire « Emplacement photo »).
- **Logo** : le monogramme provisoire est dans `src/components/Logo.astro` et `public/favicon.svg`. Après un changement de nom, lancez `npm run images` pour régénérer l'image de partage.
