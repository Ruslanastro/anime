# Changelog

Все значимые изменения проекта "Аниме Топ 2026".

## [5.0.11] — 2026-08-02

### Изменено (UI/эффект подсветки «Случайное»)

- **global.css** — усилен эффект `.card-random-glow` (по просьбе пользователя «сделать покрасивее»): многослойный box-shadow — яркое золотое кольцо (4→6px, `#fbbf24`/`#f59e0b`), плотный золотой нимб (opacity 0.5–0.85), фиолетовый и пурпурный ореолы в фирменных цветах сайта (opacity 0.25–0.45), внутреннее свечение по краям карточки (inset, opacity 0.3–0.4); пульсация ускорена до 1.6s. Первая (более деликатная) версия в 5.0.10 была почти не видна на тёмных карточках.
- **random.js** — ничего не менялось (класс/механика из 5.0.10 в силе), только CSS.

### Проверено

- `npm run build` — OK. Playwright (chromium): после клика «Случайное» ровно 1 карточка получает `animationName: card-random-glow`, box-shadow анимируется (кольцо 4→6px пульсирует), ошибок консоли нет. Пользователь подтвердил, что эффект виден и нравится.

## [5.0.10] — 2026-08-02

### Исправлено (P0, найдено при полном ревью кода)

- **render.js** — поиск на вкладке «Аниме» не фильтровал карточки: `filterGrid` перебирал `grid.children`, но в `#grid-popularity` лежат два враппера (`#skeleton-popularity`, `#content-popularity-cards`), а не 55 карточек. Любой запрос показывал/скрывал ВСЮ сетку, счётчик всегда был «0 / 2» или «1 / 2». Теперь перебираем `grid.querySelectorAll('.anime-card, .info-card, .ln-card')`.
- **tabs.js** — при возврате на вкладку «Аниме» сетка из 55 карточек навсегда скрывалась: селектор `[id^="content-"]` задевал и враппер `#content-popularity-cards`, и таймаут 280 мс вешал на него `hidden`. Теперь панели ищутся по `[role="tabpanel"]`, кнопки — по классу `.nav-tab` (без `#tab-underline`).
- **global.css** — убраны дубли/мёртвый CSS: `#tab-underline` определялся дважды (старый блок из эпохи TabNav удалён), `.hdr-search` (поиск из шапки удалён в 5.0.9), `.stat-bar`, `.metric`, `.hero-parallax` — нигде не используются.

### Исправлено (совместимость/современность)

- **global.css** — добавлен `@custom-variant light (&:where(.light, .light *))`. Классы вида `light:bg-white/70`, `light:bg-black/30`, `light:from-black/10` (в AnimeCard, CharacterModal, detail.js) раньше молча не генерировались в светлой теме.
- **detail.js** — `tracking-1.5px` → `tracking-[1.5px]` (в Tailwind v4 нет голой `tracking-1.5px`, letter-spacing у меток «Сезоны/Эпизоды/…» не применялся).
- **tsconfig.json** — убран невалидный `ignoreDeprecations: "6.0"` (ломала `tsc`/`astro check`: `error TS5103`). `npx tsc --noEmit` теперь проходит чисто.
- **random.js** — подсветка случайной карточки переведена с inline `box-shadow … 'important'` на CSS-класс `.card-random-glow` с анимацией (соблюдено правило проекта «без !important»). Дополнительно исправлен баг: inline `animation-delay` карточек (stagger, `index * 35ms`) перебивал старт glow-анимации — карточка не успевала подсветиться. При добавлении класса `animation-delay` сбрасывается в `0s` и восстанавливается при снятии; специфичность `.card-random-glow.card-random-glow` поднята (конфликтовала с `.card-stagger`).

### Изменено (гигиена репозитория)

- **package.json** — version синхронизирована с CHANGELOG: `5.0.10`.
- **README.md** — исправлено: 10 → 9 .astro компонентов (TabNav удалён), добавлен `main.js` в список модулей, удалён странный фрагмент «на运行时».
- **docs/PLANS.md** — актуальное число персонажей с данными: 41 (а не ~37).
- Удалён осиротевший `public/anime_background.jpg`; `public/images/ln/download_covers.ps1` перенесён в `tools/download_covers.ps1` (не копируется в `dist/`).

### Проверено

- `npm run build` — OK. `npx tsc --noEmit` — 0 ошибок.
- Playwright (chromium): поиск «konosuba» на вкладке «Аниме» → 1/55, без совпадений → 0/55, очистка → 55/55; переключение imba → Аниме и обратно → все 55 карточек на месте, грид не скрыт; underline позиционируется; кнопка «Случайное» работает (1 карточка с glow); в светлой теме бейдж членов белый (`light:` variant работает); ошибок консоли нет.

## [5.0.9] — 2026-08-02

### Изменено (UI/навигация)

- **Header.astro** — убран поиск из шапки (`#header-search`, «Поиск аниме…») — он не работал, а функциональный поиск уже есть в каждой вкладке (SearchBar).
- **Header.astro** — вкладка «Популярность» переименована в «Аниме».
- **TabNav.astro** — файл удалён окончательно (уже не использовался после встраивания навигации в шапку в 5.0.7).

## [5.0.8] — 2026-08-02

### Исправлено (UI/дизайн)

- **global.css** — у карточек лайт-новелл (`.ln-card`) добавлен полупрозрачный фон с блюром: тёмная тема `rgba(26,26,36,0.88)`, светлая `rgba(255,255,255,0.88)` + `backdrop-filter: blur(10px)`. Раньше у них вообще не было фона — текст «Найдено/Всего» сливался с фоновой картинкой и плохо читался.

## [5.0.7] — 2026-08-02

### Изменено (UI/дизайн)

- **Header.astro** — полностью переработана шапка по выбранному пользователем варианту C из preview-header2.html: двухрядная (бренд + действия сверху, вкладки строкой ниже). Стиль «Тёмное стекло + градиентная кромка»: матовое стекло `rgba(10,10,20,0.6)` + `backdrop-filter: blur(20px) saturate(140%)`, снизу градиентная кромка (violet→fuchsia→indigo через `border-image`). Верхний ряд: бренд (телевизор в стеклянном квадрате с фиолетовой обводкой), поиск-пилюля, кнопки «Случайное»/«Тёмная»/«Светлая» (стеклянные иконки), бейдж «Данные обновлены» с пульсацией. Вкладки перенесены в шапку (нижний ряд), активная вкладка — белая + светящаяся градиентная линия `#tab-underline` (violet→fuchsia).
- **TabNav.astro** — компонент удалён; навигация встроена в Header. `index.astro` больше не импортирует и не рендерит TabNav.
- **theme.js** — активная кнопка темы теперь подсвечивается классом `.theme-active` (замена Tailwind `bg-white/10`): фиолетовая рамка + свечение, в светлой теме — индиго.
- **global.css** — стили шапки `.site-header`, `.hdr-brand-icon`, `.hdr-search`, `.hdr-btn-icon`, `.hdr-tag`, `.hdr-nav`, `#tab-underline` (обе темы через `body.light`). Старые `.nav-tab`/`.tab-active` (пилюли) заменены на стили вкладок варианта C.

### Прочее

- Удалены временные `public/preview-header.html`, `preview-header2.html`, `preview-header3.html` (вариант выбран и встроен).

## [5.0.6] — 2026-08-02

### Добавлено (UI/дизайн)

- **public/images/anime-bg.jpg** — фоновое изображение «аниме-небо со звёздами» (фиолетово-розовая гамма, кандидат #3 из подбора). Скачано с wallhaven.cc (категория general/SFW), сжато в JPG 2560px (~826 КБ) для веба.
- **global.css** — фон body теперь состоит из картинки + затемняющего оверлея: тёмная тема — `rgba(10,10,20,0.62→0.72)`, светлая — `rgba(248,250,252,0.5→0.6)` (после отзыва пользователя непрозрачность светлого оверлея снижена с 0.86→0.9, чтобы картинка была заметнее), чтобы контент оставался читаемым в обеих темах. Интенсивность aurora-блобов слегка снижена (opacity 0.5 → 0.42).

### Изменено (UI/дизайн)

- **BaseLayout.astro** — добавлено фоновое изображение на body (через `url('/images/anime-bg.jpg')`), aurora-блобы сохранены как анимированный слой поверх картинки.

## [5.0.5] — 2026-08-02

### Изменено (UI/дизайн)

- **global.css / BaseLayout.astro** — новый фон «Aurora»: вместо точек-звёзд и жёстких градиентов — 4 больших размытых неоновых пятна (`.aurora-blob-1..4`), медленно дрейфующих на `transform` (GPU-friendly, без конфликта с параллаксом body). Цвета через CSS-переменные: тёмная тема — violet/fuchsia/indigo, светлая — пастельные. Поддержка `prefers-reduced-motion` (анимация отключается). Контент обёрнут в `.content-layer` (z-index: 1) поверх aurora.
- **BaseLayout.astro** — добавлен favicon `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`.
- **public/favicon.svg** — новая иконка сайта (телевизор в градиенте violet→fuchsia), устраняет ошибку 404 favicon.

## [5.0.4] — 2026-08-01

### Добавлено (данные)

- **animeData.js** — MAL-ссылки для 27 дополнительных тайтлов через **AniList GraphQL API** (Jikan был недоступен: Cloudflare 504). Всего теперь **55 из 55** тайтлов имеют `details.malUrl`.
  - Новые: ранги 2 (Usagi Drop), 12 (JishouAkuyaku…), 15 (Bakarina), 17 (Dainana Ouji), 18 (Tondemo Skill), 19 (Maou no Musume ONA), 20 (Seijo no Maryoku S1), 21 (Mamahaha), 22 (Torture Princess), 23 (Kuma Bear S1), 24 (Beelzebub), 26 (Akuyaku 99), 29 (Kuro no Shoukanshi), 30 (Yuusha Yamemasu), 31 (Tsuihousha Shokudou), 32 (Kamitachi), 33 (Leadale), 37 (UzaMaid!), 38 (Unnamed Memory), 43 (Harem Labyrinth), 44 (Hazure Waku), 45 (Jitsu wa Ore), 48 (Tensei Kenja), 50 (Hachinan), 51 (Yuusha Party), 52 (Shikkakumon), 53 (Shinka no Mi)
  - **Rank 55** добавлен отдельно вручную: «Saikyou no Shokugyou wa Yuusha demo Kenja demo Naku Kanteishi (Kari) Rashii desu yo» (id=62825) — тайтл не находился поиском по ромадзи-вариантам, пользователь предоставил точную ссылку.
  - Исправлены «сезонные» ошибки маппинга при автоподборе: 20 (S2→S1), 23 (Punch→S1), 37 (OVA→S1), 38 (Act.2→S1), 43 (OVA→S1)

## [5.0.3] — 2026-07-31

### Добавлено (данные)

- **animeData.js** — MAL-ссылки для 21 тайтла, верифицированных через Jikan API. Всего в проекте теперь 27 тайтлов с `details.malUrl` (раньше было 5).
  Охвачены ранги: 1, 3, 4, 5, 7, 8, 9, 10, 11, 13, 14, 16, 27, 28, 34, 35, 39, 41, 42, 46, 47.
  Дополнительно к уже имевшимся: 6, 25, 36, 40, 54.

### Исправлено (мелкие UX/код-ревизии)

- **AGENTS.md** — синхронизировано фактическое количество файлов: 10 компонентов (не 12), список 9 JS-модулей раскрыт явно (theme, tabs, search, detail, render, tooltip, random, parallax, main)
- **README.md** — добавлено дерево структуры проекта в раздел «Архитектура»
- **AnimeDetail.astro** — у `detail-mal-link` убран `href="javascript:void(0)"` → `href="#"` с `preventDefault`-подстраховкой в `detail.js` (клавиатурный клик не добавляет `#` в историю, когда ссылка скрыта)
- **render.js** — сортировка карточек популярности теперь FLIP-анимирована (замер позиций → DOM-перестановка → `element.animate()` 320 мс). Учтён `prefers-reduced-motion: reduce` — в этом случае перестановка мгновенная
- **global.css** — добавлен селектор `.anime-card.flip-animating` (удвоенный для специфики), блокирующий hover-transform во время FLIP, чтобы анимация не конфликтовала с состоянием `:hover`

### Известные ограничения
- 28 тайтлов всё ещё без `malUrl` (Jikan API отклонил часть запросов из-за Cloudflare rate-limiting) — будут добиты позже
- 4 ID-flaged-кандидата (ранги 12, 20, 26, 29) определены неверно и исключены из вставки

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
