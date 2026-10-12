/**
 * Validation des formulaires (amélioration progressive).
 * Sans JavaScript, la validation native du navigateur s'applique.
 * Avec JavaScript : messages d'erreur en français sous chaque champ,
 * focus sur le premier champ en erreur, bouton désactivé pendant l'envoi.
 */

const messages: Record<string, string> = {
  valueMissing: 'Ce champ est obligatoire.',
  typeMismatch: 'Le format n’est pas valide.',
  patternMismatch: 'Le format n’est pas valide.',
  rangeUnderflow: 'La valeur est trop petite.',
  rangeOverflow: 'La valeur est trop grande.',
  tooShort: 'Ce champ est trop court.',
};

function messageFor(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  const custom = el.dataset.error;
  for (const key of Object.keys(messages)) {
    if (el.validity[key as keyof ValidityState]) return custom && key !== 'valueMissing' ? custom : messages[key];
  }
  return '';
}

function showError(el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  const id = `${el.id || el.name}-error`;
  let box = document.getElementById(id);
  const msg = el.validity.valid ? '' : messageFor(el);
  if (!box) {
    box = document.createElement('p');
    box.id = id;
    box.className = 'field-error';
    const host = el.closest('.field, fieldset') ?? el.parentElement!;
    host.appendChild(box);
  }
  box.textContent = msg;
  box.hidden = !msg;
  if (el.type !== 'checkbox' && el.type !== 'radio') {
    el.setAttribute('aria-invalid', String(!!msg));
    el.setAttribute('aria-describedby', [el.getAttribute('aria-describedby'), id].filter(Boolean).filter((v, i, a) => a.indexOf(v) === i).join(' '));
  }
}

/** Groupe de cases « au moins une cochée » : <fieldset data-require-one> */
function checkGroups(form: HTMLFormElement) {
  let ok = true;
  form.querySelectorAll<HTMLFieldSetElement>('fieldset[data-require-one]').forEach((fs) => {
    const checked = fs.querySelectorAll('input:checked').length > 0;
    const id = `${fs.id}-error`;
    let box = document.getElementById(id);
    if (!box) {
      box = document.createElement('p');
      box.id = id;
      box.className = 'field-error';
      fs.appendChild(box);
    }
    box.textContent = checked ? '' : fs.dataset.error ?? 'Sélectionnez au moins une option.';
    box.hidden = checked;
    if (!checked) ok = false;
  });
  return ok;
}

export function enhanceForm(form: HTMLFormElement) {
  form.noValidate = true;
  const fields = () =>
    Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input:not([type=hidden]):not([name=bot-field]), select, textarea'));

  fields().forEach((el) => {
    el.addEventListener('blur', () => { if (el.value || el.type === 'checkbox') showError(el); });
    el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') showError(el); });
  });

  form.addEventListener('submit', (e) => {
    const invalid = fields().filter((el) => !el.checkValidity());
    invalid.forEach(showError);
    const groupsOk = checkGroups(form);
    if (invalid.length || !groupsOk) {
      e.preventDefault();
      const first = invalid[0] ?? form.querySelector<HTMLElement>('fieldset[data-require-one] input');
      first?.focus();
      return;
    }
    const btn = form.querySelector<HTMLButtonElement>('button[type=submit]');
    if (btn) { btn.disabled = true; btn.textContent = 'Envoi en cours…'; }
  });
}

/** Pré-remplit les champs à partir de l'URL (?diagnostics=dpe,erp&operation=vente). */
export function prefillFromUrl(form: HTMLFormElement) {
  const params = new URLSearchParams(location.search);
  const diags = params.get('diagnostics')?.split(',') ?? [];
  diags.forEach((id) => {
    const box = form.querySelector<HTMLInputElement>(`input[name="diagnostics"][value="${CSS.escape(id)}"]`);
    if (box) box.checked = true;
  });
  for (const key of ['operation', 'bien']) {
    const v = params.get(key);
    if (!v) continue;
    const radio = form.querySelector<HTMLInputElement>(`input[name="${key}"][value="${CSS.escape(v)}"]`);
    if (radio) radio.checked = true;
    const select = form.querySelector<HTMLSelectElement>(`select[name="${key}"]`);
    if (select && [...select.options].some((o) => o.value === v)) select.value = v;
  }
}
