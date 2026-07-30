# План миграции на Astro

## 1. Обзор

**Цель:** Перевести проект "Аниме Топ 2026" с vanilla JS + Tailwind CDN на Astro — современный статический генератор с компонентным подходом, встроенной оптимизацией и изоляцией стилей.

**Текущее состояние:** Чистый клиентский сайт (vanilla JS, Tailwind CDN, Font Awesome CDN), данные захардкожены в JS, рендер через innerHTML, глобальные window.* функции.

**Целевое состояние:** Astro-проект с `.astro` компонентами, импортами данных, безопасным рендером, встроенной оптимизацией CSS/JS.

---

## 2. Архитектура Astro-проекта

```
top-anime-astro/
├── public/
│   ├── images/              # Все постеры и изображения персонажей
│   │   ├── 01_Re_Zero.jpg
│   │   ├── ...
│   │   └── characters/
│   └── anime_background.jpg
├── src/
│   ├── components/
│   │   ├── Header.astro           # Шапка с логотипом и переключателем темы
│   │   ├── TabNav.astro           # Навигация по вкладкам
│   │   ├── SearchBar.astro        # Компонент поиска
│   │   ├── AnimeCard.astro        # Карточка аниме (постер + информация)
│   │   ├── InfoCard.astro         # Карточка для imba/characters/ecchi/cute
│   │   ├── AnimeDetail.astro      # Детальная страница аниме
│   │   ├── CharacterModal.astro   # Модальное окно персонажа
│   │   ├── Skeleton.astro         # Skeleton-заглушки
│   │   ├── Footer.astro           # Подвал
│   │   └── ThemeToggle.astro      # Переключатель темы
│   ├── layouts/
│   │   └── BaseLayout.astro       # Основной layout (head, body, скрипты)
│   ├── pages/
│   │   └── index.astro            # Главная страница
│   ├── data/
│   │   ├── animeData.js           # Все 54 тайтла (бывший data.js)
│   │   ├── imbaData.js            # Данные имба-героев
│   │   ├── charactersData.js      # Данные персонажей
│   │   ├── ecchiData.js           # Данные экки
│   │   ├── cuteData.js            # Данные милых героев
│   │   ├── cozyData.js            # Данные уютности
│   │   └── characters/            # Детальные данные персонажей
│   │       ├── konosuba.js
│   │       ├── 300-let-ubivala-slizney.js
│   │       └── srednie-sposobnosti.js
│   ├── scripts/
│   │   ├── theme.js               # Логика тёмной/светлой темы
│   │   ├── tabs.js                # Переключение вкладок
│   │   ├── search.js              # Поиск с debounce
│   │   ├── tooltip.js             # Кастомный tooltip
│   │   ├── detail.js              # Детальная страница и модалка
│   │   └── parallax.js            # Параллакс фона
│   └── styles/
│       └── global.css             # Глобальные стили + CSS-переменные тем
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

---

## 3. Пошаговый план миграции

### Шаг 1: Инициализация Astro-проекта

**Действия:**
1. Создать новый Astro-проект в отдельной директории (или инициализировать в текущей)
2. Установить зависимости: `npm create astro@latest`
3. Настроить `astro.config.mjs` — отключить SSR (чисто статический сайт)
4. Скопировать `images/` и `anime_background.jpg` в `public/`

**Проверка:** `npm run dev` — Astro запускается, открывается пустая страница

---

### Шаг 2: Перенос данных (data layer)

**Действия:**
1. Создать `src/data/animeData.js` — скопировать массив `animeData` из `js/data/data.js`
2. Убрать `window.animeData = animeData` — заменить на `export const animeData = [...]`
3. Аналогично для всех остальных данных: `imbaData`, `charactersData`, `ecchiData`, `cuteData`, `cozyData`, `getCozyInfo`
4. Перенести файлы персонажей в `src/data/characters/` с заменой `window.*` на `export`

**Ключевые изменения:**
```js
// Было (data.js):
const animeData = [...];
window.animeData = animeData;

// Стало (src/data/animeData.js):
export const animeData = [...];
```

**Проверка:** Данные импортируются в компонентах без ошибок

---

### Шаг 3: Создание BaseLayout

**Действия:**
1. Создать `src/layouts/BaseLayout.astro`
2. Перенести `<head>` из `index.html`: мета-теги, заголовок, шрифты
3. Подключить Tailwind через CDN (временно, потом можно перейти на @astrojs/tailwind)
4. Подключить Font Awesome через CDN
5. Подключить `global.css`
6. Создать `src/styles/global.css` — скопировать всё из `css/styles.css`

**Проверка:** Страница рендерится с правильными стилями

---

### Шаг 4: Создание компонентов

#### 4.1 Header.astro
- Логотип с градиентом
- Название "Аниме Топ 2026"
- Переключатель темы (кнопки тёмной/светлой)
- Бейдж "Данные обновлены"

#### 4.2 TabNav.astro
- 5 кнопок вкладок с иконками
- Анимированное подчёркивание (`#tab-underline`)
- Принимает `activeTab` как проп

#### 4.3 SearchBar.astro
- Поле ввода с placeholder
- Счётчик результатов
- Принимает `tabId` как проп

#### 4.4 AnimeCard.astro
- Постер с fallback-заглушкой и lazy-load
- Rank badge, members badge
- Название, жанр, рейтинг/уютность
- Tooltip на hover
- Клик открывает детальную страницу

#### 4.5 InfoCard.astro
- Универсальная карточка для imba/characters/ecchi/cute
- Принимает `type` и `data` как пропы

#### 4.6 AnimeDetail.astro
- Крупный постер, мета-информация, описание
- Сетка персонажей
- Ссылка на MAL

#### 4.7 CharacterModal.astro
- Модальное окно с деталями персонажа
- Изображение, описание, характер, биография

#### 4.8 Skeleton.astro
- Skeleton-заглушки для lazy-загрузки вкладок

#### 4.9 Footer.astro
- Подвал с копирайтом

---

### Шаг 5: Перенос интерактивной логики в скрипты

**Действия:**
1. **`src/scripts/theme.js`** — логика `setTheme()`, `loadTheme()`, сохранение в localStorage
2. **`src/scripts/tabs.js`** — `switchTab()`, `showSkeleton()`, `renderGridForTab()`, анимации переключения
3. **`src/scripts/search.js`** — `filterCurrentTab()` с debounce, пустое состояние, корректные счётчики
4. **`src/scripts/tooltip.js`** — `showTooltip()`, `hideTooltip()` с улучшенным позиционированием
5. **`src/scripts/detail.js`** — `showAnimeDetail()`, `closeAnimeDetail()`, `showCharacterDetail()`, `closeCharacterDetail()`
6. **`src/scripts/parallax.js`** — параллакс фона (почти без изменений)

**Ключевое изменение:** Вместо `window.*` глобалов — импорты и экспорты:
```js
// Было:
window.showTooltip = showTooltip;

// Стало:
export function showTooltip(targetElement, text) { ... }
```

Скрипты подключаются через `<script>` в `BaseLayout.astro` или через `client:load` директивах.

---

### Шаг 6: Сборка главной страницы (index.astro)

**Действия:**
1. Создать `src/pages/index.astro`
2. Использовать `BaseLayout`
3. Разместить компоненты: `Header`, `TabNav`, 5 секций контента
4. Каждая секция — это `AnimeCard` или `InfoCard` в сетке
5. Добавить `AnimeDetail` и `CharacterModal` (скрытые по умолчанию)

**Структура index.astro:**
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import TabNav from '../components/TabNav.astro';
// ... остальные импорты
---

<BaseLayout title="Аниме Топ • 2026">
  <Header />
  <TabNav />
  
  <div class="max-w-7xl mx-auto px-6 pb-16">
    <!-- Popularity -->
    <div id="content-popularity">
      <!-- Заголовок, сортировка, поиск -->
      <div id="grid-popularity" class="grid ...">
        {animeData.map(anime => <AnimeCard anime={anime} />)}
      </div>
    </div>
    
    <!-- Остальные вкладки (hidden по умолчанию) -->
    ...
  </div>
  
  <Footer />
  
  <script>
    import('../scripts/theme.js');
    import('../scripts/tabs.js');
    // ...
  </script>
</BaseLayout>
```

---

### Шаг 7: Улучшения в процессе миграции

Пока переносим код, можно сразу внести улучшения:

1. **Поиск с debounce** — добавить `setTimeout`/`clearTimeout` в `filterCurrentTab`
2. **Пустое состояние поиска** — показывать "Ничего не найдено" вместо пустой сетки
3. **Безопасный рендер** — заменить `innerHTML` на `document.createElement` + `textContent` для строковых данных
4. **Убрать inline onclick** — все события навешиваются через `addEventListener` в скриптах
5. **TypeScript** — Astro поддерживает TS из коробки, можно постепенно типизировать

---

### Шаг 8: Опциональные улучшения после миграции

1. **@astrojs/tailwind** — интеграция Tailwind вместо CDN (кастомная конфигурация, purge)
2. **@astrojs/image** — встроенная оптимизация изображений
3. **Динамический импорт данных персонажей** — загружать только когда открыта детальная страница
4. **Анимации** — View Transitions API (Astro 4+), более плавные переходы между вкладками

---

## 4. Что останется без изменений

- **Изображения** — все 54 постера и изображения персонажей остаются в `public/images/`
- **CSS-стили** — `global.css` будет содержать те же CSS-переменные и кастомные стили
- **Логика темизации** — тёмная/светлая тема через CSS-переменные + класс `.light`
- **Данные** — структура данных остаётся той же, меняется только способ экспорта

---

## 5. Риски и сложности

| Риск | Сложность | Решение |
|------|-----------|---------|
| Интерактивность вкладок (переключение без перезагрузки) | Высокая | Использовать `<script>` с `client:load` или `client:visible` |
| Модальное окно персонажа | Средняя | Отдельный скрипт `detail.js` с ручным управлением DOM |
| Поиск и фильтрация на клиенте | Средняя | Весь поиск остаётся в JS-скриптах, Astro только рендерит начальное состояние |
| Параллакс-эффект | Низкая | Скрипт `parallax.js` переносится почти без изменений |
| Сохранение темы в localStorage | Низкая | Скрипт `theme.js` выполняется на клиенте |

**Главный принцип:** Astro отвечает за статический рендеринг HTML. Вся интерактивность (вкладки, поиск, модалки, тема) остаётся в vanilla JS-скриптах, которые выполняются на клиенте.

---

## 6. Порядок выполнения (для Code mode)

1. Инициализировать Astro-проект
2. Скопировать `images/` в `public/`
3. Перенести данные в `src/data/` с `export`
4. Создать `src/styles/global.css`
5. Создать `src/layouts/BaseLayout.astro`
6. Создать компоненты (Header, TabNav, SearchBar, AnimeCard, InfoCard, Skeleton, Footer)
7. Перенести скрипты в `src/scripts/` с `export`
8. Собрать `src/pages/index.astro`
9. Создать компоненты AnimeDetail и CharacterModal
10. Проверить работоспособность
11. Удалить старые файлы (js/, css/, index.html)