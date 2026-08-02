/**
 * random.js
 * Случайное аниме — подсветка карточки и плавный скролл
 */

import { animeData } from '../data/animeData.js';
import { switchTab } from './tabs.js';
import { setPopularitySort } from './search.js';
import { filterGrid } from './render.js';

export function showRandomAnime() {
    const randomIndex = Math.floor(Math.random() * animeData.length);
    const target = animeData[randomIndex];

    if (target.poster) {
        const img = new Image();
        img.src = target.poster;
    }

    switchTab('popularity');
    setPopularitySort('rating');

    const searchInput = document.getElementById('search-popularity');
    if (searchInput) {
        searchInput.value = '';
    }
    filterGrid('popularity', '');

    setTimeout(() => {
        const card = document.querySelector(`.anime-card[data-anime-id="${target.id}"]`);
        if (!card) return;

        document.querySelectorAll('.card-random-glow').forEach(el => {
            el.classList.remove('card-random-glow');
        });

        card.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Pulsing golden glow via CSS class. Inline animation-delay (stagger) must be
        // reset to 0s — otherwise it overrides the glow animation start time.
        card.style.animationDelay = '0s';
        card.classList.add('card-random-glow');
        setTimeout(() => {
            card.classList.remove('card-random-glow');
            card.style.animationDelay = '';
        }, 2000);
    }, 450);
}

export function initRandomButton() {
    const btn = document.getElementById('random-btn');
    if (!btn) return;

    btn.addEventListener('click', showRandomAnime);
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.style.transition = 'transform 0.5s ease';
            icon.style.transform = 'rotate(360deg)';
            setTimeout(() => {
                icon.style.transition = '';
                icon.style.transform = '';
            }, 500);
        }
    });
}
