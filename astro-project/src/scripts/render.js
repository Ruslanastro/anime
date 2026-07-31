/**
 * render.js
 * Client-side DOM manipulation for sorting and filtering.
 * NO HTML generation — all cards are rendered by Astro at build time.
 */

export function filterGrid(tabId, query) {
    const grid = document.getElementById(`grid-${tabId}`);
    if (!grid) return;

    const trimmed = query.toLowerCase().trim();
    const cards = grid.children;

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

    const cards = Array.from(grid.querySelectorAll('.anime-card'));
    if (cards.length === 0) return;

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
        const aRank = parseInt(a.dataset.rank) || 999;
        const bRank = parseInt(b.dataset.rank) || 999;
        return aRank - bRank;
    });

    for (const card of cards) {
        grid.appendChild(card);
        if (mode === 'cozy') {
            card.dataset.tooltip = card.dataset.tooltipCozy || card.dataset.tooltip;
        } else if (mode === 'members') {
            card.dataset.tooltip = card.dataset.tooltipRating || card.dataset.tooltip;
        } else {
            card.dataset.tooltip = card.dataset.tooltipRating || card.dataset.tooltip;
        }
    }

    const searchInput = document.getElementById('search-popularity');
    if (searchInput && searchInput.value) {
        filterGrid('popularity', searchInput.value);
    }
}
