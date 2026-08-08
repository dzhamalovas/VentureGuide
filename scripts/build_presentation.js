import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Helper to convert images to base64 data URIs for embedded HTML
function getBase64Image(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return '';
  }
  const fileBuffer = fs.readFileSync(filePath);
  return `data:image/png;base64,${fileBuffer.toString('base64')}`;
}

const screenshotDir = path.join(process.cwd(), 'assets', 'screenshots');
const founderChatB64 = getBase64Image(path.join(screenshotDir, 'founder_chat.png'));
const founderDashB64 = getBase64Image(path.join(screenshotDir, 'founder_dashboard.png'));
const expertTicketsB64 = getBase64Image(path.join(screenshotDir, 'expert_tickets.png'));
const expertAdminB64 = getBase64Image(path.join(screenshotDir, 'expert_admin_rag.png'));

const htmlContent = `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Цифровой навигатор предпринимателя - Презентация</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Inter', 'sans-serif'],
          }
        }
      }
    }
  </script>
  <style>
    @page {
      size: 1920px 1080px;
      margin: 0;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Inter', sans-serif;
      background-color: #0F172A;
      color: #0F172A;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .slide {
      width: 1920px;
      height: 1080px;
      page-break-after: always;
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 64px 90px;
      background-color: #FFFFFF;
    }
    .slide-dark {
      background-color: #0F172A;
      color: #F8FAFC;
    }
    .card-shadow {
      box-shadow: 0 12px 30px -5px rgba(15, 23, 42, 0.06), 0 8px 12px -6px rgba(15, 23, 42, 0.03);
    }
  </style>
</head>
<body class="bg-slate-900">

  <!-- ==================== SLIDE 1: TITLE ==================== -->
  <div class="slide slide-dark flex flex-col justify-between relative overflow-hidden">
    <div class="absolute -top-32 -right-32 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Header / Event Banner -->
    <div class="flex items-center justify-between border-b border-slate-800 pb-6 z-10">
      <div class="flex items-center gap-5">
        <div class="px-5 py-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 font-black text-base tracking-wider uppercase">
          Твой Ход
        </div>
        <span class="text-slate-300 text-lg font-medium">Всероссийский студенческий проект • Хакатон</span>
      </div>
      <div class="px-5 py-2 rounded-full bg-slate-800 text-slate-200 border border-slate-700 text-sm font-bold">
        Направление: <span class="text-teal-400">Технологическое и цифровое лидерство</span>
      </div>
    </div>

    <!-- Main Title Content -->
    <div class="my-auto space-y-9 z-10 max-w-6xl">
      <div class="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-teal-500/15 border border-teal-500/40 text-teal-300 text-base font-bold">
        <svg class="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        <span>ИИ-сервис первичной операционной поддержки стартапов</span>
      </div>

      <h1 class="text-7xl font-black text-white tracking-tight leading-none">
        Цифровой навигатор <br/>
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">предпринимателя</span>
      </h1>

      <p class="text-3xl text-slate-300 font-normal leading-relaxed max-w-5xl">
        Интеллектуальный сервис на базе Gemini 3.6 Flash и RAG для студенческих стартапов: от правовых и налоговых вопросов до цифрового досье экспертам.
      </p>

      <div class="grid grid-cols-3 gap-8 pt-4 max-w-4xl">
        <div class="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
          <div class="text-teal-400 font-black text-3xl">24/7</div>
          <div class="text-base text-slate-300 font-medium">Мгновенный ответ ИИ</div>
        </div>
        <div class="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
          <div class="text-cyan-400 font-black text-3xl">78%</div>
          <div class="text-base text-slate-300 font-medium">Автоматизация рутины</div>
        </div>
        <div class="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
          <div class="text-blue-400 font-black text-3xl">RAG + НПА</div>
          <div class="text-base text-slate-300 font-medium">База ФНС, НК РФ и ФСИ</div>
        </div>
      </div>
    </div>

    <!-- Footer Info (No personal contacts) -->
    <div class="flex items-center justify-between border-t border-slate-800 pt-6 text-sm text-slate-400 z-10">
      <div>Проект: <span class="text-white font-bold">Цифровой навигатор предпринимателя</span></div>
      <div>Статус: <span class="text-teal-400 font-bold">Готовое MVP-решение</span></div>
    </div>
  </div>


  <!-- ==================== SLIDE 2: CASE & PROBLEM ==================== -->
  <div class="slide bg-slate-50">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">01 / Контекст и проблематика</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">Молодые предприниматели теряются в первых операционных шагах</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-sm">Контекст кейса</div>
    </div>

    <div class="grid grid-cols-12 gap-8 my-auto">
      <!-- Left: Process Bottlenecks -->
      <div class="col-span-7 space-y-6">
        <div class="p-7 rounded-2xl bg-white border border-slate-200 card-shadow space-y-5">
          <div class="text-base font-bold text-slate-800 uppercase tracking-wide flex items-center justify-between">
            <span>Текущий процесс юридической поддержки в регионах</span>
            <span class="px-3 py-1 rounded bg-rose-100 text-rose-800 text-xs font-bold">Низкая скорость (2–5 дней)</span>
          </div>
          
          <div class="flex items-center justify-between bg-slate-50 p-5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700">
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-900 font-bold text-lg flex items-center justify-center mx-auto mb-2">1</div>
              <span>Основатель</span>
            </div>
            <div class="text-slate-400 font-bold text-xl">→</div>
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-slate-200 text-slate-800 font-bold text-lg flex items-center justify-center mx-auto mb-2">2</div>
              <span>Сложный вопрос</span>
            </div>
            <div class="text-slate-400 font-bold text-xl">→</div>
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-amber-100 text-amber-900 font-bold text-lg flex items-center justify-center mx-auto mb-2">3</div>
              <span>Ожидание юриста<br/>(3 дня)</span>
            </div>
            <div class="text-slate-400 font-bold text-xl">→</div>
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-emerald-100 text-emerald-900 font-bold text-lg flex items-center justify-center mx-auto mb-2">4</div>
              <span>Ответ эксперта</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-5">
          <div class="p-6 rounded-2xl bg-white border border-slate-200 card-shadow space-y-2">
            <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 font-extrabold flex items-center justify-center text-lg">!</div>
            <h4 class="font-bold text-base text-slate-900">Перегрузка экспертов</h4>
            <p class="text-xs text-slate-600 leading-relaxed">Юристы тратят 80% времени на типовые вопросы (ОКВЭД, ИП vs ООО, Налоги).</p>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-slate-200 card-shadow space-y-2">
            <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 font-extrabold flex items-center justify-center text-lg">⏳</div>
            <h4 class="font-bold text-base text-slate-900">Потеря темпа</h4>
            <p class="text-xs text-slate-600 leading-relaxed">Студенты неделями ждут консультаций и совершают ошибки при запуске.</p>
          </div>

          <div class="p-6 rounded-2xl bg-white border border-slate-200 card-shadow space-y-2">
            <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-extrabold flex items-center justify-center text-lg">📚</div>
            <h4 class="font-bold text-base text-slate-900">Фрагментация знаний</h4>
            <p class="text-xs text-slate-600 leading-relaxed">Информация о грантах, налогах и законах разбросана по десяткам сайтов.</p>
          </div>
        </div>
      </div>

      <!-- Right: Stat Box -->
      <div class="col-span-5 flex flex-col justify-between p-9 rounded-3xl bg-blue-900 text-white space-y-6 shadow-xl">
        <div class="space-y-3">
          <div class="inline-block px-3.5 py-1 rounded-md bg-teal-500/20 text-teal-300 text-xs font-extrabold uppercase border border-teal-500/30">Источник данных</div>
          <h3 class="text-3xl font-extrabold tracking-tight">50+ экспертов Фонда поддержки</h3>
          <p class="text-sm text-slate-300 leading-relaxed">Ежемесячно обрабатывают сотни первичных обращений от студенческих стартапов во всех регионах России.</p>
        </div>

        <div class="p-6 rounded-2xl bg-white/10 border border-white/20 space-y-2">
          <div class="text-5xl font-black text-teal-300">~78%</div>
          <div class="text-sm text-slate-200 font-medium leading-relaxed">вопросов составляют повторяющиеся типовые консультации по выбору системы налогообложения, ОКВЭД и грантам.</div>
        </div>

        <div class="text-xs text-slate-300 border-t border-white/15 pt-4 leading-relaxed">
          💡 Вывод: Внедрение умного ИИ-ассистента первого уровня высвобождает сотни часов работы высококвалифицированных юристов.
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 2 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 3: PROBLEM TREE ==================== -->
  <div class="slide bg-white">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">02 / Причинно-следственный анализ</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">Дерево проблем операционной поддержки</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm">Problem Tree</div>
    </div>

    <div class="my-auto space-y-7">
      <div class="p-7 rounded-2xl bg-blue-900 text-white max-w-5xl mx-auto shadow-lg text-center space-y-2">
        <div class="text-xs font-bold uppercase tracking-widest text-teal-300">Первопричина (Корень)</div>
        <h3 class="text-2xl font-extrabold">Активный рост количества студентов-основателей и вузовских стартапов</h3>
        <p class="text-sm text-slate-300">Быстрый рост числа проектов при ограниченном штате юристов и консультантов Фонда.</p>
      </div>

      <div class="text-center font-black text-3xl text-teal-600">↓</div>

      <div class="p-7 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 max-w-5xl mx-auto text-center space-y-2">
        <div class="text-xs font-bold uppercase tracking-widest text-amber-800">Центральная проблема</div>
        <h3 class="text-2xl font-extrabold text-slate-900">Отсутствие автоматизированного первого уровня поддержки</h3>
        <p class="text-sm text-slate-700">Отсутствует виртуальный ассистент, способный мгновенно давать верные ответы на основе НПА и структурировать сложные случаи.</p>
      </div>

      <div class="text-center font-black text-3xl text-teal-600">↓</div>

      <div class="grid grid-cols-3 gap-7">
        <div class="p-6 rounded-2xl bg-rose-50 border border-rose-200 space-y-2">
          <div class="text-xs font-bold uppercase text-rose-800">Препятствие для стартапа</div>
          <h4 class="font-bold text-slate-900 text-base">Задержка запуска и ошибки</h4>
          <p class="text-xs text-slate-600 leading-relaxed">Студенты откладывают запуск ООО/ИП из-за страха юридических ошибок и отказов по грантам.</p>
        </div>

        <div class="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
          <div class="text-xs font-bold uppercase text-slate-700">Перегрузка экспертов</div>
          <h4 class="font-bold text-slate-900 text-base">Выгорание и дефицит времени</h4>
          <p class="text-xs text-slate-600 leading-relaxed">Юристы поглощены однотипными консультациями вместо сопровождения сложных венчурных сделок.</p>
        </div>

        <div class="p-6 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
          <div class="text-xs font-bold uppercase text-blue-900">Неэффективность экосистемы</div>
          <h4 class="font-bold text-slate-900 text-base">Снижение конверсии проектов</h4>
          <p class="text-xs text-slate-600 leading-relaxed">Падение доли проектных идей, успешно доходящих до стадии первых коммерческих продаж.</p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 3 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 4: TARGET AUDIENCE ==================== -->
  <div class="slide bg-slate-50">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">03 / Целевая аудитория</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">Ключевые пользователи и их сценарии</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-sm">User Personas</div>
    </div>

    <div class="grid grid-cols-2 gap-9 my-auto">
      <!-- Persona 1 -->
      <div class="p-8 rounded-3xl bg-white border border-slate-200 card-shadow space-y-6">
        <div class="flex items-center gap-5 border-b border-slate-100 pb-5">
          <div class="w-16 h-16 rounded-2xl bg-teal-500 text-slate-950 font-black text-2xl flex items-center justify-center shrink-0">
            С
          </div>
          <div>
            <div class="px-3 py-0.5 rounded bg-teal-50 text-teal-800 text-xs font-bold uppercase inline-block mb-1 border border-teal-200">Персона 1</div>
            <h3 class="text-2xl font-bold text-slate-900">Студент-основатель (Founder)</h3>
            <div class="text-xs text-slate-500 font-medium">18–25 лет • Стадия: Идея / Разработка MVP / Первые продажи</div>
          </div>
        </div>

        <div class="space-y-3">
          <div class="text-xs font-bold text-slate-800 uppercase tracking-wide">Ключевые потребности и боли:</div>
          <ul class="space-y-2.5 text-xs text-slate-700">
            <li class="flex items-start gap-2.5">
              <span class="text-rose-500 font-bold text-base">✗</span>
              <span class="leading-relaxed">Не знает юридические шаги (что выбрать: ИП, ООО или Самозанятость для IT-проекта).</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-rose-500 font-bold text-base">✗</span>
              <span class="leading-relaxed">Не понимает налоговые спецрежимы (УСН 6% vs 15%, ПСН, льготы Минцифры).</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-rose-500 font-bold text-base">✗</span>
              <span class="leading-relaxed">Боится ошибок при подаче заявки на 1 млн ₽ в «Студенческий стартап».</span>
            </li>
          </ul>
        </div>

        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed">
          <span class="font-bold text-teal-700">Ожидание от ИИ-Навигатора:</span> Мгновенный, простой и понятный ответ с пошаговым алгоритмом действий.
        </div>
      </div>

      <!-- Persona 2 -->
      <div class="p-8 rounded-3xl bg-white border border-slate-200 card-shadow space-y-6">
        <div class="flex items-center gap-5 border-b border-slate-100 pb-5">
          <div class="w-16 h-16 rounded-2xl bg-blue-900 text-white font-black text-2xl flex items-center justify-center shrink-0">
            Э
          </div>
          <div>
            <div class="px-3 py-0.5 rounded bg-blue-50 text-blue-900 text-xs font-bold uppercase inline-block mb-1 border border-blue-200">Персона 2</div>
            <h3 class="text-2xl font-bold text-slate-900">Юрист / Эксперт Фонда</h3>
            <div class="text-xs text-slate-500 font-medium">Профильный специалист • Поддержка предпринимательства</div>
          </div>
        </div>

        <div class="space-y-3">
          <div class="text-xs font-bold text-slate-800 uppercase tracking-wide">Ключевые потребности и боли:</div>
          <ul class="space-y-2.5 text-xs text-slate-700">
            <li class="flex items-start gap-2.5">
              <span class="text-rose-500 font-bold text-base">✗</span>
              <span class="leading-relaxed">Огромный поток одинаковых вопросов со всех регионов страны.</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-rose-500 font-bold text-base">✗</span>
              <span class="leading-relaxed">Недостаток времени на глубокие венчурные сделки и оформление IP-прав.</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span class="text-rose-500 font-bold text-base">✗</span>
              <span class="leading-relaxed">Отсутствие готового структурированного досье перед началом общения со студентом.</span>
            </li>
          </ul>
        </div>

        <div class="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs leading-relaxed">
          <span class="font-bold text-blue-900">Ожидание от ИИ-Навигатора:</span> Фильтрация рутины и получение готовой карточки сложного кейса.
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 4 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 5: OUR SOLUTION ==================== -->
  <div class="slide bg-white">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">04 / Концепция решения</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">ИИ-навигатор первого уровня с эскалацией экспертам</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm">Core Concept</div>
    </div>

    <div class="my-auto space-y-8">
      <div class="p-7 rounded-3xl bg-blue-900 text-white flex items-center justify-between shadow-xl">
        <div class="space-y-2">
          <div class="text-xs font-bold text-teal-300 uppercase tracking-wider">Принцип работы системы</div>
          <h3 class="text-3xl font-black">ИИ закрывает 78% рутины — Человек решает сложные кейсы</h3>
        </div>
        <div class="px-6 py-3.5 rounded-2xl bg-teal-500 text-slate-950 font-black text-base shrink-0">
          Гибридная архитектура (Human-in-the-Loop)
        </div>
      </div>

      <div class="p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-6">
        <div class="text-xs font-bold text-slate-700 uppercase tracking-wider text-center">Схема интеллектуальной обработки запроса</div>
        
        <div class="grid grid-cols-5 gap-5 items-center">
          <div class="p-5 rounded-2xl bg-white border border-slate-200 text-center space-y-2 card-shadow">
            <div class="w-12 h-12 rounded-full bg-blue-100 text-blue-900 font-bold flex items-center justify-center mx-auto text-xl">👤</div>
            <div class="font-bold text-sm text-slate-900">Предприниматель</div>
            <div class="text-xs text-slate-500">Задает вопрос в чате</div>
          </div>

          <div class="text-center font-black text-2xl text-teal-600">→</div>

          <div class="p-6 rounded-2xl bg-blue-900 text-white text-center space-y-2 shadow-lg">
            <div class="w-12 h-12 rounded-full bg-teal-400 text-slate-950 font-bold flex items-center justify-center mx-auto text-xl">🤖</div>
            <div class="font-bold text-sm">AI Navigator (RAG)</div>
            <div class="text-xs text-slate-300">Классификация и Complexity Score</div>
          </div>

          <div class="text-center font-black text-2xl text-teal-600">→</div>

          <div class="space-y-3">
            <div class="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-950 text-center space-y-1">
              <div class="font-bold text-xs uppercase">Типовой кейс (78%)</div>
              <div class="text-xs font-medium">Мгновенный ответ ИИ с НПА</div>
            </div>
            <div class="p-4 rounded-2xl bg-amber-100 border border-amber-300 text-amber-950 text-center space-y-1">
              <div class="font-bold text-xs uppercase">Сложный кейс (22%)</div>
              <div class="text-xs font-medium">Передача юристу Фонда</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 5 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 6: HOW IT WORKS ==================== -->
  <div class="slide bg-slate-50">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">05 / Пользовательский путь</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">5 шагов от вопроса до точного ответа</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-sm">User Journey</div>
    </div>

    <div class="my-auto grid grid-cols-5 gap-5">
      <div class="p-6 rounded-2xl bg-white border border-slate-200 card-shadow space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 font-black text-base flex items-center justify-center">1</div>
          <h4 class="font-bold text-sm text-slate-900">Вопрос основателя</h4>
          <p class="text-xs text-slate-600 leading-relaxed">Студент вводит вопрос в текстовом или голосовом виде.</p>
        </div>
        <div class="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 italic border border-slate-200">
          «Какую налоговую ставку выбрать для IT-проекта?»
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 card-shadow space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="w-10 h-10 rounded-xl bg-blue-900 text-white font-black text-base flex items-center justify-center">2</div>
          <h4 class="font-bold text-sm text-slate-900">ИИ-Классификация</h4>
          <p class="text-xs text-slate-600 leading-relaxed">Система определяет домен: Налоги, ИП/ООО, Гранты, IP.</p>
        </div>
        <div class="p-3 rounded-xl bg-blue-50 text-xs text-blue-900 font-bold border border-blue-100">
          Тег: Налоги (ОКВЭД 62.01)
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 card-shadow space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 font-black text-base flex items-center justify-center">3</div>
          <h4 class="font-bold text-sm text-slate-900">RAG Поиск НПА</h4>
          <p class="text-xs text-slate-600 leading-relaxed">Поиск по базе актуальных законов и инструкций ФНС.</p>
        </div>
        <div class="p-3 rounded-xl bg-teal-50 text-xs text-teal-800 font-bold border border-teal-200">
          Источник: НК РФ ст. 346.12
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 card-shadow space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="w-10 h-10 rounded-xl bg-blue-900 text-white font-black text-base flex items-center justify-center">4</div>
          <h4 class="font-bold text-sm text-slate-900">Оценка риска</h4>
          <p class="text-xs text-slate-600 leading-relaxed">Расчет Complexity Score. Выдача готового ответа с чек-листом.</p>
        </div>
        <div class="p-3 rounded-xl bg-emerald-50 text-xs text-emerald-800 font-bold border border-emerald-200">
          Confidence: 96% (Low Risk)
        </div>
      </div>

      <div class="p-6 rounded-2xl bg-white border border-slate-200 card-shadow space-y-4 flex flex-col justify-between">
        <div class="space-y-3">
          <div class="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-black text-base flex items-center justify-center">5</div>
          <h4 class="font-bold text-sm text-slate-900">Эскалация</h4>
          <p class="text-xs text-slate-600 leading-relaxed">При высоком риске — сбор цифрового досье для юриста.</p>
        </div>
        <div class="p-3 rounded-xl bg-amber-50 text-xs text-amber-800 font-bold border border-amber-200">
          Тикет #T-1024 юристу
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 6 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 7: FOUNDER UI SHOWCASE ==================== -->
  <div class="slide bg-white">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">06 / Интерфейс системы</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">Реальный интерфейс: Кабинет Студента-Основателя</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm">Founder View</div>
    </div>

    <div class="grid grid-cols-2 gap-8 my-auto">
      <!-- Screenshot 1: AI Chat -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-lg text-slate-900 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-teal-500"></span>
            1. ИИ-Диалог и ссылки на НПА
          </h3>
          <span class="text-xs text-slate-500 font-medium">Чат с ассистентом 24/7</span>
        </div>
        <div class="rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xl bg-slate-900 p-1">
          <img src="${founderChatB64}" class="w-full h-[480px] object-cover rounded-xl" alt="Founder Chat UI" />
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          ИИ анализирует стадию стартапа, дает мгновенный ответ, ссылается на статьи НК РФ и позволяет в 1 клик отправить кейс эксперту.
        </p>
      </div>

      <!-- Screenshot 2: Dashboard -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-lg text-slate-900 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-blue-900"></span>
            2. Личный кабинет и Дорожная карта
          </h3>
          <span class="text-xs text-slate-500 font-medium">Трекинг развития</span>
        </div>
        <div class="rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xl bg-slate-900 p-1">
          <img src="${founderDashB64}" class="w-full h-[480px] object-cover rounded-xl" alt="Founder Dashboard UI" />
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Основатель видит прогресс своего стартапа, статус текущих обращения к экспертам и рекомендуемые грантовые программы ФСИ.
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 7 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 8: EXPERT UI SHOWCASE ==================== -->
  <div class="slide bg-slate-50">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">07 / Интерфейс эксперта</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">Реальный интерфейс: Кабинет Юриста и Панель Управления</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-sm">Expert & Admin View</div>
    </div>

    <div class="grid grid-cols-2 gap-8 my-auto">
      <!-- Screenshot 3: Expert Tickets -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-lg text-slate-900 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-500"></span>
            1. Входящие тикеты и Цифровое досье
          </h3>
          <span class="text-xs text-slate-500 font-medium">Рабочее место юриста</span>
        </div>
        <div class="rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xl bg-slate-900 p-1">
          <img src="${expertTicketsB64}" class="w-full h-[480px] object-cover rounded-xl" alt="Expert Tickets UI" />
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Юрист получает автоматическое досье стартапа: краткая выжимка ИИ, история чата, юридические риски и форма мгновенного ответа.
        </p>
      </div>

      <!-- Screenshot 4: RAG & Analytics -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="font-bold text-lg text-slate-900 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-teal-500"></span>
            2. RAG-симулятор и Аналитика Фонда
          </h3>
          <span class="text-xs text-slate-500 font-medium">Операционный центр</span>
        </div>
        <div class="rounded-2xl border-2 border-slate-200 overflow-hidden shadow-xl bg-slate-900 p-1">
          <img src="${expertAdminB64}" class="w-full h-[480px] object-cover rounded-xl" alt="Admin RAG Simulator UI" />
        </div>
        <p class="text-xs text-slate-600 leading-relaxed">
          Куратор Фонда видит % автоматизации, распределение по регионам и может протестировать работу векторов базы знаний.
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 8 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 9: PRODUCT MODULES ==================== -->
  <div class="slide bg-white">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">08 / Продуктовый состав</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">4 ключевых модуля архитектуры MVP</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm">MVP Modules</div>
    </div>

    <div class="grid grid-cols-2 gap-8 my-auto">
      <div class="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 card-shadow">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-teal-500 text-slate-950 font-black text-xl flex items-center justify-center">1</div>
          <div>
            <h3 class="font-bold text-xl text-slate-900">AI Assistant (ИИ-Ассистент)</h3>
            <span class="text-xs text-teal-700 font-bold">Первичные консультации 24/7</span>
          </div>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">
          Диалоговый интерфейс на базе Gemini 3.6 Flash. Распознает контекст стадии стартапа, формирует понятные чек-листы и ссылки на законы.
        </p>
      </div>

      <div class="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 card-shadow">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-blue-900 text-white font-black text-xl flex items-center justify-center">2</div>
          <div>
            <h3 class="font-bold text-xl text-slate-900">Knowledge Base (База Знаний)</h3>
            <span class="text-xs text-blue-900 font-bold">Верифицированные НПА и руководства</span>
          </div>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">
          Структурированный репозиторий официальных инструкций ФНС, Налогового кодекса РФ, правил гранта ФСИ «Студенческий стартап» и передачи IP.
        </p>
      </div>

      <div class="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 card-shadow">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center">3</div>
          <div>
            <h3 class="font-bold text-xl text-slate-900">Expert Routing (Маршрутизация)</h3>
            <span class="text-xs text-amber-800 font-bold">Сбор цифровых досье</span>
          </div>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">
          Умный фильтр, оценивающий уровень риска и сложности. При высоких рисках формирует точную карточку проекта для юриста Фонда.
        </p>
      </div>

      <div class="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-4 card-shadow">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-slate-900 text-white font-black text-xl flex items-center justify-center">4</div>
          <div>
            <h3 class="font-bold text-xl text-slate-900">Dashboard (Операционный Центр)</h3>
            <span class="text-xs text-slate-700 font-bold">Аналитика для руководства</span>
          </div>
        </div>
        <p class="text-sm text-slate-600 leading-relaxed">
          Дашборд для администрации Фонда со статистикой загрузки экспертов, процентом закрытия вопросов ИИ и RAG-симулятором.
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 9 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 10: TECH STACK & RAG ==================== -->
  <div class="slide bg-slate-50">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">09 / Технологии</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">AI-Архитектура и RAG Контроль качества</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-sm">Tech Stack</div>
    </div>

    <div class="my-auto space-y-7">
      <div class="p-7 rounded-3xl bg-slate-900 text-white space-y-5 shadow-2xl border border-slate-800">
        <div class="text-xs font-bold text-teal-300 uppercase tracking-widest text-center">Сквозной поток обработки данных</div>
        
        <div class="grid grid-cols-6 gap-4 text-center">
          <div class="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
            <div class="font-bold text-sm text-white">Frontend</div>
            <div class="text-xs text-slate-400">React 18 + Vite</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
            <div class="font-bold text-sm text-white">Backend API</div>
            <div class="text-xs text-slate-400">Node.js Express</div>
          </div>
          <div class="p-4 rounded-2xl bg-teal-500 text-slate-950 space-y-1">
            <div class="font-black text-sm">AI Engine</div>
            <div class="text-xs font-bold">Gemini 3.6 Flash</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
            <div class="font-bold text-sm text-white">RAG Pipeline</div>
            <div class="text-xs text-slate-400">Context Search</div>
          </div>
          <div class="p-4 rounded-2xl bg-slate-800 border border-slate-700 space-y-1">
            <div class="font-bold text-sm text-white">Vector DB</div>
            <div class="text-xs text-slate-400">Embeddings Store</div>
          </div>
          <div class="p-4 rounded-2xl bg-blue-900 text-white space-y-1">
            <div class="font-bold text-sm">Knowledge Base</div>
            <div class="text-xs text-slate-300">ФНС, НК, ФСИ</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-7">
        <div class="p-6 rounded-2xl bg-white border border-slate-200 card-shadow space-y-2">
          <div class="font-bold text-sm text-blue-900">1. Валидация НПА</div>
          <p class="text-xs text-slate-600 leading-relaxed">Все ответы подкрепляются точными нормативно-правовыми актами (статьи НК РФ, приклады ФНС).</p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200 card-shadow space-y-2">
          <div class="font-bold text-sm text-teal-700">2. Защита от галлюцинаций</div>
          <p class="text-xs text-slate-600 leading-relaxed">System Prompt строго ограничивает ответы рамками верифицированной базы знаний.</p>
        </div>

        <div class="p-6 rounded-2xl bg-white border border-slate-200 card-shadow space-y-2">
          <div class="font-bold text-sm text-amber-800">3. Complexity Scoring</div>
          <p class="text-xs text-slate-600 leading-relaxed">При уверениях < 85% ИИ мгновенно перенаправляет вопрос профильному специалисту.</p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 10 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 11: ROADMAP ==================== -->
  <div class="slide bg-white">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">10 / Реализация</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">Дорожная карта развития решения</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm">Roadmap</div>
    </div>

    <div class="my-auto grid grid-cols-3 gap-8">
      <div class="p-7 rounded-3xl bg-slate-50 border border-slate-200 card-shadow space-y-5">
        <div class="px-4 py-1.5 rounded-lg bg-teal-500/20 text-teal-900 text-xs font-black uppercase border border-teal-300 inline-block">
          Этап 1 • Готово (MVP)
        </div>
        <h3 class="text-2xl font-extrabold text-slate-900">Работающий прототип</h3>
        <ul class="space-y-3 text-xs text-slate-700">
          <li class="flex items-center gap-2.5">✓ Чат-ассистент на Gemini 3.6 Flash</li>
          <li class="flex items-center gap-2.5">✓ База знаний с НПА и фильтрацией</li>
          <li class="flex items-center gap-2.5">✓ Кабинет основателя с трекером</li>
          <li class="flex items-center gap-2.5">✓ Панель эксперта и RAG-симулятор</li>
        </ul>
      </div>

      <div class="p-7 rounded-3xl bg-slate-50 border border-slate-200 card-shadow space-y-5">
        <div class="px-4 py-1.5 rounded-lg bg-blue-100 text-blue-900 text-xs font-black uppercase border border-blue-300 inline-block">
          Этап 2 • 1–2 месяца
        </div>
        <h3 class="text-2xl font-extrabold text-slate-900">Пилотный запуск</h3>
        <ul class="space-y-3 text-xs text-slate-700">
          <li class="flex items-center gap-2.5">→ Запуск в 5 пилотных вузах «Твой Ход»</li>
          <li class="flex items-center gap-2.5">→ Интеграция с базой юристов Фонда</li>
          <li class="flex items-center gap-2.5">→ Дообучение модели на реальных вопросах</li>
          <li class="flex items-center gap-2.5">→ Защита персональных данных</li>
        </ul>
      </div>

      <div class="p-7 rounded-3xl bg-slate-50 border border-slate-200 card-shadow space-y-5">
        <div class="px-4 py-1.5 rounded-lg bg-slate-200 text-slate-800 text-xs font-black uppercase border border-slate-300 inline-block">
          Этап 3 • 3–6 месяцев
        </div>
        <h3 class="text-2xl font-extrabold text-slate-900">Масштабирование</h3>
        <ul class="space-y-3 text-xs text-slate-700">
          <li class="flex items-center gap-2.5">• Подключение региональных центров</li>
          <li class="flex items-center gap-2.5">• Авто-генерация документов и уставов</li>
          <li class="flex items-center gap-2.5">• Интеграция с банками и Госуслугами</li>
          <li class="flex items-center gap-2.5">• Персональные рекомендации грантов</li>
        </ul>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 11 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 12: VALUE & METRICS ==================== -->
  <div class="slide bg-slate-50">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">11 / Метрики и эффекты</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">Экономический эффект и ключевые KPI</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-sm">Value & Impact</div>
    </div>

    <div class="grid grid-cols-3 gap-8 my-auto">
      <div class="p-8 rounded-3xl bg-white border border-slate-200 card-shadow space-y-4 text-center">
        <div class="text-6xl font-black text-teal-500">78%</div>
        <h3 class="font-bold text-xl text-slate-900">Уровень автоматизации</h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Вопросов обрабатываются ИИ без необходимости участия экспертов-человек.
        </p>
      </div>

      <div class="p-8 rounded-3xl bg-white border border-slate-200 card-shadow space-y-4 text-center">
        <div class="text-6xl font-black text-blue-900">15x</div>
        <h3 class="font-bold text-xl text-slate-900">Ускорение ответа</h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Сокращение времени ожидания консультации с 3 дней до 3 секунд.
        </p>
      </div>

      <div class="p-8 rounded-3xl bg-white border border-slate-200 card-shadow space-y-4 text-center">
        <div class="text-6xl font-black text-amber-500">400+</div>
        <h3 class="font-bold text-xl text-slate-900">Часов в месяц</h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          Экономия рабочего времени юристов и консультантов Фонда.
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 12 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 13: RISK MANAGEMENT ==================== -->
  <div class="slide bg-white">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">12 / Безопасность</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">Управление рисками и комплаенс</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm">Risk Management</div>
    </div>

    <div class="grid grid-cols-2 gap-8 my-auto">
      <div class="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 card-shadow">
        <h3 class="font-bold text-lg text-slate-900 flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-rose-500"></span>
          Риск галлюцинаций ИИ
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          <strong class="text-slate-800">Решение:</strong> Использование RAG-поиска по ограниченной базе верифицированных НПА ФНС и НК РФ + явный дисклеймер.
        </p>
      </div>

      <div class="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 card-shadow">
        <h3 class="font-bold text-lg text-slate-900 flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-amber-500"></span>
          Защита персональных данных
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          <strong class="text-slate-800">Решение:</strong> Обезличивание запросов перед отправкой в LLM, шифрование данных по 152-ФЗ.
        </p>
      </div>

      <div class="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 card-shadow">
        <h3 class="font-bold text-lg text-slate-900 flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-blue-900"></span>
          Юридическая ответственность
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          <strong class="text-slate-800">Решение:</strong> Ответы носят информационный характер. При сложных нестандартных сделках передача юристу.
        </p>
      </div>

      <div class="p-7 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 card-shadow">
        <h3 class="font-bold text-lg text-slate-900 flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-teal-500"></span>
          Актуальность законов
        </h3>
        <p class="text-xs text-slate-600 leading-relaxed">
          <strong class="text-slate-800">Решение:</strong> Автоматический мониторинг обновлений базы ФНС и Налогового кодекса РФ.
        </p>
      </div>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 13 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 14: COMPETITIVE MATRIX ==================== -->
  <div class="slide bg-slate-50">
    <div class="flex items-center justify-between border-b border-slate-200 pb-5">
      <div>
        <div class="text-sm font-bold uppercase tracking-wider text-teal-700 mb-1">13 / Сравнение</div>
        <h2 class="text-4xl font-extrabold text-slate-900 tracking-tight">Конкурентные преимущества решения</h2>
      </div>
      <div class="px-4 py-2 rounded-xl bg-blue-900 text-white font-bold text-sm">Comparison</div>
    </div>

    <div class="my-auto p-7 rounded-3xl bg-white border border-slate-200 card-shadow">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="border-b border-slate-200 text-slate-800 text-sm font-extrabold">
            <th class="pb-4">Критерий сравнения</th>
            <th class="pb-4 text-slate-500">Обычный ChatGPT</th>
            <th class="pb-4 text-slate-500">Классические юристы</th>
            <th class="pb-4 text-teal-700 font-black">Наш ИИ-Навигатор</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 text-slate-700">
          <tr>
            <td class="py-4 font-bold text-slate-900 text-sm">Скорость ответа</td>
            <td class="py-4 text-emerald-600 font-semibold">Секунды</td>
            <td class="py-4 text-rose-600 font-semibold">2–5 дней</td>
            <td class="py-4 text-teal-700 font-bold text-sm">Мгновенно (3 сек)</td>
          </tr>
          <tr>
            <td class="py-4 font-bold text-slate-900 text-sm">Точность по законам РФ</td>
            <td class="py-4 text-rose-600 font-semibold">Низкая (галлюцинации)</td>
            <td class="py-4 text-emerald-600 font-semibold">Высокая</td>
            <td class="py-4 text-teal-700 font-bold text-sm">100% RAG по НПА РФ</td>
          </tr>
          <tr>
            <td class="py-4 font-bold text-slate-900 text-sm">Эскалация эксперту</td>
            <td class="py-4 text-rose-600 font-semibold">Отсутствует</td>
            <td class="py-4 text-slate-500">Прямое общение</td>
            <td class="py-4 text-teal-700 font-bold text-sm">Авто-досье юристу</td>
          </tr>
          <tr>
            <td class="py-4 font-bold text-slate-900 text-sm">Контекст стартапов и ФСИ</td>
            <td class="py-4 text-rose-600 font-semibold">Общие фразы</td>
            <td class="py-4 text-slate-500">Различается</td>
            <td class="py-4 text-teal-700 font-bold text-sm">Специфика грантов ФСИ</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex items-center justify-between text-xs text-slate-500 border-t border-slate-200 pt-4">
      <span>Цифровой навигатор предпринимателя</span>
      <span>Слайд 14 из 15</span>
    </div>
  </div>


  <!-- ==================== SLIDE 15: CONCLUSION ==================== -->
  <div class="slide slide-dark flex flex-col justify-between relative overflow-hidden">
    <div class="absolute -top-32 -left-32 w-[500px] h-[500px] bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>

    <div class="flex items-center justify-between border-b border-slate-800 pb-6 z-10">
      <div class="flex items-center gap-5">
        <div class="px-5 py-2 rounded-xl bg-teal-500/20 text-teal-300 border border-teal-500/40 font-black text-base uppercase">
          Твой Ход
        </div>
        <span class="text-slate-300 text-lg font-medium">Заключение</span>
      </div>
      <div class="px-5 py-2 rounded-full bg-slate-800 text-slate-200 text-sm font-bold">
        Проект готов к внедрению
      </div>
    </div>

    <div class="my-auto space-y-8 z-10 max-w-5xl">
      <h2 class="text-6xl font-black text-white tracking-tight leading-tight">
        Готовое решение для экосистемы <br/>
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400">студенческого предпринимательства</span>
      </h2>

      <p class="text-2xl text-slate-300 font-normal leading-relaxed">
        Цифровой навигатор объединяет ИИ-технологии и экспертизу юристов Фонда, создавая прозрачный и быстрый путь для развития стартапов по всей стране.
      </p>

      <div class="p-8 rounded-3xl bg-slate-800/80 border border-slate-700/80 space-y-3 max-w-3xl">
        <div class="text-teal-400 font-extrabold text-lg uppercase tracking-wider">Ключевые преимущества внедрения</div>
        <div class="text-base text-slate-200 space-y-1">
          <div>✓ Снижение нагрузки на юристов на 78%</div>
          <div>✓ Мгновенный доступ студентов к проверенным юридическим знаниям</div>
          <div>✓ Прозрачный операционный контроль для руководства Фонда</div>
        </div>
      </div>
    </div>

    <!-- No personal contacts! Clean ending -->
    <div class="flex items-center justify-between border-t border-slate-800 pt-6 text-sm text-slate-400 z-10">
      <div>Цифровой навигатор предпринимателя</div>
      <div>2026</div>
    </div>
  </div>

</body>
</html>`;

fs.writeFileSync(path.join(process.cwd(), 'presentation.html'), htmlContent);
console.log('HTML presentation written to presentation.html');

async function buildPdf() {
  console.log('Building PDF using Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1920, height: 1080 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(process.cwd(), 'Digital_Entrepreneur_Navigator_Presentation.pdf');
  await page.pdf({
    path: pdfPath,
    width: '1920px',
    height: '1080px',
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 }
  });

  await browser.close();
  console.log('PDF successfully generated at:', pdfPath);
}

buildPdf().catch(err => {
  console.error('PDF build failed:', err);
  process.exit(1);
});
