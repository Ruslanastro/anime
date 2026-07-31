# Changelog

Все значимые изменения проекта "Аниме Топ 2026".

## [5.0.2] — 2026-07-31

### Исправлено (P0)

#### Критические
- **detail.js** — lookup портрета персонажа: `find` возвращал map, а не запись; теперь `map?.[ch.name]` (картинки из `characters/*.js` снова видны в detail)
- **detail.js / tabs.js / index.astro / SearchBar.astro** — show/hide chrome detail больше не зависит от Tailwind-классов; стабильные id: `#popularity-header`, `#popularity-sort`, `#search-row-popularity`, `#grid-popularity`
- **detail.js** — `setPopularityChromeVisible()`; tabs вызывает `closeAnimeDetail()` вместо дублирующей internal-функции

#### Средние
- **tabs.js** — Escape закрывает модалку через единый `closeCharacterDetail` из detail.js (удалён локальный дубль)
- **detail.js** — back/close: `getElementById('detail-back-btn')` / `getElementById('char-modal-close')`
- **search.js + index.astro** — subtitle/title сортировки: default = рейтинг MAL; rating больше не показывает текст про участников; active-классы на кнопке rating в HTML

#### Hygiene
- **.gitignore** — `node_modules/`, `dist/`, `.astro/`, env, editor junk
- **package.json** — version `5.0.2` (синхронизация с CHANGELOG)

### Документация
- **AGENTS.md** — ids popularity chrome, единый close modal

## [5.0.1] — 2026-07-31

### Исправлено (аудит кода)

#### Критические
- **InfoCard.astro** — конкатенация HTML через `set:html` заменена на Astro-темплейт с условным рендерингом (Tailwind JIT теперь видит все классы)
- **global.css** — фон body упрощён: 17 слоёв градиентов → 9, удалены анимации `aurora` и `conic-gradient` + `rotate`
- **TabNav.astro + tabs.js** — добавлены ARIA-атрибуты (`role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `tabindex`, `aria-hidden`)
- **CharacterModal.astro** — добавлены `role="dialog"`, `aria-modal="true"`, `aria-labelledby="char-name"`
- **SearchBar.astro** — добавлен `aria-label` на поле ввода
- **Header.astro** — логотип сделан клавиатурно-доступным (`tabindex="0"`, `role="button"`, Enter/Space)
- **theme.js** — `localStorage` обёрнут в `try/catch` (хелперы `lsGet`/`lsSet`)
- **detail.js** — `alert()` заменён на модальное окно с сообщением
- **index.astro** — все панели контента получили `role="tabpanel"`, `aria-labelledby`, `aria-hidden`

#### Средние
- **Footer.astro** — дата теперь генерируется динамически (месяц + год из `new Date()`)
- **Header.astro** — удалён избыточный класс `dark:bg-white/10`
- **global.css** — удалены 5× `!important` (через удвоение селектора `cls.cls:hover`)
- **global.css** — `will-change` удалён с `.anime-card` и `.info-card`, оставлен только на `.poster`
- **search.js** — массив `activeClasses` вынесен в константу модуля `SORT_ACTIVE_CLASSES`

#### Косметические
- **AnimeDetail.astro** — `href="#"` заменён на `href="javascript:void(0)"`
- **global.css** — устранён тройной перенос строки между `.hero-parallax` и `#random-btn`
- **parallax.js** — неиспользуемый параметр `_config` заменён на `for...of` деструктуризацию

#### Баги (найдены при финальной проверке)
- **LnCard.astro** — `{statusColor}` не резолвился в Astro. Замена на `class:list={['...', statusColor]}` (Astro-идиоматичный способ)
- **InfoCard.astro** — `style="width: {data.love}%"` не резолвился. Замена на `` style={`width: ${data.love}%`} ``

### Реорганизация
- **Изображения**: 55 постеров перемещены из `public/images/` в `public/images/posters/`
- Обновлены все пути в `animeData.js`

### Исправление описаний (по MAL)
- #11 Tsukimichi — исправлено описание (строит свой город, не уходит к демонам)
- #12 Villainess Fiancée — полностью переписано (было про парня в теле злодейки)
- #27 If It's for My Daughter — полностью переписано (было про отца в другом мире)
- #31 Outcast's Restaurant — исправлен мир (тот же мир, не другой)
- #34 Days with My Stepsister — исправлено (родители женятся, не умерли)

### Документация
- **AGENTS.md** — технический референс для AI-ассистентов
- **README.md** — описание проекта, архитектура, быстрый старт
- **docs/CHANGELOG.md** — этот файл
- **docs/PLANS.md** — дальнейшие планы

## [5.0.0] — 2026-07-11

Первая версия на Astro (миграция с предыдущего стека).
- Реализованы все 6 вкладок
- Тёмная/светлая тема
- Поиск и сортировка
- Детальный просмотр аниме
- Модальное окно персонажа
- Параллакс и тултипы
- 55 тайтлов, 20 лайт-новелл, данные персонажей
