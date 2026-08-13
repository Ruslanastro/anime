/**
 * main.js
 * Точка входа приложения. Инициализирует все модули.
 */

import { initTheme } from './theme.js';
import { initTabs, switchTab, updateTabUnderline } from './tabs.js';
import { initSearch, initSortButtons } from './search.js';
import { initTooltips } from './tooltip.js';
import { initDetail } from './detail.js';
import { initLoliModal } from './loli.js';
import { initParallax } from './parallax.js';
import { initRandomButton } from './random.js';

export function initialize() {
  initTheme();
  initTabs();
  initSearch();
  initSortButtons();
  initTooltips();
  initDetail();
  initLoliModal();
  initParallax();
  initRandomButton();
  initSkeletonLoader();

  // Start with popularity tab
  switchTab('popularity');
  setTimeout(updateTabUnderline, 30);
}

function initSkeletonLoader() {
  const skeleton = document.getElementById('skeleton-popularity');
  const cards = document.getElementById('content-popularity-cards');

  if (!skeleton || !cards) return;

  setTimeout(() => {
    skeleton.classList.add('hidden');
    cards.classList.remove('hidden');

    cards.querySelectorAll('.anime-card').forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    });
  }, 800);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
