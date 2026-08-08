import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  CheckSquare, 
  Square, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  FileText, 
  ExternalLink,
  Sliders,
  HelpCircle,
  Building,
  CheckCircle2,
  Info
} from 'lucide-react';
import { ChatMessage, FounderContext, Category, ComplexityLevel } from '../types';
import { DEMO_PRESET_QUESTIONS } from '../data/demoData';

interface AiChatProps {
  onTicketCreated?: (ticketId: string) => void;
  onNavigate: (page: string) => void;
}

export const AiChat: React.FC<AiChatProps> = ({ onTicketCreated, onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: `Здравствуйте! Я **Цифровой навигатор предпринимателя** — ваш ИИ-помощник первой линии.

Я помогу вам разобраться с:
1. **Выбором формы бизнеса** (ИП или ООО) и кодами ОКВЭД.
2. **Налогами** (УСН 6%, НПД, налоговыми каникулами и льготами для IT).
3. **Защитой интеллектуальной собственности** (передача прав на код от разработчиков).
4. **Мерами поддержки** (гранты до 1 млн ₽ по «Студенческому стартапу»).

Задайте ваш вопрос или выберите один из частых сценариев ниже.`,
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showContextModal, setShowContextModal] = useState(false);

  // Founder Context State
  const [founderContext, setFounderContext] = useState<FounderContext>({
    stage: 'Идея',
    founderCount: '1 основатель',
    businessModel: 'B2B SaaS',
    hasEmployees: false,
    hasForeignInvestors: false
  });

  // Checklist state for interactive next steps
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle Question Submit
  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputQuestion;
    if (!text.trim() || isLoading) return;

    const userMsgId = `user-${Date.now()}`;
    const newUserMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, newUserMsg]);
    if (!textToSend) setInputQuestion('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: text.trim(),
          founderContext,
          history: messages.slice(-4).map(m => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Ошибка связи с сервером ИИ');
      }

      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        analysis: data.analysis
      };

      setMessages(prev => [...prev, aiMsg]);

      if (data.analysis?.ticketCreated && data.analysis?.ticketId && onTicketCreated) {
        onTicketCreated(data.analysis.ticketId);
      }
    } catch (err: any) {
      console.error('Chat error:', err);
      setMessages(prev => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          sender: 'ai',
          text: `⚠️ **Произошла ошибка при обработке запроса:** ${err.message || 'Не удалось получить ответ от ИИ'}. Попробуйте ещё раз.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStep = (stepKey: string) => {
    setCheckedSteps(prev => ({ ...prev, [stepKey]: !prev[stepKey] }));
  };

  // Helper for complexity color
  const getComplexityBadge = (level?: ComplexityLevel) => {
    switch (level) {
      case 'low':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Низкая сложность (Low)</span>;
      case 'medium':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">Средняя сложность (Medium)</span>;
      case 'high':
        return <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">Высокая сложность (High)</span>;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Context Bar Header */}
      <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-slate-500 font-medium">Профиль стартапа:</span>
          <span className="px-2.5 py-0.5 rounded-md bg-white text-blue-900 font-bold border border-slate-200 shadow-xs">
            {founderContext.stage}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-white text-teal-700 font-bold border border-slate-200 shadow-xs">
            {founderContext.founderCount}
          </span>
          <span className="px-2.5 py-0.5 rounded-md bg-white text-slate-700 font-bold border border-slate-200 shadow-xs">
            {founderContext.businessModel}
          </span>
          {founderContext.hasForeignInvestors && (
            <span className="px-2.5 py-0.5 rounded-md bg-rose-50 text-rose-700 font-bold border border-rose-200">
              Иностранный капитал
            </span>
          )}
        </div>

        <button
          onClick={() => setShowContextModal(!showContextModal)}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-slate-100 text-slate-700 transition-colors border border-slate-200 text-xs font-semibold cursor-pointer shadow-xs"
        >
          <Sliders className="w-3.5 h-3.5 text-teal-600" />
          <span>Настроить контекст</span>
        </button>
      </div>

      {/* Context Adjuster Modal */}
      {showContextModal && (
        <div className="bg-slate-50 border-b border-slate-200 p-4 animate-in fade-in slide-in-from-top-2 text-xs">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="font-bold text-slate-800 text-sm flex items-center justify-between">
              <span>Параметры вашего стартапа для точного ответа ИИ</span>
              <button 
                onClick={() => setShowContextModal(false)}
                className="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer"
              >
                Закрыть ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div>
                <label className="block text-slate-500 mb-1">Стадия бизнеса:</label>
                <select
                  value={founderContext.stage}
                  onChange={(e: any) => setFounderContext({ ...founderContext, stage: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-slate-800 font-medium"
                >
                  <option value="Идея">Идея</option>
                  <option value="Прототип">Прототип / MVP</option>
                  <option value="Первые продажи">Первые продажи</option>
                  <option value="Масштабирование">Масштабирование</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Основатели:</label>
                <select
                  value={founderContext.founderCount}
                  onChange={(e: any) => setFounderContext({ ...founderContext, founderCount: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-slate-800 font-medium"
                >
                  <option value="1 основатель">1 основатель</option>
                  <option value="2-3 основателя">2-3 основателя</option>
                  <option value="4+ основателей">4+ основателей</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-500 mb-1">Модель бизнеса:</label>
                <select
                  value={founderContext.businessModel}
                  onChange={(e: any) => setFounderContext({ ...founderContext, businessModel: e.target.value })}
                  className="w-full bg-white border border-slate-300 rounded-lg p-1.5 text-slate-800 font-medium"
                >
                  <option value="B2B SaaS">B2B SaaS</option>
                  <option value="B2C Приложение">B2C Приложение</option>
                  <option value="Маркетплейс">Маркетплейс</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="Услуги">Услуги / Агентство</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="foreignInv"
                  checked={founderContext.hasForeignInvestors}
                  onChange={(e) => setFounderContext({ ...founderContext, hasForeignInvestors: e.target.checked })}
                  className="rounded border-slate-300 bg-white text-teal-600 focus:ring-teal-500"
                />
                <label htmlFor="foreignInv" className="text-slate-700 text-xs font-medium cursor-pointer">
                  Есть иностранный инвестор
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Chat Conversation History */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-white">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 max-w-4xl mx-auto ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                <div className="w-4 h-4 border-2 border-white rotate-45"></div>
              </div>
            )}

            <div
              className={`rounded-2xl p-4 sm:p-5 max-w-3xl text-sm leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-slate-100 text-slate-800 rounded-tr-none shadow-xs border border-slate-200'
                  : 'bg-blue-50/80 border border-blue-100 text-slate-800 rounded-tl-none shadow-xs'
              }`}
            >
              {/* If AI Message with Classification Analysis Header */}
              {msg.sender === 'ai' && msg.analysis && (
                <div className="mb-4 pb-3 border-b border-blue-100/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-teal-100 text-teal-800 font-bold uppercase text-[10px] flex items-center gap-1">
                      <Building className="w-3 h-3 text-teal-700" />
                      {msg.analysis.categoryLabel}
                    </span>

                    {getComplexityBadge(msg.analysis.complexity_score)}
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Confidence Meter */}
                    <div className="flex items-center gap-1.5 text-slate-500 font-mono text-[11px]">
                      <span>Уверенность:</span>
                      <span className="text-teal-700 font-bold">
                        {Math.round(msg.analysis.confidence_score * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Message Body Content */}
              <div className="prose text-sm max-w-none space-y-2 text-slate-800">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>

              {/* RAG Next Steps Checklist */}
              {msg.analysis?.nextSteps && msg.analysis.nextSteps.length > 0 && (
                <div className="mt-5 p-4 rounded-xl bg-white border border-blue-100 space-y-2 shadow-xs">
                  <div className="font-bold text-xs text-blue-900 flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4 text-teal-600" />
                    <span>Рекомендуемые шаги:</span>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    {msg.analysis.nextSteps.map((step, idx) => {
                      const stepKey = `${msg.id}-step-${idx}`;
                      const isChecked = checkedSteps[stepKey];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleStep(stepKey)}
                          className={`flex items-start gap-2 text-xs cursor-pointer p-1.5 rounded transition-colors ${
                            isChecked ? 'line-through text-slate-400 bg-slate-50' : 'text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <span className="mt-0.5 shrink-0 text-teal-600">
                            {isChecked ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                          </span>
                          <span>{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* RAG Sources list */}
              {msg.analysis?.sources && msg.analysis.sources.length > 0 && (
                <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-600">Источники:</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    {msg.analysis.sources.map((src, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                        {src}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Expert Ticket Auto-Created Notification */}
              {msg.analysis?.ticketCreated && (
                <div className="mt-4 p-4 rounded-2xl bg-orange-50 border border-orange-100 text-orange-900 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-orange-900">
                    <AlertTriangle className="w-4 h-4 text-orange-600 shrink-0" />
                    <span>Сложный кейс: передан эксперту (Заявка #{msg.analysis.ticketId})</span>
                  </div>
                  <p className="text-orange-800 leading-relaxed text-[11px]">
                    Ваш вопрос содержит юридические риски. Запрос передан ведущему эксперту Фонда.
                  </p>
                  <button
                    onClick={() => onNavigate('tickets')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-200 hover:bg-orange-300 text-orange-950 font-bold transition-colors text-xs cursor-pointer"
                  >
                    <span>Просмотреть обращение</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Manual Expert Request Button */}
              {msg.sender === 'ai' && !msg.analysis?.ticketCreated && msg.id !== 'welcome-msg' && (
                <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Нужна консультация эксперта?</span>
                  <button
                    onClick={() => {
                      fetch('/api/tickets', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          title: msg.text.slice(0, 50) + '...',
                          description: msg.text,
                          category: msg.analysis?.category || 'legal_basics'
                        })
                      }).then(() => onNavigate('tickets'));
                    }}
                    className="flex items-center gap-1 text-teal-700 hover:text-teal-900 font-bold transition-colors cursor-pointer"
                  >
                    <span>Создать тикет эксперту</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Timestamp */}
              <div className="mt-2 text-[10px] text-slate-400 text-right">
                {msg.timestamp}
              </div>
            </div>

            {msg.sender === 'user' && (
              <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 font-bold flex items-center justify-center shrink-0 border border-slate-300">
                <User className="w-4 h-4 text-slate-600" />
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-4xl mx-auto items-start">
            <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shrink-0">
              <div className="w-4 h-4 border-2 border-white rotate-45 animate-spin"></div>
            </div>
            <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-slate-700 text-xs flex items-center gap-3">
              <RefreshCw className="w-4 h-4 animate-spin text-teal-600" />
              <span>Анадизирую базу знаний, ФНС РФ и нормативную базу...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset Quick Prompts Chips */}
      <div className="bg-slate-50 border-t border-slate-200 p-2.5 overflow-x-auto">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight shrink-0">Частые вопросы:</span>
          {DEMO_PRESET_QUESTIONS.map((preset, idx) => (
            <button
              key={idx}
              disabled={isLoading}
              onClick={() => handleSendMessage(preset.text)}
              className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium shrink-0 border border-slate-200 transition-colors cursor-pointer shadow-xs"
            >
              {preset.title}
            </button>
          ))}
        </div>
      </div>

      {/* Input Form Bar */}
      <div className="bg-slate-50 border-t border-slate-200 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="max-w-4xl mx-auto relative flex items-center"
        >
          <input
            type="text"
            value={inputQuestion}
            onChange={(e) => setInputQuestion(e.target.value)}
            placeholder="Задайте ваш вопрос ИИ-навигатору..."
            disabled={isLoading}
            className="w-full bg-white border border-slate-300 rounded-xl pl-4 pr-12 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-900 shadow-inner"
          />
          <button
            type="submit"
            disabled={!inputQuestion.trim() || isLoading}
            className="absolute right-2 p-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white disabled:opacity-40 transition-colors shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        {/* Disclaimer Footer */}
        <div className="max-w-4xl mx-auto mt-2 text-center text-[10px] text-slate-400 flex items-center justify-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>Ответ носит информационный характер и не является официальной юридической консультацией.</span>
        </div>
      </div>
    </div>
  );
};
