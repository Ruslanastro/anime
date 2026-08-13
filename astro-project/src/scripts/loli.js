/**
 * loli.js
 * Модальное окно лоли-персонажа (вкладка «Лоли»)
 */

import { loliData } from '../data/loliData.js';

export function initLoliModal() {
  document.querySelectorAll('[data-info-type="loli"]').forEach((card) => {
    card.classList.add('cursor-pointer', 'transition-all', 'hover:border-[var(--accent)]/40', 'hover:bg-[var(--card)]', 'hover:-translate-y-px', 'active:scale-[0.985]');
    card.addEventListener('click', () => {
      const index = Number(card.dataset.cardIndex);
      const data = loliData[index];
      if (data) showLoliDetail(data);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  const closeBtn = document.getElementById('loli-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeLoliDetail);
  }
}

export function showLoliDetail(data) {
  if (!data) return;
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
          ? { label: 'Карточка Koikatsu: есть', tone: 'koikatsu' }
          : { label: 'Карточка Koikatsu: нет', tone: 'muted' }
      );
    }
    const tones = {
      neutral: 'border-[var(--border)] bg-[var(--card)] text-[var(--text)]/80',
      koikatsu: 'border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-400',
      muted: 'border-[var(--border)] bg-[var(--card)] text-[var(--text-muted)]',
    };
    for (const chip of chips) {
      const el = document.createElement('span');
      el.className = `px-3 py-1 rounded-full border text-xs font-medium ${tones[chip.tone]}`;
      el.textContent = chip.label;
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
