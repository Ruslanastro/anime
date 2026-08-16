/**
 * loli.js
 * Модальное окно лоли-персонажа + сортировки/фильтры/случайная кнопка (вкладка «Лоли»)
 */

import { loliData } from '../data/loliData.js';

let currentIndex = 0;
let kkFilter = false;
let romanceFilter = false;
let ageFilter = 'all'; // all | child | eternal
let grouped = false;

const SORT_ACTIVE = ['bg-[var(--card)]', 'border-[var(--accent)]/30'];
const KK_ACTIVE = ['border-fuchsia-500/40', 'bg-fuchsia-500/10', 'text-fuchsia-400'];
const ROMANCE_ACTIVE = ['border-rose-500/40', 'bg-rose-500/10', 'text-rose-400'];
const GROUP_ACTIVE = ['border-[var(--accent)]/40', 'bg-[var(--card)]'];
const AGE_LABELS = { all: 'Все / Дети / Вечно юные', child: 'Только дети', eternal: 'Только вечно юные' };

function getGrid() {
  return document.getElementById('grid-loli');
}

function getCards() {
  const grid = getGrid();
  return grid ? Array.from(grid.querySelectorAll('.info-card[data-info-type="loli"]')) : [];
}

function updateGroupHeaders() {
  const grid = getGrid();
  if (!grid) return;
  const headers = Array.from(grid.querySelectorAll('.loli-group-header'));
  const cards = getCards();
  for (const header of headers) {
    const anime = header.dataset.anime;
    const hasVisible = cards.some(
      (c) => c.dataset.loliAnime === anime && c.style.display !== 'none'
    );
    header.style.display = hasVisible ? '' : 'none';
  }
}

function clearGroupHeaders() {
  const grid = getGrid();
  if (!grid) return;
  grid.querySelectorAll('.loli-group-header').forEach((h) => h.remove());
}

function buildGroupHeaders() {
  const grid = getGrid();
  if (!grid) return;
  clearGroupHeaders();
  const cards = getCards();
  let lastAnime = null;
  let count = 0;
  const groups = [];
  for (const card of cards) {
    const anime = card.dataset.loliAnime || '';
    if (anime !== lastAnime) {
      if (lastAnime !== null) groups.push({ anime: lastAnime, count });
      lastAnime = anime;
      count = 1;
    } else {
      count++;
    }
  }
  if (lastAnime !== null) groups.push({ anime: lastAnime, count });

  let i = 0;
  for (const card of cards) {
    const anime = card.dataset.loliAnime || '';
    if (i < groups.length && groups[i].anime === anime) {
      const header = document.createElement('div');
      header.className = 'loli-group-header col-span-full mt-6 mb-2 text-sm font-bold tracking-wide text-[var(--accent)]';
      header.dataset.anime = anime;
      header.innerHTML =
        `<i class="fa-solid fa-film mr-2"></i>${anime} <span class="font-normal text-[var(--text-muted)]">— ${groups[i].count}</span>`;
      grid.insertBefore(header, card);
      i++;
    }
  }
}

export function applyLoliFilters() {
  const cards = getCards();
  for (const card of cards) {
    let visible = true;
    if (kkFilter && card.dataset.koikatsu !== 'true') visible = false;
    if (visible && romanceFilter && card.dataset.romance !== 'true') visible = false;
    if (visible && ageFilter === 'child' && card.dataset.ageType !== 'child') visible = false;
    if (visible && ageFilter === 'eternal' && card.dataset.ageType !== 'eternal') visible = false;
    card.style.display = visible ? '' : 'none';
  }
  if (grouped) updateGroupHeaders();
}

function setSortActive(activeId) {
  ['loli-sort-level', 'loli-sort-age', 'loli-sort-anime', 'loli-sort-koikatsu', 'loli-sort-romance'].forEach((id) => {
    const btn = document.getElementById(id);
    if (!btn) return;
    if (id === activeId) btn.classList.add(...SORT_ACTIVE);
    else btn.classList.remove(...SORT_ACTIVE);
  });
}

export function sortLoliGrid(mode) {
  const grid = getGrid();
  if (!grid) return;
  setSortActive(`loli-sort-${mode}`);
  const cards = getCards();

  cards.sort((a, b) => {
    if (mode === 'age') {
      const an = parseInt(a.dataset.ageNum, 10) ?? 9999;
      const bn = parseInt(b.dataset.ageNum, 10) ?? 9999;
      return an - bn;
    }
    if (mode === 'anime') {
      return (a.dataset.loliAnime || '').localeCompare(b.dataset.loliAnime || '', 'ru');
    }
    if (mode === 'koikatsu') {
      const av = a.dataset.koikatsu === 'true' ? 0 : 1;
      const bv = b.dataset.koikatsu === 'true' ? 0 : 1;
      if (av !== bv) return av - bv;
      return parseInt(a.dataset.cardIndex, 10) - parseInt(b.dataset.cardIndex, 10);
    }
    if (mode === 'romance') {
      const av = a.dataset.romance === 'true' ? 0 : 1;
      const bv = b.dataset.romance === 'true' ? 0 : 1;
      if (av !== bv) return av - bv;
      return parseInt(a.dataset.cardIndex, 10) - parseInt(b.dataset.cardIndex, 10);
    }
    return parseInt(a.dataset.cardIndex, 10) - parseInt(b.dataset.cardIndex, 10);
  });

  for (const card of cards) grid.appendChild(card);
  if (grouped) buildGroupHeaders();
  applyLoliFilters();
}

function initLoliControls() {
  document.getElementById('loli-sort-level')?.addEventListener('click', () => sortLoliGrid('level'));
  document.getElementById('loli-sort-age')?.addEventListener('click', () => sortLoliGrid('age'));
  document.getElementById('loli-sort-anime')?.addEventListener('click', () => sortLoliGrid('anime'));
  document.getElementById('loli-sort-koikatsu')?.addEventListener('click', () => sortLoliGrid('koikatsu'));
  document.getElementById('loli-sort-romance')?.addEventListener('click', () => sortLoliGrid('romance'));

  const kkBtn = document.getElementById('loli-filter-kk');
  if (kkBtn) {
    kkBtn.addEventListener('click', () => {
      kkFilter = !kkFilter;
      kkBtn.classList.toggle(...KK_ACTIVE);
      applyLoliFilters();
    });
  }

  const romanceBtn = document.getElementById('loli-filter-romance');
  if (romanceBtn) {
    romanceBtn.addEventListener('click', () => {
      romanceFilter = !romanceFilter;
      romanceBtn.classList.toggle(...ROMANCE_ACTIVE);
      applyLoliFilters();
    });
  }

  const groupBtn = document.getElementById('loli-group');
  if (groupBtn) {
    groupBtn.addEventListener('click', () => {
      grouped = !grouped;
      groupBtn.classList.toggle(...GROUP_ACTIVE);
      if (grouped) {
        sortLoliGrid('anime');
        buildGroupHeaders();
      } else {
        clearGroupHeaders();
      }
      applyLoliFilters();
    });
  }

  const ageBtn = document.getElementById('loli-filter-age');
  if (ageBtn) {
    ageBtn.addEventListener('click', () => {
      ageFilter = ageFilter === 'all' ? 'child' : ageFilter === 'child' ? 'eternal' : 'all';
      ageBtn.textContent = AGE_LABELS[ageFilter];
      applyLoliFilters();
    });
  }

  document.getElementById('loli-random')?.addEventListener('click', () => {
    const visible = getCards().filter((c) => c.style.display !== 'none');
    if (!visible.length) return;
    const card = visible[Math.floor(Math.random() * visible.length)];
    const index = parseInt(card.dataset.cardIndex, 10);
    showLoliDetail(index);
  });
}

export function initLoliModal() {
  document.querySelectorAll('[data-info-type="loli"]').forEach((card) => {
    card.classList.add('cursor-pointer', 'transition-all', 'hover:border-[var(--accent)]/40', 'hover:bg-[var(--card)]', 'hover:-translate-y-px', 'active:scale-[0.985]');
    card.addEventListener('click', () => {
      const index = Number(card.dataset.cardIndex);
      const data = loliData[index];
      if (data) showLoliDetail(index);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
    const kkLink = card.querySelector('.loli-kk-link');
    if (kkLink) {
      kkLink.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  });

  const closeBtn = document.getElementById('loli-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLoliDetail);
  }

  document.getElementById('loli-modal-prev')?.addEventListener('click', () => {
    showLoliDetail(currentIndex - 1);
  });
  document.getElementById('loli-modal-next')?.addEventListener('click', () => {
    showLoliDetail(currentIndex + 1);
  });

  document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('loli-detail-modal');
    if (!modal || modal.classList.contains('hidden')) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      showLoliDetail(currentIndex - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      showLoliDetail(currentIndex + 1);
    }
  });

  initLoliControls();
}

export function showLoliDetail(index) {
  const data = loliData[index];
  if (!data) return;
  currentIndex = index;
  const modal = document.getElementById('loli-detail-modal');
  if (!modal) return;

  const nameEl = document.getElementById('loli-name');
  const animeEl = document.getElementById('loli-anime');
  const imageEl = document.getElementById('loli-image');
  const descEl = document.getElementById('loli-desc');
  const persEl = document.getElementById('loli-personality');
  const romanceEl = document.getElementById('loli-romance');
  const chipsEl = document.getElementById('loli-chips');
  const levelEl = document.getElementById('loli-level');
  const counterEl = document.getElementById('loli-modal-counter');
  const prevBtn = document.getElementById('loli-modal-prev');
  const nextBtn = document.getElementById('loli-modal-next');

  if (nameEl) nameEl.textContent = data.name || '';
  if (animeEl) animeEl.textContent = data.anime || '';
  if (descEl) descEl.textContent = data.description || 'Описание будет позже.';
  if (persEl) persEl.textContent = data.personality || '—';
  if (romanceEl) {
    romanceEl.textContent = data.romance
      ? `Есть: ${data.romanceDesc || ''}`
      : `Нет — ${data.romanceDesc || 'романтической линии не имеет'}`;
  }
  if (levelEl) levelEl.textContent = data.level ?? '';
  if (counterEl) counterEl.textContent = `${currentIndex + 1} из ${loliData.length}`;

  if (prevBtn) prevBtn.disabled = currentIndex <= 0;
  if (nextBtn) nextBtn.disabled = currentIndex >= loliData.length - 1;

  if (imageEl) {
    if (data.image) {
      imageEl.src = data.image;
      imageEl.alt = data.name || '';
      imageEl.classList.remove('hidden');
    } else {
      imageEl.classList.add('hidden');
    }
  }

  if (chipsEl) {
    chipsEl.innerHTML = '';
    const chips = [];
    if (data.age) chips.push({ label: `Возраст: ${data.age}`, tone: 'neutral' });
    if (data.koikatsu !== undefined) {
      chips.push(
        data.koikatsu
          ? { label: data.koikatsuUrl ? 'Карточка Koikatsu: есть ↗' : 'Карточка Koikatsu: есть', tone: 'koikatsu', href: data.koikatsuUrl }
          : { label: 'Карточка Koikatsu: нет', tone: 'muted' }
      );
    }
    const tones = {
      neutral: 'border-[var(--border)] bg-[var(--card)] text-[var(--text)]/80',
      koikatsu: 'border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-400',
      muted: 'border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)]',
    };
    for (const chip of chips) {
      const el = document.createElement(chip.href ? 'a' : 'span');
      el.className = `px-3 py-1 rounded-full border text-xs font-medium ${tones[chip.tone]}${
        chip.href ? ' hover:border-fuchsia-400 hover:text-fuchsia-300 transition cursor-pointer' : ''
      }`;
      el.textContent = chip.label;
      if (chip.href) {
        el.href = chip.href;
        el.target = '_blank';
        el.rel = 'noopener';
      }
      chipsEl.appendChild(el);
    }
  }

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.onclick = (e) => {
    if (e.target === modal) closeLoliDetail();
  };
}

export function closeLoliDetail() {
  const modal = document.getElementById('loli-detail-modal');
  if (!modal) return;
  modal.classList.remove('flex');
  modal.classList.add('hidden');
  modal.onclick = null;
}
