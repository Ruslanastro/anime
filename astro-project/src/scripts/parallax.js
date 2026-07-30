/**
 * parallax.js
 * Лёгкий параллакс фона с поддержкой prefers-reduced-motion.
 */

const CONFIG = {
    heroFactor: 0.25,
    cardFactor: 0.08,
    reducedMotion: false,
};

let ticking = false;
let parallaxElements = new Map();

function checkReducedMotion() {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    CONFIG.reducedMotion = mq.matches;
    mq.addEventListener('change', (e) => {
        CONFIG.reducedMotion = e.matches;
        if (e.matches) resetAllParallax();
    });
}

function updatePositions() {
    if (CONFIG.reducedMotion) return;

    parallaxElements.forEach((config, element) => {
        if (!document.body.contains(element)) {
            parallaxElements.delete(element);
            return;
        }

        const rect = element.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = elementCenter - viewportCenter;
        const offset = distance * config.factor;

        if (config.type === 'background') {
            element.style.backgroundPosition = `50% ${50 + offset}%`;
        } else if (config.type === 'translate') {
            element.style.transform = `translateY(${offset}px)`;
        } else if (config.type === 'scale') {
            const scale = 1 + Math.abs(offset) * 0.0005;
            element.style.transform = `scale(${scale})`;
        }
    });
}

function onScroll() {
    if (CONFIG.reducedMotion || ticking) return;
    requestAnimationFrame(() => {
        updatePositions();
        ticking = false;
    });
    ticking = true;
}

function resetAllParallax() {
    parallaxElements.forEach((_config, element) => {
        if (document.body.contains(element)) {
            element.style.transform = '';
            if (_config.type === 'background') {
                element.style.backgroundPosition = '';
            }
        }
    });
    window.removeEventListener('scroll', onScroll);
}

export function initParallax() {
    if (CONFIG.reducedMotion) return;

    const heroElements = document.querySelectorAll('[data-parallax="hero"]');
    heroElements.forEach((el) => {
        if (!el || CONFIG.reducedMotion) return;
        const currentPos = window.getComputedStyle(el).backgroundPosition;
        if (currentPos === '0% 0%' || currentPos === 'initial') {
            el.style.backgroundPosition = '50% 50%';
        }
        parallaxElements.set(el, { type: 'background', factor: CONFIG.heroFactor });
    });

    const translateElements = document.querySelectorAll('[data-parallax="translate"]');
    translateElements.forEach((el) => {
        if (!el || CONFIG.reducedMotion) return;
        const factor = parseFloat(el.dataset.parallaxFactor) || CONFIG.cardFactor;
        parallaxElements.set(el, { type: 'translate', factor });
    });

    const scaleElements = document.querySelectorAll('[data-parallax="scale"]');
    scaleElements.forEach((el) => {
        if (!el || CONFIG.reducedMotion) return;
        parallaxElements.set(el, { type: 'scale', factor: 0.15 });
    });

    if (parallaxElements.size > 0) {
        window.addEventListener('scroll', onScroll, { passive: true });
        updatePositions();
    }
}

export function destroyParallax() {
    resetAllParallax();
    parallaxElements.clear();
    window.removeEventListener('scroll', onScroll);
}

// Auto-init on load
checkReducedMotion();