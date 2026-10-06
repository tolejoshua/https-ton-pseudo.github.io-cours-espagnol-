# NovaAI — landing page

React + TypeScript + Vite + Tailwind CSS 4 + lucide-react.

```bash
npm install
npm run dev      # http://localhost:5199
npm run build    # dist/
```

## Structure

- `src/components/ScrollVideo.tsx` — fond vidéo piloté par le scroll : poster → `<video>` (repli par seek) → `<canvas>` (cache de 90 frames max, 960 px, lissage lerp 0.12, DPR ≤ 2). Aucune lecture automatique.
- `src/components/Reveal.tsx` — apparition au scroll (IntersectionObserver 0.15, 700 ms).
- `src/components/Navbar.tsx`, `SectionOne.tsx`, `SectionTwo.tsx` — contenu de la page.
- `src/assets.ts` — URL exactes de la vidéo CloudFront et du portrait.

## Copies locales facultatives

Pour le développement hors ligne, déposer dans `public/` :
- `hero.mp4` (même fichier que la vidéo CloudFront) ;
- `hero-poster.jpg` (première frame). Si le fichier est absent, le poster est simplement masqué.
