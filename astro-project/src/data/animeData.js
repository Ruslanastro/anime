/**
 * animeData.js
 * Все статические данные для приложения "Аниме Топ 2026"
 */

// ==================== JSDoc ТИПЫ ====================

/**
 * @typedef {Object} AnimeData
 * @property {number} id - Уникальный ID
 * @property {number} rank - Ранг в списке
 * @property {string} title - Название аниме
 * @property {string} members - Количество участников MAL
 * @property {string} score - Рейтинг MAL (0-10)
 * @property {string|null} [shikimoriScore] - Рейтинг Shikimori (0-10)
 * @property {string} poster - Путь к постеру
 * @property {string} genre - Жанр
 * @property {string} [shortDescription] - Краткое описание для tooltip
 * @property {string} description - Полное описание
 * @property {Object} [details] - Расширенная информация
 * @property {number} [details.seasons] - Количество сезонов
 * @property {number|string} [details.episodes] - Количество эпизодов
 * @property {string} [details.source] - Первоисточник
 * @property {number} [details.volumes] - Количество томов ранобэ
 * @property {string} [details.studio] - Аниме-студия
 * @property {string} [details.aired] - Период выхода
 * @property {string} [details.status] - Статус выхода
 * @property {string} [details.type] - Тип (TV, OVA и т.д.)
 * @property {string} [details.malUrl] - Ссылка на MAL
 * @property {CharacterBrief[]} [details.mainCharacters] - Главные персонажи
 */

/**
 * @typedef {Object} CharacterBrief
 * @property {string} name - Имя персонажа
 * @property {string} desc - Краткое описание
 * @property {string} [image] - Путь к изображению (опционально)
 */

/**
 * @typedef {Object} ImbaHero
 * @property {string} name - Имя героя
 * @property {string} anime - Название аниме
 * @property {string} power - Уровень силы (описание)
 * @property {string} desc - Описание
 * @property {number} level - Цифровой уровень силы
 */

/**
 * @typedef {Object} CharacterInfo
 * @property {string} name - Имя персонажа
 * @property {string} anime - Название аниме
 * @property {string} desc - Описание
 * @property {number} love - Уровень любви (%)
 */

/**
 * @typedef {Object} CozyInfo
 * @property {string} title - Название тайтла
 * @property {string} reason - Причина рейтинга
 * @property {number} score - Оценка уютности
 */

/**
 * @typedef {Object} EcchiInfo
 * @property {string} title - Название тайтла
 * @property {string} reason - Описание уровня
 * @property {number} level - Уровень explicit (0-100)
 * @property {string} [note] - Дополнительная заметка
 */

/**
 * @typedef {Object} CuteInfo
 * @property {string} title - Название тайтла
 * @property {string} reason - Описание милоты
 * @property {number} cute - Оценка милоты
 * @property {string} note - Заметка
 */

/**
 * @typedef {Object} CozyLookupEntry
 * @property {number} score - Оценка уютности
 * @property {string} reason - Причина
 */

export const animeData = [
    { id: 1, rank: 1, title: "Реинкарнация безработного", members: "1 593 675", score: "8.32", shikimoriScore: "8.32", poster: "/images/posters/05_Reinkarnatsiya_bezrabotnogo.jpg", genre: "Магический мир / взросление", description: "Перерождённый неудачник серьёзно подходит к новой жизни. Постепенно становится одним из сильнейших магов мира, проходя путь искупления и роста.",
      details: { malUrl: "https://myanimelist.net/anime/39535/Mushoku_Tensei__Isekai_Ittara_Honki_Dasu" } },
    { id: 2, rank: 2, title: "Ре:Зеро", members: "2 493 142", score: "8.25", shikimoriScore: "8.25", poster: "/images/posters/01_Re_Zero.jpg", genre: "Психологический / петля смерти", description: "Главный герой погибает и возвращается во времени, пытаясь спасти близких. Тёмный, эмоционально тяжёлый исэкай с сильным психологическим акцентом и петлями смерти.",
      details: { malUrl: "https://myanimelist.net/anime/31240/Re_Zero_kara_Hajimeru_Isekai_Seikatsu" } },
    { id: 3, rank: 3, title: "Волчица и пряности", members: "876 392", score: "8.21", shikimoriScore: "8.21", poster: "/images/posters/07_Volchitsa_i_pryanosti.jpg", genre: "Торговля и волчица", description: "Мудрый торговец путешествует вместе с древней богиней-волчицей. История о экономике, философии и медленно развивающихся отношениях в средневековом мире.",
      details: { malUrl: "https://myanimelist.net/anime/2966/Ookami_to_Koushinryou" } },
    { id: 4, rank: 4, title: "О моём перерождении в слизь", members: "1 668 718", score: "8.13", shikimoriScore: "8.13", poster: "/images/posters/04_O_moem_pererozhdenii_v_sliz.jpg", genre: "Нация монстров / дипломатия", description: "Слабый слизь постепенно создаёт собственную страну, налаживает отношения между расами и становится одним из самых влиятельных существ мира.",
      details: { malUrl: "https://myanimelist.net/anime/37430/Tensei_shitara_Slime_Datta_Ken" } },
    { id: 5, rank: 5, title: "KonoSuba", members: "2 171 628", score: "8.09", shikimoriScore: "8.09", poster: "/images/posters/02_KonoSuba.png", genre: "Комедия / пародия на исэкай",
      shortDescription: "Неудачливый хикикомори и богиня воды пытаются выжить в фэнтези-мире. Абсурдная пародия на исэкай с культовым статусом.",
      description: "Казума Сато — хикикомори, умерший нелепой смертью. В загробном мире он встречает богиню Акву и выбирает её в качестве «бонуса» для перерождения в фэнтези-мире. Вместе они собирают партию неудачников: одержимую взрывами архиволшебницу Мегумин и мазохистку-крестоносца Даркнесс. Никто из них не годится для геройских подвигов, но их приключения — это бесконечный поток абсурдного юмора, неудач и неожиданных побед. Культовая комедия, пародирующая все штампы жанра исэкай.",
      details: {
        seasons: 3, episodes: 31, source: "Лайт-новел (ранобэ)", volumes: 17, studio: "Studio DEEN (S1-2), Drive (S3)", aired: "2016, 2017, 2024", status: "4 сезон анонсирован (2027)", type: "TV",
        malUrl: "https://myanimelist.net/anime/30831/Kono_Subarashii_Sekai_ni_Shukufuku_wo",
        russianDub: {
          official: "Crunchyroll (S1-2, закадровый перевод), S3 — только субтитры",
          studios: ["Crunchyroll", "AniLibria", "JAM", "AniDUB", "Студийная Банда", "OnWave", "Ancord", "SHIZA Project", "Dream Cast", "AniStar", "AnimeVost", "Freedub Studio", "FumoDub", "KoeKak", "КОМНАТА ДИДИ", "Anidub Online", "OBELISK Project", "Оканэ"],
          cast: ["AniDUB: Ancord, Trina_D", "AniLibria: Kari, Lali, Sharon, Cleo-chan", "SHIZA Project: Lianna, Dancel, RJ Pandora", "Animedia: Nazel, LolAlice"]
        },
        mainCharacters: [
          { name: "Казума Сато", desc: "Главный герой. Хикикомори, переродившийся в фэнтези. Ленивый, хитрый и прагматичный лидер самой бесполезной партии в мире." },
          { name: "Аква", desc: "Богиня воды. Эгоцентричная, капризная и бесполезная в бою, но обладает мощной магией очищения и воскрешения." },
          { name: "Мегумин", desc: "Архиволшебница из клана Алых Демонов. Одержима магией Взрыва. Может использовать только одно заклинание в день." },
          { name: "Даркнесс", desc: "Крестоносец из знатного рода. Идеальный танк с мазохистскими наклонностями. Совершенно не умеет попадать по врагам." },
          { name: "Виз", desc: "Лич, владелица магической лавки. Бывший генерал армии Короля Демонов. Добрая, мягкая и совершенно не умеет вести бизнес." },
          { name: "Ванир", desc: "Архидьявол, герцог Ада. Видит всё насквозь. Садист, обожающий мучить Акву, но на деле помогает партии Казумы." },
          { name: "Эрис", desc: "Богиня удачи. Добрая и заботливая. Полная противоположность Аквы. Спускается в мир смертных под видом воровки Крис." },
          { name: "Юн-Юн", desc: "Архиволшебница из клана Алых Демонов. Дочь старейшины. Самопровозглашённая соперница Мегумин, но на деле просто хочет дружить." }
        ]
      }
    },
    { id: 6, rank: 6, title: "Сон в замке демонов", members: "252 806", score: "7.95", shikimoriScore: "7.95", poster: "/images/posters/33_Son_v_zamke_demonov.png", genre: "Комедия в замке",
      shortDescription: "Принцесса в плену у демонов, но её волнует только одно — как бы поудобнее поспать. Безумно смешная и оригинальная комедия.",
      description: "Принцесса Аврора Суярис похищена Королём Демонов и заточена в его замке. Казалось бы, трагедия — но принцессу волнует только одно: идеальный сон! Ради хорошей подушки она готова убить монстра, ради мягкой простыни — разнести ползамка. Демоны живут в постоянном ужасе от своей «пленницы», а Король Демонов пытается не сойти с ума, параллельно заботясь о ней как о дочери. Одна из самых смешных и оригинальных комедий с невероятно милой главной героиней.",
      details: {
        seasons: 1, episodes: 12, source: "Манга (Shounen Sunday)", volumes: 27, studio: "Doga Kobo", aired: "Осень 2020", status: "Завершён", type: "TV",
        malUrl: "https://myanimelist.net/anime/40397/Maoujou_de_Oyasumi",
        russianDub: {
          studios: ["AniStar", "AnimeVost", "AniDUB", "AniLibria", "SHIZA Project", "Studio Band", "HaronMedia"],
          cast: ["AniStar: Veda, Xelenum", "AniMaunt: Nikidub, Takera", "AniDUB: Berserk, Ket, Orru", "AniLibria: Cleo-chan, Malevich, Nuts"]
        },
        mainCharacters: [
          { name: "Аврора Суярис", desc: "Принцесса-заложница. Ради хорошего сна пойдёт на всё — включая убийство монстров и разрушение замка. Невероятно милая и безжалостная.", image: "/images/characters/Syalis.jpg" },
          { name: "Король Демонов", desc: "Владыка замка. Похитил принцессу для переговоров, но теперь страдает от её выходок. По сути стал её приёмным отцом.", image: "/images/characters/DemonKing.png" },
          { name: "Демон-священник", desc: "Главный помощник Короля Демонов. Постоянно в шоке от творящегося безумия, но заботится обо всех обитателях замка.", image: "/images/characters/DemonCleric.png" },
          { name: "Герой Акацуки", desc: "Легендарный герой людей, пришедший спасти принцессу. Она упорно не запоминает его имя, называя «как-его-там-кун».", image: "/images/characters/Akatsuki.jpg" },
          { name: "Дикобраз Маджиро", desc: "Вечно ворчащий, но добрый дикобраз. Из-за безотказности постоянно становится жертвой безумных планов принцессы.", image: "/images/characters/Majiro.jpg" },
          { name: "Малышка-демон", desc: "Пушистый монстр, похожий на плюшевого мишку. Идеальная живая подушка для принцессы и её фанат.", image: "/images/characters/DebiAkuma.png" },
          { name: "Красный сибирский пёс", desc: "Верный пёс Короля Демонов и главный хранитель порядка. Мечтает, чтобы пленница вела себя прилично.", image: "/images/characters/RedSiberian.png" },
          { name: "Гоблин-прислужник", desc: "Обычный гоблин-работяга. Вместе с дикобразом и минотавром — вечная жертва принцессы.", image: "/images/characters/Goblin.png" },
          { name: "Посейдон", desc: "Один из Десяти Старейшин, реинкарнация греческого бога морей. Грозный демон, бессильный против принцессы.", image: "/images/characters/Poseidon.jpg" },
          { name: "Минотавр", desc: "Огромный демон-бык, сильнейший воин замка. Используется принцессой как мебель, транспорт и строительный материал.", image: "/images/characters/Minotaur.png" },
          { name: "Гарпия", desc: "Девушка-птица, мечтающая о дружбе с человеком. Принцесса использует её перья для подушек.", image: "/images/characters/Harpy.jpg" },
          { name: "Алазиф", desc: "Древний дух книги заклинаний. Загадочный наблюдатель, который понимает принцессу лучше всех.", image: "/images/characters/Alazif.png" },
          { name: "Скелет-солдат", desc: "Безмолвный страж замка. Служит принцессе подставкой, вешалкой и будильником.", image: "/images/characters/SkeletonSoldier.png" },
          { name: "Двуглавый дракон", desc: "Грозный страж замка. Две головы = две подушки, чешуя = идеальный матрас.", image: "/images/characters/TwoHeadedDragon.png" }
        ]
      }
    },
    { id: 7, rank: 7, title: "Восхождение героя щита", members: "1 779 394", score: "7.90", shikimoriScore: "7.90", poster: "/images/posters/03_Voshozhdenie_geroya_shchita.jpg", genre: "Исекай / месть и рост",
      shortDescription: "Преданный всеми герой со щитом постепенно становится сильнее и находит настоящих союзников. Мрачная история преодоления и возмездия.",
      description: "Наофуми Иватани — обычный японский студент, призванный в другой мир как один из четырёх легендарных героев. Но ему достаётся лишь щит, и с первого дня все презирают его. Преданный, оклеветанный и брошенный, он теряет веру в людей. С тяжёлым сердцем он покупает рабыню Рафталию — девочку-полузверя, которая становится его верным спутником и первым настоящим другом. Вместе они проходят путь от изгоев до сильнейших защитников королевства. Мрачная, но вдохновляющая история преодоления, роста команды и поиска справедливости.",
      details: {
        seasons: 4, episodes: 62, source: "Лайт-новел (ранобэ)", volumes: 22, studio: "Kinema Citrus (S1, S3, S4), DR Movie (S2)", aired: "2019, 2022, 2023, 2025", status: "5 сезон анонсирован (2027)", type: "TV",
        malUrl: "https://myanimelist.net/anime/35790/Tate_no_Yuusha_no_Nariagari",
        russianDub: {
          studios: ["Kansai Studio", "AniStar", "AniLibria", "AniMedia", "AniMaunt", "AniDUB", "AniRise", "SHIZA Project", "AniFilm"],
          cast: ["AniStar: Overlords, Zendos, Shoker, Sati Akura, Ruri", "AniLibria: Sharon, December, Hekomi, Amikiri, Ados", "AniMedia: LolAlice, Коварный Бобер, KingMaster, MezIdA", "AniMaunt: Nata_kex, J.Dark, Berofu, Рейви", "AniDUB: JAM, Trina_D", "AniRise: Fiardear, Freedom, Kaize, notonix, PrincessAnnihilation", "SHIZA Project: nDrOiDze, Mamoru, AmnesiaMoon, Lianna, Abe", "AniFilm: hAl, Kawas, Баяна, Rin"]
        },
        mainCharacters: [
          { name: "Наофуми Иватани", desc: "Герой Щита. Преданный всеми, он становится циничным и мрачным. Постепенно, благодаря Рафталии, вновь учится доверять людям.", image: "/images/characters/Naofumi.png" },
          { name: "Рафталия", desc: "Полузверь-енот. Бывшая рабыня, которую Наофуми купил и вырастил. Его верный клинок, первая любовь и главная опора.", image: "/images/characters/Raphtalia.png" },
          { name: "Фиро", desc: "Королева филориалов. Вылупилась из яйца монстра и за считанные дни выросла в могущественного зверя. Энергичная, наивная и любит поесть.", image: "/images/characters/Filo.png" },
          { name: "Малти С. Мелромарк", desc: "Первая принцесса. Лживая и манипулятивная, именно она оклеветала Наофуми и сломала ему жизнь. Главная антагонистка первого сезона.", image: "/images/characters/Malty.png" },
          { name: "Мелти Мелромарк", desc: "Вторая принцесса. Добрая и справедливая, она одна из немногих, кто верит в Наофуми с самого начала. Полная противоположность сестры.", image: "/images/characters/Melty.png" },
          { name: "Мотоясу Китамура", desc: "Герой Копья. Добродушный дамский угодник. После предательства Малти видит в женщинах свиней и влюбляется в Фило.", image: "/images/characters/Motoyasu.jpg" },
          { name: "Рэн Амаки", desc: "Герой Меча. Молчаливый красавец, считавший мир игрой. После гибели партии сломался, но вернулся на путь героя.", image: "/images/characters/RenAmaki.png" },
          { name: "Ицуки Кавасуми", desc: "Герой Лука. Вежливый «мессия» с комплексом бога. Был предан собственной партией и спасён Наофуми.", image: "/images/characters/ItsukiKawasumi.png" },
          { name: "Мирелия К. Мелромарк", desc: "Королева, фактическая правительница. Гениальный дипломат, раскрывшая интриги Малти и восстановившая справедливость.", image: "/images/characters/Mirelia.png" },
          { name: "Король Мелромарка", desc: "Формальный король. Слабый и предвзятый, ослеплён любовью к Малти. За предвзятость лишён власти и переименован в «Мусор».", image: "/images/characters/Aultcray.jpg" },
          { name: "Эрхард", desc: "Кузнец, единственный в стране, кто продаёт щиты. Первый друг Наофуми в Мелромарке, снабжал его с первых дней.", image: "/images/characters/Erhard.png" },
          { name: "Белукас", desc: "Работорговец. Честен в своём ремесле. Продал Наофуми Рафталию и яйцо Фило, стал его деловым партнёром.", image: "/images/characters/Beloukas.png" },
          { name: "Ришия Айвиред", desc: "Разорившаяся дворянка, спасённая Героем Лука. Гениальный маг-комбинатор, чей талант раскрыл именно Наофуми.", image: "/images/characters/Rishia.png" },
          { name: "Фитория", desc: "Королева всех филориалов. Суровая наставница героев, проверившая партию Наофуми силой.", image: "/images/characters/Fitoria.jpg" },
          { name: "Кил", desc: "Полузверь-вануи из деревни Рафталии. Спасён Наофуми, мечтает отомстить Волнам и защитить близких.", image: "/images/characters/Keel.png" },
          { name: "Гласс", desc: "Загадочная воительница из параллельного мира. Победила трёх героев, но проиграла Наофуми. Враг, ставший союзником.", image: "/images/characters/Glass.jpg" },
          { name: "Л'Арк Берг", desc: "Король-воин из параллельного мира. Беззаботный и справедливый, стал другом Наофуми после дуэли.", image: "/images/characters/LarcBerg.jpg" },
          { name: "Бискас Т. Балмус", desc: "Верховный Жрец Культа Трёх Героев. Главный антагонист сезона, манипулировавший королевством десятилетиями.", image: "/images/characters/Biscas.png" }
        ]
      }
    },
    { id: 8, rank: 8, title: "Дракон-горничная госпожи Кобаяши", members: "1 339 159", score: "7.90", shikimoriScore: "7.90", poster: "/images/posters/06_Drakon_gornichnaya_gospozhi_Kobayasi.jpg", genre: "Повседневность с драконами", description: "Обычная офисная работница живёт вместе с драконами в современном мире. Тёплая, милая и очень смешная повседневная комедия.",
      details: { malUrl: "https://myanimelist.net/anime/33206/Kobayashi-san_Chi_no_Maid_Dragon" } },
    { id: 9, rank: 9, title: "Ангел по соседству", members: "464 929", score: "7.85", shikimoriScore: "7.86", poster: "/images/posters/20_Angel_po_sosedstvu.jpg", genre: "Романтика / повседневность",
      shortDescription: "Замкнутый парень и идеальная соседка постепенно сближаются. Невероятно тёплая и душевная романтика без лишней драмы.",
      description: "Аманэ Фудзимия живёт один в запущенной квартире, питается фастфудом и ни с кем не общается. Его соседка — Махиру Сиина, «ангел» школы: идеальная во всём, от учёбы до внешности. Однажды в дождливый день Аманэ отдаёт ей свой зонт, и с этого начинается их история. Махиру начинает заботиться о нём: готовит еду, убирает квартиру, а Аманэ постепенно открывается ей. Невероятно нежная и уютная история о том, как два одиноких человека находят тепло друг в друге.",
      details: {
        seasons: 2, episodes: 24, source: "Лайт-новел (ранобэ)", volumes: 10, studio: "Project No.9", aired: "Зима 2023, Весна 2026", status: "Завершён (2 сезона)", type: "TV",
        malUrl: "https://myanimelist.net/anime/50739/Otonari_no_Tenshi-sama_ni_Itsunomanika_Dame_Ningen_ni_Sareteita_Ken",
        russianDub: {
          studios: ["AniStar", "AniLibria", "Shiza Project", "Dream Cast", "Fronda", "AniMaunt"],
          cast: ["AniLibria: Frederica Izzard, HectoR, NeoNoir", "Shiza Project: Skyfinger, Myaurik, LucyNyuElf, Veda", "Dream Cast: Mirona, Indominus Rex, Berserk, Ket", "AniMaunt: Duimovochka, Liebert, Mr. Kro, Задумчивый Хомяк, Mutsuko Air"]
        },
        mainCharacters: [
          { name: "Аманэ Фудзимия", desc: "Главный герой. Живёт один, запустил себя и квартиру. Медленно раскрывается благодаря заботе Махиру. Добрый и благодарный.", image: "/images/characters/Amane.png" },
          { name: "Махиру Сиина", desc: "«Ангел» школы. Идеальная красавица, отличница и спортсменка. За холодной внешностью скрывает одиночество и желание о ком-то заботиться.", image: "/images/characters/Mahiru.jpg" },
          { name: "Ицуки Акасава", desc: "Единственный друг Аманэ в школе. Весёлый и общительный, помогает растопить лёд между главными героями.", image: "/images/characters/ItsukiAkazawa.png" },
          { name: "Титосэ Сиракава", desc: "Девушка Ицуки и подруга Махиру. Энергичная и любопытная, быстро догадывается об отношениях Аманэ и Махиру и активно их сводит.", image: "/images/characters/Chitose.png" },
          { name: "Юта Кадоваки", desc: "«Принц» школы. Самый популярный парень года, умный и добрый. Проявляет интерес к Махиру, став лёгким соперником Аманэ.", image: "/images/characters/Yuuta.png" },
          { name: "Сиоко Фудзимия", desc: "Мать Аманэ, медсестра. Эмоциональная и заботливая, мучается виной за отъезд. Обожает Махиру как будущую невестку.", image: "/images/characters/Shihoko.jpg" },
          { name: "Сюуто Фудзимия", desc: "Отец Аманэ. Выглядит моложе своих лет, лёгкий в общении, но надёжный и любящий отец.", image: "/images/characters/Shuuto.jpg" },
          { name: "Саё Сиина", desc: "Мать Махиру. Разведена и живёт за границей, редко появляется в жизни дочери. Её холодность — источник одиночества Махиру.", image: "/images/characters/Sayo.jpg" }
        ]
      }
    },
    { id: 10, rank: 10, title: "Путешествие под предводительством Луны", members: "570 322", score: "7.71", shikimoriScore: "7.71", poster: "/images/posters/13_Puteshestvie_pod_predvoditelstvom_Luny.jpg", genre: "Исекай / демоны и люди", description: "Макото Мисуми призван в другой мир как герой, но богиня отвергает его из-за внешности. Благословлённый лунным богом Цукуёми, он строит собственный город, собирает сильных союзников и становится одной из влиятельнейших фигур мира.",
      details: { malUrl: "https://myanimelist.net/anime/43523/Tsuki_ga_Michibiku_Isekai_Douchuu" } },
    { id: 11, rank: 11, title: "Дневник наблюдений за моей невестой-злодейкой", members: "56 618", score: "7.70", shikimoriScore: "7.68", poster: "/images/posters/50_Dnevnik_nablyudeniy_za_nevestoy_zlodeykoy.jpg", genre: "Новая злодейка-комедия", description: "Принц Сесил обручён с леди Бертией, которая уверяет, что помнит прошлую жизнь и является переродившейся злодейкой из отомэ-игры. Вместо того чтобы гневаться, он с интересом наблюдает за её попытками следовать злодейскому сценарию. Тёплая и смешная история, рассказанная с необычной точки зрения." ,
      details: { malUrl: "https://myanimelist.net/anime/61687" } },
    { id: 12, rank: 12, title: "Сто девушек которые тебя любят", members: "337 963", score: "7.67", shikimoriScore: "7.67", poster: "/images/posters/24_Sto_devushek_kotorye_tebya_lyubyat.png", genre: "Гарем-комедия", description: "Парень должен встречаться сразу со 100 девушками, иначе мир погибнет. Абсурдная, очень смешная и добрая комедия про любовь и хаос.",
      details: { malUrl: "https://myanimelist.net/anime/54714/Kimi_no_Koto_ga_Daidaidaidaidaisuki_na_100-nin_no_Kanojo" } },
    { id: 13, rank: 13, title: "Неторопливый фермер в другом мире", members: "306 019", score: "7.52", shikimoriScore: "7.52", poster: "/images/posters/27_Netorpelyvy_fermer.jpg", genre: "Фермерский уют", description: "Программист перерождается фермером и просто хочет спокойно жить. Идеальный расслабленный исэкай про ферму, семью и лёгкий гарем.",
      details: { malUrl: "https://myanimelist.net/anime/51462/Isekai_Nonbiri_Nouka" } },
    { id: 14, rank: 14, title: "Моя реинкарнация в отомэ игре в качестве главной злодейки", members: "587 445", score: "7.46", shikimoriScore: "7.44", poster: "/images/posters/16_Bakarina_Zlodeyka.jpg", genre: "Исэкай / романтическая комедия", shortDescription: "Девушка перерождается в злодейку из отомэ-игры и пытается избежать плохих концовок. Невероятно добрая и смешная история.",
      description: "Катарина Клаэс — обычная японская школьница, которая после удара головой вспоминает свою прошлую жизнь и понимает, что переродилась в злодейку из её любимой отомэ-игры. Все маршруты ведут к её смерти или изгнанию! Теперь она должна любой ценой избежать плохих концовок. Но вместо коварных интриг Катарина... начинает заниматься фермерством, заводит друзей и случайно собирает гарем из всех ключевых персонажей. Самая позитивная и тёплая история в жанре исэкай.",
      details: { malUrl: "https://myanimelist.net/anime/38555/Otome_Game_no_Hametsu_Flag_shika_Nai_Akuyaku_Reijou_ni_Tensei_shiteshimatta" } },
    { id: 15, rank: 15, title: "Да я паук, и что же?", members: "516 001", score: "7.44", shikimoriScore: "7.45", poster: "/images/posters/17_Da_ya_pauk_i_chto_zhe.jpg", genre: "Перерождение в монстра", description: "Школьница перерождается слабой паучихой в подземелье и вынуждена выживать, эволюционируя и становясь сильнее.",
      details: { malUrl: "https://myanimelist.net/anime/37984/Kumo_desu_ga_Nani_ka" } },
    { id: 16, rank: 16, title: "Кулинарные скитания", members: "293 364", score: "7.42", shikimoriScore: "7.64", poster: "/images/posters/22_Kulinarnye_skitaniya.jpg", genre: "Слоуслайф + еда", description: "Офисный работник попадает в другой мир и просто хочет спокойно готовить. Тёплый, атмосферный слоуслайф с едой и новыми друзьями." ,
      details: { malUrl: "https://myanimelist.net/anime/53446" } },
    { id: 17, rank: 17, title: "Перевоплотился в седьмого принца", members: "272 011", score: "7.42", shikimoriScore: "7.41", poster: "/images/posters/30_Perevoplotilsya_v_sedmogo_princa.jpg", genre: "OP-магия + ребёнок", description: "Взрослый маг перерождается маленьким принцем с невероятной жаждой знаний. Один из самых милых и позитивных OP-исэкаев последних лет." ,
      details: { malUrl: "https://myanimelist.net/anime/53516" } },
    { id: 18, rank: 18, title: "Дочь короля демонов слишком добрая", members: "47 697", score: "7.34", shikimoriScore: "7.33", poster: "/images/posters/51_Doch_korolya_demonov_slishkom_dobraya.jpg", genre: "Сверх-уютная комедия", description: "Дочь короля демонов невероятно добрая и хочет дружить со всеми. Максимально позитивная и милая история." ,
      details: { malUrl: "https://myanimelist.net/anime/61884" } },
    { id: 19, rank: 19, title: "Всемогущая магия святого", members: "248 393", score: "7.31", shikimoriScore: "7.31", poster: "/images/posters/34_Vsemogushchaya_magiya_svyatogo.jpg", genre: "Уютный исэкай", description: "Девушка с невероятной магией святого попадает в другой мир и просто хочет жить спокойно. Тёплая романтика и зельеварение." ,
      details: { malUrl: "https://myanimelist.net/anime/42826" } },
    { id: 20, rank: 20, title: "Моя сводная сестра — бывшая", members: "215 182", score: "7.30", shikimoriScore: "6.71", poster: "/images/posters/23_Moya_svodnaya_sestra_byvshaya.jpg", genre: "Романтика", description: "Бывшие возлюбленные внезапно становятся сводными братом и сестрой. Напряжённая, эмоциональная и очень реалистичная романтическая драма." ,
      details: { malUrl: "https://myanimelist.net/anime/49470" } },
    { id: 21, rank: 21, title: "Время пыток принцесса", members: "89 900", score: "7.26", shikimoriScore: "7.26", poster: "/images/posters/49_Vremya_pytok_princessa.jpg", genre: "Комедия с пытками", description: "Принцесса обожает пытать людей... но на самом деле она просто очень одинокая и милая. Абсурдная и добрая чёрная комедия." ,
      details: { malUrl: "https://myanimelist.net/anime/55774" } },
    { id: 22, rank: 22, title: "Кума Кума Кума Мишка", members: "190 819", score: "7.23", shikimoriScore: "7.23", poster: "/images/posters/42_Kuma_Kuma_Kuma_Mishka.jpg", genre: "Уютный мишка-исэкай",
      shortDescription: "Девушка в костюме мишки спасает мир и заводит друзей. Один из самых милых, добрых и позитивных исэкаев всех времён.",
      description: "15-летняя хикикомори Юна проводит дни в VRMMO World Fantasy Online, а ночи — в роскошной квартире, которую купила на деньги с биржевых спекуляций. Однажды, заснув в игре, она просыпается в другом мире — подозрительно похожем на игровой. В качестве бонуса она получает костюм Мишки с божественными характеристиками и двух призванных медведей-компаньонов. Теперь Юна — самый сильный человек в округе, но вместо захвата мира она спасает деревни, помогает гильдии и медленно, но верно заводит настоящих друзей. Невероятно милый, тёплый и позитивный исэкай про доброту и уют.",
      details: {
        seasons: 2, episodes: 24, source: "Лайт-новел (ранобэ)", volumes: 21, studio: "EMT Squared", aired: "Осень 2020, Весна 2023 (Punch!)", status: "Завершён", type: "TV",
        malUrl: "https://myanimelist.net/anime/40974/Kuma_Kuma_Kuma_Bear",
        russianDub: {
          official: "Wakanim (лицензия в РФ с 7 октября 2020)",
          studios: ["Anistar", "AnimeVost", "AniMaunt", "AniLibria", "AniDub", "Dream Cast", "Studio Band", "SHIZA Project"],
          cast: ["AniDUB: Indominus Rex, Orru, Shaman", "AniMaunt: Takera, GreenTalker, Mewna"]
        },
        mainCharacters: [
          { name: "Юна", desc: "Главная героиня. Хикикомори, перенесённая в игровой мир. Сильнейший боец в костюме Мишки, спасающая всех вокруг.", image: "/images/characters/Yuna.png" },
          { name: "Фина", desc: "Первая подруга Юны. 10-летняя трудолюбивая девочка, заботившаяся о больной матери. Мудрая не по годам.", image: "/images/characters/Fina.png" },
          { name: "Ноир Фошроуз", desc: "Дочь лорда Кримонии. Избалованная, но по-детски милая аристократка. Подруга Юны и Фины.", image: "/images/characters/NoirFochrose.png" },
          { name: "Шия Фошроуз", desc: "Старшая сестра Ноир. Гордая аристократка-воительница, проигравшая Юне и ставшая её подругой.", image: "/images/characters/ShiaFochrose.jpg" },
          { name: "Кумакю", desc: "Белый медведь-компаньон Юны. Может менять размер от гигантского до плюшевого. Мощь и милота.", image: "/images/characters/Kumakyuu.png" },
          { name: "Кумаюру", desc: "Чёрный медведь-компаньон Юны. Транспорт, боевая мощь и преданный друг.", image: "/images/characters/Kumayuru.png" },
          { name: "Шури", desc: "Младшая сестра Фины. Милый жизнерадостный ребёнок, обожающий сестру и медведей.", image: "/images/characters/Shuri.png" },
          { name: "Хелен", desc: "Ресепшионист гильдии авантюристов Кримонии. Добрая и терпеливая, помогает Юне с заданиями.", image: "/images/characters/Helen.png" },
          { name: "Гентц", desc: "Сотрудник гильдии. Практичный и надёжный, быстро признал силу Юны.", image: "/images/characters/Gentz.png" },
          { name: "Элена", desc: "Жительница Кримонии. Символ людей, чью жизнь изменила к лучшему Юна.", image: "/images/characters/Elena.png" }
        ]
      }
    },
    { id: 23, rank: 23, title: "Как госпожа Вельзевул пожелает", members: "107 874", score: "7.22", shikimoriScore: "7.22", poster: "/images/posters/48_Kak_gospozha_Velzevul_pozhelaet.jpg", genre: "Сладкая комедия про демонов", description: "Маленькая госпожа демонов и её служанка-горничная. Очень милая, сладкая и смешная повседневная комедия." ,
      details: { malUrl: "https://myanimelist.net/anime/37716" } },
    { id: 24, rank: 24, title: "Подручный Луизы Нулизы", members: "875 975", score: "7.20", shikimoriScore: "7.20", poster: "/images/posters/56_Podruchnyy_Luizy_Nulizy.png", genre: "Фэнтези / магия / романтика",
      shortDescription: "Гордая «Нулиза» Луиза случайно призывает в фамильяры обычного японского школьника. Классика гаремного фэнтези с магией и огненными характерами.",
      description: "Луиза Франсуаза Ле Блан де ла Вальер — дворянка, которую все зовут «Нулизой»: любое её заклинание превращается во взрыв. Во время церемонии вызова фамильяра она случайно призывает обычного японского школьника Сайто Хирагу — человека, а не магического зверя. С этого начинается их история: гордая «Нулиза» и упрямый землянин вынуждены работать вместе, постоянно ссорясь, но всё больше привязываясь друг к другу. Сайто оказывается легендарным Гандальвом — рыцарем, способным использовать любое оружие, — и вместе с Луизой, владеющей редчайшей силой Войда, они оказываются в центре войн, интриг и приключений всей Халкегинии. Тёплая, смешная и драматичная история о любви, долге и взрослении.",
      details: {
        seasons: 4, episodes: 49, source: "Лайт-новел (ранобэ)", volumes: 20, studio: "J.C.Staff", aired: "2006, 2007, 2008, 2012", status: "Завершён", type: "TV",
        malUrl: "https://myanimelist.net/anime/1195/Zero_no_Tsukaima",
        russianDub: {
          studios: ["Eladiel & Zendos", "SakaE & Лизавета", "Inspector_Gadjet & Nika Lenina", "SPAWN"],
          cast: ["Eladiel & Zendos: JeferSon, Е. Лурье, Ali, Irina, ntking, Faraway, Лизавета, Mirven, Salix Danu"]
        },
        mainCharacters: [
          { name: "Луиза Франсуаза Ле Блан де ла Вальер", desc: "«Луиза-Нулиза». Гордая дворянка с силой Войда. Все её заклинания — взрывы, а сердце — золотое.", image: "/images/characters/Louise.png" },
          { name: "Сайто Хирага", desc: "Призванный фамильяр Луизы. Рыцарь Гандальв, способный использовать любое оружие. Упрямый и живучий.", image: "/images/characters/Saito.jpg" },
          { name: "Сиеста", desc: "Горничная Академии. Добрая и милая, вечная соперница Луизы за сердце Сайто.", image: "/images/characters/Siesta.jpg" },
          { name: "Генриетта де Тристейн", desc: "Королева Тристейна и подруга детства Луизы. Тайно влюблена в Сайто.", image: "/images/characters/Henrietta.jpg" },
          { name: "Шарлотта Орлеанская", desc: "Табита. Лучшая ученица Академии, наследница Гальи. Гениальный маг ветра и рыцарь дракона.", image: "/images/characters/Charlotte.png" },
          { name: "Кирхе", desc: "Огненная красавица из Германнии. Лучшая подруга Табиты и вечная соперница Луизы.", image: "/images/characters/Kirche.png" },
          { name: "Дерфлингер", desc: "Говорящий магический меч Сайто. Древний клинок эпохи Бримира, болтливый и верный.", image: "/images/characters/Derflinger.png" },
          { name: "Гиш де Граммон", desc: "Тщеславный дворянин и «соперник» Сайто. Маг земли, создающий бронзовых големов.", image: "/images/characters/Guiche.jpg" },
          { name: "Монморанси", desc: "Девушка Гиша. Маг воды и зельевар. Ревнивая «водяная» дворянка.", image: "/images/characters/Montmorency.jpg" },
          { name: "Кольбер", desc: "Профессор огня в Академии. Добрый изобретатель и наставник Луизы.", image: "/images/characters/Colbert.jpg" }
        ]
      }
    },
    { id: 25, rank: 26, title: "Злодейка 99 уровня", members: "195 631", score: "7.13", shikimoriScore: "7.14", poster: "/images/posters/40_Zlodeyka_99_urovnya.jpg", genre: "OP-злодейка", description: "Девушка перерождается в злодейку из игры и решает стать самой сильной. Отличный микс комедии, экшена и развития персонажа." ,
      details: { malUrl: "https://myanimelist.net/anime/54837" } },
    { id: 57, rank: 25, title: "Мятежная компания", members: "387 089", score: "7.15", shikimoriScore: "7.16", poster: "/images/posters/57_Myatezhnaya_kompaniya.jpg", genre: "Комедия / пародия на исэкай",
      shortDescription: "Отаку-хикикомори становится «моэ-миссионером» в фэнтезийном мире. Смешная и искренняя пародия на исэкай с пропагандой отаку-культуры.",
      description: "Шиничи Кано — отаку до мозга костей, знающий всё о манге, аниме, играх и фигурках. В прошлом хикикомори, он устраивается на работу и... оказывается усыплённым и переправленным в Священную империю Эльдант — фэнтезийный мир, где живут эльфы и летают драконы. Японское правительство даёт ему необычное задание: пропагандировать моэ-культуру! Вместе с полуэльфийкой-горничной Мюсель, капризной императрицей Петралкой и телохранителем Минори Шиничи открывает школу отаку-культуры. Но за весёлым фасадом скрываются серьёзные проблемы: расовая дискриминация, политические интриги, конфликты с соседними странами и тайные планы самого японского правительства. Сможет ли отаку принести моэ в чужой мир и остаться человеком?",
      details: {
        seasons: 1, episodes: 12, source: "Лайт-новел (ранобэ)", volumes: 12, studio: "feel.", aired: "Осень 2013", status: "Завершён", type: "TV",
        malUrl: "https://myanimelist.net/anime/19369/Outbreak_Company",
        russianDub: {
          studios: ["AniDUB", "SHIZA Project", "AniLibria.TV", "OVERLORDS", "Inspector Gadjet", "Absurd & Eladiel"],
          cast: ["AniDUB: Berserk, Ket, Orru", "SHIZA Project: Lianna, Dancel, RJ Pandora"]
        },
        mainCharacters: [
          { name: "Шиничи Кано", desc: "Главный герой. Отаку-хикикомори, ставший «моэ-миссионером» в Эльданте. Добрый и принципиальный, несёт японскую культуру в фэнтезийный мир.", image: "/images/characters/Shinichi.jpg" },
          { name: "Петралка Энн Эльдант III", desc: "16-летняя императрица Эльданта. Вспыльчивая цундэре, быстро освоила японский и стала фанаткой манги. Невеста Шиничи.", image: "/images/characters/Petralka.jpg" },
          { name: "Мюсель Фоаран", desc: "Полуэльфийка-горничная Шиничи. Боевой маг армии Эльданта. Верная и влюблённая, готова умереть за него.", image: "/images/characters/Myucel.jpg" },
          { name: "Эльбия Ханайман", desc: "18-летняя девушка-оборотень, личный художник Шиничи. В полнолуние ведёт себя по-собачьи. Добрая и наивная.", image: "/images/characters/Elbia.jpg" },
          { name: "Минори Коганума", desc: "Телохранитель Шиничи из Сил самообороны Японии. Прагматичный реалист, тайная фудзёси.", image: "/images/characters/Minori.jpg" },
          { name: "Галиус Эн Кольдобар", desc: "Кузен Петралки, капитан дворцовой стражи. Серьёзный эльфийский рыцарь, скрытый фанат отаку.", image: "/images/characters/Galious.jpg" },
          { name: "Джинзабуро Матоба", desc: "Чиновник AmuTec, нанявший Шиничи. «Дружелюбное зло» — куратор культурной экспансии Японии.", image: "/images/characters/Matoba.jpg" },
          { name: "Ромильда Гард", desc: "Гномка-ученица школы Шиничи. Острая на язык, с чудовищной силой, враг эльфов, ставший другом Лойка.", image: "/images/characters/Romilda.jpg" },
          { name: "Брук Дарвин", desc: "Ящер-человек ростом 210 см, слуга Шиничи. Добряк-великан, дружит с детьми.", image: "/images/characters/Brooke.jpg" },
          { name: "Лойк Слейсон", desc: "Юный эльф-ученик школы. Влюблён в Минори, безрассуден, но добродушен.", image: "/images/characters/Loic.jpg" }
        ]
      }
    },
    { id: 26, rank: 27, title: "Рыцарь-скелет вступает в параллельный мир", members: "386 927", score: "7.13", shikimoriScore: "7.13", poster: "/images/posters/55_Rytsar_skelet_v_parallelny_mir.jpg", genre: "Исекай / OP-рыцарь",
      shortDescription: "Геймер просыпается в теле скелета-рыцаря в мире MMO. Путешествует, помогает людям и скрывает свой жуткий облик.",
      description: "Главный герой засыпает за игрой и просыпается в фэнтези-мире в теле своего игрового персонажа — скелета-рыцаря по имени Арк. Он быстро адаптируется, но вынужден скрывать свой облик под шлемом, чтобы его не приняли за монстра. Арк становится авантюристом, выполняет задания и помогает людям, не подозревая, что его добрые дела втягивают его в масштабный конфликт, который изменит судьбу королевства. Классический OP-исэкай с приятной динамикой, эльфийкой-спутницей Арианной и милым лисёнком Понтой.",
      details: {
        seasons: 2, episodes: 24, source: "Лайт-новел (ранобэ)", volumes: 10, studio: "Studio KAI / HORNETS (S1), Aura Studio (S2)", aired: "Весна 2022 (S1), Лето 2026 (S2)", status: "S2 идёт", type: "TV",
        malUrl: "https://myanimelist.net/anime/48760/Gaikotsu_Kishi-sama_Tadaima_Isekai_e_Odekakechuu",
        russianDub: {
          studios: ["Anistar", "AniLibria", "Dream Cast", "Amazing Dubbing", "AniRise", "Animedia", "SHIZA Project", "AniDub"],
          cast: ["AniLibria: Amikiri, Crowley, Itashi, Lupin", "AniRise: TimMachine, k0shar, Салем, Letica, VieliS", "Amazing Dubbing: Rikichae, LeslyXer", "Dream Cast: JAM, Berserk, Rizz_Fisher, Orru, Lelik_time", "Animedia: Seven, Morin", "SHIZA Project: Dancel, Mamoru, Abe, Absentia"]
        },
        mainCharacters: [
          { name: "Арк", desc: "Главный герой. Геймер, перенёсшийся в тело скелета-рыцаря. Добрый, сильный и скрывает свою внешность под шлемом.", image: "/images/characters/Arc.png" },
          { name: "Арианна Гленис Мейпл", desc: "Тёмная эльфийка-воительница с белыми волосами. Верная спутница Арка, связь с эльфийским миром.", image: "/images/characters/Ariane.png" },
          { name: "Понта", desc: "Дух-зверь-лисёнок, спасённый Арком. Сам выбрал его хозяином. Милый талисман группы.", image: "/images/characters/Ponta.png" },
          { name: "Чиёме", desc: "Ниндзя-зверолюд (лисица), потомок клана Дзинсин. Тихая воительница за освобождение своего народа.", image: "/images/characters/Chiyome.png" },
          { name: "Лорен Ларайя дю Лувиерт", desc: "Старшая дочь виконта дю Лувиерт. Благородная союзница Арка в высшем обществе.", image: "/images/characters/Lauren.png" },
          { name: "Рита Фаррен", desc: "Горничная дома Лувиерт. Сдержанная и преданная спутница Лорен.", image: "/images/characters/Rita.png" },
          { name: "Дилан Таг Лалатойя", desc: "Отец Арианны. Мудрый эльфийский воин, старейшина Леса Канады.", image: "/images/characters/Dylan.png" },
          { name: "Гленис Альна Лалатойя", desc: "Мать Арианны. Мудрая эльфийская воительница, хранительница семьи.", image: "/images/characters/Glenys.png" },
          { name: "Данка Нил Мейпл", desc: "Эльфийский воин из Великого Леса Канады. Боец за свободу своего народа.", image: "/images/characters/Danka.png" },
          { name: "Ээвин Гленис Мейпл", desc: "Старшая сестра Арианны. Одна из лучших мечниц Леса Канады.", image: "/images/characters/Eevin.png" }
        ]
      }
    },
    { id: 27, rank: 28, title: "Ради своей дочери я смогу победить даже короля демонов", members: "243 662", score: "7.07", shikimoriScore: "7.07", poster: "/images/posters/47_Radi_svoey_docheri.jpg", genre: "Уютная история про дочь",
      shortDescription: "Юный авантюрист находит в лесу девочку-демона и удочеряет её. Одна из самых душевных историй про семью и привязанность.",
      description: "Дейл — 18-летний авантюрист серебряного ранга, один из самых талантливых в гильдии. Во время задания в лесу он находит брошенную маленькую девочку-демона Латину и решает удочерить её. С этого момента его жизнь наполняется теплотой отцовства: он балует дочь, защищает её от любой угрозы и учит доверять миру. Латина же — умная и добрая девочка, скрывающая рожки под лентами, — быстро становится любимицей всего города. Но тёплой семейной идиллии угрожает тёмное наследие девочки: в ней течёт кровь короля демонов. Трогательная, душевная история о родительской любви, способной преодолеть любые предрассудки.",
      details: {
        seasons: 1, episodes: 12, source: "Лайт-новел (ранобэ)", volumes: 9, studio: "Maho Film", aired: "Лето 2019", status: "Завершён", type: "TV",
        malUrl: "https://myanimelist.net/anime/39324/Uchi_no_Ko_no_Tame_naraba_Ore_wa_Moshikashitara_Maou_mo_Taoseru_kamo_Shirenai",
        russianDub: {
          studios: ["AniStar", "AniLibria", "SHIZA Project", "AniDUB"],
          cast: ["AniLibria: Kiyoko Koheiri, HectoR", "SHIZA Project: Mamoru, Uninie, Kitsune, Bvia", "AniDUB: Orru, RiZZ_fisher"]
        },
        mainCharacters: [
          { name: "Дейл", desc: "Главный герой. 18-летний авантюрист серебряного ранга. При виде дочери превращается в размякшего папашу.", image: "/images/characters/Dale.png" },
          { name: "Латина", desc: "Девочка-полудемон, найденная в лесу. Добрая и умная, скрывает рожки под лентами. Скрывает тёмное наследие короля демонов.", image: "/images/characters/Latina.png" },
          { name: "Кеннет", desc: "Друг и напарник Дейла по гильдии. Надёжный товарищ и «дядя» Латины.", image: "/images/characters/Kenneth.png" },
          { name: "Рита", desc: "Хозяйка гостиницы, где поселились Дейл и Латина. Вторая мама девочки.", image: "/images/characters/Rita.png" },
          { name: "Хлоя", desc: "Напарница Дейла. Энергичная «тётя» Латины, душа команды.", image: "/images/characters/Chloe.png" },
          { name: "Сильвия", desc: "Напарница Дейла. Сдержанная и надёжная «тётя» Латины.", image: "/images/characters/Sylvia.png" },
          { name: "Руди", desc: "Лучший друг и детская влюблённость Латины. Символ её счастливого детства.", image: "/images/characters/Rudy.png" },
          { name: "Марсель", desc: "Житель Кройццо, обожающий Латину. Часть тёплого окружения девочки.", image: "/images/characters/Marcel.png" },
          { name: "Майя", desc: "Малышка, привязавшаяся к Латине как к старшей сестре.", image: "/images/characters/Maya.png" }
        ]
      }
    },
    { id: 28, rank: 29, title: "Мифический дух: хроники", members: "462 300", score: "7.06", shikimoriScore: "7.06", poster: "/images/posters/18_Mificheskiy_duh_hroniki.jpg", genre: "Реинкарнация / месть и магия", description: "Студент погибает и перерождается в другом мире. Пытается отомстить за свою семью и раскрывает тайны своего прошлого.",
      details: { malUrl: "https://myanimelist.net/anime/44203/Seirei_Gensouki" } },
    { id: 29, rank: 30, title: "Чёрный призыватель", members: "299 901", score: "7.00", shikimoriScore: "7.01", poster: "/images/posters/28_Cherny_prizyvatel.jpg", genre: "Призыв + OP", description: "Парень с уникальной способностью призыва становится невероятно сильным. Тёмный, стильный и очень динамичный исэкай." ,
      details: { malUrl: "https://myanimelist.net/anime/51064" } },
    { id: 30, rank: 31, title: "Перестану быть героем", members: "361 109", score: "6.99", shikimoriScore: "6.99", poster: "/images/posters/41_Perestanu_byt_gerоем.jpg", genre: "Герой уходит к демонам", description: "Герой разочаровывается в людях и уходит жить к демонам. Интересная история про выбор стороны и настоящую справедливость." ,
      details: { malUrl: "https://myanimelist.net/anime/50175" } },
    { id: 31, rank: 32, title: "Добро пожаловать в дешёвый ресторан изгнанника", members: "72 540", score: "6.98", shikimoriScore: "6.98", poster: "/images/posters/53_Dobro_pozhalovat_v_deshevyi_restoran.jpg", genre: "Уютный ресторанный исэкай", description: "Преданный соратниками авантюрист Деннис изгнан из сильнейшей гильдии. Но он не унывает: его кулинарные навыки 99-го уровня наконец-то пригодятся. Вместе со спасённой из рабства девушкой он открывает ресторан в глуши. Тёплый слоуслайф про еду, друзей и новую жизнь." ,
      details: { malUrl: "https://myanimelist.net/anime/60523" } },
    { id: 32, rank: 33, title: "Избранный богами", members: "246 331", score: "6.96", shikimoriScore: "6.95", poster: "/images/posters/32_Izbrannyy_bogami.jpg", genre: "Уютный исэкай", description: "Взрослый мужчина перерождается ребёнком и начинает бизнес со слаймами. Очень тёплый, добрый и расслабленный тайтл." ,
      details: { malUrl: "https://myanimelist.net/anime/41312" } },
    { id: 33, rank: 34, title: "Мир Лидейл", members: "192 066", score: "6.96", shikimoriScore: "6.96", poster: "/images/posters/43_Mir_Lideyl.jpg", genre: "Бабушка в MMORPG",
      shortDescription: "Пожилая женщина попадает в MMORPG в теле своей аватарки. Очень милая, взрослая и необычная история про второй шанс.",
      description: "Кайна провела годы в больнице, живя в VRMMORPG «Лидейл». Когда аппарат жизнеобеспечения отключился, она очнулась в игровом мире в теле своей аватарки — юной эльфийки 1100-го уровня. Но с момента её последнего выхода из игры прошло 200 лет: мир изменился, а её «дети» — суб-персонажи Скарго, Май-Май и Картац, которых она усыновила в игре, — выросли и заняли важные посты. Теперь пожилая женщина в теле эльфийки исследует изменившийся мир, помогает людям и воссоединяется с семьёй. Тёплая, взрослая и необычная история о втором шансе, семье и принятии себя.",
      details: {
        seasons: 1, episodes: 12, source: "Лайт-новел (ранобэ)", volumes: 7, studio: "Maho Film", aired: "Зима 2022", status: "Завершён", type: "TV",
        malUrl: "https://myanimelist.net/anime/48239/Leadale_no_Daichi_nite",
        russianDub: {
          studios: ["AnimeVost", "AniMaunt", "AniLibria", "Dream Cast", "Shiza Project"],
          cast: ["AniLibria: Lupin, Itashi, WhiteCrow, Kroxxa", "Dream Cast: Airis, Orru", "AniMaunt: MissClick, Ruta, Sinichka, Yuji"]
        },
        mainCharacters: [
          { name: "Кайна", desc: "Главная героиня. Пожилая женщина в теле эльфийки 1100-го уровня. Мать троих суб-персонажей, одна из сильнейших в мире.", image: "/images/characters/Cayna.png" },
          { name: "Скарго", desc: "Старший сын Кайны, эльф-священник. Считает себя «полубогом», обожает мать.", image: "/images/characters/Skargo.png" },
          { name: "Май-Май", desc: "Вторая дочь Кайны, верховная жрица. Голос разума в семье.", image: "/images/characters/MaiMai.png" },
          { name: "Картац", desc: "Младший сын Кайны, воин. Надёжный защитник и спутник матери.", image: "/images/characters/Kartatz.png" },
          { name: "Литт", desc: "Дочь хозяйки гостиницы. Первая подруга Кайны в деревне Офель.", image: "/images/characters/Lytt.png" },
          { name: "Марел", desc: "Хозяйка гостиницы Офеля. Приёмная мать Кайны в новом мире.", image: "/images/characters/Marel.png" },
          { name: "Кей", desc: "Жительница Офеля. Часть тёплого окружения Кайны.", image: "/images/characters/Key.png" },
          { name: "Руин", desc: "Житель Офеля. Часть деревенской жизни Кайны.", image: "/images/characters/Ruine.png" },
          { name: "Дэнсукэ", desc: "Гигантский жук-компаньон Кайны. Транспорт и верный боевой спутник.", image: "/images/characters/Densuke.png" },
          { name: "Мимили", desc: "Русалка, спасённая Кайной. Необычная жительница Офеля и подруга героини.", image: "/images/characters/Mimily.png" }
        ]
      }
    },
    { id: 34, rank: 35, title: "Жизнь со сводной сестрой", members: "120 632", score: "6.94", shikimoriScore: "7.31", poster: "/images/posters/39_Zhizn_so_svodnoy_sestroy.jpg", genre: "Романтика", description: "После повторной свадьбы родителей старшеклассник Юта и школьная красавица Саки становятся сводными братом и сестрой. Они договариваются соблюдать дистанцию, но совместная жизнь постепенно сближает их. Тёплая, взрослая и очень душевная романтика.",
      details: { malUrl: "https://myanimelist.net/anime/52481/Gimai_Seikatsu" } },
    { id: 35, rank: 36, title: "Укротитель зверей изгнанный", members: "247 220", score: "6.90", shikimoriScore: "6.90", poster: "/images/posters/35_Ukrotitel_zverey_izgnannyy.jpg", genre: "OP-укротитель", description: "Героя с 'бесполезной' способностью изгоняют, но он становится сильнейшим укротителем монстров. Классический revenge + рост.",
      details: { malUrl: "https://myanimelist.net/anime/52046/Yuusha_Party_wo_Tsuihou_sareta_Beast_Tamer_Saikyoushu_no_Nekomimi_Shoujo_to_Deau" } },
    { id: 36, rank: 37, title: "300 лет убивала слизней", members: "455 567", score: "6.88", shikimoriScore: "6.89", poster: "/images/posters/19_300_let_ubivala_slizney.jpg", genre: "Уютный исэкай / повседневность",
      shortDescription: "Бывшая офисная работница стала бессмертной ведьмой и 300 лет спокойно убивала слизней, пока не выяснилось, что она давно достигла максимального уровня.",
      description: "Адзуса Айдзава — бывшая офисная работница, которая умерла от переработки. Богиня дала ей вторую жизнь в роли бессмертной ведьмы в другом мире. Она поселилась в доме на горе и 300 лет спокойно убивала слизней (по 25 в день), не подозревая, что давно достигла максимального 99 уровня. Когда правда раскрылась, к ней начали стекаться драконы, эльфийки, демоны и призраки. Так тихая жизнь превратилась в большую «семью».",
      details: {
        seasons: 2, episodes: 24, source: "Лайт-новел (ранобэ)", volumes: 29, studio: "Revoroot (S1), Teddy (S2)", aired: "2021, 2025", status: "LN продолжается", type: "TV",
        malUrl: "https://myanimelist.net/anime/40586/Slime_Taoshite_300-nen_Shiranai_Uchi_ni_Level_Max_ni_Nattemashita",
        russianDub: {
          studios: ["AnimeVost", "AniDub", "AniMaunt", "SHIZA Project", "AniLibria"],
          cast: ["AniDub: Lonely Dragon, Orru, Dreamy Sleep, Indominus Rex", "AniMaunt: Ruta, AnaShape, GreenTalker, Sedrix", "SHIZA Project: Mamoru, Abe, Absentia, flower", "AniLibria: Ados, WhiteCrow, Amikiri"]
        },
        mainCharacters: [
          { name: "Азуса Айдзава", desc: "Главная героиня. Бывшая офисная работница, теперь бессмертная ведьма. Хочет только спокойной жизни без стресса." },
          { name: "Лайка", desc: "Алая драконица, первая ученица Азусы. Серьёзная, трудолюбивая и очень преданная «учительнице»." },
          { name: "Фальфа", desc: "Старшая дочь-слизь. Энергичная, ласковая, с самого начала зовёт Азусу «мамой»." },
          { name: "Шальша", desc: "Младшая дочь-слизь. Изначально мечтала отомстить за убитых слизней, но быстро стала частью семьи." },
          { name: "Халькара", desc: "Неуклюжая эльфийка-аптекарь. Создательница популярного энергетика «подпитька». Постоянный источник комичных ситуаций." },
          { name: "Вельзевул", desc: "3000-летняя демонесса, министр сельского хозяйства Демонического королевства. Стала близкой подругой и частью «семьи»." },
          { name: "Розали", desc: "Призрак девушки, умершей 200 лет назад. Живёт в доме Азусы и добавляет в него немного язвительного шарма." },
          { name: "Провато Пекора", desc: "Королева демонов. Игривая и любит устраивать хаос «ради веселья», но на самом деле очень одинокая." },
          { name: "Флаторте", desc: "Синяя драконица. Серьёзная и честь для неё важнее всего. Присоединилась после поражения от Азусы." },
          { name: "Сандра", desc: "Дриада (дух дерева). Спокойная, немного застенчивая и очень привязана к своей «семье»." }
        ]
      }
    },
    { id: 37, rank: 38, title: "Цубакума (UzaMaid!)", members: "130 334", score: "6.85", shikimoriScore: "6.85", poster: "/images/posters/45_Tsubakuma_UzaMaid.jpg", genre: "Горничная-комедия", description: "Бывшая солдатка становится горничной у маленькой девочки. Безумно смешная и милая комедия про семью и привязанность." ,
      details: { malUrl: "https://myanimelist.net/anime/37722" } },
    { id: 38, rank: 39, title: "Безымянная память", members: "161 061", score: "6.81", shikimoriScore: "6.81", poster: "/images/posters/44_Bezymiannaya_pamyat.jpg", genre: "Фэнтези-романтика", description: "Девушка с таинственным прошлым и юноша, потерявший память. Красивая романтическая история в фэнтезийном мире." ,
      details: { malUrl: "https://myanimelist.net/anime/53835" } },
    { id: 39, rank: 40, title: "Как не призвать князя тьмы", members: "805 146", score: "6.80", shikimoriScore: "6.81", poster: "/images/posters/09_Kak_ne_prizvat_knyazya_tmy.jpg", genre: "Экки / гарем + контроль", description: "Главный герой попадает в мир игры и использует магию порабощения на демонах и людях. Смесь экки, гарема и чунибё.",
      details: { malUrl: "https://myanimelist.net/anime/37210/Isekai_Maou_to_Shoukan_Shoujo_no_Dorei_Majutsu" } },
    { id: 40, rank: 41, title: "Средние способности (Mile)", members: "218 175", score: "6.73", shikimoriScore: "6.73", poster: "/images/posters/37_Srednie_sposobnosti.jpg", genre: "Лёгкий исэкай",
      shortDescription: "Девушка пожелала 'средних' способностей, но получила силу, которая в 6800 раз больше человеческой, и теперь пытается жить как обычная авантюристка.",
      description: "Майл — бывшая японская школьница, переродившаяся в другом мире. При перерождении она попросила у богини 'средние способности', но из-за непонимания единиц измерения получила возможности, в 6800 раз превосходящие обычного человека. Теперь она отчаянно пытается скрывать свою истинную силу, чтобы просто жить спокойной жизнью авантюристки в компании новых друзей. Лёгкая, весёлая и очень тёплая история про дружбу, приключения и попытки быть 'нормальной'.",
      details: {
        seasons: 1, episodes: 12, source: "Лайт-новел (ранобэ)", volumes: 21, studio: "Project No.9", aired: "2019", status: "LN завершена", type: "TV",
        malUrl: "https://myanimelist.net/anime/37393/Watashi_Nouryoku_wa_Heikinchi_de_tte_Itta_yo_ne",
        russianDub: {
          studios: ["Kanade Eu", "AniLibria", "AniDub", "Animaunt"],
          cast: ["AniLibria: Anzen, Kiyoko Koheiri", "AniDub: Orru, Airis", "Animaunt: Berofu, Takera, MissClick, Ceaser"]
        },
        mainCharacters: [
          { name: "Майл (Адель фон Аскам)", desc: "Главная героиня. Переродилась со «средними» (чудовищными) способностями. Мечтает о спокойной жизни, но постоянно попадает в приключения.", image: "/images/characters/Mile.jpg" },
          { name: "Рейна", desc: "«Багровая Рейна». 15-летний маг огня и фактический лидер отряда. Ненавидит бандитов, убивших её отца.", image: "/images/characters/Reina.jpg" },
          { name: "Мэвис фон Аустин", desc: "Официальный лидер Crimson Vow. 17-летняя мечница дворянского происхождения, сбежавшая из дома ради мечты стать рыцарем.", image: "/images/characters/Mavis.jpg" },
          { name: "Полин", desc: "14-летний маг исцеления и казначей отряда. Стала охотницей, чтобы отомстить за отца. Застенчива, но жестока к врагам.", image: "/images/characters/Pauline.jpg" },
          { name: "Ленни", desc: "Дочь трактирщиков. Добрая и приветливая, помогает родителям. Подружилась с отрядом Crimson Vow.", image: "/images/characters/Lenny.jpg" },
          { name: "Нано", desc: "Загадочное существо, которое видит только Майл. Связано с наномашинами магии мира. Её спутник и советчик.", image: "/images/characters/Nano.jpg" },
          { name: "Марсела", desc: "Подруга и одноклассница Майл по школе подготовки охотников. Живая и эмоциональная, верная в дружбе.", image: "/images/characters/Marcela.jpg" },
          { name: "Моника", desc: "Подруга и одноклассница Майл по школе подготовки охотников. Спокойная и рассудительная, голос здравого смысла.", image: "/images/characters/Monica.jpg" },
          { name: "Ориана", desc: "Подруга и одноклассница Майл по школе подготовки охотников. Дружелюбная, добрая и отзывчивая.", image: "/images/characters/Oriana.jpg" },
          { name: "Арледи", desc: "Антагонистка первой арки. Похитительница детей с одержимостью юными девушками. Побеждена и арестована Майл.", image: "/images/characters/Arledy.jpg" }
        ]
      }
    },
    { id: 41, rank: 42, title: "Арифурэта", members: "825 535", score: "6.72", shikimoriScore: "6.72", poster: "/images/posters/08_Arifureta.jpg", genre: "Тёмный исэкай / месть", description: "Преданный и брошенный в бездну герой проходит через ад, чтобы стать невероятно сильным. Мрачная история мести и выживания с элементами гарема.",
      details: { malUrl: "https://myanimelist.net/anime/36882/Arifureta_Shokugyou_de_Sekai_Saikyou" } },
    { id: 42, rank: 43, title: "Внук мудреца", members: "666 333", score: "6.61", shikimoriScore: "6.61", poster: "/images/posters/10_Vnuk_mudretsa.jpg", genre: "Гений магии / академия", description: "Внук величайшего мудреца с огромной силой, но почти без социального интеллекта. Поступает в магическую академию и быстро становится знаменитостью.",
      details: { malUrl: "https://myanimelist.net/anime/36407/Kenja_no_Mago" } },
    { id: 43, rank: 44, title: "Гарем рабов в лабиринте", members: "301 678", score: "6.52", shikimoriScore: "6.52", poster: "/images/posters/26_Garem_rabov_v_labirinte.jpg", genre: "Жёсткий экки-гарем", description: "Главный герой строит гарем рабынь в лабиринте другого мира. Один из самых откровенных и детализированных тайтлов жанра (18+)." ,
      details: { malUrl: "https://myanimelist.net/anime/44524" } },
    { id: 44, rank: 45, title: "Я стал самым сильным с провальным навыком", members: "209 499", score: "6.48", shikimoriScore: "6.46", poster: "/images/posters/46_Samyi_silny_s_provalnym_navykom.jpg", genre: "Тёмный revenge", description: "Парня с 'провальным' навыком предают. Он становится монстром мести. Жёсткий, мрачный и очень зрелищный тайтл." ,
      details: { malUrl: "https://myanimelist.net/anime/57892" } },
    { id: 45, rank: 46, title: "Я на самом деле самый сильный?", members: "204 851", score: "6.47", shikimoriScore: "6.46", poster: "/images/posters/38_Ya_na_samom_dele_samyi_silny.jpg", genre: "OP с твистом", description: "Мальчик с огромной силой думает, что он средний. Очень милая история про детство, друзей и скрытую мощь." ,
      details: { malUrl: "https://myanimelist.net/anime/52969" } },
    { id: 46, rank: 47, title: "Рапсодия о долгом странствии", members: "563 461", score: "6.42", shikimoriScore: "6.43", poster: "/images/posters/14_Rapsodiya_o_dolgom_stranstvii.jpg", genre: "Исекай / расслабленный OP", description: "Программист попадает в мир игры с читерскими способностями и просто путешествует, исследует и собирает компанию.",
      details: { malUrl: "https://myanimelist.net/anime/34497/Death_March_kara_Hajimaru_Isekai_Kyousoukyoku" } },
    { id: 47, rank: 48, title: "Я получил читерские способности", members: "401 688", score: "6.33", shikimoriScore: "6.33", poster: "/images/posters/21_Ya_poluchil_chiterskie_sposobnosti.jpg", genre: "OP в двух мирах", description: "Студент с инвалидностью получает невероятные способности в параллельном мире и возвращается в реальный. История про рост, месть и силу в двух мирах.",
      details: { malUrl: "https://myanimelist.net/anime/52830/Isekai_de_Cheat_Skill_wo_Te_ni_Shita_Ore_wa_Genjitsu_Sekai_wo_mo_Musou_Suru__Level_Up_wa_Jinsei_wo_Kaeta" } },
    { id: 48, rank: 49, title: "Жизнь перерожденного мудреца", members: "257 267", score: "6.32", shikimoriScore: "6.33", poster: "/images/posters/31_Zhizn_perezhdennogo_mudretsa.jpg", genre: "OP + вторая профессия", description: "Величайший мудрец перерождается и выбирает 'вторую профессию'. Спокойная, умная история про жизнь после пика силы." ,
      details: { malUrl: "https://myanimelist.net/anime/47163" } },
    { id: 49, rank: 50, title: "Маг-целитель: Новый старт", members: "650 338", score: "6.30", shikimoriScore: "6.31", poster: "/images/posters/11_Mag_tselitel_Novyy_start.jpg", genre: "Тёмный revenge / исцеление", description: "Бывший целитель, которого предали, возвращается во времени и мстит своим обидчикам крайне жестокими методами. Один из самых тёмных и жёстких тайтлов в жанре.",
      details: { malUrl: "https://myanimelist.net/anime/40750/Kaifuku_Jutsushi_no_Yarinaoshi" } },
    { id: 50, rank: 51, title: "Восьмой сын? Я так не думаю!", members: "279 110", score: "6.27", shikimoriScore: "6.27", poster: "/images/posters/29_Vosmoy_syn.jpg", genre: "Классический OP", description: "Мальчик из большой семьи перерождается восьмым сыном аристократа и быстро раскрывает свой потенциал. Лёгкий и приятный исэкай." ,
      details: { malUrl: "https://myanimelist.net/anime/38830" } },
    { id: 51, rank: 52, title: "В команде героя была милая девушка поэтому я признался ей", members: "101 585", score: "6.23", shikimoriScore: "6.23", poster: "/images/posters/54_V_komande_geroya_byla_milaya_devushka.jpg", genre: "Лёгкая романтика", description: "Обычный член команды героя влюбляется в милую соратницу. Простая, милая и очень душевная история первой любви." ,
      details: { malUrl: "https://myanimelist.net/anime/61983" } },
    { id: 52, rank: 53, title: "Сильнейший мудрец низшей эмблемы", members: "300 874", score: "6.22", shikimoriScore: "6.22", poster: "/images/posters/25_Silneyshiy_mudrets_nizshey_emblemy.jpg", genre: "OP-мудрец", description: "Гений магии перерождается с самой слабой эмблемой и с нуля становится сильнейшим. Классический OP-исэкай с отличным развитием." ,
      details: { malUrl: "https://myanimelist.net/anime/47161" } },
    { id: 53, rank: 54, title: "Плод эволюции", members: "243 794", score: "6.15", shikimoriScore: "6.16", poster: "/images/posters/36_Plod_evolyutsii.jpg", genre: "Эволюция + гарем", description: "Класс из 30 человек эволюционирует в монстров. Главный герой становится самым сильным и собирает гарем сильных спутниц." ,
      details: { malUrl: "https://myanimelist.net/anime/46985" } },
    { id: 54, rank: 55, title: "В другом мире со смартфоном", members: "635 284", score: "6.09", shikimoriScore: "6.10", poster: "/images/posters/12_V_drugom_mire_so_smartfonom.jpg", genre: "Исекай / гарем + повседневность",
      shortDescription: "Парень случайно погибает от молнии Бога и перерождается в фэнтези-мире с невероятной магией и смартфоном. Лёгкий гаремный исэкай без драмы.",
      description: "Тоя Мотидзуки — 15-летний японский школьник, которого Бог случайно убивает молнией. В качестве извинения Бог предлагает ему переродиться в фэнтезийном мире с любым желанием. Тоя просит оставить ему смартфон. В новом мире он обнаруживает, что может использовать все виды магии, и быстро становится сильнейшим магом. Тоя спасает принцессу Юмину, знакомится с сёстрами Эльзе и Линзе, самураем Яэ и древней феей Леен. Вместе они путешествуют по миру, решают проблемы королевств и собирают артефакты древней цивилизации Вавилон. Лёгкий, расслабленный исэкай с минимальной драмой и максимальным количеством милых девушек.",
      details: {
        seasons: 2, episodes: 24, source: "Лайт-новел (ранобэ)", volumes: 28, studio: "Production Reed (S1), J.C.Staff (S2)", aired: "2017 (S1), 2023 (S2)", status: "LN продолжается", type: "TV",
        malUrl: "https://myanimelist.net/anime/35203/Isekai_wa_Smartphone_to_Tomo_ni",
        russianDub: {
          studios: ["AniLibria", "GreenTalker", "Kansai studio", "AniDub"],
          cast: ["AniLibria: Itashi, Sharon, Silv", "AniDUB: Trina_D, RiZZ_fisher", "Kansai studio: Никита Красильников, Руслан Габидуллин, Ольга Кравцова"]
        },
        mainCharacters: [
          { name: "Тоя Мотидзуки", desc: "Главный герой. Школьник, переродившийся с невероятной магией и смартфоном. Добрый, скромный и невероятно сильный." },
          { name: "Юмина Урнеа Белфаст", desc: "Первая невеста Тои. Принцесса королевства Белфаст. Умная, дипломатичная, лидер невест. Маг света." },
          { name: "Эльзе Сильховеска", desc: "Вторая невеста Тои. Боевой маг огня. Импульсивная, энергичная и очень ревнивая." },
          { name: "Линзе Сильховеска", desc: "Третья невеста Тои. Маг льда. Спокойная, застенчивая и отличная домохозяйка." },
          { name: "Яэ Коконове", desc: "Четвёртая невеста Тои. Самурай из восточной страны. Серьёзная, благородная, мастер меча." },
          { name: "Лин", desc: "Пятая невеста Тои. 5000-летняя фея, хранительница Вавилона. Мудрая, игривая, эксперт по магии." },
          { name: "Сью Урнеа Ортлинде", desc: "Шестая невеста Тои. Младшая сестра Юмины. Энергичная, умная, маг поддержки." },
          { name: "Кохаку", desc: "Верный спутник. Древний боевой голем-дракон из Вавилона. Транспорт и защитник." }
        ]
      }
    },
    { id: 55, rank: 56, title: "Похоже сильнейшая профессия — временный инспектор", members: "56 319", score: "5.85", shikimoriScore: "5.84", poster: "/images/posters/52_Pohozhe_silneyshaya_professiya.jpg", genre: "Новый OP-инспектор", description: "Парень с читерской силой становится временным инспектором. Лёгкий, динамичный исэкай с отличным чувством юмора.",
      details: { malUrl: "https://myanimelist.net/anime/62825/Saikyou_no_Shokugyou_wa_Yuusha_demo_Kenja_demo_Naku_Kanteishi_Kari_Rashii_desu_yo" } }
];

export const imbaData = [
    { name: "Римуру Темпест", anime: "О моём перерождении в слизь", power: "Бесконечный потенциал", desc: "Демонический Лорд, нация монстров, анализатор, почти все стихии + бессмертие", level: 98 },
    { name: "Макото Мисуми", anime: "Путешествие под предводительством Луны", power: "Буквально бог", desc: "Сила, которая ломает систему. Уничтожает армии одним ударом", level: 97 },
    { name: "Хадзимэ Нагумо", anime: "Арифурэта", power: "Классический монстр мести", desc: "После предательства стал абсолютным убийцей с артефактами и гаремом сильнейших", level: 94 },
    { name: "Наофуми Иватани", anime: "Восхождение героя щита", power: "Имба через развитие", desc: "От слабого до одного из сильнейших + легендарный щит + армия", level: 91 },
    { name: "Альфред", anime: "Сильнейший мудрец низшей эмблемы", power: "С самого начала", desc: "Слабая эмблема → самый сильный маг в мире", level: 89 },
    { name: "Кэйта", anime: "Чёрный призыватель", power: "Призыватель-монстр", desc: "Призывает легендарных существ, становится сильнее с каждым уровнем", level: 87 },
    { name: "Седьмой принц", anime: "Перевоплотился в седьмого принца", power: "Магический гений", desc: "Ребёнок с памятью взрослого + невероятная скорость обучения магии", level: 85 },
    { name: "Главный герой", anime: "Я стал самым сильным с провальным навыком", power: "Классический revenge-имба", desc: "Слабый навык → абсолютный монстр мести", level: 84 }
];

export const charactersData = [
    { name: "Рем", anime: "Ре:Зеро", desc: "Самая любимая героиня 2016–2026. Преданность и трагедия", love: 98 },
    { name: "Казума Сато", anime: "KonoSuba", desc: "Лучший анти-герой комедии. Умный, жадный, смешной", love: 96 },
    { name: "Римуру Темпест", anime: "Слизь", desc: "Самый харизматичный и развивающийся ГГ", love: 95 },
    { name: "Эмилия", anime: "Ре:Зеро", desc: "Идеальная героиня с глубокой трагедией", love: 93 },
    { name: "Аква", anime: "KonoSuba", desc: "Богиня-идиотка. Мемы на века", love: 92 },
    { name: "Катарина Клаэс", anime: "Моя реинкарнация в отомэ игре в качестве главной злодейки", desc: "Самая обаятельная и тупая злодейка в истории", love: 91 },
    { name: "Макото Мисуми", anime: "Tsukimichi", desc: "Реалистичный и сильный ГГ с отличным характером", love: 89 },
    { name: "Хадзимэ Нагумо", anime: "Арифурэта", desc: "От слабого до монстра. Крутая арка мести", love: 87 },
    { name: "Роксанна", anime: "Гарем рабов", desc: "Самая преданная и сексуальная спутница в жанре", love: 86 },
    { name: "Субару Нацуки", anime: "Ре:Зеро", desc: "Самый реалистичный и развивающийся ГГ", love: 85 }
];

export const cozyData = [
    { title: "Сон в замке демонов", reason: "Лучшая лёгкая комедия 2020-х. Смешно и мило", score: 9.5 },
    { title: "Кума Кума Кума Мишка", reason: "Девочка в костюме мишки спасает мир. Чистый вайб", score: 9.2 },
    { title: "300 лет убивала слизней", reason: "Ведьма, которая просто хочет жить спокойно", score: 9.0 },
    { title: "Неторопливый фермер в другом мире", reason: "Ферма + гарем + никаких проблем", score: 8.9 },
    { title: "Избранный богами", reason: "Взрослый в теле ребёнка + слаймы + бизнес", score: 8.8 },
    { title: "Кулинарные скитания в параллельном мире", reason: "Еда + слоуслайф + друзья", score: 8.7 },
    { title: "Всемогущая магия святого", reason: "Взрослая героиня варит зелья и находит любовь", score: 8.6 },
    { title: "Ради своей дочери я смогу победить даже короля демонов", reason: "Приёмный отец и маленькая демоночка", score: 8.5 },
    { title: "Дочь короля демонов слишком добрая", reason: "Предельно добрая и милая история про дружбу", score: 9.1 },
    { title: "Перевоплотился в седьмого принца", reason: "Очень милый и позитивный ребёнок-маг", score: 8.8 },
    { title: "Мир Лидейл", reason: "Бабушка в MMORPG. Тёплая, взрослая и добрая", score: 8.7 },
    { title: "Цубакума (UzaMaid!)", reason: "Бывшая солдатка и маленькая девочка. Очень милая комедия", score: 8.6 },
    { title: "Как госпожа Вельзевул пожелает", reason: "Сладкая повседневная комедия про демонов", score: 8.5 },
    { title: "Моя реинкарнация в отомэ игре в качестве главной злодейки", reason: "Пик тепла и доброты: добрая душа, земледелие, чаепития и невероятно позитивная энергия", score: 8.9 },
    { title: "Ангел по соседству", reason: "Милая и душевная школьная романтика", score: 8.2 },
    { title: "Добро пожаловать в дешёвый ресторан изгнанника", reason: "Тёплый слоуслайф про еду и новую жизнь", score: 8.1 },
    { title: "Дракон-горничная госпожи Кобаяши", reason: "Повседневность с драконами. Милая и смешная", score: 8.0 },
    { title: "Время пыток принцесса", reason: "Абсурдная, но очень добрая чёрная комедия", score: 7.9 },
    { title: "Дневник наблюдений за моей невестой-злодейкой", reason: "Лёгкая и милая история про злодейку", score: 7.8 },
    { title: "Средние способности (Mile)", reason: "Лёгкая и приятная история про свободу", score: 7.7 },
    { title: "Я на самом деле самый сильный?", reason: "Милая история про детство и скрытую силу", score: 7.6 },
    { title: "Восхождение героя щита", reason: "Есть рост и команда, но довольно тяжёлый старт", score: 6.8 },
    { title: "О моём перерождении в слизь", reason: "Много политики и развития, но тёплые моменты есть", score: 7.0 },
    { title: "Реинкарнация безработного", reason: "Серьёзный рост персонажа, не самый расслабленный", score: 6.2 },
    { title: "Волчица и пряности", reason: "Очень спокойная, атмосферная и thoughtful повседневность", score: 7.8 },
    { title: "Рапсодия о долгом странствии", reason: "Расслабленный OP-исэкай с фокусом на исследование и свободу", score: 7.9 },
    { title: "Да я паук, и что же?", reason: "Много выживания и эволюции, не очень расслабленно", score: 5.8 },
    { title: "Сильнейший мудрец низшей эмблемы", reason: "Классический OP, не особо повседневный", score: 6.0 },
    { title: "В другом мире со смартфоном", reason: "Лёгкий гарем, но довольно поверхностный", score: 6.5 },
    { title: "Путешествие под предводительством Луны", reason: "Интересно, но довольно серьёзно и мрачно местами", score: 5.5 },
    { title: "Восьмой сын? Я так не думаю!", reason: "Лёгкий и приятный, но не самый глубокий", score: 7.1 },
    { title: "Жизнь перерожденного мудреца", reason: "Спокойная история, но довольно философская", score: 7.2 },
    { title: "Злодейка 99 уровня", reason: "Есть милые моменты, но больше экшен и развитие", score: 6.8 },
    { title: "Перестану быть героем", reason: "Интересная, но довольно мрачная и серьёзная", score: 4.8 },
    { title: "Безымянная память", reason: "Красивая романтика, но с драматичным прошлым", score: 6.7 },
    { title: "Я стал самым сильным с провальным навыком", reason: "Тёмный revenge, мало уюта", score: 3.5 },
    { title: "Укротитель зверей изгнанный", reason: "Есть рост, но мстительная история", score: 5.0 },
    { title: "Плод эволюции", reason: "Много экшена и гарема, не расслабленный", score: 4.5 },
    { title: "Жизнь со сводной сестрой", reason: "Взрослая романтика, довольно эмоциональная", score: 6.5 },
    { title: "Сто девушек которые тебя любят", reason: "Безумный гарем-комедия, весело, но не особо уютно", score: 5.8 },
    { title: "Как не призвать князя тьмы", reason: "Много экки и контроля, не для расслабления", score: 3.8 },
    { title: "Внук мудреца", reason: "Комедия, но главный герой довольно антисоциальный", score: 5.5 },
    { title: "Маг-целитель: Новый старт", reason: "Очень тёмный и жестокий", score: 2.5 },
    { title: "Арифурэта", reason: "Тёмный месть-исэкай", score: 3.0 },
    { title: "Чёрный призыватель", reason: "Стильный, но довольно мрачный и жестокий", score: 4.0 },
    { title: "Гарем рабов в лабиринте", reason: "Очень откровенный и тёмный", score: 2.0 },
    { title: "Я получил читерские способности", reason: "Есть месть и тёмные моменты", score: 4.5 },
    { title: "Мифический дух: хроники", reason: "Месть и тёмное прошлое", score: 4.2 },
    { title: "В команде героя была милая девушка поэтому я признался ей", reason: "Милая романтика, но довольно обычная", score: 7.0 },
    { title: "Похоже сильнейшая профессия — временный инспектор", reason: "Лёгкая комедия, но не особо душевная", score: 6.3 },
    { title: "Ре:Зеро", reason: "Очень тяжёлый психологический исэкай", score: 2.8 },
    { title: "Рыцарь-скелет вступает в параллельный мир", reason: "Боевик, но с тёплой компанией, эльфийкой и лисёнком. Есть уютные моменты", score: 5.2 }
];

// Pre-compute cozy data into each anime entry
const cozyLookup = {};
cozyData.forEach(item => {
    cozyLookup[item.title] = { score: item.score, reason: item.reason };
});

function getCozyInfo(title) {
    if (!title) return null;
    if (cozyLookup[title]) return cozyLookup[title];
    const normalized = title.toLowerCase();
    for (const key in cozyLookup) {
        if (normalized.includes(key.toLowerCase()) || key.toLowerCase().includes(normalized)) {
            return cozyLookup[key];
        }
    }
    return null;
}

animeData.forEach(anime => {
    const cozy = getCozyInfo(anime.title);
    if (cozy) {
        anime._cozy = cozy;
    }
});

export const ecchiData = [
    { title: "Гарем рабов в лабиринте другого мира", reason: "Самый откровенный исэкай. Детальные сцены, OVA без цензуры, рабство + гарем", level: 99, note: "Лучший по детализации в жанре" },
    { title: "Как не призвать князя тьмы", reason: "Много экки, гарем, откровенные сцены", level: 92 },
    { title: "Арифурэта", reason: "Жёсткий экки + гарем сильных девушек", level: 89 },
    { title: "Чёрный призыватель", reason: "Призыв + экки + откровенные моменты", level: 87 },
    { title: "В другом мире со смартфоном", reason: "Классический гарем с лёгким экки", level: 82 },
    { title: "Сто девушек которые очень-очень сильно тебя любят", reason: "100 девушек в любви — максимум fanservice", level: 85 },
    { title: "Плод эволюции", reason: "Эволюция + гарем + экки", level: 80 }
];

export const cuteData = [
    { title: "Перевоплотился в седьмого принца", reason: "Очаровательный ребёнок-гений с невероятной магией. Очень позитивный вайб", cute: 95, note: "Милый гений" },
    { title: "Кума Кума Кума Мишка", reason: "Девочка в костюме мишки — чистое воплощение милоты и доброты", cute: 94, note: "Икона милоты" },
    { title: "Избранный богами", reason: "Взрослый в теле ребёнка, который строит мир с слаймами. Очень тёплый тайтл", cute: 91, note: "Добрый исэкай" },
    { title: "Ради своей дочери я смогу победить даже короля демонов", reason: "Лучшая история про приёмного папу и маленькую демоночку", cute: 93, note: "Семейное тепло" },
    { title: "300 лет убивала слизней", reason: "Милая ведьма, которая просто хочет спокойной жизни", cute: 88, note: "Уютная героиня" },
    { title: "Я на самом деле самый сильный?", reason: "Милый ребёнок с огромной силой и добрым сердцем", cute: 86, note: "Скрытая мощь" },
    { title: "Дочь короля демонов слишком добрая", reason: "Сверхмилая дочь демона, которая всех любит", cute: 90, note: "Доброта в чистом виде" }
];