# Дизайн: сортировка «По рейтингу Shikimori»

Дата: 2026-08-11
Статус: одобрено пользователем
Версия: 1.0

## Цель

Добавить четвёртый режим сортировки вкладки «Аниме» — **«По рейтингу Shikimori»**. Пользователь сможет переключать порядок карточек по оценке Shikimori и видеть оценку Shikimori на карточке вместо MAL.

## Контекст

- Сортировка клиентская, по data-атрибутам DOM-карточек (SSG-рендер).
- Существующие режимы: «По рейтингу MAL» (по `data-rank`, по умолчанию), «По уютности» (`data-cozy-score`), «По участникам» (`data-members`).
- В данных (`animeData.js`) оценок Shikimori нет — будут добавлены статически (поле `shikimoriScore`).
- Кнопки: `src/pages/index.astro:47–64`. Логика: `src/scripts/render.js` (`sortPopularityGrid`), `src/scripts/search.js` (`setPopularitySort`, `initSortButtons`). Карточка: `src/components/AnimeCard.astro` (data-атрибуты, строки 31–34). Скрытие/показ оценок: `src/styles/global.css:597–600` (`.sort-cozy`).

## Решения (согласованы с пользователем)

1. **Источник данных** — статический: оценки Shikimori собираются через MCP Shikimori для всех 55 тайтлов и встраиваются в `animeData.js` (поле `shikimoriScore`). Без запросов в рантайме.
2. **Отображение** — при активной сортировке по Shikimori карточка показывает оценку Shikimori (по образцу режима «уютность»).
3. **Охват** — попытаться найти оценку Shikimori для всех 55 тайтлов; тайтлы без оценки — в конец списка.

## Изменения (5 точек)

### 1. Данные — `src/data/animeData.js`
- Каждому объекту аниме добавляется `shikimoriScore` (строка, например `"7.95"`).
- JSDoc-тип `AnimeData` дополняется `@property {string} [shikimoriScore] - Рейтинг Shikimori (0-10)`.

### 2. Карточка — `src/components/AnimeCard.astro`
- Новый атрибут: `data-shiki-score={anime.shikimoriScore ?? ''}`.

### 3. Кнопка — `src/pages/index.astro`
- Четвёртая кнопка `#sort-shiki` с текстом **«По рейтингу Shikimori»** в блоке `#popularity-sort` (строки 47–64), по образцу `#sort-members`.

### 4. Логика — `src/scripts/render.js` + `src/scripts/search.js`
- `sortPopularityGrid`: новая ветка `mode === 'shiki'` — сортировка по `parseFloat(data-shiki-score)` по убыванию; карточки без значения (`NaN`) — в конец.
- `setPopularitySort`: переключение активных классов на `#sort-shiki`, заголовки:
  - `#popularity-title`: «Топ по рейтингу Shikimori»
  - `#popularity-subtitle`: «По оценке Shikimori (август 2026)»
- `initSortButtons`: обработчик `#sort-shiki`.
- Грид получает класс `sort-shiki` (аналог `sort-cozy`) при активации режима.

### 5. Стили — `src/styles/global.css`
- По образцу `.sort-cozy` (строки 597–600): при `#grid-popularity.sort-shiki` скрывать MAL-оценку и показывать оценку Shikimori на карточке (например, с пометкой/подписью).

## Обработка ошибок

- Тайтл без `shikimoriScore`: `data-shiki-score` пустой → сортировка относит карточку в конец; карточка в режиме Shikimori показывает «—» вместо оценки.
- Некорректное число в данных: `parseFloat` → `NaN` → трактуется как отсутствие оценки (в конец).

## Проверка

1. `npm run build` — без ошибок.
2. Playwright (chromium):
   - 4 кнопки сортировки, активная подсвечена;
   - переключение «По рейтингу Shikimori»: порядок карточек по убыванию Shikimori, на карточках оценка Shikimori;
   - возврат на «По рейтингу MAL»: порядок и оценки MAL восстанавливаются;
   - поиск работает в режиме Shikimori;
   - ошибок консоли нет.
3. Данные: у всех 55 тайтлов есть `shikimoriScore` (проверка скриптом/грепом).

## Вне области

- Изменение других вкладок (Imba, Персонажи, Лайт-новеллы).
- Динамическая подгрузка оценок (fetch/SSG) — отложено, выбран статический вариант.
- Ссылки на страницы Shikimori на карточках.
