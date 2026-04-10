/**
 * PIOTRAS VALUE BAR
 * Loader for Home Assistant Custom Card
 *
 * Add this single file to HA Resources.
 * Card and editor files must be in the same directory.
 *
 * Compatible with:
 *   - HACS installation (/hacsfiles/...)
 *   - Manual installation (/local/...)
 *   - ES module and classic script loading
 */

const VERSION = '1.2.0';
const COMPONENT = 'piotras-value-bar';

// ── Base path detection ───────────────────────────────────────────────────────
let BASE;
try {
  const url = import.meta.url;
  BASE = url.substring(0, url.lastIndexOf('/') + 1);
} catch {
  const src = document.currentScript?.src || '';
  BASE = src ? src.substring(0, src.lastIndexOf('/') + 1) : '/local/';
}

// ── Load card + editor ───────────────────────────────────────────────────────
import(`${BASE}${COMPONENT}.js?v=${VERSION}`)
  .catch(e => console.error(`[piotras-value-bar] Failed to load: ${COMPONENT}.js`, e));

import(`${BASE}${COMPONENT}-editor.js?v=${VERSION}`)
  .catch(() => console.warn(`[piotras-value-bar] No editor found: ${COMPONENT}-editor.js`));

// ── Register card in HA card picker ─────────────────────────────────────────
window.customCards = window.customCards || [];

if (!window.customCards.some(c => c.type === COMPONENT)) {
  window.customCards.push({
    type:        COMPONENT,
    name:        'Piotras Value Bar',
    description: 'Clean and modern sensor value bars with color gradients, scale labels, and alarm indicators. Designed for readability and flexibility — supports 3 bar orientations and 3 name/value layout modes.',
    preview:     false,
  });
}

// ── Console badge ────────────────────────────────────────────────────────────
console.info(
  `%c PIOTRAS VALUE BAR %c v${VERSION} %c loaded from ${BASE} `,
  'color:white;background:#ff9800;font-weight:700;padding:2px 4px;border-radius:3px 0 0 3px;',
  'color:#ff9800;background:#fff3e0;font-weight:700;padding:2px 4px;',
  'color:#ff9800;background:white;font-weight:700;padding:2px 4px;border-radius:0 3px 3px 0;border:1px solid #ff9800;'
);