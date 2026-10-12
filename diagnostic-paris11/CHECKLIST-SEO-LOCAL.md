# Checklist SEO local (actions hors site)

Pour ressortir sur « diagnostic immobilier Paris 11 », « DPE Paris 11e » ou « diagnostiqueur Bastille », le site ne suffit pas. Le facteur n°1 du référencement local est la **fiche Google Business Profile**, puis les **avis** et la **cohérence des informations** partout sur le web.

## 1. Google Business Profile (priorité absolue)

- [ ] Revendiquer ou créer la fiche sur [business.google.com](https://business.google.com) et la faire valider (courrier, appel ou vidéo).
- [ ] **Nom** : le nom réel du cabinet, sans mots-clés ajoutés (« Cabinet X » et non « Cabinet X Diagnostic Immobilier Paris 11 DPE »). C'est la première cause de suspension.
- [ ] **Catégorie principale** : « Service de diagnostic immobilier » (ou l'intitulé le plus proche proposé par Google). Catégories secondaires pertinentes uniquement.
- [ ] **Adresse** : 54 avenue Philippe Auguste, 75011 Paris. Si le local ne reçoit pas de clients, la masquer et définir une **zone desservie** (Paris, Hauts-de-Seine, Seine-Saint-Denis, Val-de-Marne).
- [ ] **Téléphone**, **site web** (`https://www.votre-domaine.fr`), **horaires**, y compris les horaires exceptionnels (jours fériés).
- [ ] **Services** : ajouter chaque diagnostic avec une courte description (reprendre les résumés du site).
- [ ] **Description** (750 caractères) : activité, zone, délais, certification. Sans liste de mots-clés.
- [ ] **Photos réelles** : façade, plaque, diagnostiqueur au travail, matériel (laser, appareil plomb), véhicule. Une dizaine au départ, puis une ou deux par mois.
- [ ] **Posts Google** : publier chaque nouvel article du blog sous forme de post.
- [ ] **Questions et réponses** : ajouter soi-même les questions fréquentes (reprendre la FAQ du site).
- [ ] Ajouter le lien de la fiche dans `src/config/site.ts` (`googleBusinessUrl`).

## 2. Collecte d'avis (régulière, jamais achetée)

- [ ] Récupérer le **lien direct « Laisser un avis »** (Google Business Profile → Demander des avis) et le mettre dans `googleReviewUrl`.
- [ ] Envoyer ce lien **avec chaque rapport**, par e-mail ou SMS, avec une phrase simple : « Si vous êtes satisfait, un avis nous aide beaucoup. »
- [ ] Imprimer un **QR code** vers ce lien sur les cartes de visite.
- [ ] **Répondre à tous les avis**, positifs comme négatifs, sous 48 h, de façon personnalisée.
- [ ] Copier les avis réels sur le site (`src/content/avis.json`), sans modification et en citant Google. Le plus sûr est de demander son accord au client concerné.
- [ ] À ne jamais faire : acheter des avis, en rédiger soi-même, conditionner une remise à un avis. C'est interdit (pratique commerciale trompeuse) et Google le détecte.

## 3. Cohérence NAP (Nom, Adresse, Téléphone)

Le nom, l'adresse et le téléphone doivent être **strictement identiques** partout (même orthographe, même format de numéro).

- [ ] Pages Jaunes (pagesjaunes.fr), fiche professionnelle
- [ ] Apple Business Connect (Plans sur iPhone)
- [ ] Bing Places for Business
- [ ] Annuaire officiel des diagnostiqueurs certifiés (ministère) : vérifier que les informations sont à jour auprès de l'organisme certificateur
- [ ] Annuaires spécialisés du diagnostic immobilier et comparateurs de devis (choisir ceux qui ont du trafic réel)
- [ ] Annuaire de la CCI de Paris, et associations de commerçants du 11e
- [ ] Facebook et LinkedIn (page entreprise), avec lien vers le site
- [ ] Waze (pour la visibilité dans le GPS)

## 4. Liens et notoriété locale

- [ ] Partenariats avec les **agences immobilières**, **syndics** et **notaires** du 11e : demander un lien vers le site depuis leur page « partenaires ».
- [ ] Proposer un article d'expert (DPE, obligations) à un blog ou un média local.
- [ ] Sponsoriser un événement de quartier ou une association locale (souvent accompagné d'un lien).

## 5. Suivi

- [ ] **Google Search Console** : site vérifié, sitemap soumis (`/sitemap-index.xml`), suivi mensuel des requêtes et des pages.
- [ ] **Statistiques de la fiche Google** : appels, demandes d'itinéraire, clics vers le site.
- [ ] Mesurer les demandes reçues par les formulaires Netlify chaque mois.
- [ ] Publier **un article utile par mois** (sujets possibles : audit énergétique, DPE collectif en copropriété, diagnostics avant travaux, que faire d'un DPE F en 2028…).
- [ ] Mettre à jour les pages diagnostics à chaque évolution réglementaire, et la date « Informations à jour » des encadrés.

## Ce qu'il ne faut pas faire

- Créer plusieurs fiches Google (une par quartier) : interdit, risque de suspension.
- Dupliquer des pages « Diagnostic Paris 12 », « Diagnostic Paris 13 »… au contenu identique : Google les considère comme du spam. Les pages zones du site ont chacune un contenu propre ; en ajouter d'autres seulement avec un contenu réellement différent.
- Bourrer les textes de mots-clés : Google privilégie un contenu naturel et utile.
