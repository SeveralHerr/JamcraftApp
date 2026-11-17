import { esc } from './html';

export interface SheetField { key: string; label: string; value?: string; placeholder?: string; required?: boolean; max: number; collapse?: boolean }
export interface SheetOptions { title: string; kicker: string; photo?: string; subHtml?: string; saveLabel: string; fields: SheetField[]; onSave: (v: Record<string, string>) => Promise<void> }

const $ = <T extends HTMLElement>(s: string) => document.querySelector(s) as T;

/** The lined "recipe card" bottom sheet: one dialog, reused for add and edit. */
export class Sheet {
  private onSave: SheetOptions['onSave'] | null = null;
  private returnFocus: HTMLElement | null = null;

  constructor(private toMessage: (err: unknown) => string) {
    $('#cancel').onclick = () => this.close();
    $('#sheetX').onclick = () => this.close();
    $('#scrim').addEventListener('click', (e) => { if ((e.target as HTMLElement).id === 'scrim') this.close(); });
    document.addEventListener('keydown', (e) => this.onKey(e));
    $('#sheetFields').addEventListener('click', (e) => this.reveal(e));
    $('#sheet').addEventListener('invalid', (e) => this.expand((e.target as HTMLElement).closest('.field.collapsed')), true);
    $('#sheet').addEventListener('submit', (e) => this.submit(e as SubmitEvent));
  }

  get isOpen() { return $('#scrim').classList.contains('show'); }

  open(o: SheetOptions) {
    $('#save').textContent = o.saveLabel;
    $('#sheetTitle').textContent = o.title;
    $('#sheetTitle').dataset.kicker = o.kicker;
    $('#sheet').classList.add('recipe');
    $<HTMLElement>('#sheetPol').hidden = !o.photo;
    if (o.photo) $<HTMLImageElement>('#sheetPolImg').src = o.photo;
    $('#sheetSub').innerHTML = o.subHtml ?? '';
    $('#sheetFields').innerHTML = o.fields.map(fieldHtml).join('');
    $('#sheetErr').textContent = '';
    this.onSave = o.onSave;
    if (!this.isOpen) {
      this.returnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      document.body.style.overflow = 'hidden';
      $('.wrap').inert = true;
    }
    $('#scrim').classList.add('show');
    const inputs = [...document.querySelectorAll<HTMLInputElement>('#sheetFields input')];
    (inputs.find((i) => !i.value && !i.closest('.collapsed')) ?? inputs[0])?.focus();
  }

  close() {
    if (!this.isOpen) return;
    $('#scrim').classList.remove('show');
    this.onSave = null;
    document.body.style.overflow = '';
    $('.wrap').inert = false;
    if (this.returnFocus?.isConnected) this.returnFocus.focus({ preventScroll: true });
    this.returnFocus = null;
  }

  private async submit(e: SubmitEvent) {
    e.preventDefault();
    if (!this.onSave) return;
    const vals = Object.fromEntries([...new FormData(e.target as HTMLFormElement)].map(([k, v]) => [k, String(v)]));
    const btn = $<HTMLButtonElement>('#save');
    btn.disabled = true;
    $('#sheetErr').textContent = '';
    try { await this.onSave(vals); this.close(); }
    catch (err) { $('#sheetErr').textContent = this.toMessage(err); }
    finally { btn.disabled = false; }
  }

  private reveal(e: Event) {
    const r = (e.target as HTMLElement).closest<HTMLElement>('[data-reveal]');
    if (!r) return;
    this.expand(r.closest('.field'));
    const inp = document.getElementById('f_' + r.dataset.reveal) as HTMLInputElement | null;
    inp?.focus();
    inp?.select();
  }

  private expand(field: Element | null) {
    if (!field) return;
    field.classList.remove('collapsed');
    field.querySelector('.as-line')?.remove();
  }

  private onKey(e: KeyboardEvent) {
    if (!this.isOpen) return;
    if (e.key === 'Escape') { e.preventDefault(); this.close(); return; }
    if (e.key !== 'Tab') return;
    const els = [...$('#sheet').querySelectorAll<HTMLElement>('button,input')].filter((el) => !(el as HTMLButtonElement).disabled && el.getClientRects().length);
    const first = els[0], last = els[els.length - 1], a = document.activeElement;
    if (e.shiftKey && a === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && a === last) { e.preventDefault(); first.focus(); }
  }
}

function fieldHtml(f: SheetField): string {
  const input = `<input id="f_${f.key}" name="${f.key}" placeholder="${esc(f.placeholder ?? '')}" value="${esc(f.value ?? '')}"${f.required ? ' required' : ''} maxlength="${f.max}">`;
  if (f.collapse && f.value) {
    return `<div class="field collapsed"><div class="as-line">From the kitchen of <b>${esc(f.value)}</b> · <button type="button" class="linkish" data-reveal="${f.key}" aria-label="Change name (from the kitchen of ${esc(f.value)})">change</button></div><div class="name-input"><label for="f_${f.key}">${esc(f.label)}</label>${input}</div></div>`;
  }
  return `<div class="field"><label for="f_${f.key}">${esc(f.label)}</label>${input}</div>`;
}
