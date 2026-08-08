import React from 'react';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  FileText, 
  Users, 
  TrendingUp, 
  Building, 
  HelpCircle,
  Plus
} from 'lucide-react';
import { ExpertTicket } from '../types';

interface UserDashboardProps {
  tickets: ExpertTicket[];
  onNavigate: (page: string) => void;
}

export const UserDashboard: React.FC<UserDashboardProps> = ({ tickets, onNavigate }) => {
  const steps = [
    { id: 1, name: 'Идея бизнеса', completed: true, current: false },
    { id: 2, name: 'Выбор формы (ИП/ООО)', completed: true, current: false },
    { id: 3, name: 'Регистрация ФНС', completed: false, current: true },
    { id: 4, name: 'Налоги & Касса', completed: false, current: false },
    { id: 5, name: 'Финансирование & Грант', completed: false, current: false }
  ];

  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 overflow-y-auto space-y-6">
      {/* Top Banner */}
      <div className="p-6 rounded-2xl bg-blue-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-teal-300 text-xs font-bold mb-3 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" />
            <span>Кабинет студента-основателя</span>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
            Прогресс запуска стартапа
          </h1>
          <p className="text-slate-300 text-xs max-w-2xl leading-relaxed">
            Интерактивный трекер операционной готовности вашего бизнеса. ИИ-Навигатор автоматически обновляет статус.
          </p>
        </div>

        <button
          onClick={() => onNavigate('chat')}
          className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Задать вопрос ИИ</span>
        </button>
      </div>

      {/* Startup Journey Pipeline Stepper */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
          Дорожная карта операционного старта
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
          {steps.map((s) => (
            <div
              key={s.id}
              className={`p-4 rounded-xl border transition-all ${
                s.completed
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-xs'
                  : s.current
                  ? 'bg-white border-blue-900 text-slate-800 shadow-xs ring-2 ring-blue-900/10'
                  : 'bg-white border-slate-200 text-slate-400 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold">Этап {s.id}</span>
                {s.completed ? (
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                ) : s.current ? (
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 animate-ping"></span>
                ) : (
                  <Circle className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <div className="text-xs font-bold text-slate-800 mb-1">{s.name}</div>
              <div className="text-[10px] text-slate-500">
                {s.completed ? 'Пройден ✓' : s.current ? 'В процессе ⏳' : 'Предстоит'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold mb-1">Обращений к ИИ</div>
          <div className="text-2xl font-bold text-slate-800">12 вопросов</div>
          <div className="text-[11px] text-teal-700 mt-2 font-bold">9 отвечено мгновенно</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold mb-1">Сэкономлено времени</div>
          <div className="text-2xl font-bold text-blue-900">~ 8.5 часов</div>
          <div className="text-[11px] text-slate-500 mt-2">Эквивалент ~ 25 000 ₽</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs">
          <div className="text-xs text-slate-500 font-semibold mb-1">Заявки экспертам Фонда</div>
          <div className="text-2xl font-bold text-amber-700">{tickets.length} обращения</div>
          <div className="text-[11px] text-slate-500 mt-2">
            {tickets.filter(t => t.status === 'pending').length} ожидают ответа
          </div>
        </div>
      </div>

      {/* Active Recommendations & Ticket Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommended Actions */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <h2 className="text-base font-bold text-slate-800 flex items-center justify-between">
            <span>Персональные рекомендации ИИ</span>
            <span className="text-xs text-teal-700 font-semibold">Обновлено только что</span>
          </h2>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 shadow-xs">
              <div>
                <div className="text-xs font-bold text-slate-800 mb-0.5">Выбор ОКВЭД 62.01</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  Основной код для ИТ-компании — 62.01 (Разработка ПО). Не забудьте указать доп. код 62.02.
                </div>
              </div>
              <button
                onClick={() => onNavigate('chat')}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold shrink-0 border border-slate-200 cursor-pointer"
              >
                Узнать
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 shadow-xs">
              <div>
                <div className="text-xs font-bold text-slate-800 mb-0.5">Заявка на грант 1 млн ₽</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  Проверьте требования к уставному капиталу ООО перед подачей в «Студенческий стартап».
                </div>
              </div>
              <button
                onClick={() => onNavigate('support')}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold shrink-0 border border-slate-200 cursor-pointer"
              >
                Гранты
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start justify-between gap-3 shadow-xs">
              <div>
                <div className="text-xs font-bold text-slate-800 mb-0.5">Передача прав на код</div>
                <div className="text-[11px] text-slate-600 leading-relaxed">
                  Оформите договор отчуждения исключительных прав с фрилансером-разработчиком.
                </div>
              </div>
              <button
                onClick={() => onNavigate('knowledge')}
                className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold shrink-0 border border-slate-200 cursor-pointer"
              >
                Статья
              </button>
            </div>
          </div>
        </div>

        {/* Expert Tickets Overview */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-800">Мои обращения к экспертам</h2>
            <button
              onClick={() => onNavigate('tickets')}
              className="text-xs text-blue-900 hover:underline font-bold cursor-pointer"
            >
              Все обращения ({tickets.length})
            </button>
          </div>

          {tickets.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs">
              У вас пока нет обращений к экспертам. Сложные вопросы перенаправляются автоматически.
            </div>
          ) : (
            <div className="space-y-3">
              {tickets.slice(0, 3).map((t) => (
                <div
                  key={t.id}
                  onClick={() => onNavigate('tickets')}
                  className="p-4 rounded-xl bg-white border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{t.title}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                      t.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : t.status === 'in_progress'
                        ? 'bg-blue-100 text-blue-800 border border-blue-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {t.status === 'resolved' ? 'Отвечено' : t.status === 'in_progress' ? 'В работе' : 'Ожидает'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {t.description}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>{t.id}</span>
                    <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
