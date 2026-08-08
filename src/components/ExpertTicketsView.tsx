import React, { useState } from 'react';
import { 
  MessageSquare, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  UserCheck, 
  Building2, 
  FileText, 
  Sparkles, 
  Plus, 
  ChevronRight,
  Send
} from 'lucide-react';
import { ExpertTicket, TicketStatus } from '../types';

interface ExpertTicketsProps {
  tickets: ExpertTicket[];
  onNavigate: (page: string) => void;
  onRefreshTickets?: () => void;
}

export const ExpertTicketsView: React.FC<ExpertTicketsProps> = ({ tickets, onNavigate, onRefreshTickets }) => {
  const [selectedTicket, setSelectedTicket] = useState<ExpertTicket | null>(tickets[0] || null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const filteredTickets = tickets.filter(t => {
    if (statusFilter === 'all') return true;
    return t.status === statusFilter;
  });

  const handleCreateManualTicket = async () => {
    if (!newTitle.trim() || !newDescription.trim()) return;

    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          description: newDescription.trim(),
          category: 'legal_basics'
        })
      });
      if (res.ok) {
        setShowNewTicketModal(false);
        setNewTitle('');
        setNewDescription('');
        if (onRefreshTickets) onRefreshTickets();
      }
    } catch (e) {
      console.error('Failed to create ticket', e);
    }
  };

  return (
    <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 overflow-y-auto space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-blue-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/10 text-teal-300 text-xs font-bold mb-2 border border-white/10">
            <MessageSquare className="w-3.5 h-3.5 text-teal-300" />
            <span>Экспертная линия Фонда</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Заявки профильным экспертам и юристам
          </h1>
          <p className="text-slate-300 text-xs mt-1">
            Сложные вопросы автоматически оформляются в цифровые досье и передаются специалистам.
          </p>
        </div>

        <button
          onClick={() => setShowNewTicketModal(true)}
          className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Создать заявку</span>
        </button>
      </div>

      {/* Main Content Layout: List on Left, Detail Dossier on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Ticket List Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                statusFilter === 'all' ? 'bg-blue-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Все ({tickets.length})
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                statusFilter === 'pending' ? 'bg-amber-100 text-amber-900' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Ожидают ({tickets.filter(t => t.status === 'pending').length})
            </button>
            <button
              onClick={() => setStatusFilter('resolved')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-colors cursor-pointer ${
                statusFilter === 'resolved' ? 'bg-emerald-100 text-emerald-900' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Отвечено ({tickets.filter(t => t.status === 'resolved').length})
            </button>
          </div>

          <div className="space-y-3">
            {filteredTickets.map((t) => {
              const isSelected = selectedTicket?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicket(t)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all shadow-xs ${
                    isSelected
                      ? 'bg-blue-50 border-blue-900 ring-2 ring-blue-900/10'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
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

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-3">
                    <span className="font-mono font-semibold">{t.id}</span>
                    <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Detail Column: Expert Dossier */}
        <div className="lg:col-span-7">
          {selectedTicket ? (
            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-6 shadow-xs">
              {/* Top Dossier Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-blue-900">{selectedTicket.id}</span>
                    <span className="text-xs text-slate-500">• {selectedTicket.category}</span>
                  </div>
                  <h2 className="text-lg font-bold text-slate-900 mt-1">{selectedTicket.title}</h2>
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  selectedTicket.status === 'resolved'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : selectedTicket.status === 'in_progress'
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-amber-100 text-amber-800 border border-amber-200'
                }`}>
                  {selectedTicket.status === 'resolved' ? 'Отвечено' : selectedTicket.status === 'in_progress' ? 'В работе' : 'Ожидает эксперта'}
                </span>
              </div>

              {/* Founder Context Briefing Card */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-700 flex items-center justify-between">
                  <span>Досье заявителя (Студент-основатель):</span>
                  <span className="text-slate-500">{selectedTicket.userName}</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-slate-600 pt-1">
                  <div>ВУЗ: <span className="text-slate-900 font-semibold">{selectedTicket.userUniversity || 'МГУ / ВШЭ'}</span></div>
                  <div>Стадия: <span className="text-slate-900 font-semibold">{selectedTicket.context.businessStage}</span></div>
                  <div>Команда: <span className="text-slate-900 font-semibold">{selectedTicket.context.founderCount}</span></div>
                  <div>Модель: <span className="text-slate-900 font-semibold">{selectedTicket.context.businessModel}</span></div>
                  <div>Иностр. капитал: <span className="text-slate-900 font-semibold">{selectedTicket.context.hasForeignInvestors ? 'Да ⚠️' : 'Нет'}</span></div>
                  <div>Сложность ИИ: <span className="text-amber-800 font-bold uppercase">{selectedTicket.context.complexityScore}</span></div>
                </div>
              </div>

              {/* Original Question */}
              <div className="space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Суть вопроса:</div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed">
                  {selectedTicket.description}
                </div>
              </div>

              {/* AI Diagnostic Reasoning */}
              {selectedTicket.context.reasoning && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Заключение ИИ-Навигатора для эксперта:</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-relaxed">
                    {selectedTicket.context.reasoning}
                  </p>
                </div>
              )}

              {/* Expert Response Thread */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-between">
                  <span>Ответ эксперта Фонда:</span>
                  {selectedTicket.expertName && (
                    <span className="text-blue-900 font-bold">{selectedTicket.expertName}</span>
                  )}
                </div>

                {selectedTicket.expertResponse ? (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 leading-relaxed space-y-2">
                    <div className="font-bold text-emerald-900 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>{selectedTicket.expertName || 'Юрист Фонда'}</span>
                    </div>
                    <p>{selectedTicket.expertResponse}</p>
                    {selectedTicket.expertRespondedAt && (
                      <div className="text-[10px] text-emerald-700 text-right pt-1">
                        {new Date(selectedTicket.expertRespondedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500 space-y-2">
                    <Clock className="w-6 h-6 text-amber-500 mx-auto animate-pulse" />
                    <p>Заявка находится в очереди рассмотрения. Обычно эксперт ответит в течение 2-4 часов.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 text-xs bg-white border border-slate-200 rounded-2xl shadow-xs">
              Выберите обращение из списка слева для просмотра подробного досье.
            </div>
          )}
        </div>
      </div>

      {/* Manual New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-xl text-slate-800">
            <h2 className="text-lg font-bold text-slate-900">Создать обращение эксперту</h2>
            <p className="text-xs text-slate-500">
              Опишите вашу ситуацию. Заявка отправится профильному юристу или бухгалтеру Фонда.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-500 mb-1">Тема обращения:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Например: Продажа доли иностранному инвестору"
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-500 mb-1">Подробное описание вопроса:</label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  rows={4}
                  placeholder="Укажите стадию, особенности договора или имеющиеся споры..."
                  className="w-full bg-white border border-slate-300 rounded-xl p-2.5 text-xs text-slate-800"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowNewTicketModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 cursor-pointer"
              >
                Отмена
              </button>
              <button
                onClick={handleCreateManualTicket}
                disabled={!newTitle.trim() || !newDescription.trim()}
                className="px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold disabled:opacity-50 cursor-pointer shadow-xs"
              >
                Отправить заявку
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
