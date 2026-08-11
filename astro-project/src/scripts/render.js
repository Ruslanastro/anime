/**
 * render.js
 * Client-side DOM manipulation for sorting and filtering.
 * NO HTML generation — all cards are rendered by Astro at build time.
 */

export function filterGrid(tabId, query) {
  const grid = document.getElementById(`grid-${tabId}`);
  if (!grid) return;

  const trimmed = query.toLowerCase().trim();
  const cards = Array.from(grid.querySelectorAll('.anime-card, .info-card, .ln-card'));

  let visibleCount = 0;
  for (const card of cards) {
    const text = card.textContent.toLowerCase();
    if (!trimmed || text.includes(trimmed)) {
      card.style.display = '';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  }

  const countEl = document.getElementById(`count-${tabId}`);
  if (countEl) {
    const total = cards.length;
    countEl.textContent = visibleCount < total ? `${visibleCount} / ${total}` : `${total}`;
  }
}

export function sortPopularityGrid(mode) {
  const grid = document.getElementById('grid-popularity');
  if (!grid) return;

  grid.classList.toggle('sort-cozy', mode === 'cozy');
  grid.classList.toggle('sort-shiki', mode === 'shiki');

  const cards = Array.from(grid.querySelectorAll('.anime-card'));
  if (cards.length === 0) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // FLIP: запоминаем позиции до перестановки
  let firstRects = null;
  if (!reduceMotion) {
    firstRects = new Map();
    for (const card of cards) {
      firstRects.set(card, card.getBoundingClientRect());
    }
  }

  cards.sort((a, b) => {
    if (mode === 'cozy') {
      const aScore = parseFloat(a.dataset.cozyScore) || 0;
      const bScore = parseFloat(b.dataset.cozyScore) || 0;
      return bScore - aScore;
    }
    if (mode === 'members') {
      const aMembers = parseInt(a.dataset.members) || 0;
      const bMembers = parseInt(b.dataset.members) || 0;
      return bMembers - aMembers;
    }
    if (mode === 'shiki') {
      const aScore = parseFloat(a.dataset.shikiScore);
      const bScore = parseFloat(b.dataset.shikiScore);
      if (Number.isNaN(aScore)) return 1;
      if (Number.isNaN(bScore)) return -1;
      return bScore - aScore;
    }
    const aRank = parseInt(a.dataset.rank) || 999;
    const bRank = parseInt(b.dataset.rank) || 999;
    return aRank - bRank;
  });

  for (const card of cards) {
    grid.appendChild(card);
    if (mode === 'cozy') {
      card.dataset.tooltip = card.dataset.tooltipCozy || card.dataset.tooltip;
    } else {
      card.dataset.tooltip = card.dataset.tooltipRating || card.dataset.tooltip;
    }
  }

  // FLIP: анимируем смещение на новые места
  if (firstRects) {
    const duration = 320;
    for (const card of cards) {
      const first = firstRects.get(card);
      const last = card.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (!dx && !dy) continue;

      // Пока идет FLIP — отключаем CSS-transform hover, чтобы не было конфликта
      card.classList.add('flip-animating');
      const anim = card.animate(
        [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
        { duration, easing: 'cubic-bezier(0.4, 0, 0.2, 1)' }
      );
      anim.addEventListener(
        'finish',
        () => {
          card.classList.remove('flip-animating');
        },
        { once: true }
      );
    }
  }

  const searchInput = document.getElementById('search-popularity');
  if (searchInput && searchInput.value) {
    filterGrid('popularity', searchInput.value);
  }
}
