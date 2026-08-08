import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Building, 
  Calculator, 
  FileText, 
  CreditCard, 
  Users, 
  ShieldCheck, 
  Bot, 
  Zap, 
  HelpCircle,
  Award,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28 border-b border-slate-800/80">
        {/* Subtle background blur & mesh */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,148,136,0.25),rgba(255,255,255,0))]"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-semibold mb-6 shadow-sm shadow-teal-500/10">
            <GraduationCap className="w-4 h-4 text-teal-400" />
            <span>Платформа операционной поддержки студентов-основателей</span>
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse"></span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
            Запусти бизнес <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              без операционного хаоса
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            ИИ-навигация по регистрации, налогам, документам и мерам поддержки для начинающих предпринимателей. Мгновенные ответы 24/7 и передача сложных кейсов экспертам.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={() => onNavigate('chat')}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 hover:from-teal-400 hover:to-blue-500 text-slate-950 font-bold text-base transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Sparkles className="w-5 h-5" />
              <span>Задать вопрос ИИ</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-base transition-all border border-slate-700/80 flex items-center justify-center gap-2"
            >
              <span>Как это работает</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Trust stats banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-slate-800/80 text-left">
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <div className="text-2xl font-bold text-teal-400">15 сек</div>
              <div className="text-xs text-slate-400 mt-1">Среднее время ответа ИИ</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <div className="text-2xl font-bold text-cyan-400">76%</div>
              <div className="text-xs text-slate-400 mt-1">Вопросов решаются без юриста</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <div className="text-2xl font-bold text-blue-400">1 000 000 ₽</div>
              <div className="text-xs text-slate-400 mt-1">Инструкции по Студенческому стартапу</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <div className="text-2xl font-bold text-emerald-400">100% ФНС</div>
              <div className="text-xs text-slate-400 mt-1">Актуальное законодательство 2026</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Capabilities Grid */}
      <section className="py-20 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
              Полный спектр операционной поддержки
            </h2>
            <p className="text-slate-400 text-sm">
              Всё, что необходимо студенту-основателю на старте бизнеса в одном понятном интерфейсе
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Building className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Регистрация бизнеса</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Пошаговый алгоритм выбора между ИП и ООО. Подбор ОКВЭД для IT и SaaS, регистрация онлайн без госпошлины за 3 дня.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />Сравнение ИП vs ООО для стартапа</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />Авто-подбор ОКВЭД 62.01</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Налоги и режимы</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Калькуляция нагрузки: УСН 6%, УСН 15%, НПД (Самозанятость), Налоговые каникулы 0% для ИП и льготы IT-компаний.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />Подбор оптимального спецрежима</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />ИТ-льготы по взносам (7.6%)</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Документы и права</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Защита интеллектуальной собственности: передачи прав на код от разработчиков, договоры с фаундерами, 152-ФЗ на сайте.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />Отчуждение прав на программный код</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />Согласия и политика персональных данных</li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Финансовые инструменты</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Быстрое открытие расчётного счёта, подключение интернет-эквайринга, СБП и облачной онлайн-кассы по 54-ФЗ.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Прием платежей на сайте</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />Облачные кассы для B2C / SaaS</li>
              </ul>
            </div>

            {/* Card 5 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Меры поддержки и гранты</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Инструкция по гранту «Студенческий стартап» на 1 млн ₽ от ФСИ, программам Сколково и университетским акселераторам.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />Грант 1 000 000 ₽ от ФСИ</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />Требования к смете и ООО</li>
              </ul>
            </div>

            {/* Card 6 */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition-all group border-teal-500/20 bg-gradient-to-b from-slate-900 via-slate-900 to-teal-950/20">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Передача эксперту</h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-4">
                Если вопрос содержит риски (инвесторы из-за рубежа, споры), ИИ автоматически собирает досье и передаёт профильному юристу.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />Автоматическая оценка сложности</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />Готовое досье для профильного юриста</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works section */}
      <section id="how-it-works" className="py-20 border-b border-slate-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
              Как работает «Цифровой навигатор»
            </h2>
            <p className="text-slate-400 text-sm">
              Двухуровневая архитектура: мгновенный ИИ-анализ + экспертный контроль
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative">
              <div className="w-8 h-8 rounded-full bg-teal-500 text-slate-950 font-extrabold text-sm flex items-center justify-center mb-4 shadow-sm shadow-teal-500/30">
                1
              </div>
              <h4 className="font-bold text-white text-sm mb-1">Вопрос пользователя</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Основатель задаёт вопрос в произвольной форме (например: «ИП или ООО для SaaS?»).
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative">
              <div className="w-8 h-8 rounded-full bg-cyan-500 text-slate-950 font-extrabold text-sm flex items-center justify-center mb-4 shadow-sm shadow-cyan-500/30">
                2
              </div>
              <h4 className="font-bold text-white text-sm mb-1">RAG База знаний</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                ИИ ищет проверенные статьи ФНС, Минцифры и нормативную базу 2026 года.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow-sm shadow-blue-500/30">
                3
              </div>
              <h4 className="font-bold text-white text-sm mb-1">Оценка сложности</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Вычисляется сложность (Low/Medium/High) и уверенность (0-100%).
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 relative border-amber-500/30 bg-amber-500/5">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-extrabold text-sm flex items-center justify-center mb-4 shadow-sm shadow-amber-500/30">
                4
              </div>
              <h4 className="font-bold text-white text-sm mb-1">Ответ или Эксперт</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Даёт понятную инструкцию или направляет готовое досье эксперту Фонда.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-teal-950/30 to-slate-900 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Готовы запустить свой стартап без лишней бюрократии?
          </h2>
          <p className="text-slate-300 text-sm mb-8 max-w-xl mx-auto">
            Получите персональную рекомендацию от ИИ-Навигатора прямо сейчас.
          </p>
          <button
            onClick={() => onNavigate('chat')}
            className="px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-teal-500/20 inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Перейти к ИИ-Чату</span>
          </button>
        </div>
      </section>
    </div>
  );
};
