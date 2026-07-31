/**
 * theme.js
 * Логика тёмной/светлой темы с сохранением в localStorage
 */

function lsSet(key, val) {
    try { localStorage.setItem(key, val); } catch (e) { /* private browsing */ }
}
function lsGet(key, def) {
    try { return localStorage.getItem(key) || def; } catch (e) { return def; }
}

export function setTheme(theme) {
    const body = document.body;
    const darkBtn = document.getElementById('dark-btn');
    const lightBtn = document.getElementById('light-btn');

    if (theme === 'dark') {
        body.classList.remove('light');
        body.classList.add('dark');
        if (darkBtn) darkBtn.classList.add('bg-white/10');
        if (lightBtn) lightBtn.classList.remove('bg-white/10');
        lsSet('theme', 'dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        if (lightBtn) lightBtn.classList.add('bg-white/10');
        if (darkBtn) darkBtn.classList.remove('bg-white/10');
        lsSet('theme', 'light');
    }
}

export function loadTheme() {
    const saved = lsGet('theme', 'dark');
    setTheme(saved);
}

export function initTheme() {
    loadTheme();

    const darkBtn = document.getElementById('dark-btn');
    const lightBtn = document.getElementById('light-btn');

    if (darkBtn) darkBtn.addEventListener('click', () => setTheme('dark'));
    if (lightBtn) lightBtn.addEventListener('click', () => setTheme('light'));
}