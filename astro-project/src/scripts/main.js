/**
 * main.js
 * Точка входа приложения. Инициализирует все модули.
 */

import { initTheme } from './theme.js';
import { initTabs, switchTab, updateTabUnderline } from './tabs.js';
import { initSearch, initSortButtons } from './search.js';
import { initTooltips } from './tooltip.js';
import { initDetail } from './detail.js';
import { initParallax } from './parallax.js';
import { initRandomButton } from './random.js';

export function initialize() {
    initTheme();
    initTabs();
    initSearch();
    initSortButtons();
    initTooltips();
    initDetail();
    initParallax();
    initRandomButton();

    // Start with popularity tab
    switchTab('popularity');
    setTimeout(updateTabUnderline, 30);
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}