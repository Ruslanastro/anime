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

        document.querySelectorAll('.card-random-highlight').forEach(el => {
            el.classList.remove('card-random-highlight');
        });

        card.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Pulsing golden glow (contrasts with default purple hover)
        const glowKeyframes = [
            '0 0 0 4px #fbbf24, 0 0 30px 12px rgba(251, 191, 36, 0.4), 0 0 80px 30px rgba(251, 191, 36, 0.15)',
            '0 0 0 5px #f59e0b, 0 0 50px 20px rgba(245, 158, 11, 0.5), 0 0 100px 40px rgba(245, 158, 11, 0.2)',
            '0 0 0 4px #fbbf24, 0 0 30px 12px rgba(251, 191, 36, 0.4), 0 0 80px 30px rgba(251, 191, 36, 0.15)',
            '0 0 0 3px #f59e0b, 0 0 20px 8px rgba(245, 158, 11, 0.3), 0 0 60px 20px rgba(245, 158, 11, 0.1)',
        ];
        let pulseIndex = 0;

        card.style.setProperty('transition', 'box-shadow 0.25s ease');

        const pulse = setInterval(() => {
            card.style.setProperty('box-shadow', glowKeyframes[pulseIndex], 'important');
            pulseIndex = (pulseIndex + 1) % glowKeyframes.length;
        }, 400);

        setTimeout(() => {
            clearInterval(pulse);
            card.style.setProperty('box-shadow', '');
            card.style.setProperty('transition', '');
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
