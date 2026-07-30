/**
 * detail.js
 * Детальная страница аниме и модальное окно персонажа
 */

import { konosubaCharacters } from '../data/characters/konosuba.js';
import { slime300Characters } from '../data/characters/slime300.js';
import { mileCharacters } from '../data/characters/mile.js';
import { smartphoneCharacters } from '../data/characters/smartphone.js';

let lastScrollPosition = 0;

export function showAnimeDetail(anime) {
    if (!anime) return;

    const content = document.getElementById('content-popularity');
    if (!content) return;

    lastScrollPosition = window.scrollY;

    const header = content.querySelector('.flex.items-end.justify-between');
    const sortRow = content.querySelector('.gap-2');
    const searchRow = content.querySelector('.gap-3');
    const grid = document.getElementById('grid-popularity');
    const detailView = document.getElementById('anime-detail-view');

    if (!detailView) return;

    if (header) header.classList.add('hidden');
    if (sortRow) sortRow.classList.add('hidden');
    if (searchRow) searchRow.classList.add('hidden');
    if (grid) grid.classList.add('hidden');

    detailView.classList.remove('hidden');

    requestAnimationFrame(() => {
        window.scrollTo(0, 0);
    });

    const d = anime.details || {};

    const poster = document.getElementById('detail-poster');
    if (poster) {
        poster.src = anime.poster || '';
        poster.alt = anime.title || '';
    }

    const rankBadge = document.getElementById('detail-rank-badge');
    if (rankBadge) rankBadge.textContent = `#${anime.rank}`;

    const titleEl = document.getElementById('detail-title');
    if (titleEl) titleEl.textContent = anime.title || '';

    const genreEl = document.getElementById('detail-genre');
    if (genreEl) genreEl.textContent = anime.genre || '';

    const scoreEl = document.getElementById('detail-score');
    if (scoreEl) scoreEl.textContent = anime.score || '—';

    const descEl = document.getElementById('detail-description');
    if (descEl) {
        descEl.textContent = anime.description || 'Описание пока недоступно.';
    }

    const charsContainer = document.getElementById('detail-characters');
    if (charsContainer) {
        charsContainer.innerHTML = '';
        const chars = d.mainCharacters || [];
        if (chars.length > 0) {
            chars.forEach(ch => {
                const allCharMaps = [slime300Characters, mileCharacters, konosubaCharacters, smartphoneCharacters].filter(Boolean);
                const fullChar = allCharMaps.find(m => m[ch.name]) || {};
                const image = ch.image || fullChar.image;

                const card = document.createElement('div');
                card.className = 'cursor-pointer rounded-2xl border border-(--border) bg-(--card)/80 overflow-hidden transition-all hover:border-(--accent)/40 hover:bg-(--card) hover:-translate-y-px active:scale-[0.985] flex flex-col';

                let imageHTML = '';
                if (image) {
                    imageHTML = `
                        <div class="w-full aspect-3/4 bg-(--bg)/60 shrink-0 relative">
                            <img src="${image}"
                                 class="w-full h-full object-cover object-bottom"
                                 alt="${ch.name}">
                            <div class="absolute bottom-0 left-0 right-0 h-8 bg-linear-to-t from-black/30 light:from-black/10 to-transparent"></div>
                        </div>
                    `;
                }

                card.innerHTML = `
                    ${imageHTML}
                    <div class="p-3 flex-1 flex flex-col">
                        <div class="font-semibold text-(--text) text-sm leading-tight">${ch.name}</div>
                        <div class="mt-1.5 text-xs leading-snug text-(--text-muted) line-clamp-2 flex-1">${ch.desc}</div>
                        <div class="mt-2 text-[10px] text-(--accent)/70">Подробнее →</div>
                    </div>
                `;
                card.addEventListener('click', () => {
                    showCharacterDetail(ch.name);
                });
                charsContainer.appendChild(card);
            });
        } else {
            charsContainer.innerHTML = `<div class="col-span-full text-xs text-(--text-muted)">Информация о персонажах скоро появится.</div>`;
        }
    }

    const malLink = document.getElementById('detail-mal-link');
    if (malLink) {
        if (d.malUrl) {
            malLink.href = d.malUrl;
            malLink.style.display = '';
        } else {
            malLink.style.display = 'none';
        }
    }

    const metaContainer = document.getElementById('detail-meta');
    if (metaContainer) {
        metaContainer.innerHTML = '';

        const metaItems = [
            { label: 'Сезоны', value: d.seasons ?? '—' },
            { label: 'Эпизоды', value: d.episodes ?? '—' },
            { label: 'Первоисточник', value: d.source ?? '—' },
            { label: 'Томов (ранобэ)', value: d.volumes ?? '—' },
            { label: 'Студия', value: d.studio ?? '—' },
            { label: 'Выпуск', value: d.aired ?? '—' },
            { label: 'Статус', value: d.status ?? '—' },
            { label: 'Тип', value: d.type ?? 'TV' },
        ];

        metaItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'border-l-2 border-(--border) pl-3';
            div.innerHTML = `
                <div class="text-[10px] font-medium uppercase tracking-1.5px text-(--text-muted)">${item.label}</div>
                <div class="mt-0.5 font-medium text-(--text) leading-tight">${item.value}</div>
            `;
            metaContainer.appendChild(div);
        });
    }
}

export function closeAnimeDetail() {
    const content = document.getElementById('content-popularity');
    if (!content) return;

    const header = content.querySelector('.flex.items-end.justify-between');
    const sortRow = content.querySelector('.gap-2');
    const searchRow = content.querySelector('.gap-3');
    const grid = document.getElementById('grid-popularity');
    const detailView = document.getElementById('anime-detail-view');

    if (detailView) detailView.classList.add('hidden');

    if (header) header.classList.remove('hidden');
    if (sortRow) sortRow.classList.remove('hidden');
    if (searchRow) searchRow.classList.remove('hidden');
    if (grid) grid.classList.remove('hidden');

    requestAnimationFrame(() => {
        window.scrollTo(0, lastScrollPosition);
        lastScrollPosition = 0;
    });
}

export function showCharacterDetail(characterName) {
    const modal = document.getElementById('character-detail-modal');
    if (!modal) return;

    // Search across all character data maps
    const charMaps = [slime300Characters, mileCharacters, konosubaCharacters, smartphoneCharacters];
    let data = null;
    for (const map of charMaps) {
        if (map && map[characterName]) {
            data = map[characterName];
            break;
        }
    }

    if (!data) {
        alert(`Подробная информация о персонаже "${characterName}" пока не добавлена (тестовый режим).`);
        return;
    }

    const nameEl = document.getElementById('char-name');
    const animeEl = document.getElementById('char-anime');
    const descEl = document.getElementById('char-full-desc');
    const persEl = document.getElementById('char-personality');
    const roleEl = document.getElementById('char-role');
    const bioEl = document.getElementById('char-biography');
    const imageEl = document.getElementById('char-image');

    if (nameEl) nameEl.textContent = data.name || characterName;
    if (animeEl) animeEl.textContent = data.anime || '';
    if (descEl) descEl.textContent = data.fullDescription || 'Описание будет позже.';
    if (persEl) persEl.textContent = data.personality || '—';
    if (roleEl) roleEl.textContent = data.role || '—';
    if (bioEl) bioEl.textContent = data.biography || '—';

    if (imageEl) {
        if (data.image) {
            imageEl.src = data.image;
            imageEl.alt = data.name || '';
            imageEl.classList.remove('hidden');
        } else {
            imageEl.classList.add('hidden');
        }
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    modal.onclick = (e) => {
        if (e.target === modal) {
            closeCharacterDetail();
        }
    };
}

export function closeCharacterDetail() {
    const modal = document.getElementById('character-detail-modal');
    if (!modal) return;

    modal.classList.remove('flex');
    modal.classList.add('hidden');
    modal.onclick = null;
}

export function initDetail() {
    // Back button for detail view
    const backBtn = document.querySelector('#anime-detail-view button');
    if (backBtn) {
        backBtn.addEventListener('click', closeAnimeDetail);
    }

    // Close button for character modal
    const closeBtn = document.querySelector('#character-detail-modal button');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeCharacterDetail);
    }
}