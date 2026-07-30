/**
 * render.js
 * Клиентский рендер для динамических вкладок (imba, characters, ecchi, cute)
 * и для сортировки/фильтрации popularity
 */

import { animeData, imbaData, charactersData, ecchiData, cuteData, getCozyInfo } from '../data/animeData.js';
import { showTooltip, hideTooltip } from './tooltip.js';
import { showAnimeDetail } from './detail.js';

// Sort mode for Popularity tab
window.popularitySortMode = 'rating';

function createPosterElement(posterUrl, title, genre = '', extraClasses = '') {
    const div = document.createElement('div');
    div.className = `relative h-48 poster rounded-t-3xl overflow-hidden ${extraClasses}`;

    const fallback = document.createElement('div');
    fallback.className = 'fallback-poster absolute inset-0 rounded-t-3xl flex flex-col items-center justify-center text-center px-4';
    fallback.innerHTML = `
        <div class="w-9 h-9 rounded-full bg-(--border) flex items-center justify-center mb-2.5">
            <i class="fa-solid fa-image text-base text-(--text-muted)"></i>
        </div>
        <div class="font-semibold text-13px leading-tight tracking-[-0.1px] text-(--text) line-clamp-3 px-2">
            ${title}
        </div>
        ${genre ? `<div class="mt-2 text-9px px-3 py-0.5 rounded-full bg-white/10 text-(--text-muted) tracking-wide">${genre}</div>` : ''}
    `;

    const img = document.createElement('img');
    img.src = posterUrl;
    img.alt = title;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.className = 'w-full h-full object-cover opacity-0 transition-opacity duration-500';

    img.onload = () => {
        if (img.naturalWidth > 50 && img.naturalHeight > 50) {
            fallback.style.display = 'none';
            img.style.opacity = '1';
        } else {
            img.style.display = 'none';
        }
    };

    img.onerror = () => {
        img.style.display = 'none';
    };

    div.appendChild(fallback);
    div.appendChild(img);

    return div;
}

function createInfoCard(innerHTML, extraClasses = '', index = null) {
    const card = document.createElement('div');
    card.className = `info-card rounded-3xl p-5 border border-(--border) ${extraClasses} card-stagger`;

    if (index !== null) {
        card.style.animationDelay = `${index * 40}ms`;
    }

    card.innerHTML = innerHTML;
    return card;
}

export function renderPopularityGrid(filteredData = null) {
    const container = document.getElementById('grid-popularity');
    if (!container) return;

    container.innerHTML = '';

    let dataToShow = filteredData || animeData || [];
    const sortMode = window.popularitySortMode || 'rating';

    if (sortMode === 'cozy') {
        dataToShow = dataToShow
            .map(anime => {
                const cozy = getCozyInfo ? getCozyInfo(anime.title) : null;
                return { ...anime, _cozy: cozy };
            })
            .filter(item => item._cozy)
            .sort((a, b) => (b._cozy.score || 0) - (a._cozy.score || 0));
    }

    dataToShow.forEach((anime, index) => {
        const card = document.createElement('div');
        card.className = 'anime-card rounded-3xl overflow-hidden flex flex-col h-full card-stagger';
        card.style.animationDelay = `${index * 35}ms`;

        const posterWrapper = document.createElement('div');
        posterWrapper.className = 'relative';

        const poster = createPosterElement(anime.poster, anime.title, anime.genre);
        posterWrapper.appendChild(poster);

        const rankBadge = document.createElement('div');
        rankBadge.className = 'absolute top-3 left-3 rank-badge px-3 py-1 rounded-2xl text-xs font-bold flex items-center gap-x-1';
        rankBadge.innerHTML = `<span>#${anime.rank}</span>`;
        posterWrapper.appendChild(rankBadge);

        const membersBadge = document.createElement('div');
        membersBadge.className = 'absolute top-3 right-3 bg-black/70 light:bg-white/70 px-2.5 py-1 rounded-2xl text-xs font-mono text-white light:text-(--text)';
        membersBadge.textContent = anime.members;
        posterWrapper.appendChild(membersBadge);

        const info = document.createElement('div');
        info.className = 'p-4 flex-1 flex flex-col';
        info.innerHTML = `
            <div class="font-semibold text-lg leading-tight line-clamp-2 mb-1 cursor-help hover:text-(--accent) transition-colors"
                 data-description="${anime.description || ''}">${anime.title}</div>
            <div class="text-xs text-violet-400 mb-auto">${anime.genre}</div>
            <div class="flex items-center justify-between pt-3 border-t border-(--border) mt-3">
                <div class="flex items-baseline gap-x-1">
                    ${sortMode === 'cozy' && anime._cozy ? `
                        <span class="text-emerald-400 font-bold text-lg">${anime._cozy.score}</span>
                        <span class="text-(--text-muted) text-xs">уют</span>
                    ` : `
                        <span class="text-emerald-400 font-bold text-lg">${anime.score}</span>
                        <span class="text-(--text-muted) text-xs">/10</span>
                    `}
                </div>
            </div>
        `;

        card.appendChild(posterWrapper);
        card.appendChild(info);
        container.appendChild(card);

        // Tooltip
        let tooltipText = anime.shortDescription || anime.description;
        if (sortMode === 'cozy' && anime._cozy && anime._cozy.reason) {
            tooltipText = anime._cozy.reason;
        }
        if (tooltipText) {
            card.addEventListener('mouseenter', () => {
                showTooltip(card, tooltipText);
            });
            card.addEventListener('mouseleave', () => {
                hideTooltip();
            });
        }

        // Click opens detail
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            showAnimeDetail(anime);
        });
    });
}

export function renderImbaGrid(filtered = null) {
    const container = document.getElementById('grid-imba');
    if (!container) return;
    container.innerHTML = '';

    const data = filtered || imbaData || [];

    data.forEach((hero, index) => {
        const card = createInfoCard(`
            <div class="flex justify-between items-start mb-3">
                <div>
                    <div class="font-bold text-xl">${hero.name}</div>
                    <div class="text-violet-400 text-sm">${hero.anime}</div>
                </div>
                <div class="text-right">
                    <div class="text-3xl font-bold text-violet-400">${hero.level}</div>
                    <div class="text-10px text-(--text-muted) -mt-1">POWER</div>
                </div>
            </div>
            <div class="text-sm text-(--text-muted) mb-3">${hero.desc}</div>
            <div class="text-xs px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full inline-block">
                ${hero.power}
            </div>
        `, '', index);
        container.appendChild(card);
    });
}

export function renderCharactersGrid(filtered = null) {
    const container = document.getElementById('grid-characters');
    if (!container) return;
    container.innerHTML = '';

    const data = filtered || charactersData || [];

    data.forEach((char, index) => {
        const card = createInfoCard(`
            <div class="flex items-center gap-x-4">
                <div class="w-14 h-14 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-2xl shrink-0 flex items-center justify-center text-2xl text-white">
                    <i class="fa-solid fa-user"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <div class="font-bold text-lg">${char.name}</div>
                    <div class="text-xs text-(--text-muted)">${char.anime}</div>
                    <div class="mt-2 text-sm text-(--text-muted) line-clamp-2">${char.desc}</div>
                    <div class="mt-3 flex items-center gap-x-2">
                        <div class="flex-1 h-1.5 bg-(--border) rounded-full overflow-hidden">
                            <div class="h-1.5 bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full" style="width: ${char.love}%"></div>
                        </div>
                        <span class="text-xs font-mono text-violet-400">${char.love}</span>
                    </div>
                </div>
            </div>
        `, '', index);
        container.appendChild(card);
    });
}

export function renderEcchiGrid(filtered = null) {
    const container = document.getElementById('grid-ecchi');
    if (!container) return;
    container.innerHTML = '';

    const data = filtered || ecchiData || [];

    data.forEach((item, index) => {
        const extra = index === 0 ? 'ring-2 ring-red-500' : '';
        const card = createInfoCard(`
            <div class="flex items-start justify-between mb-3">
                <div class="font-bold text-lg leading-tight">${item.title}</div>
                ${index === 0 ? '<div class="px-2 py-0.5 bg-red-500 text-white text-10px font-bold rounded">№1</div>' : ''}
            </div>
            <div class="text-sm text-(--text-muted) mb-4">${item.reason}</div>
            <div class="flex items-center justify-between">
                <div>
                    <div class="text-xs text-red-400">EXPLICIT LEVEL</div>
                    <div class="font-mono text-2xl font-bold text-red-400">${item.level}</div>
                </div>
                ${item.note ? `<div class="text-10px px-2 py-1 bg-red-500/10 text-red-400 rounded">${item.note}</div>` : ''}
            </div>
        `, extra, index);
        container.appendChild(card);
    });
}

export function renderCuteGrid(filtered = null) {
    const container = document.getElementById('grid-cute');
    if (!container) return;
    container.innerHTML = '';

    const data = filtered || cuteData || [];

    data.forEach((item, index) => {
        const card = createInfoCard(`
            <div class="font-bold text-lg mb-2">${item.title}</div>
            <div class="text-sm text-(--text-muted) mb-3">${item.reason}</div>
            <div class="flex items-center justify-between text-xs">
                <div class="text-amber-400">МИЛОТА: ${item.cute}</div>
                <div class="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded">${item.note}</div>
            </div>
        `, '', index);
        container.appendChild(card);
    });
}

export function renderGridForTab(tab) {
    switch (tab) {
        case 'popularity': renderPopularityGrid(); break;
        case 'imba': renderImbaGrid(); break;
        case 'characters': renderCharactersGrid(); break;
        case 'ecchi': renderEcchiGrid(); break;
        case 'cute': renderCuteGrid(); break;
    }
}