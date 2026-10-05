// In-page accessibility + layout audit. A single expression: paste the whole file into
// Claude-in-Chrome javascript_tool (or DevTools console) and read the returned JSON.
// Empty arrays = pass. Run it at desktop width and again inside a 390px iframe for mobile.
(() => {
  const describe = (el) =>
    el.tagName.toLowerCase() +
    (el.id ? '#' + el.id : '') +
    (typeof el.className === 'string' && el.className.trim()
      ? '.' + el.className.trim().split(/\s+/).slice(0, 2).join('.')
      : '');
  const visible = (el) => el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
  const accessibleName = (el) =>
    (el.getAttribute('aria-label') ||
      (el.getAttribute('aria-labelledby') || '')
        .split(/\s+/)
        .map((id) => document.getElementById(id)?.textContent || '')
        .join(' ') ||
      el.textContent ||
      el.getAttribute('title') ||
      [...el.querySelectorAll('img[alt],svg title')].map((n) => n.getAttribute('alt') || n.textContent).join(' ') ||
      ''
    ).trim();

  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible);
  const levels = headings.map((h) => Number(h.tagName[1]));
  const skippedHeadings = [];
  levels.forEach((lvl, i) => {
    if (i > 0 && lvl > levels[i - 1] + 1)
      skippedHeadings.push(`h${levels[i - 1]} -> h${lvl}: "${headings[i].textContent.trim().slice(0, 60)}"`);
  });

  const ids = [...document.querySelectorAll('[id]')].map((el) => el.id);
  const duplicateIds = [...new Set(ids.filter((id, i) => ids.indexOf(id) !== i))];

  const width = document.documentElement.clientWidth;
  const overflowing = [...document.querySelectorAll('body *')]
    .filter((el) => visible(el) && el.getBoundingClientRect().right > width + 1)
    // keep only the outermost offenders
    .filter((el, _, all) => !all.includes(el.parentElement))
    .map((el) => `${describe(el)} right=${Math.round(el.getBoundingClientRect().right)}`);

  return JSON.stringify(
    {
      url: location.href,
      viewport: `${width}x${document.documentElement.clientHeight}`,
      h1Count: levels.filter((l) => l === 1).length,
      headingOutline: headings.map((h) => `${h.tagName} ${h.textContent.trim().slice(0, 40)}`),
      skippedHeadings,
      imagesMissingAlt: [...document.images].filter((i) => !i.hasAttribute('alt')).map((i) => i.src),
      brokenImages: [...document.images].filter((i) => i.complete && !i.naturalWidth).map((i) => i.src),
      eagerImagesBelowFold: [...document.images]
        .filter((i) => i.loading !== 'lazy' && i.getBoundingClientRect().top > innerHeight)
        .map((i) => i.src),
      unnamedLinks: [...document.querySelectorAll('a[href]')].filter((a) => visible(a) && !accessibleName(a)).map(describe),
      unnamedButtons: [...document.querySelectorAll('button,[role="button"]')]
        .filter((b) => visible(b) && !accessibleName(b))
        .map(describe),
      externalLinksMissingNoopener: [...document.querySelectorAll('a[target="_blank"]')]
        .filter((a) => !/noopener/.test(a.rel))
        .map((a) => a.href),
      duplicateIds,
      horizontalOverflow: { scrollWidth: document.documentElement.scrollWidth, clientWidth: width, offenders: overflowing },
    },
    null,
    2,
  );
})();
