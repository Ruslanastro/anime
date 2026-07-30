/**
 * tooltip.js
 * Кастомный tooltip с позиционированием
 */

export function showTooltip(targetElement, text) {
    const existing = document.getElementById('custom-tooltip');
    if (existing) existing.remove();

    const tooltip = document.createElement('div');
    tooltip.id = 'custom-tooltip';
    tooltip.className = 'fixed z-[9999] px-4 py-2.5 text-sm bg-[var(--card)] border border-[var(--border)] rounded-2xl shadow-2xl max-w-[300px] text-[var(--text)]/95 pointer-events-none';
    tooltip.style.whiteSpace = 'normal';
    tooltip.textContent = text;

    document.body.appendChild(tooltip);

    const rect = targetElement.getBoundingClientRect();
    const tooltipHeight = tooltip.offsetHeight;
    const tooltipWidth = tooltip.offsetWidth;

    let top = rect.top - tooltipHeight - 10;
    let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);

    if (top < 8) top = rect.bottom + 10;
    if (left < 8) left = 8;
    if (left + tooltipWidth > window.innerWidth - 8) {
        left = window.innerWidth - tooltipWidth - 8;
    }

    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
}

export function hideTooltip() {
    const tooltip = document.getElementById('custom-tooltip');
    if (tooltip) tooltip.remove();
}

export function initTooltips() {
    // Tooltips are handled dynamically in render.js for popularity cards
    // For static cards, we can add tooltip support here if needed
}