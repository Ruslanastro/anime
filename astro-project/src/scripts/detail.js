/**
 * detail.js
 * Детальная страница аниме и модальное окно персонажа
 */

import { animeData } from '../data/animeData.js';
import { topCharactersData } from '../data/topCharactersData.js';
import { konosubaCharacters } from '../data/characters/konosuba.js';
import { slime300Characters } from '../data/characters/slime300.js';
import { mileCharacters } from '../data/characters/mile.js';
import { smartphoneCharacters } from '../data/characters/smartphone.js';
import { maoujouCharacters } from '../data/characters/maoujou.js';
import { shieldheroCharacters } from '../data/characters/shieldhero.js';
import { angelCharacters } from '../data/characters/angel.js';
import { kumabearCharacters } from '../data/characters/kumabear.js';
import { uchimusumeCharacters } from '../data/characters/uchimusume.js';
import { leadaleCharacters } from '../data/characters/leadale.js';
import { skeletonCharacters } from '../data/characters/skeleton.js';
import { zerotsukaimaCharacters } from '../data/characters/zerotsukaima.js';
import { outbreakCharacters } from '../data/characters/outbreak.js';
import { spicewolfCharacters } from '../data/characters/spicewolf.js';
import { maiddragonCharacters } from '../data/characters/maiddragon.js';
import { villainessdiaryCharacters } from '../data/characters/villainessdiary.js';
import { demonlordCharacters } from '../data/characters/demonlord.js';
import { arifuretaCharacters } from '../data/characters/arifureta.js';
import { haremCharacters } from '../data/characters/harem.js';
import { mushokutenseiCharacters } from '../data/characters/mushokutensei.js';
import { stepsisterCharacters } from '../data/characters/stepsister.js';
import { beasttamerCharacters } from '../data/characters/beasttamer.js';
import { gimaiseikatsuCharacters } from '../data/characters/gimaiseikatsu.js';
import { unnamedmemoryCharacters } from '../data/characters/unnamedmemory.js';
import { strongestCharacters } from '../data/characters/strongest.js';

const CHAR_MAPS = [
  slime300Characters,
  mileCharacters,
  konosubaCharacters,
  smartphoneCharacters,
  maoujouCharacters,
  shieldheroCharacters,
  angelCharacters,
  kumabearCharacters,
  uchimusumeCharacters,
  leadaleCharacters,
  skeletonCharacters,
  zerotsukaimaCharacters,
  outbreakCharacters,
  spicewolfCharacters,
  maiddragonCharacters,
  villainessdiaryCharacters,
  demonlordCharacters,
  arifuretaCharacters,
  haremCharacters,
  mushokutenseiCharacters,
  stepsisterCharacters,
  beasttamerCharacters,
  gimaiseikatsuCharacters,
  unnamedmemoryCharacters,
  strongestCharacters,
];

let lastScrollPosition = 0;

/** Hide grid/chrome when detail is open; show when closed. */
export function setPopularityChromeVisible(visible) {
  const ids = ['popularity-header', 'popularity-sort', 'search-row-popularity', 'grid-popularity'];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    el.classList.toggle('hidden', !visible);
  }
}

export function showAnimeDetail(anime) {
  if (!anime) return;

  const detailView = document.getElementById('anime-detail-view');
  if (!detailView) return;

  lastScrollPosition = window.scrollY;

  setPopularityChromeVisible(false);
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
      chars.forEach((ch) => {
        const map = CHAR_MAPS.find((m) => m && m[ch.name]);
        const fullChar = map?.[ch.name] ?? {};
        const image = ch.image || fullChar.image;

        const card = document.createElement('div');
        card.className =
          'cursor-pointer rounded-2xl border border-(--border) bg-(--card)/80 overflow-hidden transition-all hover:border-(--accent)/40 hover:bg-(--card) hover:-translate-y-px active:scale-[0.985] flex flex-col';

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

  const dubWrap = document.getElementById('detail-russian-dub-wrap');
  const dubContainer = document.getElementById('detail-russian-dub');
  if (dubWrap && dubContainer) {
    const dub = d.russianDub;
    if (dub && (dub.studios?.length || dub.cast?.length || dub.official)) {
      dubWrap.classList.remove('hidden');
      dubContainer.innerHTML = '';

      const sections = [];
      if (dub.official) {
        sections.push(`<div class="mb-3"><div class="text-[10px] font-medium uppercase tracking-[1.5px] text-(--text-muted)">Официальный дубляж</div><div class="mt-1 text-sm text-(--text)/90 leading-relaxed">${dub.official}</div></div>`);
      }
      if (dub.studios?.length) {
        sections.push(`<div><div class="text-[10px] font-medium uppercase tracking-[1.5px] text-(--text-muted)">Студии озвучки</div><div class="mt-2 flex flex-wrap gap-2">${dub.studios.map((s) => `<span class="rounded-full border border-(--border) bg-(--bg)/60 px-3 py-1 text-xs text-(--text)/85">${s}</span>`).join('')}</div></div>`);
      }
      if (dub.cast?.length) {
        sections.push(`<div class="mt-4"><div class="text-[10px] font-medium uppercase tracking-[1.5px] text-(--text-muted)">Актёры озвучки</div><ul class="mt-2 space-y-1.5 text-sm leading-relaxed text-(--text)/85">${dub.cast.map((c) => `<li>${c}</li>`).join('')}</ul></div>`);
      }

      dubContainer.innerHTML = sections.join('');
    } else {
      dubWrap.classList.add('hidden');
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

    metaItems.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'border-l-2 border-(--border) pl-3';
      div.innerHTML = `
                <div class="text-[10px] font-medium uppercase tracking-[1.5px] text-(--text-muted)">${item.label}</div>
                <div class="mt-0.5 font-medium text-(--text) leading-tight">${item.value}</div>
            `;
      metaContainer.appendChild(div);
    });
  }
}

export function closeAnimeDetail() {
  const detailView = document.getElementById('anime-detail-view');
  if (detailView) detailView.classList.add('hidden');

  setPopularityChromeVisible(true);

  requestAnimationFrame(() => {
    window.scrollTo(0, lastScrollPosition);
    lastScrollPosition = 0;
  });
}

export function showCharacterDetail(characterName) {
  const modal = document.getElementById('character-detail-modal');
  if (!modal) return;

  let data = null;
  for (const map of CHAR_MAPS) {
    if (map && map[characterName]) {
      data = map[characterName];
      break;
    }
  }

  if (!data) {
    const nameEl = document.getElementById('char-name');
    const animeEl = document.getElementById('char-anime');
    const descEl = document.getElementById('char-full-desc');
    const chipsEl = document.getElementById('char-chips');
    const powersWrap = document.getElementById('char-powers-wrap');
    if (nameEl) nameEl.textContent = characterName;
    if (animeEl) animeEl.textContent = '';
    if (descEl) descEl.textContent = 'Информация о персонаже пока не добавлена.';
    if (chipsEl) chipsEl.innerHTML = '';
    if (powersWrap) powersWrap.classList.add('hidden');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.onclick = (e) => {
      if (e.target === modal) closeCharacterDetail();
    };
    return;
  }

  const nameEl = document.getElementById('char-name');
  const animeEl = document.getElementById('char-anime');
  const descEl = document.getElementById('char-full-desc');
  const persEl = document.getElementById('char-personality');
  const roleEl = document.getElementById('char-role');
  const bioEl = document.getElementById('char-biography');
  const powersEl = document.getElementById('char-powers');
  const powersWrap = document.getElementById('char-powers-wrap');
  const chipsEl = document.getElementById('char-chips');
  const imageEl = document.getElementById('char-image');

  if (nameEl) nameEl.textContent = data.name || characterName;
  if (animeEl) animeEl.textContent = data.anime || '';
  if (descEl) descEl.textContent = data.fullDescription || 'Описание будет позже.';
  if (persEl) persEl.textContent = data.personality || '—';
  if (roleEl) roleEl.textContent = data.role || '—';
  if (bioEl) bioEl.textContent = data.biography || '—';

  if (powersEl) {
    powersEl.textContent = data.powers || '—';
  }
  if (powersWrap) {
    powersWrap.classList.toggle('hidden', !data.powers);
  }

  if (chipsEl) {
    chipsEl.innerHTML = '';
    const chips = [];
    if (data.race) chips.push({ label: data.race, tone: 'neutral' });
    if (data.age) chips.push({ label: data.age, tone: 'neutral' });
    if (data.villain !== undefined) {
      chips.push(
        data.villain
          ? { label: 'Злодей', tone: 'villain' }
          : { label: 'Герой', tone: 'hero' }
      );
    }
    for (const chip of chips) {
      const el = document.createElement('span');
      const tones = {
        neutral: 'border-[var(--border)] bg-[var(--card)] text-[var(--text)]/80',
        hero: 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400',
        villain: 'border-red-500/40 bg-red-500/10 text-red-400',
      };
      el.className = `px-3 py-1 rounded-full border text-xs font-medium ${tones[chip.tone]}`;
      el.textContent = chip.label;
      chipsEl.appendChild(el);
    }
  }

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

/** Показ модалки персонажа из топ-100 (вкладка «Лучшие персонажи»). */
export function showTopCharacterDetail(character) {
  const modal = document.getElementById('character-detail-modal');
  if (!modal || !character) return;

  const nameEl = document.getElementById('char-name');
  const animeEl = document.getElementById('char-anime');
  const descEl = document.getElementById('char-full-desc');
  const persEl = document.getElementById('char-personality');
  const roleEl = document.getElementById('char-role');
  const bioEl = document.getElementById('char-biography');
  const powersEl = document.getElementById('char-powers');
  const powersWrap = document.getElementById('char-powers-wrap');
  const chipsEl = document.getElementById('char-chips');
  const imageEl = document.getElementById('char-image');

  if (nameEl) nameEl.textContent = character.name || '';
  if (animeEl) animeEl.textContent = character.anime || '';
  if (descEl) descEl.textContent = character.desc || 'Описание будет позже.';
  if (persEl) persEl.textContent = `Любовь зрителей: ${character.love} из 100. Персонаж из аниме «${character.anime}».`;
  if (roleEl) roleEl.textContent = character.anime || '—';
  if (bioEl) {
    bioEl.textContent = `Попал в топ-100 лучших персонажей проекта по голосам зрителей MyAnimeList и AniList. ${character.desc || ''}`;
  }
  if (powersEl) powersEl.textContent = '—';
  if (powersWrap) powersWrap.classList.add('hidden');
  if (chipsEl) chipsEl.innerHTML = '';

  if (imageEl) {
    if (character.image) {
      imageEl.src = character.image;
      imageEl.alt = character.name || '';
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

export function initDetail() {
  document.getElementById('grid-popularity')?.addEventListener('click', (e) => {
    const card = e.target.closest('.anime-card');
    if (!card) return;
    const id = parseInt(card.dataset.animeId, 10);
    const anime = animeData.find((a) => a.id === id);
    if (anime) showAnimeDetail(anime);
  });

  document.getElementById('grid-characters')?.addEventListener('click', (e) => {
    const card = e.target.closest('.info-card[data-info-type="characters"]');
    if (!card) return;
    const index = parseInt(card.dataset.cardIndex, 10);
    const character = topCharactersData[index];
    if (character) showTopCharacterDetail(character);
  });

  document.getElementById('detail-back-btn')?.addEventListener('click', closeAnimeDetail);
  document.getElementById('char-modal-close')?.addEventListener('click', closeCharacterDetail);

  // Prevent "#" navigation when malUrl is absent (link hidden but still clickable via keyboard)
  document.getElementById('detail-mal-link')?.addEventListener('click', (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (!href || href === '#') e.preventDefault();
  });
}
