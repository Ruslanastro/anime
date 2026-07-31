/**
 * search.js
 * Поиск с debounce и сортировка — работают через DOM, без ререндера.
 */

import { filterGrid, sortPopularityGrid } from './render.js';

const SORT_ACTIVE_CLASSES = ['bg-[var(--card)]', 'border-[var(--accent)]/30'];
let searchTimeout = null;

export function filterCurrentTab() {
    const activeTab = document.querySelector('.tab-active');
    if (!activeTab) return;

    const tabId = activeTab.id.replace('tab-', '');
    const searchInput = document.getElementById(`search-${tabId}`);
    if (!searchInput) return;

    filterGrid(tabId, searchInput.value);
}

export function initSearch() {
    document.querySelectorAll('[id^="search-"]').forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(filterCurrentTab, 200);
        });
    });
}

export function setPopularitySort(mode) {
    const ratingBtn = document.getElementById('sort-rating');
    const cozyBtn = document.getElementById('sort-cozy');
    const membersBtn = document.getElementById('sort-members');

    if (ratingBtn && cozyBtn && membersBtn) {
        ratingBtn.classList.remove(...SORT_ACTIVE_CLASSES);
        cozyBtn.classList.remove(...SORT_ACTIVE_CLASSES);
        membersBtn.classList.remove(...SORT_ACTIVE_CLASSES);
        if (mode === 'rating') ratingBtn.classList.add(...SORT_ACTIVE_CLASSES);
        else if (mode === 'cozy') cozyBtn.classList.add(...SORT_ACTIVE_CLASSES);
        else membersBtn.classList.add(...SORT_ACTIVE_CLASSES);
    }

    const titleEl = document.getElementById('popularity-title');
    const subtitleEl = document.getElementById('popularity-subtitle');

    if (titleEl && subtitleEl) {
        if (mode === 'cozy') {
            titleEl.textContent = 'Топ по уютности';
            subtitleEl.textContent = 'Самые расслабленные и wholesome тайтлы';
        } else if (mode === 'members') {
            titleEl.textContent = 'Топ по участникам';
            subtitleEl.textContent = 'По количеству участников на MyAnimeList (июль 2026)';
        } else {
            titleEl.textContent = 'Топ по рейтингу MAL';
            subtitleEl.textContent = 'По оценке MyAnimeList (июль 2026)';
        }
    }

    sortPopularityGrid(mode);
}

export function initSortButtons() {
    const ratingBtn = document.getElementById('sort-rating');
    const cozyBtn = document.getElementById('sort-cozy');
    const membersBtn = document.getElementById('sort-members');

    if (ratingBtn) ratingBtn.addEventListener('click', () => setPopularitySort('rating'));
    if (cozyBtn) cozyBtn.addEventListener('click', () => setPopularitySort('cozy'));
    if (membersBtn) membersBtn.addEventListener('click', () => setPopularitySort('members'));
}
