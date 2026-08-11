# Сортировка «По рейтингу Shikimori» — план реализации

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Добавить четвёртый режим сортировки вкладки «Аниме» — «По рейтингу Shikimori» (кнопка, статические оценки в данных, отображение оценки Shikimori на карточке).

**Architecture:** Статические оценки Shikimori собираются через MCP и добавляются в `animeData.js` (поле `shikimoriScore`). Карточки получают data-атрибут `data-shiki-score`. Клиентский JS (`render.js`/`search.js`) сортирует DOM-карточки по этому атрибуту (по образцу режима «уютность»), CSS-класс `sort-shiki` переключает отображаемую оценку на карточке.

**Tech Stack:** Astro 5 (SSG), Tailwind v4, vanilla JS (ES modules), Playwright (проверка).

## Global Constraints

- Проект без юнит-тестов — проверка через `npm run build` + Playwright (chromium).
- Все тексты интерфейса — на русском.
- Без `!important` в CSS (правило проекта).
- Формат оценок Shikimori: строка с точкой («7.95»), аналогично `score`.
- Порядок кнопок: MAL, Уютность, Участники, Shikimori (добавляется последней).
- Заголовок: «Топ по рейтингу Shikimori», подзаголовок: «По оценке Shikimori (август 2026)».

---

### Task 1: Собрать оценки Shikimori для всех 55 тайтлов

**Files:**
- Consumes: `src/data/animeData.js` (список 55 тайтлов с русскими названиями)
- Produces: таблица соответствия `rank → shikimoriScore` (для Task 2)

**Interfaces:**
- Produces: объект вида `{ rank: 1, title: "Реинкарнация безработного", shikimoriScore: "8.32" }` для каждого из 55 рангов.

- [ ] **Step 1: Выгрузить текущий список тайтлов**

Из `src/data/animeData.js` получить все записи: `rank`, `title`, `score`.

- [ ] **Step 2: Для каждого тайтла получить оценку Shikimori**

Использовать MCP-инструмент `shikimori_search_anime` с русским названием (fallback — ромадзи из `details.malUrl`), для каждого результата сверять, что найден именно нужный тайтл (id/название сезона). Для неоднозначных — `shikimori_get_anime` по id.

Пример вызова: `shikimori_search_anime(search: "Восхождение героя щита")` → `{ id: 35790, score: "7.9" }`.

- [ ] **Step 3: Проверить покрытие**

Все 55 рангов должны иметь оценку. Тайтлы без найденной оценки — пометить `null` и повторить поиск по ромадзи.

- [ ] **Step 4: Зафиксировать таблицу**

Записать итог в файл `astro-project/docs/specs/shikimori-scores.csv` (rank;title;shikimoriScore) — эталон для Task 2 и CHANGELOG.

### Task 2: Внести `shikimoriScore` в `animeData.js`

**Files:**
- Modify: `src/data/animeData.js` (55 записей + JSDoc)

**Interfaces:**
- Consumes: таблица из Task 1
- Produces: у каждого объекта `anime` поле `shikimoriScore: string|null`; в JSDoc `AnimeData` добавлен `@property {string|null} [shikimoriScore] - Рейтинг Shikimori (0-10)`

- [ ] **Step 1: JSDoc**

В тип `AnimeData` (после `@property {string} score`) добавить:
```js
 * @property {string|null} [shikimoriScore] - Рейтинг Shikimori (0-10)
```

- [ ] **Step 2: Добавить поля в записи**

Для каждой из 55 записей добавить `shikimoriScore: "X.XX",` после `score: "X.XX",` (значения из таблицы Task 1; `null` если оценка не найдена).

Пример:
```js
{ id: 1, rank: 1, title: "Реинкарнация безработного", members: "1 593 675", score: "8.32", shikimoriScore: "8.32", poster: ...
```

- [ ] **Step 3: Проверка**

```bash
node -e "import('./src/data/animeData.js').then(m => { const missing = m.animeData.filter(a => !a.shikimoriScore).map(a => a.rank); console.log('total:', m.animeData.length, 'missing:', JSON.stringify(missing)); })"
```
Ожидание: `total: 55` (и более — если тайтлов больше), `missing: []` (или явный список допущенных).

- [ ] **Step 4: Commit**

```bash
git add astro-project/src/data/animeData.js astro-project/docs/specs/shikimori-scores.csv
git commit -m "data: рейтинги Shikimori для всех тайтлов"
```

### Task 3: data-атрибут на карточке

**Files:**
- Modify: `src/components/AnimeCard.astro:31-34`

**Interfaces:**
- Produces: атрибут `data-shiki-score` на каждой карточке (пустой, если оценки нет)

- [ ] **Step 1: Добавить атрибут**

Рядом с `data-rating={anime.score}` добавить:
```astro
data-shiki-score={anime.shikimoriScore ?? ''}
```

- [ ] **Step 2: Commit**

```bash
git add astro-project/src/components/AnimeCard.astro
git commit -m "feat: data-shiki-score на карточках аниме"
```

### Task 4: Кнопка сортировки

**Files:**
- Modify: `src/pages/index.astro:47-64`

**Interfaces:**
- Produces: кнопка `#sort-shiki` с текстом «По рейтингу Shikimori»

- [ ] **Step 1: Добавить кнопку**

После блока `#sort-members` (строка 63) добавить кнопку с классами, копирующими `#sort-members`, без активных классов (активны только MAL по умолчанию).

- [ ] **Step 2: Commit**

```bash
git add astro-project/src/pages/index.astro
git commit -m "feat: кнопка сортировки по Shikimori"
```

### Task 5: Логика сортировки

**Files:**
- Modify: `src/scripts/render.js:32-109` (`sortPopularityGrid`)
- Modify: `src/scripts/search.js:8,31-72` (`SORT_ACTIVE_CLASSES`, `setPopularitySort`, `initSortButtons`)

**Interfaces:**
- Consumes: `data-shiki-score` (Task 3), `#sort-shiki` (Task 4)
- Produces: режим `'shiki'` в `sortPopularityGrid`; переключение кнопки `#sort-shiki`; заголовки; класс `sort-shiki` на гриде

- [ ] **Step 1: Ветка в `sortPopularityGrid` (render.js)**

После ветки `members` (строка ~58) добавить:
```js
if (mode === 'shiki') {
  const aScore = parseFloat(a.dataset.shikiScore);
  const bScore = parseFloat(b.dataset.shikiScore);
  if (Number.isNaN(aScore)) return 1;
  if (Number.isNaN(bScore)) return -1;
  return bScore - aScore;
}
```
Строка 36: `grid.classList.toggle('sort-shiki', mode === 'shiki');`

- [ ] **Step 2: `setPopularitySort` (search.js)**

Добавить `const shikiBtn = document.getElementById('sort-shiki');`, включить в цикл снятия классов, `shikiBtn.classList.add(...SORT_ACTIVE_CLASSES)` при `mode === 'shiki'`; в `switch` (строки 45–59) добавить:
```js
case 'shiki':
  title.textContent = 'Топ по рейтингу Shikimori';
  subtitle.textContent = 'По оценке Shikimori (август 2026)';
  break;
```

- [ ] **Step 3: `initSortButtons` (search.js)**

После обработчика members:
```js
document.getElementById('sort-shiki').addEventListener('click', () => setPopularitySort('shiki'));
```

- [ ] **Step 4: Проверка**

`npm run build` — без ошибок.

- [ ] **Step 5: Commit**

```bash
git add astro-project/src/scripts/render.js astro-project/src/scripts/search.js
git commit -m "feat: логика сортировки по рейтингу Shikimori"
```

### Task 6: CSS переключения оценки

**Files:**
- Modify: `src/styles/global.css` (после блока `.sort-cozy`, строка 600)

**Interfaces:**
- Consumes: класс `sort-shiki` на гриде (Task 5)
- Produces: в режиме Shikimori карточка показывает оценку Shikimori вместо MAL

- [ ] **Step 1: Стили**

Скопировать блок `.sort-cozy` (строки 597–600) и адаптировать: `#grid-popularity.sort-shiki` — скрыть `.score-rating` (MAL), показать `.score-shiki` (новый элемент с оценкой Shikimori; если на карточке нет отдельного элемента под Shikimori-оценку, добавить в AnimeCard скрытый `.score-shiki` с текстом из `data-shiki-score`).

- [ ] **Step 2: Проверка**

`npm run build` — без ошибок.

- [ ] **Step 3: Commit**

```bash
git add astro-project/src/styles/global.css astro-project/src/components/AnimeCard.astro
git commit -m "feat: отображение оценки Shikimori в режиме сортировки"
```

### Task 7: E2E-проверка Playwright + CHANGELOG

**Files:**
- Verify: весь функционал
- Modify: `astro-project/docs/CHANGELOG.md`, `astro-project/package.json` (version bump)

- [ ] **Step 1: Build**

```bash
npm run build
```

- [ ] **Step 2: Playwright-проверка**

Через playwright MCP (chromium, `astro dev` на http://localhost:4321):
1. Вкладка «Аниме» — 4 кнопки, активна «По рейтингу MAL».
2. Клик «По рейтингу Shikimori» → карточки отсортированы по убыванию Shikimori (проверить первые 3), на карточках оценка Shikimori.
3. Поиск в режиме Shikimori — фильтрация работает.
4. Возврат на «По рейтингу MAL» — порядок/оценки восстановлены.
5. Ошибок консоли нет.

- [ ] **Step 3: CHANGELOG**

Запись в `docs/CHANGELOG.md`:
```markdown
## [5.0.22] — 2026-08-11

### Добавлено (сортировка по рейтингу Shikimori)
- ...
### Проверено
- `npm run build` — OK.
- Playwright (chromium): ...
```

- [ ] **Step 4: Version bump + финальный коммит**

```bash
git add -A
git commit -m "alpha.012: релиз 5.0.22 — сортировка по рейтингу Shikimori"
```
