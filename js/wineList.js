// Dynamically render wine list from JSON if provided.
// How to use:
// 1) Create a file at /wines.json (next to index.html) with the structure shown in wines.json.
// 2) On page load, if the file exists and contains at least one wine item, the static HTML inside .wineSection
//    will be replaced by the generated content from JSON. If the file doesn't exist or is empty, the original
//    HTML remains as-is.

(function () {
  function byClass(cls, root = document) {
    return root.querySelector(cls);
  }

  function escapeHtml(text) {
    const span = document.createElement('span');
    span.textContent = text == null ? '' : String(text);
    return span.innerHTML;
  }

  function buildSectionHeader(section) {
    const title = escapeHtml(section.title || '');
    const labels = section.labels || { dl1: '1dl', dl2: '2dl', bottle: '0.75l' };
    return (
      '<div class="wineType">' +
      `<h4>${title}</h4>` +
      '<div class="wineAmount">' +
      `<span class="wine-dl winePrice">${escapeHtml(labels.dl1 || '')}</span>` +
      '<span class="winePrice winePriceSeparator disabled">|</span>' +
      `<span class="wine-dl winePrice">${escapeHtml(labels.dl2 || '')}</span>` +
      '<span class="winePrice winePriceSeparator disabled">|</span>' +
      `<span class="winePrice">${escapeHtml(labels.bottle || '')}</span>` +
      '</div>' +
      '</div>'
    );
  }

  function formatPrice(val) {
    if (val === null || val === undefined || val === '') return '-';
    // If value is numeric, ensure it's displayed without currency and with ",-" suffix for bottle like in markup
    // We will add ,-, but keep it only for bottle; for dl we keep just the number to match current design.
    return String(val);
  }

  function buildWineItem(item) {
    const name = escapeHtml(item.name || '');
    const desc = escapeHtml(item.description || '');
    const values = escapeHtml(item.values || '');

    const p1 = formatPrice(item.prices && item.prices.dl1);
    const p2 = formatPrice(item.prices && item.prices.dl2);
    const pb = formatPrice(item.prices && item.prices.bottle);

    const bottleHtml = pb === '-' ?
      '<span class="winePrice">-</span>' :
      `<span class="winePrice">${escapeHtml(pb)}<span class="winePriceSingle">,-</span></span>`;

    return (
      '<div class="wine">' +
      '<div class="wineDetail">' +
      `<div class="wineName">${name}</div>` +
      `<div class="wineDescription">${desc}</div>` +
      (values ? `<div class="wineValues">${values}</div>` : '') +
      '</div>' +
      '<div class="wineAmount">' +
      `<span class="wine-dl winePrice">${escapeHtml(p1)}</span>` +
      '<span class="winePrice winePriceSeparator disabled">|</span>' +
      `<span class="wine-dl winePrice">${escapeHtml(p2)}</span>` +
      '<span class="winePrice winePriceSeparator disabled">|</span>' +
      bottleHtml +
      '</div>' +
      '</div>'
    );
  }

  function buildSection(section) {
    const header = buildSectionHeader(section);
    const items = Array.isArray(section.items) ? section.items : [];
    const itemsHtml = items.map(buildWineItem).join('');
    return header + '<div class="wineWrapper">' + itemsHtml + '</div>';
  }

  function countItems(data) {
    if (!data || !Array.isArray(data.sections)) return 0;
    return data.sections.reduce((sum, s) => sum + (Array.isArray(s.items) ? s.items.length : 0), 0);
  }

  async function init() {
    const sectionRoot = document.querySelector('.wineSection');
    if (!sectionRoot) return;

    try {
      const res = await fetch('wines.json', { cache: 'no-store' });
      if (!res.ok) return; // keep static content
      const data = await res.json();

      if (!data || !Array.isArray(data.sections) || countItems(data) === 0) {
        return; // keep static content if no items
      }

      const html = data.sections.map(buildSection).join('');
      sectionRoot.innerHTML = html;
    } catch (e) {
      // On any error, silently keep static content, but log for debugging.
      console.warn('Wine list JSON not applied:', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
