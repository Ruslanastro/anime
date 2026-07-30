/**
 * tabs.js
 * Переключение вкладок с анимациями и skeleton-загрузкой
 */

import { renderGridForTab } from './render.js';

const openedTabs = new Set();

export function showSkeleton(tab) {
    const grid = document.getElementById(`grid-${tab}`);
    if (!grid) return;

    let count = 8;
    if (tab === 'popularity') count = 54;
    else if (tab === 'imba') count = 8;
    else if (tab === 'characters' || tab === 'ecchi' || tab === 'cute') count = 7;

    grid.innerHTML = '';
    grid.classList.remove('opacity-0');

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
        const skeleton = document.createElement('div');
        if (tab === 'popularity') {
            skeleton.className = 'skeleton skeleton-large';
            skeleton.innerHTML = `
                <div class="skeleton-poster"></div>
                <div class="skeleton-content">
                    <div class="skeleton-line w-3/4"></div>
                    <div class="skeleton-line w-1/2"></div>
                    <div class="skeleton-line w-2/3 mt-4"></div>
                </div>
            `;
        } else {
            skeleton.className = 'skeleton skeleton-info';
            skeleton.innerHTML = `
                <div class="skeleton-line w-4/5"></div>
                <div class="skeleton-line w-3/5"></div>
                <div class="skeleton-line w-2/3 mt-3"></div>
            `;
        }
        fragment.appendChild(skeleton);
    }
    grid.appendChild(fragment);
}

function showNewContent(content, tab) {
    const grid = document.getElementById(`grid-${tab}`);
    const isFirstTime = !openedTabs.has(tab);

    content.classList.remove('hidden');

    if (isFirstTime && grid) {
        openedTabs.add(tab);

        showSkeleton(tab);

        setTimeout(() => {
            renderGridForTab(tab);

            grid.classList.remove('opacity-0');
            grid.style.transition = 'opacity 0.28s ease';
            grid.style.opacity = '0';

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    grid.style.opacity = '1';
                });
            });

            setTimeout(() => {
                grid.style.transition = '';
                grid.style.opacity = '';
            }, 320);

        }, 420);
    } else {
        content.classList.add('tab-content-enter');

        if (grid && grid.children.length === 0) {
            renderGridForTab(tab);
        }

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                content.classList.remove('tab-content-enter');
            });
        });
    }

    setTimeout(updateTabUnderline, 25);
}

export function switchTab(tab) {
    // Cleanup any lingering inline transforms
    document.querySelectorAll('.anime-card, .info-card').forEach(card => {
        if (card.style.transform) {
            card.style.transform = '';
        }
    });

    // If any detail view is open, close it when changing tabs
    const detailView = document.getElementById('anime-detail-view');
    if (detailView && !detailView.classList.contains('hidden')) {
        closeAnimeDetailInternal();
    }

    const allContents = document.querySelectorAll('[id^="content-"]');
    const currentContent = Array.from(allContents).find(el => !el.classList.contains('hidden'));

    // Deactivate all tab buttons
    document.querySelectorAll('[id^="tab-"]').forEach(el => {
        el.classList.remove('tab-active');
    });

    const newContent = document.getElementById(`content-${tab}`);
    const newTabBtn = document.getElementById(`tab-${tab}`);

    if (!newContent) return;

    // Activate new tab visually
    if (newTabBtn) newTabBtn.classList.add('tab-active');

    // If there's current content, animate it out
    if (currentContent && currentContent !== newContent) {
        currentContent.classList.add('tab-content-exit');

        setTimeout(() => {
            currentContent.classList.remove('tab-content-exit');
            currentContent.classList.add('hidden');

            showNewContent(newContent, tab);
        }, 280);
    } else {
        showNewContent(newContent, tab);
    }
}

function closeAnimeDetailInternal() {
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
}

export function updateTabUnderline() {
    const underline = document.getElementById('tab-underline');
    const activeTab = document.querySelector('.tab-active');
    const navTabs = document.getElementById('nav-tabs');

    if (!underline || !activeTab || !navTabs) return;

    const tabRect = activeTab.getBoundingClientRect();
    const navRect = navTabs.getBoundingClientRect();

    const left = tabRect.left - navRect.left;
    const width = tabRect.width;

    underline.style.left = `${left}px`;
    underline.style.width = `${width}px`;
}

export function initTabs() {
    // Навешиваем события на кнопки вкладок
    document.querySelectorAll('[id^="tab-"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.id.replace('tab-', '');
            switchTab(tab);
        });
    });

    // Logo link goes to popularity
    const logoLink = document.getElementById('logo-link');
    if (logoLink) {
        logoLink.addEventListener('click', () => {
            setPopularitySort('rating');
            switchTab('popularity');
        });
    }

    // Update underline on resize
    window.addEventListener('resize', () => {
        setTimeout(updateTabUnderline, 25);
    });

    // ESC support for character modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('character-detail-modal');
            if (modal && !modal.classList.contains('hidden')) {
                closeCharacterDetail();
            }
        }
    });
}

// Import from detail.js for closeCharacterDetail
function closeCharacterDetail() {
    const modal = document.getElementById('character-detail-modal');
    if (!modal) return;
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    modal.onclick = null;
}

// Import from ui.js for setPopularitySort
function setPopularitySort(mode) {
    window.popularitySortMode = mode;
    // This will be handled by the search/detail module
}