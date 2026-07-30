/**
 * search.js
 * Поиск с debounce по всем вкладкам
 */

import { animeData, imbaData, charactersData, ecchiData, cuteData } from '../data/animeData.js';
import { renderPopularityGrid, renderImbaGrid, renderCharactersGrid, renderEcchiGrid, renderCuteGrid } from './render.js';

let searchTimeout = null;

const tabConfig = {
    popularity: { data: animeData, render: renderPopularityGrid, searchFields: ['title', 'genre'] },
    imba: { data: imbaData, render: renderImbaGrid, searchFields: ['name', 'anime', 'desc', 'power'] },
    characters: { data: charactersData, render: renderCharactersGrid, searchFields: ['name', 'anime', 'desc'] },
    ecchi: { data: ecchiData, render: renderEcchiGrid, searchFields: ['title', 'reason'] },
    cute: { data: cuteData, render: renderCuteGrid, searchFields: ['title', 'reason'] }
};

export function filterCurrentTab() {
    const activeTab = document.querySelector('.tab-active');
    if (!activeTab) return;

    const tabId = activeTab.id.replace('tab-', '');
    const searchInput = document.getElementById(`search-${tabId}`);

    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();

    const config = tabConfig[tabId];
    if (!config) return;

    const data = config.data;
    let filtered = data;

    if (query) {
        filtered = data.filter(item =>
            config.searchFields.some(field =>
                item[field] && item[field].toLowerCase().includes(query)
            )
        );
    }

    config.render(filtered);

    const countEl = document.getElementById(`count-${tabId}`);
    if (countEl) {
        countEl.textContent = filtered.length < data.length
            ? `${filtered.length} / ${data.length}`
            : `${data.length}`;
    }
}

export function initSearch() {
    // Навешиваем события на все поисковые поля с debounce
    document.querySelectorAll('[id^="search-"]').forEach(input => {
        input.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(filterCurrentTab, 200);
        });
    });
}

export function setPopularitySort(mode) {
    window.popularitySortMode = mode;

    const ratingBtn = document.getElementById('sort-rating');
    const cozyBtn = document.getElementById('sort-cozy');

    if (ratingBtn && cozyBtn) {
        const activeClasses = ['bg-[var(--card)]', 'border-[var(--accent)]/30'];
        if (mode === 'rating') {
            ratingBtn.classList.add(...activeClasses);
            cozyBtn.classList.remove(...activeClasses);
        } else {
            cozyBtn.classList.add(...activeClasses);
            ratingBtn.classList.remove(...activeClasses);
        }
    }

    const titleEl = document.getElementById('popularity-title');
    const subtitleEl = document.getElementById('popularity-subtitle');

    if (titleEl && subtitleEl) {
        if (mode === 'cozy') {
            titleEl.textContent = 'Топ по уютности';
            subtitleEl.textContent = 'Самые расслабленные и wholesome тайтлы';
        } else {
            titleEl.textContent = 'Топ по популярности';
            subtitleEl.textContent = 'По количеству участников на MyAnimeList (май 2026)';
        }
    }

    const searchInput = document.getElementById('search-popularity');
    const query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    let filtered = null;
    if (query) {
        const data = animeData || [];
        filtered = data.filter(item =>
            (item.title && item.title.toLowerCase().includes(query)) ||
            (item.genre && item.genre.toLowerCase().includes(query))
        );
    }
    renderPopularityGrid(filtered);
}

export function initSortButtons() {
    const ratingBtn = document.getElementById('sort-rating');
    const cozyBtn = document.getElementById('sort-cozy');

    if (ratingBtn) ratingBtn.addEventListener('click', () => setPopularitySort('rating'));
    if (cozyBtn) cozyBtn.addEventListener('click', () => setPopularitySort('cozy'));
}