/**
 * Met en italique serif la fin d'un titre (signature typographique) :
 * « Diagnostic amiante à Paris » → « Diagnostic amiante <em>à Paris</em> ».
 *
 * Règles : au plus les 3 derniers mots, jamais de chiffres ni de « : ( ) »
 * (les chiffres d'Instrument Serif italique se lisent mal, ex. « 11 » ≈ « ll »),
 * et le premier mot du titre reste toujours en romain.
 */
const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);

export function accentTitle(title: string) {
  const words = escape(title).split(' ');
  const bad = (w: string) => /[0-9:()]/.test(w);
  // Fin de l'italique : on saute les mots finaux contenant des chiffres (« 11e », « (94) »)
  let end = words.length;
  while (end > 1 && bad(words[end - 1])) end--;
  // Début : au plus 3 mots, sans chiffres ni ponctuation forte, premier mot en romain
  let start = end;
  while (start > 1 && end - start < 3 && !bad(words[start - 1])) start--;
  // Si une préposition de lieu figure dans le segment, l'italique commence à elle
  for (let i = start; i < end; i++) {
    if (['à', 'en', 'dans'].includes(words[i])) { start = i; break; }
  }
  if (start >= end) return words.join(' ');
  const after = words.slice(end).join(' ');
  return `${words.slice(0, start).join(' ')} <em>${words.slice(start, end).join(' ')}</em>${after ? ' ' + after : ''}`;
}
