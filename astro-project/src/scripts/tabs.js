/**
 * tabs.js
 * Переключение вкладок — только show/hide, без рендеринга.
 */

import { setPopularitySort } from './search.js';
import { closeAnimeDetail, closeCharacterDetail } from './detail.js';

export function switchTab(tab) {
  const detailView = document.getElementById('anime-detail-view');
  if (detailView && !detailView.classList.contains('hidden')) {
    closeAnimeDetail();
  }

  const allContents = document.querySelectorAll('[role="tabpanel"]');
  const currentContent = Array.from(allContents).find((el) => !el.classList.contains('hidden'));

  document.querySelectorAll('.nav-tab').forEach((el) => {
    el.classList.remove('tab-active');
    el.setAttribute('aria-selected', 'false');
    el.setAttribute('tabindex', '-1');
  });

  const newContent = document.getElementById(`content-${tab}`);
  const newTabBtn = document.getElementById(`tab-${tab}`);

  if (!newContent) return;
  if (newTabBtn) {
    newTabBtn.classList.add('tab-active');
    newTabBtn.setAttribute('aria-selected', 'true');
    newTabBtn.setAttribute('tabindex', '0');
  }

  if (currentContent && currentContent !== newContent) {
    currentContent.classList.add('tab-content-exit');
    setTimeout(() => {
      currentContent.classList.remove('tab-content-exit');
      currentContent.classList.add('hidden');
      currentContent.setAttribute('aria-hidden', 'true');
      newContent.classList.remove('hidden');
      newContent.setAttribute('aria-hidden', 'false');
      newContent.classList.add('tab-content-enter');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          newContent.classList.remove('tab-content-enter');
        });
      });
    }, 280);
  } else {
    newContent.classList.remove('hidden');
    newContent.setAttribute('aria-hidden', 'false');
  }

  setTimeout(updateTabUnderline, 25);
}

export function updateTabUnderline() {
  const underline = document.getElementById('tab-underline');
  const activeTab = document.querySelector('.tab-active');
  const navTabs = document.getElementById('nav-tabs');

  if (!underline || !activeTab || !navTabs) return;

  const tabRect = activeTab.getBoundingClientRect();
  const navRect = navTabs.getBoundingClientRect();

  underline.style.left = `${tabRect.left - navRect.left}px`;
  underline.style.width = `${tabRect.width}px`;
}

export function initTabs() {
  document.querySelectorAll('.nav-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.id.replace('tab-', '');
      switchTab(tab);
    });
  });

  const logoLink = document.getElementById('logo-link');
  if (logoLink) {
    logoLink.addEventListener('click', () => {
      setPopularitySort('rating');
      switchTab('popularity');
    });
  }

  window.addEventListener('resize', () => {
    setTimeout(updateTabUnderline, 25);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('character-detail-modal');
      if (modal && !modal.classList.contains('hidden')) {
        closeCharacterDetail();
      }
    }
  });
}
