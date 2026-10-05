/**
 * Intégration Astro : typographie française à la construction du site.
 * Insère une espace fine insécable (U+202F) avant : ; ? ! » et après «,
 * pour éviter qu'une ponctuation se retrouve seule en début de ligne.
 * Les blocs <script>, <style> et <pre> sont laissés intacts.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const NNBSP = ' ';
const protectedBlocks = /(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<pre[\s\S]*?<\/pre>)/gi;

function fix(html) {
  return html
    .split(protectedBlocks)
    .map((part, i) => {
      if (i % 2 === 1) return part; // bloc protégé
      // Uniquement dans le texte entre balises (pas dans les attributs)
      return part.replace(/>([^<]+)</g, (_, text) =>
        '>' + text.replace(/(\S)[  ]([:;?!»])/g, `$1${NNBSP}$2`).replace(/«[  ]/g, `«${NNBSP}`) + '<'
      );
    })
    .join('');
}

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) await walk(p);
    else if (entry.name.endsWith('.html')) await writeFile(p, fix(await readFile(p, 'utf8')));
  }
}

export default function frenchTypography() {
  return {
    name: 'french-typography',
    hooks: {
      'astro:build:done': async ({ dir }) => walk(fileURLToPath(dir)),
    },
  };
}
