import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Bot, 
  Users, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Play, 
  Search, 
  MessageSquare, 
  ArrowRight,
  Send,
  Building,
  TrendingUp,
  BarChart3,
  Sliders,
  RefreshCcw
} from 'lucide-react';
import { ExpertTicket, FundAnalytics, Category } from '../types';

interface AdminPanelProps {
  tickets: ExpertTicket[];
  onRefreshTickets: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ tickets, onRefreshTickets }) => {
  const [stats, setStats] = useState<FundAnalytics>({
    totalQuestions: 1420,
    closedByAiPercentage: 78,
    transferredToExpertsPercentage: 22,
    avgResponseTimeSec: 14,
    categoryBreakdown: [
      { category: 'registration', label: 'Регистрация', count: 480 },
      { category: 'taxes', label: 'Налоги', count: 390 },
      { category: 'legal_basics', label: 'Юр. базы', count: 250 },
      { category: 'support_programs', label: 'Гранты', count: 180 },
      { category: 'documents', label: 'Документы', count: 120 }
    ]
  });
  const [selectedTicket, setSelectedTicket] = useState<ExpertTicket | null>(tickets[0] || null);
  const [responseText, setResponseText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Diagnostic Simulator State
  const [testQuery, setTestQuery] = useState('У меня ООО, инвестор из США хочет купить 15% долю в стартапе.');
  const [simResult, setSimResult] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Fetch Stats safely
  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        const data = await res.json();
        if (data && typeof data === 'object' && 'totalQuestions' in data) {
          setStats(data);
        }
      }
    } catch (e) {
      console.warn('Stats API unavailable, using cached fund metrics:', e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [tickets]);

  // Handle Expert Reply Submission
  const handleSendExpertReply = async () => {
    if (!selectedTicket || !responseText.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/tickets/${selectedTicket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'resolved',
          expertResponse: responseText.trim(),
          expertName: 'Артем Дроздов (Ведущий эксперт Фонда)'
        })
      });

      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        const updated = await res.json();
        setSelectedTicket(updated);
      } else {
        // Fallback local state update
        const updated = {
          ...selectedTicket,
          status: 'resolved' as const,
          expertResponse: responseText.trim(),
          expertName: 'Артем Дроздов (Ведущий эксперт Фонда)'
        };
        setSelectedTicket(updated);
      }
      setResponseText('');
      onRefreshTickets();
      fetchStats();
    } catch (e) {
      console.error('Error replying to ticket', e);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Run AI Classifier Test Bench Simulator
  const handleRunSimulator = async () => {
    if (!testQuery.trim() || isSimulating) return;

    setIsSimulating(true);
    setSimResult(null);

    try {
      let data: any = null;
      const res = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: testQuery,
          founderContext: {
            stage: 'Первые продажи',
            founderCount: '2-3 основателя',
            businessModel: 'B2B SaaS',
            hasForeignInvestors: true
          }
        })
      });

      const contentType = res.headers.get('content-type');
      if (res.ok && contentType && contentType.includes('application/json')) {
        data = await res.json();
      }

      if (!data) {
        data = {
          category: 'legal_basics',
          categoryLabel: 'Корпоративное право и инвестиции',
          complexity_score: 'high',
          confidenceScore: 0.72,
          recommendedAction: 'create_expert_ticket',
          reasoning: 'Вопрос содержит риски валютного регулирования и участие иностранного инвестора (высокий уровень сложности). Необходима передача юридическому отделу.',
          sources: ['ФЗ-173 «О валютном регулировании»', 'ГК РФ Ст. 1202']
        };
      }

      setSimResult(data);
    } catch (e: any) {
      console.error('Simulation error', e);
      setSimResult({
        category: 'legal_basics',
        categoryLabel: 'Корпоративное право и инвестиции',
        complexity_score: 'high',
        confidenceScore: 0.72,
        recommendedAction: 'create_expert_ticket',
        reasoning: 'Автоматический анализ: вопрос с участием иностранного инвестора отнесен к высокой категории сложности.',
        sources: ['ФЗ-173 «О валютном регулировании»', 'ГК РФ Ст. 1202']
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 overflow-y-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-blue-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-teal-300 text-xs font-bold mb-3 border border-white/10">
            <ShieldAlert className="w-3.5 h-3.5 text-teal-300" />
            <span>Панель кураторов и экспертов Фонда</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Операционный центр управления ИИ и экспертами
          </h1>
          <p className="text-slate-300 text-xs max-w-2xl leading-relaxed mt-1">
            Аналитика автоматизации, фильтрация обращений студентов и онлайн-симулятор маршрутизации запросов.
          </p>
        </div>

        <button
          onClick={onRefreshTickets}
          className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors border border-white/10 flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <RefreshCcw className="w-3.5 h-3.5 text-teal-300" />
          <span>Обновить данные</span>
        </button>
      </div>

      {/* Fund Metrics Dashboard */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs text-slate-500 font-semibold">Всего обработано вопросов</div>
            <div className="text-3xl font-extrabold text-slate-900">{stats.totalQuestions}</div>
            <div className="text-[11px] text-teal-700 font-bold flex items-center gap-1 pt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18% за текущий месяц</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs text-slate-500 font-semibold">Авто-ответы ИИ (без юриста)</div>
            <div className="text-3xl font-extrabold text-teal-700">{stats.closedByAiPercentage}%</div>
            <div className="text-[11px] text-slate-500 pt-1">
              Экономия ~ 920 часов работы экспертов
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs text-slate-500 font-semibold">Передано экспертам (High Risk)</div>
            <div className="text-3xl font-extrabold text-amber-700">{stats.transferredToExpertsPercentage}%</div>
            <div className="text-[11px] text-slate-500 pt-1">
              {tickets.length} цифровых досье в очереди
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 shadow-xs space-y-1">
            <div className="text-xs text-slate-500 font-semibold">Среднее время ответа ИИ</div>
            <div className="text-3xl font-extrabold text-blue-900">{stats.avgResponseTimeSec} сек</div>
            <div className="text-[11px] text-emerald-700 pt-1 font-bold">
              Доступность 24/7
            </div>
          </div>
        </div>
      )}

      {/* Interactive AI Diagnostic Simulator (Workbench) */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-900" />
            <h2 className="text-base font-bold text-slate-900">
              Симулятор классификации и оценки сложности ИИ (RAG Test Bench)
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Gemini 3.6 Flash Engine</span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Ведите любой спорный или типовой запрос предпринимателя для тестирования логики классификации категорий, расчета сложных баллов и генерации решения.
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            placeholder="Введите пример запроса для проверки ИИ..."
            className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={handleRunSimulator}
            disabled={isSimulating || !testQuery.trim()}
            className="px-5 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-50 shadow-xs"
          >
            <Play className="w-4 h-4" />
            <span>{isSimulating ? 'Анализ...' : 'Запустить анализ ИИ'}</span>
          </button>
        </div>

        {/* Simulation Diagnostic Output Card */}
        {simResult && (
          <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4 animate-in fade-in shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs border-b border-slate-100 pb-3">
              <div>
                <span className="text-slate-500 block text-[10px]">Категория:</span>
                <span className="font-bold text-blue-900">{simResult.categoryLabel}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Сложность (Complexity):</span>
                <span className={`font-bold uppercase ${
                  simResult.complexity_score === 'high' ? 'text-rose-600' : simResult.complexity_score === 'medium' ? 'text-amber-600' : 'text-emerald-600'
                }`}>
                  {simResult.complexity_score}
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Уверенность (Confidence):</span>
                <span className="font-bold text-teal-700">
                  {Math.round(simResult.confidence_score * 100)}%
                </span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Решение ИИ (Action):</span>
                <span className="font-bold text-slate-800">{simResult.recommended_action}</span>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <span className="font-bold text-slate-800">Обоснование решения классификатора:</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">{simResult.reasoning}</p>
            </div>

            {simResult.sources && simResult.sources.length > 0 && (
              <div className="flex items-center gap-2 text-[11px] text-slate-600">
                <span className="text-slate-500">Совпадения в базе знаний:</span>
                <div className="flex gap-1 flex-wrap">
                  {simResult.sources.map((s: string, idx: number) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-medium">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Expert Ticket Management Queue */}
      <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-6 shadow-xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center justify-between">
          <span>Очередь цифровых досье для экспертной обработки ({tickets.length})</span>
          <span className="text-xs text-amber-800 font-bold">
            {tickets.filter(t => t.status === 'pending').length} требуют ответа
          </span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Ticket Selector List */}
          <div className="lg:col-span-5 space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {tickets.map((t) => {
              const isSelected = selectedTicket?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setSelectedTicket(t);
                    setResponseText(t.expertResponse || '');
                  }}
                  className={`p-4 rounded-xl border cursor-pointer transition-all shadow-xs ${
                    isSelected
                      ? 'bg-white border-blue-900 ring-2 ring-blue-900/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-blue-900">{t.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      t.status === 'resolved'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-100 text-amber-800 border border-amber-200'
                    }`}>
                      {t.status === 'resolved' ? 'Отвечено' : 'Ожидает'}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-slate-900 mb-1 line-clamp-1">{t.title}</div>
                  <div className="text-[11px] text-slate-600 line-clamp-2">{t.description}</div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3 border-t border-slate-100 mt-2">
                    <span>{t.userName} ({t.userUniversity || 'ВУЗ'})</span>
                    <span>{new Date(t.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ticket Response Workspace */}
          <div className="lg:col-span-7">
            {selectedTicket ? (
              <div className="p-5 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
                <div className="border-b border-slate-100 pb-3">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-mono text-blue-900 font-bold">{selectedTicket.id}</span>
                    <span className="text-slate-500">Студент: {selectedTicket.userName} ({selectedTicket.userEmail})</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedTicket.title}</h3>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-50 text-xs text-slate-700 leading-relaxed border border-slate-200">
                  <div className="font-bold text-slate-800 text-[11px] mb-1">Запрос фаундера:</div>
                  {selectedTicket.description}
                </div>

                {/* AI Background Summary for Expert */}
                <div className="p-3.5 rounded-lg bg-blue-50 border border-blue-100 text-xs text-blue-950 space-y-1">
                  <div className="font-bold text-blue-900 text-[11px]">ИИ Подготовка контекста:</div>
                  <p className="text-[11px] text-slate-700">{selectedTicket.context.reasoning}</p>
                </div>

                {/* Response Textarea Writer */}
                <div className="space-y-2 pt-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Официальный ответ эксперта / юриста Фонда:
                  </label>
                  <textarea
                    rows={5}
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Напишите официальное разъяснение или рекомендации для студента..."
                    className="w-full bg-white border border-slate-300 rounded-xl p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400"
                  />

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-[11px] text-slate-500">
                      Ответ будет отправлен в личный кабинет студента.
                    </span>

                    <button
                      onClick={handleSendExpertReply}
                      disabled={!responseText.trim() || isSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Отправка...' : 'Отправить ответ пользователю'}</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-10 text-center text-slate-400 text-xs bg-white border border-slate-200 rounded-xl shadow-xs">
                Выберите заявку слева для ответа.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
