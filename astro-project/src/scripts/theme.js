/**
 * theme.js
 * Логика тёмной/светлой темы с сохранением в localStorage
 */

export function setTheme(theme) {
    const body = document.body;
    const darkBtn = document.getElementById('dark-btn');
    const lightBtn = document.getElementById('light-btn');

    if (theme === 'dark') {
        body.classList.remove('light');
        body.classList.add('dark');
        if (darkBtn) darkBtn.classList.add('bg-white/10');
        if (lightBtn) lightBtn.classList.remove('bg-white/10');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        if (lightBtn) lightBtn.classList.add('bg-white/10');
        if (darkBtn) darkBtn.classList.remove('bg-white/10');
        localStorage.setItem('theme', 'light');
    }
}

export function loadTheme() {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
}

export function initTheme() {
    loadTheme();

    const darkBtn = document.getElementById('dark-btn');
    const lightBtn = document.getElementById('light-btn');

    if (darkBtn) darkBtn.addEventListener('click', () => setTheme('dark'));
    if (lightBtn) lightBtn.addEventListener('click', () => setTheme('light'));
}