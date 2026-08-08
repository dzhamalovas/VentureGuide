import pptxgen from 'pptxgenjs';
import path from 'path';
import fs from 'fs';

const pptx = new pptxgen();

// Set 16:9 widescreen layout
pptx.layout = 'LAYOUT_16x9';
pptx.author = 'Цифровой навигатор предпринимателя';
pptx.company = 'Твой Ход';
pptx.title = 'Цифровой навигатор предпринимателя - Презентация';

// Brand colors
const DARK_BG = '0F172A';
const LIGHT_BG = 'F8FAFC';
const WHITE = 'FFFFFF';
const TEAL = '0D9488';
const TEAL_LIGHT = '14B8A6';
const BLUE_DARK = '1E3A8A';
const BLUE_ACCENT = '2563EB';
const AMBER = 'D97706';
const SLATE_DARK = '1E293B';
const TEXT_DARK = '0F172A';
const TEXT_MUTED = '64748B';

const screenshotDir = path.join(process.cwd(), 'assets', 'screenshots');
const founderChatPath = path.join(screenshotDir, 'founder_chat.png');
const founderDashPath = path.join(screenshotDir, 'founder_dashboard.png');
const expertTicketsPath = path.join(screenshotDir, 'expert_tickets.png');
const expertAdminPath = path.join(screenshotDir, 'expert_admin_rag.png');

// Helper for slide header
function addSlideHeader(slide, category, title) {
  slide.addText(category.toUpperCase(), {
    x: 0.8, y: 0.4, w: 10.0, h: 0.3,
    fontSize: 12, bold: true, color: TEAL, fontFace: 'Arial'
  });
  slide.addText(title, {
    x: 0.8, y: 0.7, w: 11.5, h: 0.7,
    fontSize: 26, bold: true, color: TEXT_DARK, fontFace: 'Arial'
  });
}

// ==================== SLIDE 1: TITLE ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: DARK_BG };

  slide.addText('ТВОЙ ХОД • ВСЕРОССИЙСКИЙ СТУДЕНЧЕСКИЙ ПРОЕКТ', {
    x: 0.8, y: 0.6, w: 10, h: 0.4,
    fontSize: 14, bold: true, color: TEAL_LIGHT, fontFace: 'Arial'
  });

  slide.addText('Цифровой навигатор предпринимателя', {
    x: 0.8, y: 1.5, w: 11.5, h: 1.5,
    fontSize: 48, bold: true, color: WHITE, fontFace: 'Arial'
  });

  slide.addText('Интеллектуальный ИИ-сервис первичной операционной поддержки стартапов (Gemini 3.6 Flash + RAG)', {
    x: 0.8, y: 3.2, w: 11.0, h: 1.0,
    fontSize: 22, color: 'CBD5E1', fontFace: 'Arial'
  });

  // 3 Metrics Boxes
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 4.6, w: 3.6, h: 1.4, fill: { color: SLATE_DARK }, line: { color: '334155' } });
  slide.addText('24/7', { x: 1.0, y: 4.8, w: 3.2, h: 0.6, fontSize: 28, bold: true, color: TEAL_LIGHT });
  slide.addText('Мгновенный ответ ИИ', { x: 1.0, y: 5.4, w: 3.2, h: 0.4, fontSize: 14, color: '94A3B8' });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 4.8, y: 4.6, w: 3.6, h: 1.4, fill: { color: SLATE_DARK }, line: { color: '334155' } });
  slide.addText('78%', { x: 5.0, y: 4.8, w: 3.2, h: 0.6, fontSize: 28, bold: true, color: '38BDF8' });
  slide.addText('Автоматизация рутины', { x: 5.0, y: 5.4, w: 3.2, h: 0.4, fontSize: 14, color: '94A3B8' });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 8.8, y: 4.6, w: 3.6, h: 1.4, fill: { color: SLATE_DARK }, line: { color: '334155' } });
  slide.addText('RAG + НПА', { x: 9.0, y: 4.8, w: 3.2, h: 0.6, fontSize: 28, bold: true, color: '60A5FA' });
  slide.addText('База ФНС, НК РФ и ФСИ', { x: 9.0, y: 5.4, w: 3.2, h: 0.4, fontSize: 14, color: '94A3B8' });

  slide.addText('Проект: Цифровой навигатор предпринимателя • Статус: Готовое MVP-решение', {
    x: 0.8, y: 6.8, w: 11.5, h: 0.4, fontSize: 12, color: '64748B'
  });
}

// ==================== SLIDE 2: PROBLEM ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: LIGHT_BG };
  addSlideHeader(slide, '01 / Контекст и проблематика', 'Молодые предприниматели теряются в первых операционных шагах');

  slide.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.6, w: 7.2, h: 4.8, fill: { color: WHITE }, line: { color: 'E2E8F0' } });
  slide.addText('ОСНОВНЫЕ БАРЬЕРЫ ДЛЯ СТУДЕНТОВ:', { x: 1.1, y: 1.9, w: 6.6, h: 0.4, fontSize: 16, bold: true, color: BLUE_DARK });

  slide.addText('1. Перегрузка экспертов\nЮристы Фонда тратят 80% времени на типовые вопросы (ОКВЭД, ИП vs ООО, спецрежимы).\n\n2. Потеря темпа стартапа\nСтуденты неделями ждут ответа и допускают ошибки при запуске и регистрации.\n\n3. Фрагментация знаний\nИнформация о грантах, налогах и законах разбросана по десяткам сайтов.', {
    x: 1.1, y: 2.4, w: 6.6, h: 3.7, fontSize: 15, color: TEXT_DARK, lineSpacing: 22
  });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 8.3, y: 1.6, w: 4.2, h: 4.8, fill: { color: BLUE_DARK } });
  slide.addText('ДАННЫЕ ЭКСПЕРТОВ', { x: 8.6, y: 1.9, w: 3.6, h: 0.3, fontSize: 12, bold: true, color: TEAL_LIGHT });
  slide.addText('50+ юристов Фонда', { x: 8.6, y: 2.3, w: 3.6, h: 0.6, fontSize: 24, bold: true, color: WHITE });
  slide.addText('Ежемесячно обрабатывают сотни обращений от начинающих фаундеров во всех регионах РФ.', { x: 8.6, y: 3.0, w: 3.6, h: 1.2, fontSize: 14, color: 'E2E8F0' });

  slide.addText('~78%', { x: 8.6, y: 4.3, w: 3.6, h: 0.8, fontSize: 42, bold: true, color: TEAL_LIGHT });
  slide.addText('Типовые вопросы, подлежащие ИИ-автоматизации', { x: 8.6, y: 5.2, w: 3.6, h: 0.8, fontSize: 13, color: 'CBD5E1' });
}

// ==================== SLIDE 3: PROBLEM TREE ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addSlideHeader(slide, '02 / Причинно-следственный анализ', 'Дерево проблем операционной поддержки');

  slide.addShape(pptx.shapes.RECTANGLE, { x: 1.5, y: 1.6, w: 10.3, h: 1.2, fill: { color: BLUE_DARK } });
  slide.addText('КОРЕНЬ: Активный рост числа студентов-основателей и проектов при ограниченных ресурсах экспертного состава', {
    x: 1.8, y: 1.8, w: 9.7, h: 0.8, fontSize: 18, bold: true, color: WHITE, align: 'center'
  });

  slide.addText('↓', { x: 6.3, y: 2.8, w: 0.7, h: 0.4, fontSize: 28, bold: true, color: TEAL, align: 'center' });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 1.5, y: 3.3, w: 10.3, h: 1.2, fill: { color: 'FEF3C7' }, line: { color: 'F59E0B' } });
  slide.addText('ЦЕНТРАЛЬНАЯ ПРОБЛЕМА: Отсутствие масштабируемого первого уровня первичной операционной поддержки', {
    x: 1.8, y: 3.5, w: 9.7, h: 0.8, fontSize: 18, bold: true, color: TEXT_DARK, align: 'center'
  });

  slide.addText('↓', { x: 6.3, y: 4.5, w: 0.7, h: 0.4, fontSize: 28, bold: true, color: TEAL, align: 'center' });

  // 3 consequence boxes
  slide.addShape(pptx.shapes.RECTANGLE, { x: 1.5, y: 5.0, w: 3.2, h: 1.6, fill: { color: 'FFF1F2' }, line: { color: 'FECDD3' } });
  slide.addText('Задержка запуска ООО/ИП и правовые ошибки фаундеров', { x: 1.7, y: 5.2, w: 2.8, h: 1.2, fontSize: 14, color: TEXT_DARK });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 5.0, y: 5.0, w: 3.3, h: 1.6, fill: { color: LIGHT_BG }, line: { color: 'E2E8F0' } });
  slide.addText('Перегрузка юристов однотипной консультационной работой', { x: 5.2, y: 5.2, w: 2.9, h: 1.2, fontSize: 14, color: TEXT_DARK });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 8.6, y: 5.0, w: 3.2, h: 1.6, fill: { color: 'EFF6FF' }, line: { color: 'BFDBFE' } });
  slide.addText('Снижение конверсии стартапов в действующие бизнесы', { x: 8.8, y: 5.2, w: 2.8, h: 1.2, fontSize: 14, color: TEXT_DARK });
}

// ==================== SLIDE 4: AUDIENCE ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: LIGHT_BG };
  addSlideHeader(slide, '03 / Целевая аудитория', 'Ключевые пользователи и их сценарии');

  // Founder
  slide.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.6, w: 5.6, h: 4.8, fill: { color: WHITE }, line: { color: 'CBD5E1' } });
  slide.addText('СТУДЕНТ-ОСНОВАТЕЛЬ (FOUNDER)', { x: 1.1, y: 1.9, w: 5.0, h: 0.4, fontSize: 18, bold: true, color: TEAL });
  slide.addText('Стадия: Идея / Разработка MVP / Первые продажи\n\n• Не понимает разницу ИП vs ООО для IT-проекта\n• Путается в налоговых режимах (УСН 6% vs 15%, ПСН)\n• Боится ошибок при подаче заявки в «Студенческий стартап»\n\nОжидание: Мгновенный, простой ответ на понятном языке с чек-листом.', {
    x: 1.1, y: 2.4, w: 5.0, h: 3.8, fontSize: 15, color: TEXT_DARK, lineSpacing: 22
  });

  // Expert
  slide.addShape(pptx.shapes.RECTANGLE, { x: 6.9, y: 1.6, w: 5.6, h: 4.8, fill: { color: WHITE }, line: { color: 'CBD5E1' } });
  slide.addText('ЮРИСТ / ЭКСПЕРТ ФОНДА', { x: 7.2, y: 1.9, w: 5.0, h: 0.4, fontSize: 18, bold: true, color: BLUE_DARK });
  slide.addText('Профильный специалист Фонда поддержки\n\n• Перегружен постоянными однотипными вопросами\n• Мало времени на проработку сложных венчурных сделок\n• Нуждается в цифровом досье проекта до звонка\n\nОжидание: Авто-отсев рутины и получение сформированного досье.', {
    x: 7.2, y: 2.4, w: 5.0, h: 3.8, fontSize: 15, color: TEXT_DARK, lineSpacing: 22
  });
}

// ==================== SLIDE 5: CONCEPT ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addSlideHeader(slide, '04 / Концепция решения', 'ИИ-навигатор первого уровня с эскалацией экспертам');

  slide.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.6, w: 11.7, h: 1.2, fill: { color: BLUE_DARK } });
  slide.addText('ПРИНЦИП: ИИ закрывает 78% типовых вопросов — Человек решает сложные кейсы (Human-in-the-Loop)', {
    x: 1.1, y: 1.9, w: 11.1, h: 0.6, fontSize: 20, bold: true, color: WHITE, align: 'center'
  });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 3.1, w: 11.7, h: 3.4, fill: { color: LIGHT_BG }, line: { color: 'E2E8F0' } });
  
  slide.addText('1. Предприниматель задает вопрос в чате (текст/голос)\n2. ИИ-Навигатор определяет категорию и ищет законы в RAG\n3. Оценка Complexity Score (риск и сложность)\n4. При типовом кейсе (78%) — выдача ответа со ссылками на НПА\n5. При сложном кейсе (22%) — авто-создание цифрового досье юристу', {
    x: 1.2, y: 3.4, w: 10.9, h: 2.8, fontSize: 17, color: TEXT_DARK, lineSpacing: 26
  });
}

// ==================== SLIDE 6: USER JOURNEY ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: LIGHT_BG };
  addSlideHeader(slide, '05 / Пользовательский путь', '5 шагов от вопроса до точного ответа');

  const steps = [
    { num: '1', title: 'Вопрос фаундера', desc: 'Запрос в свободной форме («Что лучше: ИП или ООО?»)' },
    { num: '2', title: 'Классификация', desc: 'Авто-определение домена (Налоги, Регистрация, Гранты)' },
    { num: '3', title: 'RAG Поиск НПА', desc: 'Векторный поиск по законам НК РФ и приказам ФНС' },
    { num: '4', title: 'Оценка риска', desc: 'Вычисление Confidence Score (>85% — выдача ответа)' },
    { num: '5', title: 'Эскалация', desc: 'Передача цифрового досье юристу Фонда при высоком риске' },
  ];

  steps.forEach((st, i) => {
    let x = 0.8 + i * 2.4;
    slide.addShape(pptx.shapes.RECTANGLE, { x: x, y: 1.7, w: 2.2, h: 4.6, fill: { color: WHITE }, line: { color: 'CBD5E1' } });
    slide.addText(st.num, { x: x + 0.1, y: 1.9, w: 0.6, h: 0.6, fontSize: 24, bold: true, color: TEAL });
    slide.addText(st.title, { x: x + 0.1, y: 2.6, w: 2.0, h: 0.8, fontSize: 16, bold: true, color: TEXT_DARK });
    slide.addText(st.desc, { x: x + 0.1, y: 3.5, w: 2.0, h: 2.5, fontSize: 13, color: TEXT_MUTED });
  });
}

// ==================== SLIDE 7: FOUNDER UI (REAL SCREENSHOTS) ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addSlideHeader(slide, '06 / Интерфейс системы', 'Реальный интерфейс: Кабинет Студента-Основателя');

  if (fs.existsSync(founderChatPath)) {
    slide.addImage({ path: founderChatPath, x: 0.8, y: 1.6, w: 5.6, h: 4.2 });
  }
  slide.addText('1. ИИ-Чат Навигатор (Ответы + НПА + Передача юристу)', {
    x: 0.8, y: 5.9, w: 5.6, h: 0.6, fontSize: 14, bold: true, color: TEXT_DARK
  });

  if (fs.existsSync(founderDashPath)) {
    slide.addImage({ path: founderDashPath, x: 6.9, y: 1.6, w: 5.6, h: 4.2 });
  }
  slide.addText('2. Личный кабинет (Трекер развития + Мои обращения)', {
    x: 6.9, y: 5.9, w: 5.6, h: 0.6, fontSize: 14, bold: true, color: TEXT_DARK
  });
}

// ==================== SLIDE 8: EXPERT UI (REAL SCREENSHOTS) ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: LIGHT_BG };
  addSlideHeader(slide, '07 / Интерфейс эксперта', 'Реальный интерфейс: Кабинет Юриста и Аналитика');

  if (fs.existsSync(expertTicketsPath)) {
    slide.addImage({ path: expertTicketsPath, x: 0.8, y: 1.6, w: 5.6, h: 4.2 });
  }
  slide.addText('1. Кабинет юриста (Входящие тикеты + Цифровое досье)', {
    x: 0.8, y: 5.9, w: 5.6, h: 0.6, fontSize: 14, bold: true, color: TEXT_DARK
  });

  if (fs.existsSync(expertAdminPath)) {
    slide.addImage({ path: expertAdminPath, x: 6.9, y: 1.6, w: 5.6, h: 4.2 });
  }
  slide.addText('2. Панель управления (RAG-симулятор + Статистика Фонда)', {
    x: 6.9, y: 5.9, w: 5.6, h: 0.6, fontSize: 14, bold: true, color: TEXT_DARK
  });
}

// ==================== SLIDE 9: MODULES ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addSlideHeader(slide, '08 / Продуктовый состав', '4 ключевых модуля архитектуры MVP');

  const mods = [
    { title: '1. AI Assistant', desc: 'Диалоговый ИИ на базе Gemini 3.6 Flash. Распознает стадии проекта и готовит точные ответы.' },
    { title: '2. Knowledge Base', desc: 'База знаний с НПА (НК РФ, приказы ФНС, регламенты ФСИ «Студенческий стартап»).' },
    { title: '3. Expert Routing', desc: 'Умный фильтр оценки сложности и авто-формирование цифрового досье для юристов.' },
    { title: '4. Dashboard', desc: 'Операционный центр кураторов Фонда с аналитикой % автоматизации и RAG-симулятором.' }
  ];

  mods.forEach((m, i) => {
    let x = (i % 2 === 0) ? 0.8 : 6.9;
    let y = (i < 2) ? 1.6 : 4.1;
    slide.addShape(pptx.shapes.RECTANGLE, { x: x, y: y, w: 5.6, h: 2.2, fill: { color: LIGHT_BG }, line: { color: 'CBD5E1' } });
    slide.addText(m.title, { x: x + 0.3, y: y + 0.3, w: 5.0, h: 0.4, fontSize: 18, bold: true, color: TEAL });
    slide.addText(m.desc, { x: x + 0.3, y: y + 0.8, w: 5.0, h: 1.2, fontSize: 14, color: TEXT_DARK });
  });
}

// ==================== SLIDE 10: TECH STACK ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: LIGHT_BG };
  addSlideHeader(slide, '09 / Технологии', 'AI-Архитектура и RAG Контроль качества');

  slide.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.6, w: 11.7, h: 2.0, fill: { color: SLATE_DARK } });
  slide.addText('СТЕК: React 18 + Node.js Express + Gemini 3.6 Flash + Vector DB + RAG Context', {
    x: 1.1, y: 1.9, w: 11.1, h: 0.5, fontSize: 18, bold: true, color: WHITE, align: 'center'
  });
  slide.addText('Сквозной алгоритм поиска информации по нормативно-правовым актам с контролем галлюцинаций', {
    x: 1.1, y: 2.5, w: 11.1, h: 0.8, fontSize: 15, color: '94A3B8', align: 'center'
  });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 3.9, w: 3.6, h: 2.5, fill: { color: WHITE }, line: { color: 'E2E8F0' } });
  slide.addText('1. Валидация НПА', { x: 1.0, y: 4.1, w: 3.2, h: 0.4, fontSize: 16, bold: true, color: BLUE_DARK });
  slide.addText('Каждый ответ ассистента подкрепляется статьями НК РФ и документами ФНС.', { x: 1.0, y: 4.6, w: 3.2, h: 1.6, fontSize: 14, color: TEXT_DARK });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 4.8, y: 3.9, w: 3.6, h: 2.5, fill: { color: WHITE }, line: { color: 'E2E8F0' } });
  slide.addText('2. Защита от ошибок', { x: 5.0, y: 4.1, w: 3.2, h: 0.4, fontSize: 16, bold: true, color: TEAL });
  slide.addText('System Prompt ограничивает ИИ рамками верифицированной базы знаний.', { x: 5.0, y: 4.6, w: 3.2, h: 1.6, fontSize: 14, color: TEXT_DARK });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 8.8, y: 3.9, w: 3.6, h: 2.5, fill: { color: WHITE }, line: { color: 'E2E8F0' } });
  slide.addText('3. Complexity Scoring', { x: 9.0, y: 4.1, w: 3.2, h: 0.4, fontSize: 16, bold: true, color: AMBER });
  slide.addText('При уверенности <85% запрос перенаправляется человеку с досье.', { x: 9.0, y: 4.6, w: 3.2, h: 1.6, fontSize: 14, color: TEXT_DARK });
}

// ==================== SLIDE 11: ROADMAP ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addSlideHeader(slide, '10 / Реализация', 'Дорожная карта развития решения');

  const stages = [
    { title: 'Этап 1 • MVP (Готово)', desc: '• Работающий веб-сервис\n• Чат-ассистент Gemini 3.6 Flash\n• База знаний и фильтрация\n• Кабинет юриста и RAG-панель' },
    { title: 'Этап 2 • Пилот (1–2 мес)', desc: '• Тестирование в 5 вузах «Твой Ход»\n• Интеграция с экспертами Фонда\n• Дообучение ИИ на вопросах\n• Защита персональных данных' },
    { title: 'Этап 3 • Масштабирование', desc: '• Подключение регионов РФ\n• Авто-генерация документов\n• Интеграция с Госуслугами\n• Персональный трекинг грантов' }
  ];

  stages.forEach((st, i) => {
    let x = 0.8 + i * 4.0;
    slide.addShape(pptx.shapes.RECTANGLE, { x: x, y: 1.7, w: 3.7, h: 4.7, fill: { color: LIGHT_BG }, line: { color: 'CBD5E1' } });
    slide.addText(st.title, { x: x + 0.2, y: 2.0, w: 3.3, h: 0.6, fontSize: 16, bold: true, color: TEAL });
    slide.addText(st.desc, { x: x + 0.2, y: 2.7, w: 3.3, h: 3.4, fontSize: 14, color: TEXT_DARK, lineSpacing: 22 });
  });
}

// ==================== SLIDE 12: METRICS ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: LIGHT_BG };
  addSlideHeader(slide, '11 / Метрики и эффекты', 'Экономический эффект и ключевые KPI');

  slide.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 1.7, w: 3.6, h: 4.7, fill: { color: WHITE }, line: { color: 'E2E8F0' } });
  slide.addText('78%', { x: 1.0, y: 2.2, w: 3.2, h: 1.2, fontSize: 54, bold: true, color: TEAL, align: 'center' });
  slide.addText('Автоматизация рутины', { x: 1.0, y: 3.6, w: 3.2, h: 0.5, fontSize: 18, bold: true, color: TEXT_DARK, align: 'center' });
  slide.addText('Вопросов закрываются ИИ без привлечения юристов.', { x: 1.0, y: 4.2, w: 3.2, h: 1.8, fontSize: 14, color: TEXT_MUTED, align: 'center' });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 4.8, y: 1.7, w: 3.6, h: 4.7, fill: { color: WHITE }, line: { color: 'E2E8F0' } });
  slide.addText('15x', { x: 5.0, y: 2.2, w: 3.2, h: 1.2, fontSize: 54, bold: true, color: BLUE_DARK, align: 'center' });
  slide.addText('Ускорение ответа', { x: 5.0, y: 3.6, w: 3.2, h: 0.5, fontSize: 18, bold: true, color: TEXT_DARK, align: 'center' });
  slide.addText('Сокращение времени ожидания с 3 дней до 3 секунд.', { x: 5.0, y: 4.2, w: 3.2, h: 1.8, fontSize: 14, color: TEXT_MUTED, align: 'center' });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 8.8, y: 1.7, w: 3.6, h: 4.7, fill: { color: WHITE }, line: { color: 'E2E8F0' } });
  slide.addText('400+', { x: 9.0, y: 2.2, w: 3.2, h: 1.2, fontSize: 54, bold: true, color: AMBER, align: 'center' });
  slide.addText('Часов в месяц', { x: 9.0, y: 3.6, w: 3.2, h: 0.5, fontSize: 18, bold: true, color: TEXT_DARK, align: 'center' });
  slide.addText('Экономия рабочего времени юристов Фонда.', { x: 9.0, y: 4.2, w: 3.2, h: 1.8, fontSize: 14, color: TEXT_MUTED, align: 'center' });
}

// ==================== SLIDE 13: RISKS ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: WHITE };
  addSlideHeader(slide, '12 / Безопасность', 'Управление рисками и комплаенс');

  const risks = [
    { r: 'Риск галлюцинаций ИИ', m: 'RAG-поиск исключительно по верифицированной базе НПА ФНС и НК РФ + обязательный дисклеймер.' },
    { r: 'Защита персональных данных', m: 'Обезличивание запросов перед отправкой в модель, шифрование по 152-ФЗ.' },
    { r: 'Юридическая ответственность', m: 'Ответы носят информационный характер. При сложных сделках — обязательная эскалация юристу.' },
    { r: 'Актуальность законов', m: 'Автоматический мониторинг изменений законодательства РФ и обновление базы векторов.' }
  ];

  risks.forEach((rk, i) => {
    let x = (i % 2 === 0) ? 0.8 : 6.9;
    let y = (i < 2) ? 1.6 : 4.1;
    slide.addShape(pptx.shapes.RECTANGLE, { x: x, y: y, w: 5.6, h: 2.2, fill: { color: LIGHT_BG }, line: { color: 'E2E8F0' } });
    slide.addText(rk.r, { x: x + 0.3, y: y + 0.3, w: 5.0, h: 0.4, fontSize: 16, bold: true, color: TEXT_DARK });
    slide.addText(`Решение: ${rk.m}`, { x: x + 0.3, y: y + 0.8, w: 5.0, h: 1.2, fontSize: 14, color: TEXT_MUTED });
  });
}

// ==================== SLIDE 14: COMPARISON ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: LIGHT_BG };
  addSlideHeader(slide, '13 / Сравнение', 'Конкурентные преимущества решения');

  let rows = [
    [
      { text: 'Критерий', options: { bold: true, fill: '1E3A8A', color: 'FFFFFF' } },
      { text: 'ChatGPT', options: { bold: true, fill: '1E3A8A', color: 'FFFFFF' } },
      { text: 'Юристы', options: { bold: true, fill: '1E3A8A', color: 'FFFFFF' } },
      { text: 'ИИ-Навигатор', options: { bold: true, fill: '0D9488', color: 'FFFFFF' } },
    ],
    ['Скорость ответа', 'Секунды', '2–5 дней', 'Мгновенно (3 сек)'],
    ['Точность по НПА РФ', 'Низкая (ошибки)', 'Высокая', '100% RAG по НПА'],
    ['Передача юристу', 'Отсутствует', 'Прямое общение', 'Авто-досье юристу'],
    ['Специфика ФСИ', 'Общие фразы', 'Зависит от юриста', 'Полная интеграция']
  ];

  slide.addTable(rows, { x: 0.8, y: 1.8, w: 11.7, h: 4.5, fontSize: 15, align: 'center', border: { pt: 1, color: 'CBD5E1' } });
}

// ==================== SLIDE 15: CONCLUSION ====================
{
  let slide = pptx.addSlide();
  slide.background = { color: DARK_BG };

  slide.addText('ТВОЙ ХОД • ЗАКЛЮЧЕНИЕ', {
    x: 0.8, y: 0.8, w: 10, h: 0.4, fontSize: 14, bold: true, color: TEAL_LIGHT
  });

  slide.addText('Готовое решение для экосистемы студенческого предпринимательства', {
    x: 0.8, y: 1.6, w: 11.5, h: 1.8, fontSize: 44, bold: true, color: WHITE
  });

  slide.addText('Цифровой навигатор объединяет возможности ИИ и экспертизу юристов Фонда, создавая быстрый и безопасный путь развития стартапов.', {
    x: 0.8, y: 3.6, w: 11.0, h: 1.0, fontSize: 20, color: 'CBD5E1'
  });

  slide.addShape(pptx.shapes.RECTANGLE, { x: 0.8, y: 4.8, w: 11.5, h: 1.6, fill: { color: SLATE_DARK }, line: { color: '334155' } });
  slide.addText('✓ Снижение операционной нагрузки на юристов на 78%\n✓ Мгновенный доступ студентов к проверенным правовым знаниям\n✓ Прозрачный операционный контроль для руководства Фонда', {
    x: 1.1, y: 5.0, w: 10.9, h: 1.2, fontSize: 16, color: WHITE, lineSpacing: 22
  });

  slide.addText('Цифровой навигатор предпринимателя • 2026', {
    x: 0.8, y: 6.8, w: 11.5, h: 0.4, fontSize: 12, color: '64748B'
  });
}

const pptxPath = path.join(process.cwd(), 'Digital_Entrepreneur_Navigator_Presentation.pptx');
pptx.writeFile({ fileName: pptxPath }).then(() => {
  console.log('PPTX presentation successfully written to:', pptxPath);
}).catch(err => {
  console.error('PPTX generation failed:', err);
  process.exit(1);
});
